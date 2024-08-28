import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try{
        const {name, email, password, } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
      
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
    }catch (error){if (error instanceof Error){
        return NextResponse.json({status:"error" , message: "error" },
        {status:500})
    }
}
}