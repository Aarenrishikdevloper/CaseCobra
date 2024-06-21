'use server'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {db} from "../../../db";

export const getAuthStatus = async ()=>{
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user?.id || !user.email){
        throw new Error('Invalid User data');
    }
    const existinguser  = await db.user.findFirst({
        where:{id:user.id}
    })
    if(!existinguser){
        await db.user.create({
            data:{
                id:user.id,
                email:user.email
            }
        })
    }
    return{sucess:true}

}