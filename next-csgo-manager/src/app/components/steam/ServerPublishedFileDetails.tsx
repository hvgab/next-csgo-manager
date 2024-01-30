"use client";

import useSWR from "swr";
import { useContext, useEffect, useState } from "react";
// import { CarouselContext, CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import PublishedFileDetails from "./PublishedFileDetails";
import fetcher from "@/app/lib/fetcher";

export default function ServerPublishedFileDetails({
  serverId,
}: {
  serverId: number;
}) {
  const { data, error, isLoading } = useSWR(
    `/api/servers/${serverId}/info`,
    fetcher
  );

  if (error) return <div>Workshop Error</div>;
  if (isLoading) return <div>Loading Workshop</div>;
  if (!data) return <div>No Workshop data</div>;
  console.log(JSON.stringify(data, null, 2));

  console.log(`mapWorkshopId: ${data.mapWorkshopId}`);

  if (data?.mapWorkshopId == null) {
    switch (data.info.map) {
      case "de_inferno":
        return (
          <PublishedFileDetails workshopId={125438669}></PublishedFileDetails>
        );
        break;
      case "cs_agency":
        return (
          <PublishedFileDetails workshopId={779309165}></PublishedFileDetails>
        );
        break;
      case "de_shortdust":
        return (
          <PublishedFileDetails workshopId={344476023}></PublishedFileDetails>
        );
        break;
      case "cs_office":
        return (
          <PublishedFileDetails workshopId={125444404}></PublishedFileDetails>
        );
        break;
      default:
        return <div>Default: {data.info.map}</div>;
        break;
    }
  }
  return (
    <PublishedFileDetails
      workshopId={data.mapWorkshopId}
    ></PublishedFileDetails>
  );
}
