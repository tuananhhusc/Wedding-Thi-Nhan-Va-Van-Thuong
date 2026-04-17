import { WeddingCalendarEventDef } from "./wedding-calendar-events";

/**
 * Generate a Google Calendar link for an event.
 */
export function getGoogleCalendarUrl(event: WeddingCalendarEventDef): string {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const params = new URLSearchParams({
    text: event.summary,
    details: `${event.description}\n\nXem thêm tại: ${event.url || ""}`,
    location: event.location,
    dates: `${event.dtStartUtc}/${event.dtEndUtc}`,
  });
  return `${base}&${params.toString()}`;
}

/**
 * For Apple/ICS, we usually point to the .ics file.
 * But we can also generate a data URI or a dedicated route.
 */
export function getIcsUrl(eventId: string): string {
  // Using the API route we created, but making sure it's absolute
  // In Vercel, relative paths work fine.
  return `/api/calendar/${eventId}`;
}
