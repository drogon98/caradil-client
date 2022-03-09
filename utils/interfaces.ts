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

export interface HostPlansData {
  title: string;
  monthlyPrice: number;
  annuallyPrice: number;
  carCount: number | string;
  isPopular?: boolean;
  price?: number;
}
