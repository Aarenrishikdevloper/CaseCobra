
import { notFound } from 'next/navigation';
import React from 'react'
import { db } from '../../../../db';
import DesignPreview from './DesignPreview';
interface pageProps{
  searchParams:{
    [key:string]:string | string[] | undefined; 
  }
}

const Page = async({searchParams}:pageProps) => {
  const{id} = searchParams;
  if(!id || typeof id !== 'string'){
    return notFound();
  } 
  const configuration = await db.configuration.findUnique({where:{id}}); 
  if(!configuration) return notFound(); 
  return (
    <DesignPreview configuration={configuration}/>
  )
}

export default Page