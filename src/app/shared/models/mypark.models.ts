
export interface ParkingSpace {
    number: number;
    parkingSpaceStatus: ParkingSpaceStatus;
}

export interface ParkingSpaceStatus {
    id: number;
    name: string;
    color: string;
}

export interface Authentication {
  token: string;
  expiration: number;
}
