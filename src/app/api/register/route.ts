import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";

interface IRegister {
  userName: string;
  password: string;
}

export async function POST(request: Request) {
  const req: IRegister = await request.json();
  const { userName, password } = req;
  if (userName == "" || password == "") {
    return NextResponse.json({
      status: 400,
      message: "Please fill all the fields!",
    });
  }
  var qUser = await prisma.user.findFirst({ where: { userName: userName } });
  if (qUser) {
    return NextResponse.json({
      status: 400,
      message: "This username alredy exists!",
    });
  }
  var user = await prisma.user.create({
    data: { userName: userName, userPassword: password },
  });

  const token = await new SignJWT({
    username: userName,
    userId: user.id, // Set your own roles
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3600s")
    .sign(getJwtSecretKey());

  const response = NextResponse.json(
    { status: 200, message: "" },
    { status: 200, headers: { "content-type": "application/json" } }
  );

  response.cookies.set({
    name: "token",
    value: token,
    path: "/",
  });

  return response;
}
