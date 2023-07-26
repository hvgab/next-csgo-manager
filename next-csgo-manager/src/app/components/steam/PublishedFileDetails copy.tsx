"use client";

import useSWR from "swr";
import { useContext, useEffect, useState } from "react";
// import { CarouselContext, CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import fetcher from "@/app/lib/fetcher";

export default function PublishedFileDetails({ workshopId }: { workshopId: number }) {
  console.log(`PublisedFileDetails workshopId: ${workshopId}`);
  const { data, error, isLoading } = useSWR(`/api/steam/IPublishedFileService/GetDetails/${workshopId}`, fetcher);

  const handleDragStart = (e) => e.preventDefault();
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  let carousel = null;

  if (error)
    return (
      <>
        <div>
          <h1>Workshop Error</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </>
    );

  /* LOADING */
  if (isLoading) {
    let sliderItems = [];
    for (let index = 0; index < 5; index++) {
      sliderItems.push(
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600 rounded-t-box object-cover"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      );
    }

    carousel = (
      <AliceCarousel
        animationDuration={2000}
        mouseTracking
        items={sliderItems}
        // autoHeight={true}
        // autoWidth={true}
        autoPlay={true}
        controlsStrategy="alternate"
        infinite={true}
        responsive={responsive}
      />
    );

    return (
      <>
        <div role="status" className="animate-pulse">
          <div className="card max-w-xl bg-base-100 shadow-xl">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600 rounded-t-box object-cover"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
            <div className="card-body">
              {/* Title */}
              <h2 className="card-title">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              </h2>
              {/* Description */}
              <p>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </p>
              <div className="card-actions justify-end">
                <button className="h-8 w-16 btn btn-neutral"></button>
                <button className="h-8 w-16 btn btn-primary"></button>
              </div>
              {carousel}
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  /* DATA */
  if (data && "previews" in data) {
    let sliderItems = [];
    for (let index = 0; index < data.previews.length; index++) {
      const element = data.previews[index];
      sliderItems.push(<img src={element.url} onDragStart={handleDragStart} role="presentation" className="h-32" />);
    }

    carousel = (
      <AliceCarousel
        animationDuration={2000}
        mouseTracking
        items={sliderItems}
        // autoHeight={true}
        // autoWidth={true}
        autoPlay={true}
        controlsStrategy="alternate"
        infinite={true}
        responsive={responsive}
      />
    );
  }

  return (
    <>
      <div>
        <div className="card max-w-xl bg-base-100 shadow-xl">
          <img src={data.preview_url} alt="preview" className="rounded-t-box object-cover" />
          <div className="card-body">
            <h2 className="card-title">{data.title}</h2>
            <p>{data.file_description}</p>
            <div className="card-actions justify-end">
              <a
                href={`https://steamcommunity.com/workshop/filedetails/?id=${data.publishedfileid}`}
                className="btn btn-neutral"
              >
                Workshop
              </a>
              <button className="btn btn-primary">Change Map To {data.title}</button>
            </div>
            {carousel}
          </div>
        </div>
      </div>
    </>
  );
}
