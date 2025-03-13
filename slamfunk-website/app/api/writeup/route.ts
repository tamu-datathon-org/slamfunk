import { WriteupType } from 'app/writeup/types';
import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { Writeup } from 'app/writeup/types';

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

// ! assumes that user doesn't already have a writeup submitted
// ! ^ logic is handled in the frontend to validate the above
export async function POST(request: NextRequest) {
    const data = await request.formData();
    const id = data.get('id') as string;
    const uid = data.get('uid') as string;
    const type = data.get('type') as string;
    let link = null; 
    let filename = null; 

    if (!id || !uid || !type) {
        return NextResponse.json({ error: 'Incomplete form data (id, uid, type)' }, { status: 400 });
    }

    // if a file upload type, upload data to s3
    // otherwise label as a yt vid and store yt vid link
    if (type === WriteupType.Document || type === WriteupType.Video) {
        const file = data.get('file') as File;
        if (!file) {
            return NextResponse.json({ error: 'Incomplete form data (file)' }, { status: 400 });
        }
        try {
            const uploadResult = await s3.upload({
                Bucket: BUCKET_NAME,
                Key: `${uid}/${file.name}`,
                Body: Buffer.from(await file.arrayBuffer()),
                ContentType: file.type,
            }).promise();
            link = uploadResult.Location;
            filename = file.name;
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: error }, { status: 500 });
        }
    } else if (type === WriteupType.YouTube){
        link = data.get('link') as string;
        filename = 'YouTube Video';
        if (!link) {
            return NextResponse.json({ error: 'Incomplete form data (link)' }, { status: 400 });
        }
    } else {
        return NextResponse.json({ error: 'Invalid writeup type' }, { status: 400 });
    }

    // validate link and file name generation 
    if (!link || !filename) {
        return NextResponse.json({ error: 'Unable to generate link and file name' }, { status: 500 });
    }

    try {
        const writeup: Writeup = {
            id: id,
            user_id: uid,
            link: link,
            filename: filename,
            type: type,
        }
        await dynamoDB.put({ TableName: TABLE_NAME, Item: writeup }).promise();
        NextResponse.json({ message: 'Writeup created successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: error }, { status: 500 });
    }
}

