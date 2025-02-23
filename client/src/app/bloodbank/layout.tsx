import { AppSidebar } from '@/components/ui/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Calendar1Icon, HeartHandshake, Home, MessageCircleIcon, Refrigerator, Syringe, TestTubeDiagonal, UploadIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'
import LabReports from '@/components/LabReports';
import LogTab from '@/components/LogTab';
import { check_type } from '../actions/general';
import { get_with_token } from '../actions/req';
import { ActivityList } from '@/components/ActivityList';

const items = [
  {
    title: "Home",
    url: "/bloodbank",
    icon: Home,
    type: 'active'
  },
  {
    title: "Donation Requests",
    url: "/bloodbank/requests",
    icon: HeartHandshake,
  },
  {
    title: "Events",
    url: "/bloodbank/future",
    icon: Calendar1Icon,
  },
  {
    title: "Upload Report",
    url: "/bloodbank/update",
    icon: UploadIcon,
  },

  {
    title: "Inventory",
    url: "/bloodbank/inventory",
    icon: Refrigerator,
  },
  {
    title: "Offer",
    url: "/bloodbank/blood",
    icon: Syringe,
  },
  {
    title: "Inbox",
    url: "/bloodbank/inbox",
    icon: MessageCircleIcon,
  },
]


export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const type = await check_type();
  const res = (await get_with_token('institute/auth/institute_details')).Institute;

  if (type !== 'bloodbank')
    return <div>Not authorized</div>
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen} className='font-[family-name:var(--font-poppins)]'>
      <AppSidebar title='Blood Bank' items={items} />

      <SidebarInset className='px-2'>
        <div className='flex flex-col lg:flex-row auto-cols-min flex-1 gap-4'>
          <div className='w-full lg:max-w-[70vw] border-r-2 min-h-[calc(100svh-theme(spacing.4))]'>
            <header className="flex flex-col sm:flex-row h-auto sm:h-22 shrink-0 items-center gap-2 border-b bg-background px-4 py-6">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <div className="flex flex-col sm:flex-row w-full items-center justify-between">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-extrabold">
                      {res.Full_name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Explore your dashboard!
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className='p-2'>
              {children}
            </div>
          </div>
          <div className='flex flex-col auto-cols-min gap-4 w-full lg:w-auto transition-all'>
            <LabReports />
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-input"></div>
              <span className="flex-shrink mx-4">Notification</span>
              <div className="flex-grow border-t border-input"></div>
            </div>
            <ActivityList />
          </div>
        </div>
      </SidebarInset>
      <div className='h-20'></div>
    </SidebarProvider>
  )
}
