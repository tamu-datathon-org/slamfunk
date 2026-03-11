import os
from celery import Celery
from celery.schedules import crontab


# TODO: CONFIGURE AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env with Coolify for SQS auth
broker_url = "sqs://" 

app = Celery(
        "march_madness_worker", # TODO: RENAME depending on what dayo names sqs
    broker=broker_url,
    include=["tasks"]
)

app.conf.update(
    broker_transport_options={
        "region": os.getenv("AWS_REGION", "us-east-1"),
        "predefined_queues": {
            "celery": {
                "url": os.getenv("SQS_QUEUE_URL")
            }
        }
    },
    task_default_queue="celery",
    # Do not store task results unless necessary, as SQS doesn't natively support result backends.
    task_ignore_result=True 
)

# CELERY BEAT SCHEDULE
app.conf.beat_schedule = {
    'send-daily-bracket-reminders': {
        'task': 'tasks.send_reminders',
        # Executes everyday at 8:00 AM
        'schedule': crontab(hour=8, minute=0), 
    },
    'update-ncaa-scores': {
        'task': 'tasks.update_scores',
        # Executes every 5 minutes
        'schedule': crontab(minute='*/5'),
    }
}
