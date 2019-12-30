
export interface ParkingSpace {
    number: string;
    parkingSpaceStatus?: ParkingSpaceStatus;
}

export interface ParkingSpaceStatus {
    id: number;
    name: string;
    color: string;
}

export interface User {
  id: number;
  name: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface Authentication {
  token: string;
  expiration: number;
  roles: Array<string>;
  username: string;
}
