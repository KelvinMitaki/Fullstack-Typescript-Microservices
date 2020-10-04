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
  following?: { [key: string]: string }[];
  followers?: { [key: string]: string }[];
  photos?: string[];
  interests?: string[];
}
