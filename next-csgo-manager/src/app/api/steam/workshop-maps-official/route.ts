
import { NextResponse } from "next/server";

// GET /api/steam/IPublishedFileService/GetDetails/

async function getData() { }

export async function GET(request: Request) {

    const key = process.env.STEAM_API_KEY;
    const fetchUrl = `https://api.steampowered.com/IPublishedFileService/GetUserFiles/v1/?key=${key}&steamid=76561198082857351&appid=730&numperpage=1000&page=1`
    const response = await fetch(fetchUrl, { cache: "no-cache" });

    console.log(`response.ok ${response.ok}`)
    console.log(`response.status ${response.status}`)

    const workshop = await response.json();

    return NextResponse.json(workshop.response.publishedfiledetails);
}