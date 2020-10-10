export interface Event {
  _id: string;
  name: string;
  category: string;
  description: string;
  city: string;
  town: string;
  date: string;
  cancelled?: boolean;
  attendees: { _id: string; photos: string[]; name: string }[];
  user: {
    createdAt: string;
    name: string;
    photos: string[];
    updatedAt: string;
    version: number;
    _id: string;
  };
}
