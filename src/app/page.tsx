import { EventBrowser } from "@/components/event-browser";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#100d1b]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.18),_transparent_55%)]"
      />
      <div className="relative z-10">
        <EventBrowser />
      </div>
    </div>
  );
}
