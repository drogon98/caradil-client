import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  role: number;
  userId: number;
}

export interface TripDatesObj {
  start_date: number | null;
  start_time: string;
  end_date: number | null;
  end_time: string;
}
