/* eslint-disable @next/next/no-img-element */
'use client';
import { Maximize } from "lucide-react";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidth from "./MaxWidth";
import { cn } from "@/lib/utils";
import Phone from "./Phone";
import { useInView } from "framer-motion";
const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];
function splitArray<T>(array: Array<T>, numparts: number) {
  const results: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numparts;
    if (!results[index]) {
      results[index] = [];
    }
    results[index].push(array[i]);
  }
  return results;
}

interface Reviewprops extends HTMLAttributes<HTMLDivElement> {
  imgsrc: string;
}

function ReviewColumn({
  reviews,
  className,
  reviewClasssName,
  msPerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  reviewClasssName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setcolumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;
  useEffect(() => {
    if (!columnRef.current) return;
    const resizeobserver = new window.ResizeObserver(() => {
      setcolumnHeight(columnRef.current?.offsetHeight ?? 0);
    });
    resizeobserver.observe(columnRef.current);
    return () => {
      resizeobserver.disconnect();
    };
  }, []);
  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={reviewClasssName?.(reviewIndex % reviews.length)}
          imgsrc={imgSrc}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const colum2 = columns[1];
  const column3 = splitArray(columns[2], 2);  
  console.log(isInView);
  return (
    <div ref={containerRef} className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...colum2]}
            reviewClasssName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...colum2, ...column3[1]]}
            reviewClasssName={(reviewIndex) =>
              reviewIndex >= colum2.length ? "lg:hidden" : ""
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={[...column3.flat()]}
            className="hidden md:block"
            msPerPixel={10}
           
          />
        </>
      ) : null} 
      <div className=" pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100"/> 
      <div className=" pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100 "/>
    </div>
  );
}
function Review  ({ imgsrc, className, ...props }: Reviewprops) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];
  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgsrc={imgsrc} />
    </div>
  );
};

const Reviews = () => {
  return (
    <MaxWidth classname="relative max-w-5xl">
      <img
        arial-hidden='true'
        src="/what-people-are-buying.png"
        alt=""
        className="absolute select-none hidden xl:block  -left-32 top-1/3 "
        
      />
      <ReviewGrid />
    </MaxWidth>
  );
};

export default Reviews;
