import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";

interface ILogin {
  userName: string;
  password: string;
}

export async function POST(request: Request) {
  console.log(request);
  const req: ILogin = await request.json();
  const { userName, password } = req;
  if (userName == "" || password == "") {
    return NextResponse.json({ status: 400, message: "User not found" });
  }
  var qUser = await prisma.user.findFirst({
    where: { userName: userName as string , userPassword: password as string},
  });
  if (!qUser) {
    return NextResponse.json({ status: 400, message: "User not found" });
  }
  const token = await new SignJWT({
    username: qUser.userName,
    userId: qUser.id, // Set your own roles
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3600s")
    .sign(getJwtSecretKey());

  const response = NextResponse.json(
    { status: 200, message:"" },
    { status: 200, headers: { "content-type": "application/json" } }
  );

  response.cookies.set({
    name: "token",
    value: token,
    path: "/",
  });


  
  return response;
}
