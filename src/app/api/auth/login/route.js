import { NextResponse } from "next/server";
import connectDB from "@/server/config/connection";
import { User } from "@/server/models";
import { signToken } from "@/server/utils/auth";

export async function POST(req) {
    await connectDB();

    const { email, password } = await req.json();

    console.log(email)

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('No account associated with that email.');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
        throw new Error('Incorrect credentials');
    }

    const token = await signToken(user);

    const response = NextResponse.json({ user, token });

    response.cookies.set('token', token);

    return response;
}