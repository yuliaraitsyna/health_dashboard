import { NextResponse } from "next/server";
import { getUserFromDB, getUserHeartData, getUserHeartDataByDates } from "@/app/lib/database";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import auth from "../auth/[...nextauth]/route";
import { HeartRateData } from "@/app/lib/definitions";

export async function GET() {
  try {
    const session: Session | null = await getServerSession(auth);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserFromDB(session.user.email);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const heartData: HeartRateData[] = await getUserHeartData(Number(user.id));

    if (!heartData || heartData.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json({ heartData }, { status: 200 });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session: Session | null = await getServerSession(auth);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserFromDB(session.user.email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { startDate, endDate } = await req.json();

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const heartData: HeartRateData[] = await getUserHeartDataByDates(Number(user.id), start, end);

    if (!heartData || heartData.length === 0) {
      return NextResponse.json({ error: "No data found for the given date range" }, { status: 404 });
    }

    return NextResponse.json({ heartData }, { status: 200 });

  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
