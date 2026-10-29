import { Sparkles } from "lucide-react";
import Image from "next/image";

import logo from "../../public/hack-or-treat-logo.png";
import { EventCard } from "@/components/event-card";
import { events } from "@/data/events";

export function EventBrowser() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <div className="mx-auto mb-6 max-w-sm rounded-xl bg-orange-50 px-5 py-4">
          <Image
            src={logo}
            alt="Hack or Treat"
            width={1316}
            height={287}
            sizes="(max-width: 424px) calc(100vw - 80px), 344px"
            priority
            className="h-auto w-full"
          />
        </div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-100">
          <Sparkles aria-hidden="true" className="size-4" />
          October 31 · Campus guide
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
          Halloween plans? <span className="text-orange-300">We’ve got the lineup.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
          Find your next Halloween workshop, campus hangout, or not-quite-midnight movie.
        </p>
        <p className="mt-4 text-sm font-medium text-orange-100/90">
          Fictional sample schedule — not an actual campus event listing.
        </p>
      </header>

      <section aria-labelledby="events-heading">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
              The lineup
            </p>
            <h2 id="events-heading" className="mt-1 text-2xl font-bold text-white">
              Explore the lineup
            </h2>
          </div>
          <p className="hidden text-sm text-slate-400 sm:block">All times are campus local time</p>
        </div>
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
