import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'


async function page() {
    async function formAction() {
        'use server';

        (await cookies()).delete('token')

        redirect('/')

    }
    return (

        <Button formAction={formAction} className='max-w-xl' variant={'default'}>
            Logout
        </Button>

    )
}

export default page