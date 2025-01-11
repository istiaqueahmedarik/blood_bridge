import { ScrollArea } from "@/components/ui/scroll-area"

export const LogEntries = () => {
  const logEntries = [
    { id: 1, timestamp: '2023-05-10 09:15:00', event: 'Emergency request submitted' },
    { id: 2, timestamp: '2023-05-10 09:17:30', event: 'Request acknowledged by Ariful' },

  ]

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {logEntries.map((entry) => (
          <div key={entry.id} className="flex items-center space-x-4 p-2 rounded-md hover:bg-accent">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium">{entry.event}</p>
              <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

