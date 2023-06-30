import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  try {
    await revalidatePath(path);
    return NextResponse.json({ message: `${path} revalidated`, status: 200 });
  } catch (e) {
    return NextResponse.json({ message: `Error ${e}`, status: 500 });
  }
}
