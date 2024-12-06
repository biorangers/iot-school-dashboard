// make quick.db connection and export it

import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../prisma/db";

export async function GET(req: NextRequest) {
  // read key from request URL
  // /api/database/:key
  const url = new URL(req.url);
  const key = parseInt(url.searchParams.get("key") || "");
  if (!key) {
    return NextResponse.json({ error: "Key is required" }, { status: 400 });
  }

  // read value from db

  const { value } = (await prisma.data.findUnique({
    where: {
      key,
    },
  })) || { value: null };

  if (!value) {
    return NextResponse.json({ error: "Key not found" }, { status: 404 });
  }

  // return value

  return NextResponse.json(JSON.parse(value));
}

export async function POST(req: Request) {
  // read key and value from req.body

  const { key, value } = await req.json();
  if (!key || !value) {
    return NextResponse.json(
      { error: "Key and value are required" },
      { status: 400 }
    );
  }

  const stringValue = JSON.stringify(value);

  // write value to db

  await prisma.data.upsert({
    where: {
      key,
    },
    update: {
      value: stringValue,
    },

    create: {
      key,
      value: stringValue,
    },
  });

  // return success message

  return NextResponse.json({ success: true });
}
