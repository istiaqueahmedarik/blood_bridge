import { get_with_token } from '@/app/actions/req'
import InventoryPage from '@/components/Inventory'
import React from 'react'


async function page() {
    const res = await get_with_token('institute/auth/inventory');
    console.log(res);
    return (
        <div>
            <InventoryPage inventory={res.data} />
        </div>
    )
}

export default page