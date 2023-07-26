"use client";

import useSWR from "swr";
import { useContext, useEffect, useState } from "react";
// import { CarouselContext, CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import PublishedFileDetails from "./PublishedFileDetails";
import fetcher from "@/app/lib/fetcher";

export default function ServerPublishedFileDetails({ serverId }: { serverId: number }) {
  const { data, error, isLoading } = useSWR(`/api/servers/${serverId}/query`, fetcher);

  if (error) return <div>Workshop Error</div>;
  if (isLoading) return <div>Loading Workshop</div>;
  if (!data) return <div>No Workshop data</div>;
  console.log(JSON.stringify(data, "", 2));

  if (data?.workshopId == null) {
    switch (data.info.map) {
      case "de_inferno":
        return <PublishedFileDetails workshopId={125438669}></PublishedFileDetails>;
        break;

      default:
        break;
    }
    return <div>{data.info.map}</div>;
  }
  return <PublishedFileDetails workshopId={data.mapWorkshopId}></PublishedFileDetails>;
}
