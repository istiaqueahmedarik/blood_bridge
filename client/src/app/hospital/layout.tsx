import { AppSidebar } from '@/components/ui/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { HeartHandshake, Home, MessageCircleIcon, MessageCircleWarningIcon, Syringe } from 'lucide-react';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'
import { BloodLog } from '@/components/blood-log';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { ActivityList } from '@/components/ActivityList';
const sampleLogs: { type: 'request' | 'accepted' | 'offer'; message: string; timestamp: string; }[] = [
  { type: 'request', message: 'Blood request: A+ needed urgently', timestamp: '2 minutes ago' },
  { type: 'accepted', message: 'Blood donation accepted: B- received', timestamp: '10 minutes ago' },
  { type: 'offer', message: 'New offer created: O- available', timestamp: '1 hour ago' },
  { type: 'request', message: 'Blood request: AB+ needed for surgery', timestamp: '2 hours ago' },
  { type: 'accepted', message: 'Blood donation accepted: A+ received', timestamp: '3 hours ago' },
  { type: 'offer', message: 'New offer created: B+ available', timestamp: '4 hours ago' },
]
const items = [
  {
    title: "Home",
    url: "/hospital",
    icon: Home,
    type: 'active'
  },
  {
    title: "Request Blood",
    url: "/hospital/request",
    icon: HeartHandshake,
  },
  {
    title: "Inbox",
    url: "/hospital/inbox",
    icon: MessageCircleIcon,
  },
  {
    title: "Offer",
    url: "/hospital/offer",
    icon: Syringe,
  },
  {
    title: "Status",
    url: "/hospital/requested",
    icon: InfoCircledIcon,
  },
  {
    title: "Emergency",
    url: "/hospital/emergency",
    icon: MessageCircleWarningIcon,
  },
]

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen} className='font-[family-name:var(--font-poppins)]'>
      <AppSidebar title='Medical Dashboard' items={items} />
      <SidebarInset className='px-2'>
        <div className='flex flex-col lg:flex-row auto-cols-min flex-1 gap-4'>
          <div className='w-full lg:max-w-[70vw] border-r-2 min-h-[calc(100svh-theme(spacing.4))]'>
            <header className="flex flex-col sm:flex-row h-auto sm:h-22 shrink-0 items-center gap-2 border-b bg-background px-4 py-6">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <div className="flex flex-col sm:flex-row w-full items-center justify-between">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-extrabold">Dhaka Medical College, Dhaka</div>
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
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-input"></div>
              <span className="flex-shrink mx-4">Activity</span>
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