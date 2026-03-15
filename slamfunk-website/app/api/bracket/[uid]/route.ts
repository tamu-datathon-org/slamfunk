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
export async function GET(_request: NextRequest, { params }: { params: Promise<{ uid: string }> }) {
    try {
        const { uid } = await params;
        console.log("Fetching brackets for user_id:", uid);

        const q = {
            TableName: TABLE_NAME,
            IndexName: "UserIdIndex",
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': uid,
            },
        };

        console.log("DynamoDB query:", q);
        const data = await dynamoDB.query(q).promise();
        console.log("DynamoDB response:", data);

        if (!data.Items || data.Items.length === 0) {
            return NextResponse.json({ error: 'No brackets found' }, { status: 404 });
        } else {
            const brackets:Bracket[] = data.Items as Bracket[];
            return NextResponse.json(brackets, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching brackets:", error);
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
}