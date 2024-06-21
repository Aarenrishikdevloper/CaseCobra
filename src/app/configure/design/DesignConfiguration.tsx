"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn, formatPrice } from "@/lib/utils";
import { Rnd } from "react-rnd";
import NextImage from "next/image";
import React, { useRef, useState } from "react";
import HandleComponent from "@/components/HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { COLORS, FINISH, MATERIAL, MODELS } from "@/app/validator/validator";
import { RadioGroup } from "@headlessui/react";
import { Label } from "@/components/ui/label";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { BASE_PRICE } from "@/config/product";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { SaveConfigArgs, saveConfig as _saveConfig } from "./action";
import { useRouter } from "next/navigation";

interface Designprops {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}
const DesignConfiguration = ({
  configId,
  imageUrl,
  imageDimensions,
}: Designprops) => {
  const [options, setoptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIAL.options)[number];
    finish: (typeof FINISH.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIAL.options[0],
    finish: FINISH.options[0],
  });
  const [rendereddimensions, setrendereddimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });
  const { toast } = useToast();
  const [renderedposition, setrenderedposition] = useState({
    x: 150,
    y: 205,
  });
  const phonecaseRef = useRef<HTMLDivElement>(null);
  const { startUpload } = useUploadThing("imageUploader");
  const containerref = useRef<HTMLDivElement>(null);
  async function saveimg() {
    try {
      const {
        left: caseleft,
        top: casetop,
        width,
        height,
      } = phonecaseRef.current!.getBoundingClientRect();
      const { left: containerleft, top: containertop } =
        containerref.current!.getBoundingClientRect();
      const letoffset = caseleft - containerleft;
      const topoffset = casetop - containertop;
      const actualX = renderedposition.x - letoffset;
      const actualY = renderedposition.y - topoffset;
      const canvas = document.createElement("canvas");
      canvas.height = height;
      canvas.width = width;
      const ctx = canvas.getContext("2d");
      const userimage = new Image();
      userimage.crossOrigin = "anonymous";
      userimage.src = imageUrl;
      await new Promise((resolve) => (userimage.onload = resolve));
      ctx?.drawImage(
        userimage,
        actualX,
        actualY,
        rendereddimensions.width,
        rendereddimensions.height
      );
      const base64 = canvas.toDataURL();
      const base54data = base64.split(",")[1];
      const blob = base64toBlob(base54data, "image/png");
      const file = new File([blob], `${configId}.png`, { type: "image/png" });
      await startUpload([file], { configId });
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Something went wrong Please try again",
        variant: "destructive",
      });
    }
  }
  const router = useRouter();
  function base64toBlob(base64: string, mimType: string) {
    const bytecharacter = atob(base64);
    const bytenumbers = new Array(bytecharacter.length);
    for (let i = 0; i < bytecharacter.length; i++) {
      bytenumbers[i] = bytecharacter.charCodeAt(i);
    }
    const byteArray = new Uint8Array(bytenumbers);
    return new Blob([byteArray], { type: mimType });
  }
  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save_config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveimg(), _saveConfig(args)]);
    },
    onError: (e) => {
      toast({
        title: "Error",
        description: "Something went wrong Please try again",
        variant: "destructive",
      });
      console.log(e);
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });
  return (
    <div
      ref={containerref}
      className=" relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20"
    >
      <div className=" relative h-[37.5rem]  overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2  focus:ring-primary focus:ring-offset-2">
        <div className=" relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
            className=" pointer-events-none z-50 relative aspect-[896/1831] w-full"
            ref={phonecaseRef}
          >
            <NextImage
              alt=""
              fill
              src={"/phone-template.png"}
              className=" pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className=" absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229, 231, 235, 0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setrendereddimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setrenderedposition({ x, y });
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              fill
              alt="Your Image"
              className=" pointer-events-none"
            />
          </div>
        </Rnd>
      </div>
      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col  bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            className=" absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
            aria-hidden={true}
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your case
            </h2>
            <div className=" w-full h-px bg-zinc-200 my-6" />
            <div className="flex flex-col gap-6">
              <RadioGroup
                value={options.color}
                onChange={(val) => {
                  setoptions((prev) => ({
                    ...prev,
                    color: val,
                  }));
                }}
              >
                <Label> Color: {options.color.label}</Label>
                <div className="mt-3 flex items-center space-x-3">
                  {COLORS.map((color) => (
                    <RadioGroup.Option
                      key={color.label}
                      value={color}
                      className={({ active, checked }) =>
                        cn(
                          " relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none border-2 border-transparent",
                          { [`border-${color.tw}`]: active || checked }
                        )
                      }
                    >
                      <span
                        className={cn(
                          `bg-${color.tw}`,
                          "h-8 w-8 rounded-full border border-black border-opacity-10"
                        )}
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <div className="relative flex flex-col gap-3 w-full">
                <Label>Models</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"outline"}
                      role={"combobox"}
                      className="w-full justify-between"
                    >
                      {options.model.label}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {MODELS.options.map((model) => (
                      <DropdownMenuItem
                        key={model.label}
                        className={cn(
                          "flex  text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 ",
                          { "bg-zinc-100": model.label === options.model.label }
                        )}
                        onClick={() => {
                          setoptions((prev) => ({ ...prev, model }));
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-4 h-4 w-4",
                            model.label === options.model.label
                              ? "opacity-100 "
                              : "opacity-0"
                          )}
                        />
                        {model.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {[MATERIAL, FINISH].map(
                ({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    value={options[name]}
                    onChange={(val) =>
                      setoptions((prev) => ({ ...prev, [name]: val }))
                    }
                  >
                    <Label>
                      {name.slice(0, 1).toUpperCase() + name.slice(1)}
                    </Label>
                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <RadioGroup.Option
                          key={option.value}
                          value={option}
                          className={({ active, checked }) =>
                            cn(
                              " relative block cursor-pointer rounded-lg bg-white px-6 py-6  shadow-sm border-2 border-zinc-200  focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                              active || checked ? "border-primary" : ""
                            )
                          }
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <RadioGroup.Label
                                className={"font-medium text-gray-900"}
                                as="span"
                              >
                                {option.label}
                              </RadioGroup.Label>
                              {option.description ? (
                                <RadioGroup.Description
                                  as="span"
                                  className={"text-gray-500"}
                                >
                                  {option.description}
                                </RadioGroup.Description>
                              ) : null}
                            </span>
                          </span>
                          <RadioGroup.Description
                            as="span"
                            className={
                              "mt-2 flex flex-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right "
                            }
                          >
                            <span className=" font-medium text-gray-900">
                              {formatPrice(option.price / 100)}
                            </span>
                          </RadioGroup.Description>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                )
              )}
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className=" font-medium whitespace-nowrap">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100
                )}
              </p>
              <Button
                size={"sm"}
                className="w-full "
                disabled={isPending}
                isLoading={isPending}
                loadingText="Saving"
                onClick={() =>
                  saveConfig({
                    configId,
                    color: options.color.value,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfiguration;
