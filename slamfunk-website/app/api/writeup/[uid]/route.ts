import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'Writeups';

type Writeup = {
  id: string;
  user_id: string;
  s3_key: string;
  filename: string;
};

export async function GET(_request: NextRequest, { params }) {
    try {
        const q = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': params.uid,
            },
        };
        const data = await dynamoDB.query(q).promise();
        const writeup = data.Items[0] as Writeup || {};
        return NextResponse.json(writeup, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: error }, { status: 500 });
    }
}

