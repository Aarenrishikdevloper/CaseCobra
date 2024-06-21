import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import Image from "next/image";
import type {Dispatch, SetStateAction} from "react";
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs";
import {buttonVariants} from "@/components/ui/button";
const LoginModel = ({isOpen, setOpen}:{isOpen:boolean, setOpen:Dispatch<SetStateAction<boolean>> }) => {
    return(
        <Dialog onOpenChange={setOpen} open={isOpen}>

            <DialogContent className={'absolute z-[99999] '}>
                <DialogHeader>
                    <div className={'relative mx-auto w-24 h-24 mb-2'}>
                        <Image src={"/snake-1.png"} alt={'logo'} className={'object-contain'} fill/>

                    </div>
                    <DialogTitle className={'text-3xl text-center font-bold tracking-tight text-gray-900'}>Log in to continue</DialogTitle>
                    <DialogDescription className={'text-base text-center py-2'}>
                        <span className={' font-medium text-zinc-900'}>
                            Your configuration was saved!
                        </span>{' '}
                        Please login or create account to complete purchase


                    </DialogDescription>
                </DialogHeader>
                <div className={'grid grid-cols-2 gap-6 divide-x divide-gray-200'}>
                    <LoginLink className={buttonVariants({variant: 'outline'})}>
                        Login
                    </LoginLink>
                    <RegisterLink className={buttonVariants({variant: 'default'})}>
                        Sign Up
                    </RegisterLink>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default  LoginModel