import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

type Activity = {
    id: number
    type: string
    date: string
    details: string
}

const activities: Activity[] = [
    { id: 1, type: 'Donation', date: '2024-03-15', details: 'Donated blood at City Hospital' },
    { id: 2, type: 'Appointment', date: '2024-03-20', details: 'Scheduled next donation' },
    { id: 3, type: 'Achievement', date: '2024-03-10', details: 'Reached 5 donations milestone' },
    { id: 4, type: 'Education', date: '2024-03-05', details: 'Attended blood type seminar' },
    { id: 5, type: 'Referral', date: '2024-03-01', details: 'Referred a friend for donation' },
]

export function ActivityList() {
    return (
        <ScrollArea className="h-[calc(65svh-theme(spacing.4))] w-full">
            <ul className="space-y-4 p-4">
                {activities.map((activity) => (
                    <li key={activity.id} className="flex items-start space-x-4 bg-background p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">
                                {activity.date.split('-')[2]}
                            </span>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold mb-1">{activity.type}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{activity.details}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </ScrollArea>
    )
}

