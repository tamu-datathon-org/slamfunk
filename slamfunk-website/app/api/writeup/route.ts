import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const TABLE_NAME = 'Writeups';

type Writeup = {
  id: string;
  user_id: string;
  s3_key: string;
  filename: string;
};

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get('file') as File;
    const uid = data.get('uid') as string;
    if (!file || !uid) {
        return NextResponse.json({ error: 'Incomplete form data' }, { status: 400 });
    }
    try {
        const q = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': uid,
            },
        };
        const data = await dynamoDB.query(q).promise();
        // if the user exists in writeup
        // delete existing file from s3
        // upload new file to s3
        // update the entry in writeups table

        // if the user doesn't exist in writeup
        // store the file upload in s3
        // create a new entry in writeups table
        if (data.Items.length > 0) {
            console.log("User exists in writeup, deleting old file");
            const oldKey = data.Items[0].s3_key;
            await s3.deleteObject({ Bucket: BUCKET_NAME, Key: oldKey }).promise();
        } else { console.log("User doesn't exist in writeup"); }
        const uploadResult = await s3.upload({
            Bucket: BUCKET_NAME,
            Key: `${uid}/${file.name}`,
            Body: file,
            ContentType: file.type,
        }).promise();
        const fileUrl = uploadResult.Location;
        const writeup: Writeup = {
            id: uid,
            user_id: uid,
            s3_key: fileUrl,
            filename: file.name,
        }
        await dynamoDB.put({ TableName: TABLE_NAME, Item: writeup }).promise();
        return NextResponse.json({ message: 'Writeup created successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function GET({ params }: { params: { uid: string } }) {
    try {
        const q = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': params.uid,
            },
        };
        const data = await dynamoDB.query(q).promise();
        return NextResponse.json(data.Items || {});
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: error }, { status: 500 });
    }
}

