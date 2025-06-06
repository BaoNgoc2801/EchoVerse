import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/livekit/generate-token`, body);
        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json({ message: 'Token generation error', error }, { status: 500 });
    }
}
