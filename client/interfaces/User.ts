export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  knownAs?: string;
  gender?: string;
  birthDate?: Date;
  homeTown?: string;
  status?: string;
  aboutMe?: string;
  hobbies?: string[];
  occupation?: string;
  originCountry?: string;
  events?: { _id: string }[];
  following?: {
    firstName: string;
    lastName: string;
    photos: string[];
    _id: string;
  }[];
  followers?: {
    firstName: string;
    lastName: string;
    photos: string[];
    _id: string;
  }[];
  photos?: string[];
  interests?: string[];
}
