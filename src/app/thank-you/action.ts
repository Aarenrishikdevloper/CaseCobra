'use server'

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {db} from "../../../db";
import {retryUntil} from "effect/STM";

export const getPaymentStatus  = async({orderId}:{orderId:string})=>{
    const{getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user?.id || !user.email){
        throw new Error("You need to be logged in");
    }
    const order  = await db.order.findFirst({
        where:{id:orderId, userId:user.id} ,
        include:{
            billingAddress:true,
            configuration:true,
            ShippingAddress:true,
            user:true

        }
    })
    if(!order) throw new Error("This order does not exists")
    if(order.ispaid){
        return order
    }else{
        return false
    }

}