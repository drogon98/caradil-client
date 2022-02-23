import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  role: number;
  userId: number;
}

export interface TripDatesObj {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}
