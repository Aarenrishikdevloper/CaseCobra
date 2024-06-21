/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/ICons";
import MaxWidth from "@/components/MaxWidth";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";

import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidth classname="pb-24 pt-10  lg:grid lg:grid-cols-3 sm:pb-32  lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className=" col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className=" relative mx-auto text-center lg:text-left  flex flex-col  items-center lg:items-start ">
              <div className=" absolute w-28  left-0  -top-20  hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
                <img src="/snake-1.png" className="w-full" alt="logo" />
              </div>
              <h1 className="relative w-fit tracking-tight text-blanced mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-6xl">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap ">
                Capture your favorite memories with your own,{" "}
                <span className=" font-semibold">one-of-one</span> phone case.
                CaseCobra allows you to protect your memeories not just phone
                case
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-start sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5  items-center text-green-600">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High Quality, durable material
                  </li>
                  <li className="flex gap-1.5  items-center text-green-600">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Print gurantee
                  </li>
                  <li className="flex gap-1.5  items-center text-green-600">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>
              <div className="mt-12  flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className=" flex  -space-x-4">
                  <img
                    src="/users/user-1.png"
                    alt=""
                    className=" inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-2.png"
                    alt=""
                    className=" inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-3.png"
                    alt=""
                    className=" inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-4.jpg"
                    alt=""
                    className=" inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-5.jpg"
                    alt=""
                    className=" inline-block h-10 w-10 object-cover rounded-full ring-2 ring-slate-100"
                  />
                </div>
                <div className=" flex flex-col justify-between items-center sm:items-start">
                  <div className=" flex gap-0.5">
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  </div>
                  <p>
                    <span className="font-semibold">1,250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-full lg:col-span-1  w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className=" relative md:max-w-xl">
              <img
                src="/your-image.png"
                className="absolute w-40 lg:w-52 left-56  -top-20 select-none hidden sm:block lg:hidden xl:block"
                alt=""
              />
              <img
                src="/line.png"
                alt=""
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone className="w-64" imgsrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidth>
      </section>
      <section className="bg-slate-100 grainy-dark   py-24">
        <MaxWidth classname=" flex flex-col items-center gap-16 sm:gap-32">
          <div className=" flex flex-col items-center lg:flex-row  gap-4 sm:gap-4">
            <h2 className="  order-1 mt-2  tracking-tight text-center !leading-tight  text-balance  font-bold text-5xl md;text-6xl text-fray-900">
              {" "}
              What our{" "}
              <span className="relative px-2">
                Customers{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
              </span>{" "}
              say
            </h2>
            <img
              src="/snake-2.png"
              alt=""
              className="w-24 order-0 lg:order-2"
            />
          </div>
          <div className="mx-auto grid max-w-2xl  grid-cols-1  lg:grid-cols-2 px-4 lg:mx-0 lg:max-w-none gap-y-16">
            <div className="flex flex-auto  flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  Absolutely thrilled with my purchase! The mobile case is not
                  only stylish but also incredibly durable. It fits my phone
                  perfectly, providing excellent protection without adding bulk.
                  The quality and design exceeded my expectations.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    {" "}
                    Highly recommend this site for anyone looking to blend
                    functionality with fashion
                  </span>
                  . looks brand new after about half a year
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="/users/user-1.png"
                  className=" rounded-full h-12 w-12 object-cover"
                  alt=""
                />
                <div className="flex flex-col">
                  <p className=" font-semibold">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purcase</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-auto  flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  Absolutely thrilled with my new mobile case! The sleek design
                  perfectly complements my phone, while the durable material
                  offers outstanding protection. The precise cutouts ensure easy
                  access to all ports and buttons, making it as functional as it
                  is stylish.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    Highly recommend for anyone looking to upgrade their phone's
                    look and safety!.{" "}
                  </span>{" "}
                  looks brand new after about half a year
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="/users/user-2.png"
                  className=" rounded-full h-12 w-12 object-cover"
                  alt=""
                />
                <div className="flex flex-col">
                  <p className=" font-semibold">Johana</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purcase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidth>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidth classname="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="  order-1 mt-2  tracking-tight text-center !leading-tight  text-balance  font-bold text-5xl md;text-6xl text-fray-900">
                Upload your photo and get{' '}
                <span className="relative px-2  bg-green-600 text-white">
                  Your Case now 
                </span>{' '}
                now
              </h2>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className=" relative flex flex-col  items-center md:grid md:grid-cols-2 gap-40">
              <img
                src="/arrow.png"
                className="absolute top-[25rem] md:top-1/2  -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
                alt=""
              />
              <div className="relative h-80 md;h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5  ring-inset ring-gray-900/10 lg;rounded-2xl ">
                <img
                  src="/horse.jpg"
                  alt=""
                  className=" rounded-md object-cover bg-white  shadow-2xl  ring-1 ring-gray-900/10 h-full w-full "
                />
              </div>
              <Phone className="w-60" imgsrc="/horse_phone.jpg" />
            </div>
          </div>
          <ul className="mx-auto mt-12  max-w-prose sm:text-lg space-y-2  w-fit">
            <li className="w-fit">
              <Check className="text-green-600 h-5 w-5 mr-1.5  inline" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="text-green-600 h-5 w-5 mr-1.5  inline" />
              Scratch and fingerprint resinent cover
            </li>
            <li className="w-fit">
              <Check className="text-green-600 h-5 w-5 mr-1.5  inline" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="text-green-600 h-5 w-5 mr-1.5  inline" />
              print warranty
            </li>
            <div className="flex justify-center">
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
              >
                Create Your case now
                <ArrowRight className="h-3 w-4 mr-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWidth>
      </section>
    </div>
  );
}
