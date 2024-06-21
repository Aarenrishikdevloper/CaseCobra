'use server';
import { CaseColor, CaseMaterial, Finish, PhoneModel } from "@prisma/client"
import { db } from "../../../../db"

export type SaveConfigArgs={
    color:CaseColor 
    finish:Finish 
    material: CaseMaterial 
    model: PhoneModel 
    configId: string
}

export  async function saveConfig({color, finish, material, model, configId}:SaveConfigArgs){
    await db.configuration.update({where:{id:configId}, data:{color, finish, material, model}});    
}