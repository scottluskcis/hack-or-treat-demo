import { CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CampusEvent } from "@/types/event";

type EventCardProps = {
  event: CampusEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="h-full transition-colors hover:border-orange-300/40">
      <CardContent className="flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <Badge>{event.category}</Badge>
          <span className="text-xs font-medium tracking-wide text-violet-200">OCT 31</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-tight text-white">{event.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{event.description}</p>
        </div>
        <dl className="flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="size-4 text-orange-200" />
            <dt className="sr-only">Time</dt>
            <dd>{event.time}</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4 text-orange-200" />
            <dt className="sr-only">Location</dt>
            <dd>{event.location}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
