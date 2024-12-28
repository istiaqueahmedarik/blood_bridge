
import React from 'react'



const page =async({params}:Readonly<{ params: { id: string } }>) => {
    const id = (await params).id;

    return (
    <div>
        {id}
    </div>
  )
}

export default page