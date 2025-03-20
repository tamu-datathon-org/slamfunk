import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'Brackets';

export interface Round {
    [matchId: string]: {team1: string, team2: string, winner: string};
}

export interface Bracket {
    id: string;
    user_id: string;
    rounds: {
        round_64: Round,
        round_32: Round,
        sweet_16: Round,
        elite_8: Round,
        final_4: Round,
        championship: Round,
    }
}

// returns all brackets in the database
// ! VERY EXPENSIVE OPERATION, SO DON'T CALL UNLESS NECESSArY
export async function GET(_request: NextRequest) {
    const params = { TableName: TABLE_NAME };
    try {
        const data = await dynamoDB.scan(params).promise();
        return NextResponse.json(data.Items);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

// creates a bracket in the database
/*export async function POST(request: NextRequest) {
    const bracket:Bracket = await request.json();
    // console.log(bracket);
    const params = { TableName: TABLE_NAME, Item: bracket };
    try {
        await dynamoDB.put(params).promise();
        return NextResponse.json({ message: 'Bracket created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} */


