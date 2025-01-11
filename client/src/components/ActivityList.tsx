import { ScrollArea } from '@/components/ui/scroll-area'

type Activity = {
    id: number
    type: string
    date: string
    details: string
}

const activities: Activity[] = [
    { id: 1, type: 'Donation', date: '2024-03-15', details: 'Donated blood at BD Blood Bank' },
    { id: 2, type: 'Donation', date: '2024-07-05', details: 'Donated blood at BD Blood Bank' },
    { id: 3, type: 'Donation', date: '2024-10-25', details: 'Donated blood at BD Blood Bank' },
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

