/* eslint-disable @typescript-eslint/no-explicit-any */
import { get_with_token } from '@/app/actions/req'
import { ScrollArea } from '@/components/ui/scroll-area'





export async function ActivityList() {
    const get_log = (await get_with_token('donor/auth/user_log')).user_log;
    if (get_log.length == 0) return <div>
        <p className="text-muted-foreground text-center mt-4">No Activity Found</p>
    </div>
    return (
        <ScrollArea className="max-h-[calc(40svh-theme(spacing.4))] w-full">
            <ul className="space-y-4 p-4">
                {get_log.map((activity: any) => (
                    <li key={activity['ID']} className="flex items-start space-x-4 bg-background p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">
                                {new Date(activity['created_at']).getDate()}
                            </span>
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-2">
                                {activity['Text'].split(' ').length > 10
                                    ? activity['Text'].split(' ').slice(0, 10).join(' ') + '...'
                                    : activity['Text']}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </ScrollArea>
    )
}

