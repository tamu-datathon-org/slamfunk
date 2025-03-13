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
  const user: User = await request.json();
  const params = { TableName: TABLE_NAME, Item: user };
  try {
    await dynamoDB.put(params).promise();
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { uid: string } }) {
  const { uid } = params;
  const paramsDB = { TableName: TABLE_NAME, Key: { uid } };
  try {
    const data = await dynamoDB.get(paramsDB).promise();
    return NextResponse.json(data.Item || {});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { uid: string } }) {
  const { uid } = params;
  const updates: Partial<User> = await request.json();
  const paramsDB = {
    TableName: TABLE_NAME,
    Key: { uid },
    UpdateExpression: 'set ' + Object.keys(updates).map(k => `#${k} = :${k}`).join(', '),
    ExpressionAttributeNames: Object.keys(updates).reduce((acc, k) => ({ ...acc, [`#${k}`]: k }), {}),
    ExpressionAttributeValues: Object.keys(updates).reduce((acc, k) => ({ ...acc, [`:${k}`]: updates[k as keyof User] }), {}),
    ReturnValues: 'UPDATED_NEW',
  };
  try {
    const result = await dynamoDB.update(paramsDB).promise();
    return NextResponse.json(result.Attributes || {});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { uid: string } }) {
  const { uid } = params;
  const paramsDB = { TableName: TABLE_NAME, Key: { uid } };
  try {
    await dynamoDB.delete(paramsDB).promise();
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
