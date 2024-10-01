"use client";
import { buttonVariants } from "@/components/ui/button";

import useSWR from "swr";
import { useContext, useEffect, useState } from "react";
// import { CarouselContext, CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import fetcher from "@/lib/fetcher";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function MapCard({ map }) {
  return (
    <Card>
      {/* <Card className="flex-shrink-0 w-52"> */}
      <CardHeader className="p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={map.preview_url}
          alt="preview"
          className="rounded-t-lg w-48"
        />
        <CardTitle className="p-1 text-lg">{map.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{map.file_description}</p>
      </CardContent>
      <CardFooter className="p-2">
        <div className="flex flex-col">
          <Link
            className={buttonVariants({ variant: "secondary", size: "sm" })}
            href={`https://steamcommunity.com/workshop/filedetails/?id=${map.publishedfileid}`}
          >
            Workshop
          </Link>

          <Button variant={"default"} size={"sm"}>
            Change Map
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function ServerAdminMapsComponent() {
  const { data, error, isLoading } = useSWR(
    `/api/steam/IPublishedFileService/QueryFiles`,
    fetcher
  );

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return (
    <div className="flex overflow-x-auto space-x-2">
      {data.map((map) => (
        <MapCard key={map.publishedfileid} map={map}></MapCard>
      ))}
    </div>
  );
}
