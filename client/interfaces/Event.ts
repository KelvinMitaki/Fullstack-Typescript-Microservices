export interface Event {
  _id: string;
  name: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  date: string;
  cancelled?: boolean;
  attendees: string[];
  user: {
    createdAt: string;
    name: string;
    photos: string[];
    updatedAt: string;
    version: number;
    _id: string;
  };
}
