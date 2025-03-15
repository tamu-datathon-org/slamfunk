// get the bracket by the bracket id
import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { Bracket } from '../../route';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'Brackets';

export async function GET(_request: NextRequest, { params }) {
    const { bid } = params;
    const paramsDB = { TableName: TABLE_NAME, Key: { id: bid } };
    try {
        const data = await dynamoDB.get(paramsDB).promise();
        const bracket = data.Item as Bracket || null; 
        if (!bracket) {
            return NextResponse.json({ error: 'Bracket not found' }, { status: 404 });
        } else {
            return NextResponse.json(bracket, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
