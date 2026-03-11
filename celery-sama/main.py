from fastapi import FastAPI
from pydantic import BaseModel
from tasks import send_instant_message

# spin up fastapi web server
app = FastAPI()

class MessageRequest(BaseModel):
    user_id: str
    message: str

@app.post("/trigger-message")
def trigger_message(req: MessageRequest):
    # .delay() pushes the task to AWS SQS asynchronously
    send_instant_message.delay(req.user_id, req.message)
    return {"status": "Task enqueued successfully", "user_id": req.user_id}

@app.get("/health")
def health_check():
    return {"status": "ok"}
