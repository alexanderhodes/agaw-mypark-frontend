export interface ParkingSpace {
  id: string;
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
  privateEmail?: string;
  parkingSpace?: ParkingSpace;
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

export interface Problem {
  id: string;
  date: Date;
  reason: string;
  parkingSpace: ParkingSpace;
  user: User;
}

export interface SeriesBooking {
  id: string;
  user: User;
  active: boolean;
  time: string;
  weekday: number;
}

export interface Absence {
  id: string;
  user: User;
  start: Date;
  end: Date;
}

export interface SeriesAbsence {
  id: string;
  user: User;
  active: boolean;
  weekday: number;
}

export interface UserAdmin {
  user: User;
  admin: boolean;
}

export interface ParkingSpaceUser {
  parkingSpace: ParkingSpace;
  user: User;
}
