import { CardFooter } from '@/components/ui/card'
import React from 'react'

function layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
        
    </div>
  )
}

export default layout