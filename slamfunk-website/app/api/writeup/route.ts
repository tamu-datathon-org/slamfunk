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

export async function POST(request: NextRequest) {
  const writeup: Writeup = await request.json();
  const params = { TableName: TABLE_NAME, Item: writeup };
  try {
    await dynamoDB.put(params).promise();
    return NextResponse.json({ message: 'Writeup created successfully' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const paramsDB = { TableName: TABLE_NAME, Key: { id } };
  try {
    const data = await dynamoDB.get(paramsDB).promise();
    return NextResponse.json(data.Item || {});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const updates: Partial<Writeup> = await request.json();
  const paramsDB = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set ' + Object.keys(updates).map(k => `#${k} = :${k}`).join(', '),
    ExpressionAttributeNames: Object.keys(updates).reduce((acc, k) => ({ ...acc, [`#${k}`]: k }), {}),
    ExpressionAttributeValues: Object.keys(updates).reduce((acc, k) => ({ ...acc, [`:${k}`]: updates[k as keyof Writeup] }), {}),
    ReturnValues: 'UPDATED_NEW',
  };
  try {
    const result = await dynamoDB.update(paramsDB).promise();
    return NextResponse.json(result.Attributes || {});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const paramsDB = { TableName: TABLE_NAME, Key: { id } };
  try {
    await dynamoDB.delete(paramsDB).promise();
    return NextResponse.json({ message: 'Writeup deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

