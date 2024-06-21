'use server'

import {db} from "../../../../db";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {BASE_PRICE, PRODUCT_PRICE} from "@/config/product";
import {Order} from "@prisma/client";
import {stripe} from "@/lib/stripe";

export const createCheckOutSession = async({configId}:{configId:string})=>{
    const configuration  = await db.configuration.findUnique({
        where:{id:configId}
    })
    if(!configuration){
        throw new Error("No such configuration exists ");
    }
    const {getUser} = getKindeServerSession();
    const user  = await getUser();
    if(!user) throw new Error("No User Exist");
    const {finish, material } = configuration
    let price = BASE_PRICE
    if(finish === 'textured') price += PRODUCT_PRICE.finish.textured;
    if(material === 'polycarbonate') price += PRODUCT_PRICE.material.polycarbonate;
    let order: Order | undefined = undefined;
    const existingOrder = await db.order.findFirst({
        where:{
            userId:user.id,
            configurationId:configuration.id
        }
    })
    if(existingOrder){
        order = existingOrder;
    } else{

        order  = await db.order.create({
            data:{
                amount:price / 100,
                userId:user.id,
                configurationId:configuration.id,

            }
        })
    }
    const product =  await stripe.products.create({
        name: 'Custom iPhone Case',
        images:[configuration.imageUrl],
        default_price_data:{
            currency:'INR',
            unit_amount:price
        }

    })

    // @ts-ignore
    const stripesession = await stripe.checkout.sessions.create({
        success_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
            payment_method_types:['card'],
        mode:'payment',
            shipping_address_collection:{allowed_countries:['IN', "NA"]},
            phone_number_collection:{enabled:'true'},
        metadata:{
            userId:user.id,
            orderId:order.id
        },
        line_items:[{price:product.default_price as string, quantity: 1}]
        }

    )
    return {url: stripesession.url}



}