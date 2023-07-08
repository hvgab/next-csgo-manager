
import { NextResponse } from "next/server";

// GET /api/steam/IPublishedFileService/GetDetails/
export async function GET(request: Request, { params: { workshopId }, }: { params: { workshopId: number }; }) {

    const url = "https://api.steampowered.com/IPublishedFileService/GetDetails/v1/"

    var searchParams = new URLSearchParams()
    searchParams.append("key", process.env.STEAM_API_KEY);
    searchParams.append("publishedfileids[0]", workshopId);

    console.log("searchParams.toString()")
    console.log(searchParams.toString())

    const fetchUrl = url + "?" + searchParams.toString()

    console.log(fetchUrl)
    const response = await fetch(fetchUrl);

    console.log("response.ok")
    console.log(response.ok)

    console.log("response.status")
    console.log(response.status)

    const workshop = await response.json();

    return NextResponse.json(workshop.response.publishedfiledetails[0]);
}