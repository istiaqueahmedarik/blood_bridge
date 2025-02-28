import { get_with_token } from "@/app/actions/req"
import type React from "react"
import Userlist from "@/components/Userlist"

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const allUser = await get_with_token("inbox/api/auth/inbox", false)



    return (
        <div className="flex h-[80vh] bg-gray-100 dark:bg-gray-900">
            <Userlist allUser={allUser} type="bloodbank" />
            <main className="flex-1 flex flex-col">{children}</main>
        </div>
    )
}

