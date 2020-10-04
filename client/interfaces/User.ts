export interface User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  description?: string;
  knownAs?: string;
  gender?: string;
  birthDate?: Date;
  homeTown?: string;
  status?: string;
  aboutMe?: string;
  hobbies?: string[];
  occupation?: string;
  originCountry?: string;
  events?: { [key: string]: string }[];
  following?: { [key: string]: string }[];
  followers?: { [key: string]: string }[];
  photos?: string[];
  interests?: string[];
}
