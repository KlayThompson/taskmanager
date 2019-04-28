
export enum IdentityType {
  IdCard = 0,
  Insurance,
  Passport,
  Military,
  Other
}

export interface Identity {
  identityNo: string;
  identityType: IdentityType;
}

export interface Address {
  province: string;
  city: string;
  district: string;
  street: string;
}

export interface User {
  id?: number;
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  projectIds?: string[];
  taskIds?: string[];
  address?: Address;
  dateOfBirth?: string;
  identity?: Identity;
}
