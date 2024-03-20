export interface User {
  fullName: string;
  id: string;
  phoneNumber: string;
  securityQuestion: string;
}

export interface Record {
  id: string;
  link?: string;
  name: string;
  password: string;
  userIdentifier: string;
}
