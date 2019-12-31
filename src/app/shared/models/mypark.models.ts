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
  id: string;
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

export interface Booking {
  id: string;
  user: User;
  parkingSpace: ParkingSpace;
  date: Date;
  bookingStatus: BookingStatus;
}

export interface BookingStatus {
  id: number;
  name: string;
  color: string;
}
