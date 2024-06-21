import MaxWidth from '@/components/MaxWidth'
import Step from '@/components/Step'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
   <MaxWidth classname='flex-1 flex flex-col w-full  '>
    <Step/>
      {children}
   </MaxWidth>
  )
}

export default Layout