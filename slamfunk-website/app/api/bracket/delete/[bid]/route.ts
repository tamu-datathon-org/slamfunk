import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'Brackets';

/*export async function DELETE(_request: NextRequest, { params }) {
    try {
        const q = { TableName: TABLE_NAME, Key: { id: params.bid } };
        await dynamoDB.delete(q).promise();
        return NextResponse.json({ message: 'bracket deleted' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}*/

