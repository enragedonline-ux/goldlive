import { NextResponse } from "next/server";
import { getHistoryCached, ASSETS } from "@/lib/prices";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const asset = searchParams.get("asset") ?? "gold";
  if (!ASSETS.some((a) => a.id === asset)) {
    return NextResponse.json({ error: "unknown asset" }, { status: 400 });
  }
  const points = await getHistoryCached(asset);
  return NextResponse.json({ asset, points });
}
