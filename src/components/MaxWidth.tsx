import { cn } from '@/lib/utils'
import React from 'react'

const MaxWidth = ({children, classname}:{children:React.ReactNode, classname?:string}) => {
  return (
    <div className={cn('h-full mx-auto max-w-screen-xl px-2.5  md:px-20', classname)}>
        {children}
    </div>
  )
}

export default MaxWidth