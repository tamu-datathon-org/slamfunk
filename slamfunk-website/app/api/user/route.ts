import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'Users';

export interface User {
    uid: string;
    email: string;
    name: string;
    maxScore: number;
    bestBracket: string | null;
};

// returns all users in the database
export async function GET(_request: NextRequest) {
    const params = { TableName: TABLE_NAME };
    try {
        const data = await dynamoDB.scan(params).promise();
        return NextResponse.json(data.Items);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const user: User = await request.json();
    user.maxScore = 0;
    user.bestBracket = null;
    if (!user.uid || !user.email || !user.name) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const p = { TableName: TABLE_NAME, Item: user, ConditionExpression: 'attribute_not_exists(uid)' };
    try {
        const existingUser = await dynamoDB.get({
            TableName: TABLE_NAME,
            Key: { uid: user.uid }
        }).promise()
        if (existingUser.Item) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }
        await dynamoDB.put(p).promise();
        return NextResponse.json({ message: 'User created successfully' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

