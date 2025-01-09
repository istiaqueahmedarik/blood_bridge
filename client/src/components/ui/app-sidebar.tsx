import { Calendar, ClockAlert, Headset, Home, Inbox } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

const items = [
    {
        title: "Home",
        url: "/donor",
        icon: Home,
        type: 'active'
    },
    {
        title: "Inbox",
        url: "/donor/inbox/me",
        icon: Inbox,

    },
    {
        title: "Add Appointment",
        url: "/donor/appoint",
        icon: Calendar,
    },
    {
        title: "Emergency",
        url: "/donor/emergency",
        icon: ClockAlert,
    },

]

export function AppSidebar({ title }: { title: string }) {

    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarHeader className="">
                        <Image src="/logo.svg" alt="Blood donation" width={40} height={40} />
                    </SidebarHeader>
                    <SidebarGroupLabel className="text-xl">{title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item: {
                                title: string;
                                url: string;
                                icon: React.ComponentType;
                                type?: string;
                            }) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={item.type === 'active'}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/contact">
                                <Headset />
                                <span>Contact Us</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
