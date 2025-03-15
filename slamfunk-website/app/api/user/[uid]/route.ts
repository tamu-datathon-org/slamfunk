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

export async function GET(_request: NextRequest, { params }) {
    const { uid } = params;
    console.log(uid)
    const paramsDB = { TableName: TABLE_NAME, Key: { uid } };
    try {
        const data = await dynamoDB.get(paramsDB).promise();
        const user = data.Item as User || null; 
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        } else {
            return NextResponse.json(user, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
