import {useEffect, useRef, useState} from "react";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {cn} from "@/lib/utils";

const PhonePreview = ({croppedImage, color}:{croppedImage:string, color:string}) => {
    const ref = useRef<HTMLDivElement>(null)
    const[renderedDimensions, setrenderedDimensions] = useState({
        height:0,
        width:0
    })
    const handleresize = ()=> {
        if(!ref?.current) return
        const{width, height}= ref.current.getBoundingClientRect();
        setrenderedDimensions({width, height})
    }
    useEffect(() => {
        handleresize();
        window.addEventListener('resize', handleresize)
        return () => {
            window.removeEventListener('resize', handleresize)
        }
    }, [ref.current]);
    let casebackground = 'bg-zinc-950';
    if(color === 'blue') casebackground = 'bg-blue-950'
    if(color === 'rose') casebackground = 'bg-rose-950'
    return(
        <AspectRatio ref={ref} ratio={3000/2001} className={'relative'}>
            <div className={'absolute z-20 scale-[1.0352]'} style={{
                left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
                top:  renderedDimensions.height / 6.22
            }}>
                <img width={renderedDimensions.width / (3000 / 637)} src={croppedImage} className={cn('phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]', casebackground)}/>


            </div>
            <div className={'relative h-full w-full z-40'}>
                <img alt={"phone"} src={'/clearphone.png'} className={'pointer-events-none h-full w-full antialiased rounded-md'}/>
            </div>

        </AspectRatio>
    )
}

export default PhonePreview