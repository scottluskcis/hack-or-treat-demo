export type EventCategory = "Workshop" | "Social" | "Entertainment";

export type CampusEvent = {
  id: string;
  title: string;
  time: string;
  location: string;
  category: EventCategory;
  description: string;
};
