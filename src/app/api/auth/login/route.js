import { NextResponse } from "next/server";
import connectDB from "@/server/config/connection";
import { User } from "@/server/models";

export async function POST(req) {
    await connectDB();

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('No account associated with that email.');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
        throw new Error('Incorrect credentials');
    }

    const token = signToken(user);
    response.cookies.set('token', token);

    const response = NextResponse.json({ user, token });

    return response;
}