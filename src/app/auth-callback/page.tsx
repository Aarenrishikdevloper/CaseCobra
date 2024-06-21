'use client';


import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getAuthStatus} from "@/app/auth-callback/action";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";

const Page = () => {
    const[configId, setconfigId] = useState<string | null>(null)
    useEffect(() => {
        const configurationId  = localStorage.getItem('configurationId');
        if(configurationId) setconfigId(configurationId);
    }, []);
    const{data} = useQuery({
        queryKey:['auth-callback'],
        queryFn: async()=> await getAuthStatus(),
        retry:true,
        retryDelay:500
    })
    const router = useRouter();
    if(data?.sucess){
        if(configId){
            localStorage.removeItem('configurationId')
            router.push(`/configure/preview?id=${configId}`);
        }else{
            router.push('/')
        }
    }
    return(
        <div className={' w-full mt-24 flex justify-center'}>
            <div className={'flex flex-col items-center gap-2'}>
                <Loader2  className={'h-8 w-8 animate-spin text-zinc-600'}/>
                <h3 className={'font-semibold text-xl'}>
                    Logging In ....
                </h3>
                <p>You will be redirectly automatically</p>

            </div>

        </div>
    )

}
export default Page