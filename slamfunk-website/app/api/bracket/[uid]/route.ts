import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { Bracket } from '../route';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'Brackets';

// get all brackets that belong to a user
export async function GET(_request: NextRequest, { params }) {
    try {
        const q = {
            TableName: TABLE_NAME,
            IndexName: "UserIdIndex",
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': params.uid,
            },
        };
        const data = await dynamoDB.query(q).promise();
        if (data.Items.length === 0) {
            return NextResponse.json({ error: 'No brackets found' }, { status: 404 });
        } else {
            const brackets:Bracket[] = data.Items as Bracket[];
            return NextResponse.json(brackets, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
