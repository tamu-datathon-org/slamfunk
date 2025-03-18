import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'Users';

export async function PATCH(request: NextRequest, { params }) {
    // todo: auth
    const { uid } = params;
    const { maxScore, bestBracket } = await request.json();
    if (!uid || !maxScore || !bestBracket) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const p = { 
        TableName: TABLE_NAME, 
        Key: { uid },
        UpdateExpression: 'set maxScore = :maxScore, bestBracket = :bestBracket',
        ExpressionAttributeValues: {
            ':maxScore': maxScore,
            ':bestBracket': bestBracket,
        },
        ReturnValues: 'ALL_NEW',
    };
    try {
        await dynamoDB.update(p).promise();
        return NextResponse.json({ message: 'User created successfully' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


