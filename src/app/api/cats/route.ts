import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyJwtToken } from "@/lib/auth";
import { cats } from "@prisma/client";

export async function GET(request: Request) {
  interface CatApiRes {
    url: string;
    id: string;
  }
  const url = request.url;
  const query = new URLSearchParams(url.split("?")[1]);
  const limit = Number.parseInt(query.get("limit") ?? "5");
  const api_key = process.env.CAT_API_KEY;
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value: token } = cookieList.get("token") ?? { value: null };
  const verifiedToken = await verifyJwtToken(token);
  if (!verifiedToken) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }

  var qUserLikes = await prisma.userLike.findMany({
    where: { userId: verifiedToken.userId as string },
  });

  var qCats = await prisma.cats.findMany({
    where: { id: { notIn: qUserLikes.map((x) => x.catId) } },
    take: limit,
  });

  if (qCats.length == 0) {
    const cat = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=" +
        limit +
        "&api_key=" +
        api_key,
      {
        method: "get",
      }
    );
    var data: CatApiRes[] = await cat.json();
    console.log(data);
    var addedCats: cats[] = [];
    await data.forEach((addCat) => {
      var addedCat = prisma.cats
        .create({
          data: {
            id: addCat.id,
            imageUrl: addCat.url,
            likeCount: 0,
          },
        })
        .then((x) => addedCats.push(x));
    });
    return NextResponse.json({ status: 200, message: "", data: addedCats });
  }
  return NextResponse.json({ status: 200, message: "", data: qCats });
}

export async function POST(request: Request) {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value: token } = cookieList.get("token") ?? { value: null };
  const verifiedToken = await verifyJwtToken(token);
  if (!verifiedToken) {
    return NextResponse.redirect("/login");
  }

  const body = await request.json();
  const catId = body.catId;
  if (!catId) {
    return NextResponse.json({ status: 400, message: "catId required" });
  }

  

  const cat = await prisma.cats.findUnique({ where: { id: catId as string } });
  if (cat) {
    await prisma.cats.update({
      where: { id: catId as string },
      data: { likeCount: cat.likeCount + 1 },
    });
  }
  await prisma.userLike.create({
    data: { userId: verifiedToken.userId as string, catId: catId as string },
  });
  return NextResponse.json({ status: 200, message: "" });
}
