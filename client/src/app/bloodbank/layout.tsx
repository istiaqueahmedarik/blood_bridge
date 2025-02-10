import { AppSidebar } from '@/components/ui/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { HeartHandshake, Home, Refrigerator, Syringe, TestTubeDiagonal, UploadIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'
import LabReports from '@/components/LabReports';
import LogTab from '@/components/LogTab';
import { check_type } from '../actions/general';

const items = [
  {
    title: "Home",
    url: "/bloodbank",
    icon: Home,
    type: 'active'
  },
  {
    title: "Upload Report",
    url: "/bloodbank/update",
    icon: UploadIcon,
  },
  {
    title: "Donation Requests",
    url: "/bloodbank/requests",
    icon: HeartHandshake,
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
    title: "Test Request",
    url: "/bloodbank/test_req",
    icon: TestTubeDiagonal,
  },
]


export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const type = await check_type();
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
                    <div className="text-xl sm:text-2xl font-extrabold">Crimson Care Blood Bank</div>
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
            <Suspense fallback={<div>Loading...</div>}>
              <LogTab />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
      <div className='h-20'></div>
    </SidebarProvider>
  )
}
