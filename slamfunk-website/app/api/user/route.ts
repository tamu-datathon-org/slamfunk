import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'Users';

type User = {
  uid: string;
  email: string;
  name: string;
  maxScore: number;
};

export async function POST(request: NextRequest) {
    console.log('POST request received');
    const user: User = await request.json();
    const params = { TableName: TABLE_NAME, Item: user };
    try {
        await dynamoDB.put(params).promise();
        return NextResponse.json({ message: 'User created successfully' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

