// https://api.steampowered.com/IPublishedFileService/QueryFiles/v1/

// key=62E28A7007C51EC2F4ECAFCC2F8775B8
// query_type=13
// numperpage=10
// appid=730
// return_tags=true
// return_children=true
// return_short_description=true

// most popular one week
// searchtext=

// today
//

import { FileEdit } from "lucide-react";
import { NextResponse } from "next/server";

enum QueryType {
  RankedByVote = 0,
  RankedByPublicationDate = 1,
  AcceptedForGameRankedByAcceptanceDate = 2,
  RankedByTrend = 3,
  FavoritedByFriendsRankedByPublicationDate = 4,
  CreatedByFriendsRankedByPublicationDate = 5,
  RankedByNumTimesReported = 6,
  CreatedByFollowedUsersRankedByPublicationDate = 7,
  NotYetRated = 8,
  RankedByTotalUniqueSubscriptions = 9,
  RankedByTotalVotesAsc = 10,
  RankedByVotesUp = 11,
  RankedByTextSearch = 12,
  RankedByPlaytimeTrend = 13,
  RankedByTotalPlaytime = 14,
  RankedByAveragePlaytimeTrend = 15,
  RankedByLifetimeAveragePlaytime = 16,
  RankedByPlaytimeSessionsTrend = 17,
  RankedByLifetimePlaytimeSessions = 18,
  RankedByInappropriateContentRating = 19,
  RankedByBanContentCheck = 20,
  RankedByLastUpdatedDate = 21,
}

type Tag = {
  tag: string;
  display_name: string;
};

type FileDetails = {
  result: number;
  publishedfileid: string;
  creator: string;
  creator_appid: number;
  consumer_appid: number;
  consumer_shortcutid: number;
  filename: string;
  file_size: string;
  preview_file_size: string;
  preview_url: string;
  url: string;
  hcontent_file: string;
  hcontent_preview: string;
  title: string;
  short_description: string;
  time_created: number;
  time_updated: number;
  visibility: number;
  flags: number;
  workshop_file: boolean;
  workshop_accepted: boolean;
  show_subscribe_all: boolean;
  num_comments_public: number;
  banned: boolean;
  ban_reason: string;
  banner: string;
  can_be_deleted: boolean;
  app_name: string;
  file_type: number;
  can_subscribe: boolean;
  subscriptions: number;
  favorited: number;
  followers: number;
  lifetime_subscriptions: number;
  lifetime_favorited: number;
  lifetime_followers: number;
  lifetime_playtime: string;
  lifetime_playtime_sessions: string;
  views: number;
  num_children: number;
  num_reports: number;
  tags: Tag[];
  language: number;
  maybe_inappropriate_sex: boolean;
  maybe_inappropriate_violence: boolean;
  revision_change_number: string;
  revision: number;
  available_revisions: number[];
  ban_text_check_result: number;
};

async function getData() {}

export async function GET(request: Request) {
  if (!process.env.STEAM_API_KEY) return NextResponse.json({}, { status: 500 });

  let maps: FileDetails[] = [];
  let page = 1;
  while (maps.length < 8) {
    const fetchedMaps: MapsResponse = await fetchMaps(page);
    console.log("### fetchedMaps ###");
    console.log(fetchedMaps);
    const filteredMaps: FileDetails[] = filterMaps(
      fetchedMaps.response.publishedfiledetails
    );
    console.log("### Filtered Maps ###");
    console.log(filteredMaps);

    maps.push(...filteredMaps);
    console.log(`### ${maps.length} ###`);
    console.log(maps);
    page += 1;
  }

  return NextResponse.json(maps);
}

type MapsResponse = {
  response: {
    total: number;
    publishedfiledetails: FileDetails[];
  };
};

async function fetchMaps(
  page: number,
  query_type: QueryType = QueryType.RankedByTrend
) {
  const url =
    "https://api.steampowered.com/IPublishedFileService/QueryFiles/v1/";
  let searchParams = new URLSearchParams();
  searchParams.append("key", process.env.STEAM_API_KEY || "");
  searchParams.append("appid", "730");
  searchParams.append("numberpage", "100"); // Items per page
  searchParams.append("page", page.toString()); // page number
  searchParams.append("query_type", query_type.toString());
  searchParams.append("return_tags", "true");
  searchParams.append("return_childre", "true");
  searchParams.append("return_short_description", "true");
  searchParams.append("required_tags[]", "classic");
  searchParams.append("required_tags[]", "wingman");
  searchParams.append("days", "90");
  console.log("searchParams.toString()");
  console.log(searchParams.toString());

  const fetchUrl = url + "?" + searchParams.toString();
  console.log(fetchUrl);

  // const response = await fetch(fetchUrl, { cache: "no-cache" });
  const response = await fetch(fetchUrl);

  console.log("response.ok");
  console.log(response.ok);

  console.log("response.status");
  console.log(response.status);

  const workshop = await response.json();

  return workshop;
}

function filterMaps(maps: FileDetails[]) {
  let resMaps: FileDetails[] = [];
  for (let index = 0; index < maps.length; index++) {
    let element = maps[index];
    if (element.title.toLowerCase().includes("aim")) continue;
    if (element.title.toLowerCase().includes("1v1")) continue;
    if (element.title.toLowerCase().includes("surf")) continue;
    if (element.title.toLowerCase().includes("utility")) continue;
    if (element.title.toLowerCase().includes("prefire")) continue;
    if (!element.tags.some((obj) => obj.tag.toLowerCase() == "map")) continue;
    // if (
    //   !element.tags.some((obj) => obj.tag.toLowerCase() == "classic") &&
    //   !element.tags.some((obj) => obj.tag.toLowerCase() == "wingman")
    // )
    //   continue;

    resMaps.push(element);
  }
  return resMaps;
}
