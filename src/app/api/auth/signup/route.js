import { NextResponse } from "next/server";
import connectDB from "@/server/config/connection";
import { User } from "@/server/models";
import { signToken } from "@/server/utils/auth";

export async function POST(req) {
    await connectDB();

    const reqBody = await req.json()

    const user = await User.create(reqBody);
    const token = await signToken(user);

    const response = NextResponse.json({ token, user });

    response.cookies.set('token', token);

    return response;
}