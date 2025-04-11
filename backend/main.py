import uuid
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import redis.asyncio as redisio

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
r = redisio.Redis(host="redis", port=6379, db=0, decode_responses=True)

@app.get("/")
async def root():
    return {"message": "FastAPI backend is running"}

@app.get("/client-id")
async def get_client_id():
    client_id = str(uuid.uuid4())
    await r.sadd("clients", client_id)
    return {"clientId": client_id}

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    await r.sadd("clients", client_id)

    stored_messages = await r.lrange("messages", 0, -1)
    for message in stored_messages:
        await websocket.send_text(message)
    try:
        while True:
            data = await websocket.receive_text()
            await r.rpush("messages", data)
            clients = await r.smembers("clients")
            # Broadcast the message to all clients. This doesn't work because
            # we don't have a list of WebSocket connections.
            print(f"TODO: Broadcast message to {clients}")
            await websocket.send_text(f"Client {client_id} says: {data}")
    except WebSocketDisconnect:
        await r.srem("clients", client_id)
        print(f"Client {client_id} disconnected")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)