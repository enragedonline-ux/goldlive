import { NextResponse } from "next/server";
import { getPricesCached } from "@/lib/prices";

export async function GET() {
  try {
    const data = await getPricesCached();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ assets: [], updatedAt: new Date().toISOString() }, { status: 200 });
  }
}
