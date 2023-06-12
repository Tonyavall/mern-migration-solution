import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = NextResponse.json({ success: true });
        response.cookies.delete('token');
        return response;
    } catch (error) {
        const response = NextResponse.json({ success: false });

        return response;
    }
}