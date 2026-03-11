from celery_app import app
import boto3
import os

dynamodb = boto3.resource(
    'dynamodb',
    region_name=os.getenv("AWS_REGION", "us-east-1")
)

'''
defines tasks that celery may need to do, flesh these out later
lowk leave as boilerplate for now until i know what celery is responsible for
'''

@app.task(name="tasks.send_reminders")
def send_reminders():
    # Example Beat task: Query DynamoDB and send emails
    table = dynamodb.Table('UsersTable')
    # Add your logic to scan/query users missing bracket picks
    print("Sending bracket reminders to users...")
    return "Reminders sent"

@app.task(name="tasks.update_scores")
def update_scores():
    # Example Beat task: Fetch live scores and update DynamoDB
    table = dynamodb.Table('BracketsTable')
    print("Updating March Madness scores in DynamoDB...")
    return "Scores updated"

@app.task(name="tasks.send_instant_message")
def send_instant_message(user_id: str, message: str):
    # Example triggered task from TS API
    print(f"Sending message to {user_id}: {message}")
    # Write record of message to DynamoDB
    table = dynamodb.Table('MessagesTable')
    table.put_item(Item={'UserId': user_id, 'Message': message})
    return "Message sent"
