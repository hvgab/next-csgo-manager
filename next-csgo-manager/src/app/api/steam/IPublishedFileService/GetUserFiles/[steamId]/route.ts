
import { NextResponse } from "next/server";

// GET /api/steam/IPublishedFileService/GetDetails/

async function getData() { }

export async function GET(request: Request, { params: { steamId }, }: { params: { steamId: number }; }) {


    const url = "https://api.steampowered.com/IPublishedFileService/GetUserFiles/v1/"
    // 1
    // https://api.steampowered.com/IPublishedFileService/GetUserFiles/v1/?key=47A211F1BD2E3C5C5AD3CAD5F42EFDBB&steamid=76561198082857351&appid=730&numberpage=100
    // 100
    // https://api.steampowered.com/IPublishedFileService/GetUserFiles/v1/?key=47A211F1BD2E3C5C5AD3CAD5F42EFDBB&steamid=76561198082857351&appid=730&numperpage=100

    let searchParams = new URLSearchParams()
    searchParams.append("key", process.env.STEAM_API_KEY);
    searchParams.append("steamid", steamId.toString());
    searchParams.append("appid", "730");

    searchParams.append("numberpage", "1000");  // Items per page
    searchParams.append("page", "1");  // page number

    console.log("searchParams.toString()")
    console.log(searchParams.toString())

    const fetchUrl = url + "?" + searchParams.toString()

    console.log(fetchUrl)
    const response = await fetch(fetchUrl, { cache: "no-cache" });

    console.log("response.ok")
    console.log(response.ok)

    console.log("response.status")
    console.log(response.status)

    const workshop = await response.json();

    return NextResponse.json(workshop.response.publishedfiledetails);
}