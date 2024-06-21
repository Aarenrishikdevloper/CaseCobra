'use client'
import { COLORS, MODELS } from '@/app/validator/validator';
import Phone from '@/components/Phone';
import { Button } from '@/components/ui/button';
import { BASE_PRICE, PRODUCT_PRICE } from '@/config/product';
import { cn, formatPrice } from '@/lib/utils';
import { Configuration } from '@prisma/client';
import { ArrowRight, Check, ConeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti';
import LoginModel from "@/components/LoginModel";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {useMutation} from "@tanstack/react-query";
import {createCheckOutSession} from "@/app/configure/preview/action";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";

const DesignPreview = ({configuration}:{configuration:Configuration}) => {
    const[showconfetti, setshowconfetti] = useState(false);
    useEffect(()=>setshowconfetti(true),[]);
    const{color, model, finish, material, id} = configuration
    const tw = COLORS.find((supportedColor)=>supportedColor.value ===color)?.tw;
    // @ts-ignore
    const { label:modeLabel,  } = MODELS.options.find(({value})=>value === model)
    let totalprice = BASE_PRICE
    if(material === 'polycarbonate'){
        totalprice += PRODUCT_PRICE.finish.textured
    }
    if(finish === 'textured'){
        totalprice += PRODUCT_PRICE.finish.textured
    }

    const{toast} = useToast()

    const {user} = useKindeBrowserClient()
    const [isopen, setopen] = useState<boolean>(false);

    const router = useRouter()
    const{mutate:createCheckout, isPending} = useMutation({
        mutationKey:["get-checkout-session"],
        mutationFn:createCheckOutSession,
        onSuccess:({url})=>{
            if(url){
                router.push(url);
            }else{
                throw new Error("unable to retrrive payment URl")
            }
        },
        onError:()=>{
            toast({
                title:"Something went wrong",
                description:"Please Try again",
                variant: "destructive",

            })
        }

    })
    function handleCheckout(){
        if(user){
            createCheckout({configId:id})
        }else{
            localStorage.setItem('configurationId', id)
            setopen(true);
        }

    }
    return (
        <>
            <div aria-hidden={'true'} className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center">
                <Confetti active={showconfetti} config={{elementCount:200, spread:90}} />
            </div>
            <LoginModel isOpen={isopen} setOpen={setopen}/>
            <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
                <div className=" md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
                    <Phone imgsrc={configuration.croppedImageUrl!} className={cn(`bg-${tw}`, ' max-w-[150px] md:max-w-full')}/>
                </div>
                <div className=" mt-6 sm:col-span-9 md:row-end-1">
                    <h3 className=' text-3xl font-bold tracking-tight text-gray-900'> Your {modeLabel} Case </h3>
                    <div className=" mt-3   flex  items-center gap-1.5 text-base">
                        <Check className='h-4 w-4 text-green-600'/>
                        In stock and ready to ship
                    </div>
                </div>
                <div className="sm:col-span-12 md:col-span-9  text-base">
                    <div className='grid grid-cols-1  gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
                        <div>
                            <p className='font-medium text-zinc-700'>Hightlights</p>
                            <ol className='mt-3 text-zinc-700 list-disc list-inside '>
                                <li>Wireless Charging</li>
                                <li>TPU shock absorption</li>
                                <li>Recyclable Material </li>
                                <li>5 year print warranty</li>
                            </ol>

                        </div>
                        <div>
                            <p className=' font-medium text-zinc-900'>Materials</p>
                            <ol className='mt-3 text-zinc-700 list-disc list-inside '>
                                <li>High-quality, durable material</li>
                                <li>Scratch and fingerprint resistent coating</li>
                            </ol>
                        </div>

                    </div>
                    <div className="mt-8">
                        <div className=" bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                            <div className=" flow-root text-sm">
                                <div className=" flex items-center  justify-between py-1 mt-2">
                                    <p className='text-gray-600'>Base price</p>
                                    <p className='font-medium text-gray-900'>
                                        {formatPrice(BASE_PRICE / 100)}
                                    </p>
                                </div>
                                {finish === 'textured'&&(
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className='text-gray-900'>Texture</p>
                                        <p className='font-medium text-gray-900'>
                                            {formatPrice(PRODUCT_PRICE.finish.textured / 100)}
                                        </p>
                                    </div>
                                )}

                                {material === 'polycarbonate'&&(
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className='text-gray-900'>
                                            Soft polycarbonate material
                                        </p>
                                        <p className='font-medium text-gray-900'>
                                            {formatPrice(PRODUCT_PRICE.material.polycarbonate / 100)}
                                        </p>
                                    </div>
                                )}
                                <div className="my-2 bg-gray-200 h-px"/>
                                <div className="flex items-center justify-between py-1 mt-2">
                                    <p className='text-gray-900'>
                                        Order Total
                                    </p>
                                    <p className='font-medium text-gray-900'>
                                        {formatPrice(totalprice / 100)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end pb-12">
                            <Button disabled={isPending} isLoading={isPending} loadingText="Redirecting" className='px-4 sm:px-6 lg:px-8' onClick={()=>handleCheckout()}>
                                Check out
                                <ArrowRight className='h-4 w-4 ml-1.5 inline'/>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default DesignPreview