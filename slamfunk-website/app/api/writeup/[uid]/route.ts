import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { Writeup, WriteupType } from 'app/writeup/types';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME=process.env.S3_BUCKET_NAME;
const TABLE_NAME = 'Writeups';

export async function GET(_request: NextRequest, { params }) {
    try {
        const q = {
            TableName: TABLE_NAME,
            IndexName: "UserIndex",
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': params.uid,
            },
        };
        const data = await dynamoDB.query(q).promise();
        if (data.Items.length === 0) {
            NextResponse.json({ error: 'User does not have a writeup submitted' }, { status: 404 });
        } else {
            const writeup = data.Items[0] as Writeup;
            NextResponse.json(writeup, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(_request: NextRequest, { params }) {
    try {
        const q = {
            TableName: TABLE_NAME,
            IndexName: "UserIndex",
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': params.uid,
            },
        };
        const data = await dynamoDB.query(q).promise();
        if (data.Items.length === 0) {
            NextResponse.json({ error: 'User does not have a writeup submitted' }, { status: 404 });
        } else {
            const writeup: Writeup = {
                id: data.Items[0].id,
                user_id: data.Items[0].user_id,
                type: data.Items[0].type,
                link: data.Items[0].link,
                filename: data.Items[0].filename,
            }
            // ! make sure to delete the file from s3 if file upload type
            if (writeup.type === WriteupType.Document || writeup.type === WriteupType.Video) {
                await s3.deleteObject({
                    Bucket: BUCKET_NAME,
                    Key: `${writeup.user_id}/${writeup.filename}`,
                }).promise();
            }
            // then delete the writeup document in dynamoDb
            const d = {
                TableName: TABLE_NAME,
                Key: { id: writeup.id },
            };
            await dynamoDB.delete(d).promise();
        }
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: error }, { status: 500 });
    }
}

