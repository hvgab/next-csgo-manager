"use client";

import useSWR from "swr";
import { useContext, useEffect, useState } from "react";
// import { CarouselContext, CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default function PublishedFileDetails({ workshopId }: { workshopId: number }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/steam/IPublishedFileService/GetDetails/${workshopId}`, fetcher);

  const handleDragStart = (e) => e.preventDefault();
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  let carousel = null;

  const jsonDump = (
    <div>
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  );

  if (error)
    return (
      <>
        <div>
          <h1>Error</h1>
          <pre>{error}</pre>
        </div>
      </>
    );

  if (isLoading) return <div>Loading</div>;

  if ("previews" in data) {
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
              <button className="btn btn-primary">Change Map To {data.title}</button>
            </div>
            {carousel}
          </div>
        </div>
      </div>
    </>
  );
}
