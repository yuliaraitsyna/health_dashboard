import { Session } from "next-auth";
import auth from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getUserFromDB, getUserHeartData } from "@/app/lib/database";
import { HeartRateData, HeartRateVariabilityData } from "@/app/lib/definitions";
import { getServerSession } from "next-auth/next";

const calculateSDNN = (RRIntervals: number[]) => {
    if (RRIntervals.length < 2) return 0; 

    const meanRR = RRIntervals.reduce((sum, rr) => sum + rr, 0) / RRIntervals.length;

    const variance = RRIntervals.reduce((sum, rr) => sum + Math.pow(rr - meanRR, 2), 0) / (RRIntervals.length - 1);

    return Math.sqrt(variance);
}


function calculateRMSSD(rrIntervals: number[]) {
    const diffs = rrIntervals.slice(1).map((rr, i) => Math.abs(rr - rrIntervals[i]));
    const squaredDiffs = diffs.map(diff => Math.pow(diff, 2));
    const meanSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / squaredDiffs.length;

    return Math.sqrt(meanSquaredDiff);
}

export async function GET() {
    try {
        const session: Session | null = await getServerSession(auth);

        if(!session?.user?.email) {
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const user = await getUserFromDB(session.user.email);

        if(!user) {
            return NextResponse.json({ error: "User not found"}, {status: 404});
        }

        const heartData: HeartRateData[] = await getUserHeartData(Number(user.id));
        
        if(!heartData) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        const RRIntervals = heartData.map(record => (60000 / record.hr));
        const sdnn = calculateSDNN(RRIntervals);
        const rmssd = calculateRMSSD(RRIntervals);

        if(sdnn === undefined || rmssd === undefined) {
            return NextResponse.json({ error: "Error calculating HRV" }, { status: 500 });
        }

        const hrv: HeartRateVariabilityData = {
            sdnn,
            rmssd
        }

        return NextResponse.json({hrv}, { status: 200 });
    }
    catch(error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error"}, { status: 500 });
    }
}