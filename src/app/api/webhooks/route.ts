import {headers} from "next/headers";
import {stripe} from "@/lib/stripe";
import Stripe from "stripe";
import {db} from "../../../../db";
import {NextResponse} from "next/server";
import  nodemailer from 'nodemailer'

import OrderEmail from "@/components/email/OrderEmail";
import {render} from '@react-email/render'





export async function POST(req:Request){
    try{
        const body = await req.text();
        const signature = headers().get('stripe-signature');
        if(!signature){
            return new Response("Invalid signature",{status:400})
        }
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
        if(event.type === "checkout.session.completed"){
            if(!event.data.object.customer_details?.email){
                throw new Error("Miissing customer email")
            }
            const session = event.data.object as Stripe.Checkout.Session;
            const {userId, orderId} = session.metadata || {
                userId:null,
                orderId:null
            }
            if(!userId || !orderId){
                throw new Error('Invalid request metadata')
            }
            const billingAddress = session.customer_details!.address
            const shippingAdress  = session.shipping_details!.address

            const updateorder = await db.order.update({
                where:{id:orderId},
                data:{
                    ispaid:true,
                    ShippingAddress:{
                        create:{
                            name:session.customer_details!.name!,
                            city:shippingAdress!.city!,
                            country:shippingAdress!.country!,
                            postalCode:shippingAdress!.postal_code!,
                            street:shippingAdress!.line1!,
                            state:shippingAdress!.state!,
                            phonenumber:session.customer_details!.phone!,

                        }
                    },
                    billingAddress:{
                        create:{
                            name:session.customer_details!.name!,
                            city:billingAddress!.city!,
                            country:billingAddress!.country!,
                            postalCode:billingAddress!.postal_code!,
                            street:billingAddress!.line1!,
                            state:billingAddress!.state!,
                            phonenumber:session.customer_details!.phone!,

                        }
                    }

                }
            })
            
            const trsnsporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.EMAIL_SEND,
                    pass:process.env.pass,
                }    
            }) 
         

        const mailOptions = {
            from:'CaseCobra <casecobra6@gmail.com>' ,
            to: event.data.object.customer_details.email,
            subject: "Thanks for the Order",
            html:render(OrderEmail({orderId, orderDate:updateorder.createdAt.toLocaleDateString(), shippingAdress:{
                name:session.customer_details!.name!,
                city:billingAddress!.city!,
                country:billingAddress!.country!,
                postalCode:billingAddress!.postal_code!,
                street:billingAddress!.line1!,
                state:billingAddress!.state!,
                phonenumber:session.customer_details!.phone!,  
                id:''

            }})) ,
          };
          trsnsporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
            }else{
                console.log("Sucessfull email" + info);
            }
          })
          

            return  NextResponse.json({result:event, ok:true})
        }
    }catch (e) {
        console.log(e)
        return NextResponse.json({message:"Something went wrong", ok: false},{status:400})
    }
}