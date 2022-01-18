import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Car = {
  __typename?: 'Car';
  advance_book_period?: Maybe<Scalars['String']>;
  available?: Maybe<Scalars['Boolean']>;
  bags?: Maybe<Scalars['Float']>;
  besties?: Maybe<Array<User>>;
  book_requests?: Maybe<Scalars['Boolean']>;
  booked?: Maybe<Scalars['Boolean']>;
  can_rent_hourly?: Maybe<Scalars['Boolean']>;
  car_has_other_use?: Maybe<Scalars['Boolean']>;
  cars?: Maybe<Trip>;
  categories?: Maybe<Array<Scalars['String']>>;
  color?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  custom_availability?: Maybe<Scalars['Boolean']>;
  custom_availability_data?: Maybe<CustomAvailabilityObj>;
  daily_rate?: Maybe<Scalars['Float']>;
  delivery?: Maybe<Scalars['Boolean']>;
  delivery_rate?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['String']>;
  discount_days?: Maybe<Scalars['Float']>;
  distance_per_day?: Maybe<Scalars['Float']>;
  documents?: Maybe<Array<DocumentObj>>;
  doors?: Maybe<Scalars['Float']>;
  driver_daily_rate?: Maybe<Scalars['Float']>;
  driver_mode?: Maybe<Scalars['Float']>;
  faqs?: Maybe<Scalars['Boolean']>;
  features?: Maybe<Array<FeatureObj>>;
  gas?: Maybe<Scalars['String']>;
  guidelines?: Maybe<Scalars['Boolean']>;
  has_driver?: Maybe<Scalars['Boolean']>;
  has_unlimited_distance?: Maybe<Scalars['Boolean']>;
  hourly_rate?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  luxury_vip_services?: Maybe<Array<Scalars['String']>>;
  make?: Maybe<Scalars['String']>;
  manual_transmission_test?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  odometer_reading?: Maybe<Scalars['Float']>;
  offer_bulk_hire?: Maybe<Scalars['Boolean']>;
  owner?: Maybe<User>;
  owner_id?: Maybe<Scalars['Float']>;
  photos?: Maybe<Array<FileObj>>;
  reg_no?: Maybe<Scalars['String']>;
  reviews?: Maybe<Scalars['Boolean']>;
  seats?: Maybe<Scalars['Float']>;
  transmission?: Maybe<Scalars['String']>;
  trips?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  verification_in_progress?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type CarAddEditResponse = {
  __typename?: 'CarAddEditResponse';
  car?: Maybe<Car>;
  carId?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type CarAvailabilityInput = {
  advance_book_period: Scalars['String'];
  available: Scalars['Boolean'];
  car_has_other_use: Scalars['Boolean'];
  custom_availability: Scalars['Boolean'];
  custom_availability_data?: InputMaybe<CustomAvailabilityDataInput>;
};

export type CarCategoriesInput = {
  categories: Array<Scalars['String']>;
  luxury_and_vip_services: Array<Scalars['String']>;
};

export type CarDescriptionInput = {
  description: Scalars['String'];
};

export type CarDistanceInput = {
  distance_per_day: Scalars['Float'];
  has_unlimited_distance: Scalars['Boolean'];
};

export type CarDocumentsInput = {
  documents: Array<DocumentInput>;
};

export type CarDriverAndDeliveryInput = {
  delivery: Scalars['Boolean'];
  driver_mode: Scalars['Float'];
  manual_transmission_test: Scalars['Boolean'];
};

export type CarFeaturesInput = {
  color: Scalars['String'];
  doors: Scalars['Float'];
  features: Array<FeatureInput>;
  gas: Scalars['String'];
  seats: Scalars['Float'];
  transmission: Scalars['String'];
};

export type CarGeneralInfoInput = {
  make: Scalars['String'];
  name: Scalars['String'];
  odometer_reading: Scalars['Float'];
  reg_no: Scalars['String'];
};

export type CarLocationAndDeliveryInput = {
  delivery: Scalars['Boolean'];
  location: Scalars['String'];
};

export type CarPhotosInput = {
  photos: Array<FileInput>;
};

export type CarRatesInput = {
  daily_rate: Scalars['Float'];
  delivery_rate?: InputMaybe<Scalars['Float']>;
  discount?: InputMaybe<Scalars['String']>;
  discount_days?: InputMaybe<Scalars['Float']>;
  driver_daily_rate?: InputMaybe<Scalars['Float']>;
  hourly_rate: Scalars['Float'];
};

export type CarResponse = {
  __typename?: 'CarResponse';
  car?: Maybe<Car>;
  error?: Maybe<Scalars['String']>;
};

export type ContactInput = {
  email: Scalars['String'];
  message: Scalars['String'];
  subject: Scalars['String'];
};

export type ContactResponse = {
  __typename?: 'ContactResponse';
  success: Scalars['Boolean'];
};

export type CreateTripResponse = {
  __typename?: 'CreateTripResponse';
  success: Scalars['Boolean'];
  tripId?: Maybe<Scalars['Float']>;
};

export type CustomAvailabilityDataInput = {
  endDate?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
};

export type CustomAvailabilityObj = {
  __typename?: 'CustomAvailabilityObj';
  endDate?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
};

export type DocumentInput = {
  file: FileInput;
  title: Scalars['String'];
};

export type DocumentObj = {
  __typename?: 'DocumentObj';
  file?: Maybe<FileObj>;
  title?: Maybe<Scalars['String']>;
};

export type DriverIsApprovedResponse = {
  __typename?: 'DriverIsApprovedResponse';
  approved?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  notApprovedReason?: Maybe<Scalars['String']>;
};

export type EditProfileInput = {
  avatar?: InputMaybe<FileInput>;
  business_name?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  user_name?: InputMaybe<Scalars['String']>;
};

export type FeatureInput = {
  title: Scalars['String'];
};

export type FeatureObj = {
  __typename?: 'FeatureObj';
  title?: Maybe<Scalars['String']>;
};

export type FileInput = {
  public_id: Scalars['String'];
  secure_url: Scalars['String'];
  url: Scalars['String'];
};

export type FileObj = {
  __typename?: 'FileObj';
  public_id?: Maybe<Scalars['String']>;
  secure_url?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Make = {
  __typename?: 'Make';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Float']>;
  photo?: Maybe<FileObj>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MakeInput = {
  photo: FileInput;
  title: Scalars['String'];
};

export type MakeResponse = {
  __typename?: 'MakeResponse';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addEditCarGeneralInfo: CarAddEditResponse;
  addMake: MakeResponse;
  contact: ContactResponse;
  createTrip: CreateTripResponse;
  deleteUpload: Scalars['Boolean'];
  editCarAvailability: CarAddEditResponse;
  editCarCategories: CarAddEditResponse;
  editCarDescription: CarAddEditResponse;
  editCarDistance: CarAddEditResponse;
  editCarDocuments: CarAddEditResponse;
  editCarDriverAndDelivery: CarAddEditResponse;
  editCarFeatures: CarAddEditResponse;
  editCarLocationAndDelivery: CarAddEditResponse;
  editCarPhotos: CarAddEditResponse;
  editCarRates: CarAddEditResponse;
  editCarVerificationInProgress: Scalars['Boolean'];
  editCarVerified: Scalars['Boolean'];
  editProfile: Scalars['Boolean'];
  login: TokenResponse;
  register: TokenResponse;
  revokeUserRefreshToken: Scalars['Boolean'];
  singleUpload: UploadedFileResponse;
  updateFavourite: UpdateFavouriteResponse;
};


export type MutationAddEditCarGeneralInfoArgs = {
  carId?: InputMaybe<Scalars['Float']>;
  input: CarGeneralInfoInput;
  isEdit?: InputMaybe<Scalars['Boolean']>;
};


export type MutationAddMakeArgs = {
  input: MakeInput;
};


export type MutationContactArgs = {
  input: ContactInput;
};


export type MutationCreateTripArgs = {
  input: TripInput;
};


export type MutationDeleteUploadArgs = {
  publicId: Scalars['String'];
};


export type MutationEditCarAvailabilityArgs = {
  carId: Scalars['Float'];
  input: CarAvailabilityInput;
};


export type MutationEditCarCategoriesArgs = {
  carId: Scalars['Float'];
  input: CarCategoriesInput;
};


export type MutationEditCarDescriptionArgs = {
  carId: Scalars['Float'];
  input: CarDescriptionInput;
};


export type MutationEditCarDistanceArgs = {
  carId: Scalars['Float'];
  input: CarDistanceInput;
};


export type MutationEditCarDocumentsArgs = {
  carId: Scalars['Float'];
  input: CarDocumentsInput;
};


export type MutationEditCarDriverAndDeliveryArgs = {
  carId: Scalars['Float'];
  input: CarDriverAndDeliveryInput;
};


export type MutationEditCarFeaturesArgs = {
  carId: Scalars['Float'];
  input: CarFeaturesInput;
};


export type MutationEditCarLocationAndDeliveryArgs = {
  carId: Scalars['Float'];
  input: CarLocationAndDeliveryInput;
};


export type MutationEditCarPhotosArgs = {
  carId: Scalars['Float'];
  input: CarPhotosInput;
};


export type MutationEditCarRatesArgs = {
  carId: Scalars['Float'];
  input: CarRatesInput;
};


export type MutationEditCarVerificationInProgressArgs = {
  carId: Scalars['Float'];
};


export type MutationEditCarVerifiedArgs = {
  carId: Scalars['Float'];
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRevokeUserRefreshTokenArgs = {
  userId: Scalars['Int'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdateFavouriteArgs = {
  carId: Scalars['Float'];
  opType: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cars: Array<Car>;
  checkIfDriverIsApprovedToDrive: DriverIsApprovedResponse;
  getCar: CarResponse;
  getCars: Array<Car>;
  getHostCars: Array<Car>;
  getMyBookings: Array<Trip>;
  getMyTrips: Array<Trip>;
  getPopularCars: Array<Car>;
  getTrip: TripResponse;
  getUnVerifiedCars: Array<Car>;
  getUser: UserResponse;
  makes: Array<Make>;
  trips: Array<Trip>;
  users: Array<User>;
};


export type QueryGetCarArgs = {
  carId: Scalars['Float'];
};


export type QueryGetCarsArgs = {
  input: SearchInput;
};


export type QueryGetTripArgs = {
  tripId: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['Float'];
};

export type SearchInput = {
  car_make?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  color?: InputMaybe<Scalars['String']>;
  gas?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  more_filters?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  access_token?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['String']>;
  channel?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Float']>;
  invoice_no?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  transaction_code?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Trip = {
  __typename?: 'Trip';
  car?: Maybe<Car>;
  car_id?: Maybe<Scalars['Float']>;
  car_owner_id?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['DateTime']>;
  end_date?: Maybe<Scalars['DateTime']>;
  end_time?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  owner?: Maybe<User>;
  owner_id?: Maybe<Scalars['Float']>;
  start_date?: Maybe<Scalars['DateTime']>;
  start_time?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  transaction: Transaction;
  transaction_id?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type TripInput = {
  car_id: Scalars['Float'];
  end_date: Scalars['String'];
  end_time: Scalars['String'];
  start_date: Scalars['String'];
  start_time: Scalars['String'];
  transaction_amount: Scalars['String'];
  transaction_channel: Scalars['String'];
  transaction_code: Scalars['String'];
  transaction_invoice_no: Scalars['String'];
  transaction_order_id: Scalars['String'];
  transaction_status: Scalars['String'];
};

export type TripResponse = {
  __typename?: 'TripResponse';
  error?: Maybe<Scalars['String']>;
  trip?: Maybe<Trip>;
};

export type UpdateFavouriteResponse = {
  __typename?: 'UpdateFavouriteResponse';
  error?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type UploadedFile = {
  __typename?: 'UploadedFile';
  public_id: Scalars['String'];
  secure_url: Scalars['String'];
  url: Scalars['String'];
};

export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  error?: Maybe<Scalars['String']>;
  file?: Maybe<UploadedFile>;
};

export type User = {
  __typename?: 'User';
  approved_to_drive?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<FileObj>;
  business_name?: Maybe<Scalars['String']>;
  cars?: Maybe<Car>;
  created_at?: Maybe<Scalars['DateTime']>;
  driving_license_data?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  favourite_cars?: Maybe<Array<Car>>;
  first_name?: Maybe<Scalars['String']>;
  has_host_badge?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Float']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phone_verified?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['Float']>;
  token_version?: Maybe<Scalars['Float']>;
  trips?: Maybe<Trip>;
  updated_at?: Maybe<Scalars['DateTime']>;
  user_name?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CarInfoFragment = { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined };

export type CarPrivateInfoFragment = { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, odometer_reading?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined };

export type FileInfoFragment = { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined };

export type UserInfoFragment = { __typename?: 'User', id?: number | null | undefined, user_name?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, phone?: string | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined };

export type AddEditCarGeneralInfoMutationVariables = Exact<{
  options: CarGeneralInfoInput;
  isEdit?: InputMaybe<Scalars['Boolean']>;
  carId?: InputMaybe<Scalars['Float']>;
}>;


export type AddEditCarGeneralInfoMutation = { __typename?: 'Mutation', addEditCarGeneralInfo: { __typename?: 'CarAddEditResponse', carId?: number | null | undefined, error?: string | null | undefined, verified?: boolean | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type AddCarMakeMutationVariables = Exact<{
  input: MakeInput;
}>;


export type AddCarMakeMutation = { __typename?: 'Mutation', addMake: { __typename?: 'MakeResponse', success: boolean } };

export type ContactMutationVariables = Exact<{
  input: ContactInput;
}>;


export type ContactMutation = { __typename?: 'Mutation', contact: { __typename?: 'ContactResponse', success: boolean } };

export type CreateTripMutationVariables = Exact<{
  input: TripInput;
}>;


export type CreateTripMutation = { __typename?: 'Mutation', createTrip: { __typename?: 'CreateTripResponse', success: boolean, tripId?: number | null | undefined } };

export type DeleteFileMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteUpload: boolean };

export type EditCarAvailabilityMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarAvailabilityInput;
}>;


export type EditCarAvailabilityMutation = { __typename?: 'Mutation', editCarAvailability: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: number | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarCategoriesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarCategoriesInput;
}>;


export type EditCarCategoriesMutation = { __typename?: 'Mutation', editCarCategories: { __typename?: 'CarAddEditResponse', carId?: number | null | undefined, error?: string | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarDescriptionMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarDescriptionInput;
}>;


export type EditCarDescriptionMutation = { __typename?: 'Mutation', editCarDescription: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: number | null | undefined, verified?: boolean | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarDistanceMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarDistanceInput;
}>;


export type EditCarDistanceMutation = { __typename?: 'Mutation', editCarDistance: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: number | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarDocumentsMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarDocumentsInput;
}>;


export type EditCarDocumentsMutation = { __typename?: 'Mutation', editCarDocuments: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: number | null | undefined, verified?: boolean | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarFeaturesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarFeaturesInput;
}>;


export type EditCarFeaturesMutation = { __typename?: 'Mutation', editCarFeatures: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: number | null | undefined, verified?: boolean | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarLocationAndDeliveryMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarLocationAndDeliveryInput;
}>;


export type EditCarLocationAndDeliveryMutation = { __typename?: 'Mutation', editCarLocationAndDelivery: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: number | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarPhotosMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarPhotosInput;
}>;


export type EditCarPhotosMutation = { __typename?: 'Mutation', editCarPhotos: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: number | null | undefined, verified?: boolean | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarRatesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarRatesInput;
}>;


export type EditCarRatesMutation = { __typename?: 'Mutation', editCarRates: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: number | null | undefined, car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarVerificationInProgressMutationVariables = Exact<{
  carId: Scalars['Float'];
}>;


export type EditCarVerificationInProgressMutation = { __typename?: 'Mutation', editCarVerificationInProgress: boolean };

export type EditCarVerifiedMutationVariables = Exact<{
  carId: Scalars['Float'];
}>;


export type EditCarVerifiedMutation = { __typename?: 'Mutation', editCarVerified: boolean };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: boolean };

export type LoginMutationVariables = Exact<{
  payload: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenResponse', access_token?: string | null | undefined, error?: string | null | undefined } };

export type RegisterMutationVariables = Exact<{
  payload: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'TokenResponse', access_token?: string | null | undefined, error?: string | null | undefined } };

export type UpdateCarFavouriteMutationVariables = Exact<{
  carId: Scalars['Float'];
  opType: Scalars['String'];
}>;


export type UpdateCarFavouriteMutation = { __typename?: 'Mutation', updateFavourite: { __typename?: 'UpdateFavouriteResponse', status?: boolean | null | undefined, error?: string | null | undefined } };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', singleUpload: { __typename?: 'UploadedFileResponse', error?: string | null | undefined, file?: { __typename?: 'UploadedFile', public_id: string, url: string, secure_url: string } | null | undefined } };

export type CheckIfDriverIsApprovedToDriveQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckIfDriverIsApprovedToDriveQuery = { __typename?: 'Query', checkIfDriverIsApprovedToDrive: { __typename?: 'DriverIsApprovedResponse', notApprovedReason?: string | null | undefined, error?: string | null | undefined, approved?: boolean | null | undefined } };

export type GetAuthUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id?: number | null | undefined, user_name?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, phone?: string | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined } };

export type GetCarQueryVariables = Exact<{
  carId: Scalars['Float'];
}>;


export type GetCarQuery = { __typename?: 'Query', getCar: { __typename?: 'CarResponse', car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type GetCarsQueryVariables = Exact<{
  input: SearchInput;
}>;


export type GetCarsQuery = { __typename?: 'Query', getCars: Array<{ __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, trips?: number | null | undefined, daily_rate?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined }> };

export type GetHostCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHostCarsQuery = { __typename?: 'Query', getHostCars: Array<{ __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, daily_rate?: number | null | undefined, booked?: boolean | null | undefined, available?: boolean | null | undefined, verification_in_progress?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, photos?: Array<{ __typename?: 'FileObj', secure_url?: string | null | undefined }> | null | undefined }> };

export type GetMakesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMakesQuery = { __typename?: 'Query', makes: Array<{ __typename?: 'Make', id?: number | null | undefined, title?: string | null | undefined, photo?: { __typename?: 'FileObj', url?: string | null | undefined, secure_url?: string | null | undefined } | null | undefined }> };

export type GetMyBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBookingsQuery = { __typename?: 'Query', getMyBookings: Array<{ __typename?: 'Trip', id?: number | null | undefined, owner_id?: number | null | undefined, start_date?: any | null | undefined, status?: string | null | undefined, end_date?: any | null | undefined, start_time?: string | null | undefined, end_time?: string | null | undefined, transaction: { __typename?: 'Transaction', channel?: string | null | undefined, amount?: string | null | undefined } }> };

export type GetMyTripsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTripsQuery = { __typename?: 'Query', getMyTrips: Array<{ __typename?: 'Trip', id?: number | null | undefined, owner_id?: number | null | undefined, start_date?: any | null | undefined, status?: string | null | undefined, end_date?: any | null | undefined, start_time?: string | null | undefined, end_time?: string | null | undefined, transaction: { __typename?: 'Transaction', channel?: string | null | undefined, amount?: string | null | undefined } }> };

export type GetPopularCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPopularCarsQuery = { __typename?: 'Query', getPopularCars: Array<{ __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, trips?: number | null | undefined, daily_rate?: number | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined }> };

export type GetPrivateCarQueryVariables = Exact<{
  carId: Scalars['Float'];
}>;


export type GetPrivateCarQuery = { __typename?: 'Query', getCar: { __typename?: 'CarResponse', car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: number | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, distance_per_day?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, has_driver?: boolean | null | undefined, driver_daily_rate?: number | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, can_rent_hourly?: boolean | null | undefined, hourly_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, car_has_other_use?: boolean | null | undefined, driver_mode?: number | null | undefined, advance_book_period?: string | null | undefined, manual_transmission_test?: boolean | null | undefined, odometer_reading?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type GetTripQueryVariables = Exact<{
  tripId: Scalars['Float'];
}>;


export type GetTripQuery = { __typename?: 'Query', getTrip: { __typename?: 'TripResponse', error?: string | null | undefined, trip?: { __typename?: 'Trip', id?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined } | null | undefined, transaction: { __typename?: 'Transaction', channel?: string | null | undefined, amount?: string | null | undefined }, car?: { __typename?: 'Car', name?: string | null | undefined, transmission?: string | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, daily_rate?: number | null | undefined, photos?: Array<{ __typename?: 'FileObj', secure_url?: string | null | undefined }> | null | undefined } | null | undefined } | null | undefined } };

export type GetUnVerifiedCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnVerifiedCarsQuery = { __typename?: 'Query', getUnVerifiedCars: Array<{ __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined }> };

export const FileInfoFragmentDoc = gql`
    fragment fileInfo on FileObj {
  public_id
  secure_url
  url
}
    `;
export const CarInfoFragmentDoc = gql`
    fragment carInfo on Car {
  id
  name
  reg_no
  description
  owner {
    first_name
    last_name
    created_at
    avatar {
      ...fileInfo
    }
    business_name
  }
  trips
  features {
    title
  }
  photos {
    ...fileInfo
  }
  reviews
  verified
  seats
  doors
  transmission
  gas
  daily_rate
  discount
  discount_days
  available
  custom_availability
  custom_availability_data {
    startDate
    startTime
    endDate
    endTime
  }
  make
  location
  distance_per_day
  besties {
    id
  }
  booked
  categories
  luxury_vip_services
  color
  has_driver
  driver_daily_rate
  delivery
  delivery_rate
  can_rent_hourly
  hourly_rate
  has_unlimited_distance
  car_has_other_use
  driver_mode
  advance_book_period
  manual_transmission_test
}
    ${FileInfoFragmentDoc}`;
export const CarPrivateInfoFragmentDoc = gql`
    fragment carPrivateInfo on Car {
  id
  name
  reg_no
  description
  owner {
    first_name
    last_name
    created_at
    avatar {
      ...fileInfo
    }
    business_name
  }
  trips
  features {
    title
  }
  photos {
    ...fileInfo
  }
  documents {
    title
    file {
      ...fileInfo
    }
  }
  reviews
  verified
  seats
  doors
  transmission
  gas
  daily_rate
  discount
  discount_days
  available
  custom_availability
  custom_availability_data {
    startDate
    startTime
    endDate
    endTime
  }
  make
  location
  distance_per_day
  besties {
    id
  }
  booked
  categories
  luxury_vip_services
  color
  has_driver
  driver_daily_rate
  delivery
  delivery_rate
  can_rent_hourly
  hourly_rate
  has_unlimited_distance
  car_has_other_use
  driver_mode
  advance_book_period
  manual_transmission_test
  odometer_reading
}
    ${FileInfoFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  user_name
  first_name
  last_name
  email
  phone
  avatar {
    ...fileInfo
  }
  business_name
}
    ${FileInfoFragmentDoc}`;
export const AddEditCarGeneralInfoDocument = gql`
    mutation AddEditCarGeneralInfo($options: CarGeneralInfoInput!, $isEdit: Boolean, $carId: Float) {
  addEditCarGeneralInfo(input: $options, carId: $carId, isEdit: $isEdit) {
    carId
    error
    verified
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type AddEditCarGeneralInfoMutationFn = Apollo.MutationFunction<AddEditCarGeneralInfoMutation, AddEditCarGeneralInfoMutationVariables>;

/**
 * __useAddEditCarGeneralInfoMutation__
 *
 * To run a mutation, you first call `useAddEditCarGeneralInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEditCarGeneralInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEditCarGeneralInfoMutation, { data, loading, error }] = useAddEditCarGeneralInfoMutation({
 *   variables: {
 *      options: // value for 'options'
 *      isEdit: // value for 'isEdit'
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useAddEditCarGeneralInfoMutation(baseOptions?: Apollo.MutationHookOptions<AddEditCarGeneralInfoMutation, AddEditCarGeneralInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEditCarGeneralInfoMutation, AddEditCarGeneralInfoMutationVariables>(AddEditCarGeneralInfoDocument, options);
      }
export type AddEditCarGeneralInfoMutationHookResult = ReturnType<typeof useAddEditCarGeneralInfoMutation>;
export type AddEditCarGeneralInfoMutationResult = Apollo.MutationResult<AddEditCarGeneralInfoMutation>;
export type AddEditCarGeneralInfoMutationOptions = Apollo.BaseMutationOptions<AddEditCarGeneralInfoMutation, AddEditCarGeneralInfoMutationVariables>;
export const AddCarMakeDocument = gql`
    mutation AddCarMake($input: MakeInput!) {
  addMake(input: $input) {
    success
  }
}
    `;
export type AddCarMakeMutationFn = Apollo.MutationFunction<AddCarMakeMutation, AddCarMakeMutationVariables>;

/**
 * __useAddCarMakeMutation__
 *
 * To run a mutation, you first call `useAddCarMakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCarMakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCarMakeMutation, { data, loading, error }] = useAddCarMakeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCarMakeMutation(baseOptions?: Apollo.MutationHookOptions<AddCarMakeMutation, AddCarMakeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCarMakeMutation, AddCarMakeMutationVariables>(AddCarMakeDocument, options);
      }
export type AddCarMakeMutationHookResult = ReturnType<typeof useAddCarMakeMutation>;
export type AddCarMakeMutationResult = Apollo.MutationResult<AddCarMakeMutation>;
export type AddCarMakeMutationOptions = Apollo.BaseMutationOptions<AddCarMakeMutation, AddCarMakeMutationVariables>;
export const ContactDocument = gql`
    mutation Contact($input: ContactInput!) {
  contact(input: $input) {
    success
  }
}
    `;
export type ContactMutationFn = Apollo.MutationFunction<ContactMutation, ContactMutationVariables>;

/**
 * __useContactMutation__
 *
 * To run a mutation, you first call `useContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactMutation, { data, loading, error }] = useContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactMutation(baseOptions?: Apollo.MutationHookOptions<ContactMutation, ContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContactMutation, ContactMutationVariables>(ContactDocument, options);
      }
export type ContactMutationHookResult = ReturnType<typeof useContactMutation>;
export type ContactMutationResult = Apollo.MutationResult<ContactMutation>;
export type ContactMutationOptions = Apollo.BaseMutationOptions<ContactMutation, ContactMutationVariables>;
export const CreateTripDocument = gql`
    mutation CreateTrip($input: TripInput!) {
  createTrip(input: $input) {
    success
    tripId
  }
}
    `;
export type CreateTripMutationFn = Apollo.MutationFunction<CreateTripMutation, CreateTripMutationVariables>;

/**
 * __useCreateTripMutation__
 *
 * To run a mutation, you first call `useCreateTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTripMutation, { data, loading, error }] = useCreateTripMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTripMutation(baseOptions?: Apollo.MutationHookOptions<CreateTripMutation, CreateTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTripMutation, CreateTripMutationVariables>(CreateTripDocument, options);
      }
export type CreateTripMutationHookResult = ReturnType<typeof useCreateTripMutation>;
export type CreateTripMutationResult = Apollo.MutationResult<CreateTripMutation>;
export type CreateTripMutationOptions = Apollo.BaseMutationOptions<CreateTripMutation, CreateTripMutationVariables>;
export const DeleteFileDocument = gql`
    mutation DeleteFile($id: String!) {
  deleteUpload(publicId: $id)
}
    `;
export type DeleteFileMutationFn = Apollo.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, options);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;
export const EditCarAvailabilityDocument = gql`
    mutation EditCarAvailability($carId: Float!, $input: CarAvailabilityInput!) {
  editCarAvailability(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarAvailabilityMutationFn = Apollo.MutationFunction<EditCarAvailabilityMutation, EditCarAvailabilityMutationVariables>;

/**
 * __useEditCarAvailabilityMutation__
 *
 * To run a mutation, you first call `useEditCarAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarAvailabilityMutation, { data, loading, error }] = useEditCarAvailabilityMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<EditCarAvailabilityMutation, EditCarAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarAvailabilityMutation, EditCarAvailabilityMutationVariables>(EditCarAvailabilityDocument, options);
      }
export type EditCarAvailabilityMutationHookResult = ReturnType<typeof useEditCarAvailabilityMutation>;
export type EditCarAvailabilityMutationResult = Apollo.MutationResult<EditCarAvailabilityMutation>;
export type EditCarAvailabilityMutationOptions = Apollo.BaseMutationOptions<EditCarAvailabilityMutation, EditCarAvailabilityMutationVariables>;
export const EditCarCategoriesDocument = gql`
    mutation EditCarCategories($carId: Float!, $input: CarCategoriesInput!) {
  editCarCategories(carId: $carId, input: $input) {
    carId
    error
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarCategoriesMutationFn = Apollo.MutationFunction<EditCarCategoriesMutation, EditCarCategoriesMutationVariables>;

/**
 * __useEditCarCategoriesMutation__
 *
 * To run a mutation, you first call `useEditCarCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarCategoriesMutation, { data, loading, error }] = useEditCarCategoriesMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<EditCarCategoriesMutation, EditCarCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarCategoriesMutation, EditCarCategoriesMutationVariables>(EditCarCategoriesDocument, options);
      }
export type EditCarCategoriesMutationHookResult = ReturnType<typeof useEditCarCategoriesMutation>;
export type EditCarCategoriesMutationResult = Apollo.MutationResult<EditCarCategoriesMutation>;
export type EditCarCategoriesMutationOptions = Apollo.BaseMutationOptions<EditCarCategoriesMutation, EditCarCategoriesMutationVariables>;
export const EditCarDescriptionDocument = gql`
    mutation EditCarDescription($carId: Float!, $input: CarDescriptionInput!) {
  editCarDescription(carId: $carId, input: $input) {
    error
    carId
    verified
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarDescriptionMutationFn = Apollo.MutationFunction<EditCarDescriptionMutation, EditCarDescriptionMutationVariables>;

/**
 * __useEditCarDescriptionMutation__
 *
 * To run a mutation, you first call `useEditCarDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarDescriptionMutation, { data, loading, error }] = useEditCarDescriptionMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<EditCarDescriptionMutation, EditCarDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarDescriptionMutation, EditCarDescriptionMutationVariables>(EditCarDescriptionDocument, options);
      }
export type EditCarDescriptionMutationHookResult = ReturnType<typeof useEditCarDescriptionMutation>;
export type EditCarDescriptionMutationResult = Apollo.MutationResult<EditCarDescriptionMutation>;
export type EditCarDescriptionMutationOptions = Apollo.BaseMutationOptions<EditCarDescriptionMutation, EditCarDescriptionMutationVariables>;
export const EditCarDistanceDocument = gql`
    mutation EditCarDistance($carId: Float!, $input: CarDistanceInput!) {
  editCarDistance(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarDistanceMutationFn = Apollo.MutationFunction<EditCarDistanceMutation, EditCarDistanceMutationVariables>;

/**
 * __useEditCarDistanceMutation__
 *
 * To run a mutation, you first call `useEditCarDistanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarDistanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarDistanceMutation, { data, loading, error }] = useEditCarDistanceMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarDistanceMutation(baseOptions?: Apollo.MutationHookOptions<EditCarDistanceMutation, EditCarDistanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarDistanceMutation, EditCarDistanceMutationVariables>(EditCarDistanceDocument, options);
      }
export type EditCarDistanceMutationHookResult = ReturnType<typeof useEditCarDistanceMutation>;
export type EditCarDistanceMutationResult = Apollo.MutationResult<EditCarDistanceMutation>;
export type EditCarDistanceMutationOptions = Apollo.BaseMutationOptions<EditCarDistanceMutation, EditCarDistanceMutationVariables>;
export const EditCarDocumentsDocument = gql`
    mutation EditCarDocuments($carId: Float!, $input: CarDocumentsInput!) {
  editCarDocuments(carId: $carId, input: $input) {
    error
    carId
    verified
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarDocumentsMutationFn = Apollo.MutationFunction<EditCarDocumentsMutation, EditCarDocumentsMutationVariables>;

/**
 * __useEditCarDocumentsMutation__
 *
 * To run a mutation, you first call `useEditCarDocumentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarDocumentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarDocumentsMutation, { data, loading, error }] = useEditCarDocumentsMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarDocumentsMutation(baseOptions?: Apollo.MutationHookOptions<EditCarDocumentsMutation, EditCarDocumentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarDocumentsMutation, EditCarDocumentsMutationVariables>(EditCarDocumentsDocument, options);
      }
export type EditCarDocumentsMutationHookResult = ReturnType<typeof useEditCarDocumentsMutation>;
export type EditCarDocumentsMutationResult = Apollo.MutationResult<EditCarDocumentsMutation>;
export type EditCarDocumentsMutationOptions = Apollo.BaseMutationOptions<EditCarDocumentsMutation, EditCarDocumentsMutationVariables>;
export const EditCarFeaturesDocument = gql`
    mutation EditCarFeatures($carId: Float!, $input: CarFeaturesInput!) {
  editCarFeatures(carId: $carId, input: $input) {
    error
    carId
    verified
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarFeaturesMutationFn = Apollo.MutationFunction<EditCarFeaturesMutation, EditCarFeaturesMutationVariables>;

/**
 * __useEditCarFeaturesMutation__
 *
 * To run a mutation, you first call `useEditCarFeaturesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarFeaturesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarFeaturesMutation, { data, loading, error }] = useEditCarFeaturesMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarFeaturesMutation(baseOptions?: Apollo.MutationHookOptions<EditCarFeaturesMutation, EditCarFeaturesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarFeaturesMutation, EditCarFeaturesMutationVariables>(EditCarFeaturesDocument, options);
      }
export type EditCarFeaturesMutationHookResult = ReturnType<typeof useEditCarFeaturesMutation>;
export type EditCarFeaturesMutationResult = Apollo.MutationResult<EditCarFeaturesMutation>;
export type EditCarFeaturesMutationOptions = Apollo.BaseMutationOptions<EditCarFeaturesMutation, EditCarFeaturesMutationVariables>;
export const EditCarLocationAndDeliveryDocument = gql`
    mutation EditCarLocationAndDelivery($carId: Float!, $input: CarLocationAndDeliveryInput!) {
  editCarLocationAndDelivery(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarLocationAndDeliveryMutationFn = Apollo.MutationFunction<EditCarLocationAndDeliveryMutation, EditCarLocationAndDeliveryMutationVariables>;

/**
 * __useEditCarLocationAndDeliveryMutation__
 *
 * To run a mutation, you first call `useEditCarLocationAndDeliveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarLocationAndDeliveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarLocationAndDeliveryMutation, { data, loading, error }] = useEditCarLocationAndDeliveryMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarLocationAndDeliveryMutation(baseOptions?: Apollo.MutationHookOptions<EditCarLocationAndDeliveryMutation, EditCarLocationAndDeliveryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarLocationAndDeliveryMutation, EditCarLocationAndDeliveryMutationVariables>(EditCarLocationAndDeliveryDocument, options);
      }
export type EditCarLocationAndDeliveryMutationHookResult = ReturnType<typeof useEditCarLocationAndDeliveryMutation>;
export type EditCarLocationAndDeliveryMutationResult = Apollo.MutationResult<EditCarLocationAndDeliveryMutation>;
export type EditCarLocationAndDeliveryMutationOptions = Apollo.BaseMutationOptions<EditCarLocationAndDeliveryMutation, EditCarLocationAndDeliveryMutationVariables>;
export const EditCarPhotosDocument = gql`
    mutation EditCarPhotos($carId: Float!, $input: CarPhotosInput!) {
  editCarPhotos(carId: $carId, input: $input) {
    error
    carId
    verified
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarPhotosMutationFn = Apollo.MutationFunction<EditCarPhotosMutation, EditCarPhotosMutationVariables>;

/**
 * __useEditCarPhotosMutation__
 *
 * To run a mutation, you first call `useEditCarPhotosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarPhotosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarPhotosMutation, { data, loading, error }] = useEditCarPhotosMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarPhotosMutation(baseOptions?: Apollo.MutationHookOptions<EditCarPhotosMutation, EditCarPhotosMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarPhotosMutation, EditCarPhotosMutationVariables>(EditCarPhotosDocument, options);
      }
export type EditCarPhotosMutationHookResult = ReturnType<typeof useEditCarPhotosMutation>;
export type EditCarPhotosMutationResult = Apollo.MutationResult<EditCarPhotosMutation>;
export type EditCarPhotosMutationOptions = Apollo.BaseMutationOptions<EditCarPhotosMutation, EditCarPhotosMutationVariables>;
export const EditCarRatesDocument = gql`
    mutation EditCarRates($carId: Float!, $input: CarRatesInput!) {
  editCarRates(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;
export type EditCarRatesMutationFn = Apollo.MutationFunction<EditCarRatesMutation, EditCarRatesMutationVariables>;

/**
 * __useEditCarRatesMutation__
 *
 * To run a mutation, you first call `useEditCarRatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarRatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarRatesMutation, { data, loading, error }] = useEditCarRatesMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarRatesMutation(baseOptions?: Apollo.MutationHookOptions<EditCarRatesMutation, EditCarRatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarRatesMutation, EditCarRatesMutationVariables>(EditCarRatesDocument, options);
      }
export type EditCarRatesMutationHookResult = ReturnType<typeof useEditCarRatesMutation>;
export type EditCarRatesMutationResult = Apollo.MutationResult<EditCarRatesMutation>;
export type EditCarRatesMutationOptions = Apollo.BaseMutationOptions<EditCarRatesMutation, EditCarRatesMutationVariables>;
export const EditCarVerificationInProgressDocument = gql`
    mutation EditCarVerificationInProgress($carId: Float!) {
  editCarVerificationInProgress(carId: $carId)
}
    `;
export type EditCarVerificationInProgressMutationFn = Apollo.MutationFunction<EditCarVerificationInProgressMutation, EditCarVerificationInProgressMutationVariables>;

/**
 * __useEditCarVerificationInProgressMutation__
 *
 * To run a mutation, you first call `useEditCarVerificationInProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarVerificationInProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarVerificationInProgressMutation, { data, loading, error }] = useEditCarVerificationInProgressMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useEditCarVerificationInProgressMutation(baseOptions?: Apollo.MutationHookOptions<EditCarVerificationInProgressMutation, EditCarVerificationInProgressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarVerificationInProgressMutation, EditCarVerificationInProgressMutationVariables>(EditCarVerificationInProgressDocument, options);
      }
export type EditCarVerificationInProgressMutationHookResult = ReturnType<typeof useEditCarVerificationInProgressMutation>;
export type EditCarVerificationInProgressMutationResult = Apollo.MutationResult<EditCarVerificationInProgressMutation>;
export type EditCarVerificationInProgressMutationOptions = Apollo.BaseMutationOptions<EditCarVerificationInProgressMutation, EditCarVerificationInProgressMutationVariables>;
export const EditCarVerifiedDocument = gql`
    mutation EditCarVerified($carId: Float!) {
  editCarVerified(carId: $carId)
}
    `;
export type EditCarVerifiedMutationFn = Apollo.MutationFunction<EditCarVerifiedMutation, EditCarVerifiedMutationVariables>;

/**
 * __useEditCarVerifiedMutation__
 *
 * To run a mutation, you first call `useEditCarVerifiedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarVerifiedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarVerifiedMutation, { data, loading, error }] = useEditCarVerifiedMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useEditCarVerifiedMutation(baseOptions?: Apollo.MutationHookOptions<EditCarVerifiedMutation, EditCarVerifiedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarVerifiedMutation, EditCarVerifiedMutationVariables>(EditCarVerifiedDocument, options);
      }
export type EditCarVerifiedMutationHookResult = ReturnType<typeof useEditCarVerifiedMutation>;
export type EditCarVerifiedMutationResult = Apollo.MutationResult<EditCarVerifiedMutation>;
export type EditCarVerifiedMutationOptions = Apollo.BaseMutationOptions<EditCarVerifiedMutation, EditCarVerifiedMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($input: EditProfileInput!) {
  editProfile(input: $input)
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const LoginDocument = gql`
    mutation Login($payload: LoginInput!) {
  login(input: $payload) {
    access_token
    error
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($payload: RegisterInput!) {
  register(input: $payload) {
    access_token
    error
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateCarFavouriteDocument = gql`
    mutation UpdateCarFavourite($carId: Float!, $opType: String!) {
  updateFavourite(carId: $carId, opType: $opType) {
    status
    error
  }
}
    `;
export type UpdateCarFavouriteMutationFn = Apollo.MutationFunction<UpdateCarFavouriteMutation, UpdateCarFavouriteMutationVariables>;

/**
 * __useUpdateCarFavouriteMutation__
 *
 * To run a mutation, you first call `useUpdateCarFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarFavouriteMutation, { data, loading, error }] = useUpdateCarFavouriteMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      opType: // value for 'opType'
 *   },
 * });
 */
export function useUpdateCarFavouriteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarFavouriteMutation, UpdateCarFavouriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarFavouriteMutation, UpdateCarFavouriteMutationVariables>(UpdateCarFavouriteDocument, options);
      }
export type UpdateCarFavouriteMutationHookResult = ReturnType<typeof useUpdateCarFavouriteMutation>;
export type UpdateCarFavouriteMutationResult = Apollo.MutationResult<UpdateCarFavouriteMutation>;
export type UpdateCarFavouriteMutationOptions = Apollo.BaseMutationOptions<UpdateCarFavouriteMutation, UpdateCarFavouriteMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
  singleUpload(file: $file) {
    file {
      public_id
      url
      secure_url
    }
    error
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const CheckIfDriverIsApprovedToDriveDocument = gql`
    query CheckIfDriverIsApprovedToDrive {
  checkIfDriverIsApprovedToDrive {
    notApprovedReason
    error
    approved
  }
}
    `;

/**
 * __useCheckIfDriverIsApprovedToDriveQuery__
 *
 * To run a query within a React component, call `useCheckIfDriverIsApprovedToDriveQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfDriverIsApprovedToDriveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfDriverIsApprovedToDriveQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckIfDriverIsApprovedToDriveQuery(baseOptions?: Apollo.QueryHookOptions<CheckIfDriverIsApprovedToDriveQuery, CheckIfDriverIsApprovedToDriveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfDriverIsApprovedToDriveQuery, CheckIfDriverIsApprovedToDriveQueryVariables>(CheckIfDriverIsApprovedToDriveDocument, options);
      }
export function useCheckIfDriverIsApprovedToDriveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfDriverIsApprovedToDriveQuery, CheckIfDriverIsApprovedToDriveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfDriverIsApprovedToDriveQuery, CheckIfDriverIsApprovedToDriveQueryVariables>(CheckIfDriverIsApprovedToDriveDocument, options);
        }
export type CheckIfDriverIsApprovedToDriveQueryHookResult = ReturnType<typeof useCheckIfDriverIsApprovedToDriveQuery>;
export type CheckIfDriverIsApprovedToDriveLazyQueryHookResult = ReturnType<typeof useCheckIfDriverIsApprovedToDriveLazyQuery>;
export type CheckIfDriverIsApprovedToDriveQueryResult = Apollo.QueryResult<CheckIfDriverIsApprovedToDriveQuery, CheckIfDriverIsApprovedToDriveQueryVariables>;
export const GetAuthUserDocument = gql`
    query GetAuthUser {
  getUser {
    user {
      ...userInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useGetAuthUserQuery__
 *
 * To run a query within a React component, call `useGetAuthUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthUserQuery, GetAuthUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthUserQuery, GetAuthUserQueryVariables>(GetAuthUserDocument, options);
      }
export function useGetAuthUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthUserQuery, GetAuthUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthUserQuery, GetAuthUserQueryVariables>(GetAuthUserDocument, options);
        }
export type GetAuthUserQueryHookResult = ReturnType<typeof useGetAuthUserQuery>;
export type GetAuthUserLazyQueryHookResult = ReturnType<typeof useGetAuthUserLazyQuery>;
export type GetAuthUserQueryResult = Apollo.QueryResult<GetAuthUserQuery, GetAuthUserQueryVariables>;
export const GetCarDocument = gql`
    query GetCar($carId: Float!) {
  getCar(carId: $carId) {
    car {
      ...carInfo
    }
  }
}
    ${CarInfoFragmentDoc}`;

/**
 * __useGetCarQuery__
 *
 * To run a query within a React component, call `useGetCarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarQuery({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useGetCarQuery(baseOptions: Apollo.QueryHookOptions<GetCarQuery, GetCarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarQuery, GetCarQueryVariables>(GetCarDocument, options);
      }
export function useGetCarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarQuery, GetCarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarQuery, GetCarQueryVariables>(GetCarDocument, options);
        }
export type GetCarQueryHookResult = ReturnType<typeof useGetCarQuery>;
export type GetCarLazyQueryHookResult = ReturnType<typeof useGetCarLazyQuery>;
export type GetCarQueryResult = Apollo.QueryResult<GetCarQuery, GetCarQueryVariables>;
export const GetCarsDocument = gql`
    query GetCars($input: SearchInput!) {
  getCars(input: $input) {
    id
    name
    owner {
      first_name
      last_name
    }
    trips
    photos {
      ...fileInfo
    }
    daily_rate
    besties {
      id
    }
  }
}
    ${FileInfoFragmentDoc}`;

/**
 * __useGetCarsQuery__
 *
 * To run a query within a React component, call `useGetCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCarsQuery(baseOptions: Apollo.QueryHookOptions<GetCarsQuery, GetCarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, options);
      }
export function useGetCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarsQuery, GetCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, options);
        }
export type GetCarsQueryHookResult = ReturnType<typeof useGetCarsQuery>;
export type GetCarsLazyQueryHookResult = ReturnType<typeof useGetCarsLazyQuery>;
export type GetCarsQueryResult = Apollo.QueryResult<GetCarsQuery, GetCarsQueryVariables>;
export const GetHostCarsDocument = gql`
    query GetHostCars {
  getHostCars {
    id
    name
    owner {
      first_name
      last_name
    }
    photos {
      secure_url
    }
    reg_no
    daily_rate
    booked
    available
    verification_in_progress
  }
}
    `;

/**
 * __useGetHostCarsQuery__
 *
 * To run a query within a React component, call `useGetHostCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHostCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHostCarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHostCarsQuery(baseOptions?: Apollo.QueryHookOptions<GetHostCarsQuery, GetHostCarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHostCarsQuery, GetHostCarsQueryVariables>(GetHostCarsDocument, options);
      }
export function useGetHostCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHostCarsQuery, GetHostCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHostCarsQuery, GetHostCarsQueryVariables>(GetHostCarsDocument, options);
        }
export type GetHostCarsQueryHookResult = ReturnType<typeof useGetHostCarsQuery>;
export type GetHostCarsLazyQueryHookResult = ReturnType<typeof useGetHostCarsLazyQuery>;
export type GetHostCarsQueryResult = Apollo.QueryResult<GetHostCarsQuery, GetHostCarsQueryVariables>;
export const GetMakesDocument = gql`
    query GetMakes {
  makes {
    id
    title
    photo {
      url
      secure_url
    }
  }
}
    `;

/**
 * __useGetMakesQuery__
 *
 * To run a query within a React component, call `useGetMakesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMakesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMakesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMakesQuery(baseOptions?: Apollo.QueryHookOptions<GetMakesQuery, GetMakesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMakesQuery, GetMakesQueryVariables>(GetMakesDocument, options);
      }
export function useGetMakesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMakesQuery, GetMakesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMakesQuery, GetMakesQueryVariables>(GetMakesDocument, options);
        }
export type GetMakesQueryHookResult = ReturnType<typeof useGetMakesQuery>;
export type GetMakesLazyQueryHookResult = ReturnType<typeof useGetMakesLazyQuery>;
export type GetMakesQueryResult = Apollo.QueryResult<GetMakesQuery, GetMakesQueryVariables>;
export const GetMyBookingsDocument = gql`
    query GetMyBookings {
  getMyBookings {
    id
    owner_id
    start_date
    status
    end_date
    start_time
    end_time
    transaction {
      channel
      amount
    }
  }
}
    `;

/**
 * __useGetMyBookingsQuery__
 *
 * To run a query within a React component, call `useGetMyBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyBookingsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyBookingsQuery, GetMyBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyBookingsQuery, GetMyBookingsQueryVariables>(GetMyBookingsDocument, options);
      }
export function useGetMyBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyBookingsQuery, GetMyBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyBookingsQuery, GetMyBookingsQueryVariables>(GetMyBookingsDocument, options);
        }
export type GetMyBookingsQueryHookResult = ReturnType<typeof useGetMyBookingsQuery>;
export type GetMyBookingsLazyQueryHookResult = ReturnType<typeof useGetMyBookingsLazyQuery>;
export type GetMyBookingsQueryResult = Apollo.QueryResult<GetMyBookingsQuery, GetMyBookingsQueryVariables>;
export const GetMyTripsDocument = gql`
    query GetMyTrips {
  getMyTrips {
    id
    owner_id
    start_date
    status
    end_date
    start_time
    end_time
    transaction {
      channel
      amount
    }
  }
}
    `;

/**
 * __useGetMyTripsQuery__
 *
 * To run a query within a React component, call `useGetMyTripsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTripsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTripsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTripsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTripsQuery, GetMyTripsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTripsQuery, GetMyTripsQueryVariables>(GetMyTripsDocument, options);
      }
export function useGetMyTripsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTripsQuery, GetMyTripsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTripsQuery, GetMyTripsQueryVariables>(GetMyTripsDocument, options);
        }
export type GetMyTripsQueryHookResult = ReturnType<typeof useGetMyTripsQuery>;
export type GetMyTripsLazyQueryHookResult = ReturnType<typeof useGetMyTripsLazyQuery>;
export type GetMyTripsQueryResult = Apollo.QueryResult<GetMyTripsQuery, GetMyTripsQueryVariables>;
export const GetPopularCarsDocument = gql`
    query GetPopularCars {
  getPopularCars {
    id
    name
    trips
    photos {
      ...fileInfo
    }
    daily_rate
    besties {
      id
    }
  }
}
    ${FileInfoFragmentDoc}`;

/**
 * __useGetPopularCarsQuery__
 *
 * To run a query within a React component, call `useGetPopularCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPopularCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPopularCarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPopularCarsQuery(baseOptions?: Apollo.QueryHookOptions<GetPopularCarsQuery, GetPopularCarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPopularCarsQuery, GetPopularCarsQueryVariables>(GetPopularCarsDocument, options);
      }
export function useGetPopularCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPopularCarsQuery, GetPopularCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPopularCarsQuery, GetPopularCarsQueryVariables>(GetPopularCarsDocument, options);
        }
export type GetPopularCarsQueryHookResult = ReturnType<typeof useGetPopularCarsQuery>;
export type GetPopularCarsLazyQueryHookResult = ReturnType<typeof useGetPopularCarsLazyQuery>;
export type GetPopularCarsQueryResult = Apollo.QueryResult<GetPopularCarsQuery, GetPopularCarsQueryVariables>;
export const GetPrivateCarDocument = gql`
    query GetPrivateCar($carId: Float!) {
  getCar(carId: $carId) {
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;

/**
 * __useGetPrivateCarQuery__
 *
 * To run a query within a React component, call `useGetPrivateCarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrivateCarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrivateCarQuery({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useGetPrivateCarQuery(baseOptions: Apollo.QueryHookOptions<GetPrivateCarQuery, GetPrivateCarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrivateCarQuery, GetPrivateCarQueryVariables>(GetPrivateCarDocument, options);
      }
export function useGetPrivateCarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrivateCarQuery, GetPrivateCarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrivateCarQuery, GetPrivateCarQueryVariables>(GetPrivateCarDocument, options);
        }
export type GetPrivateCarQueryHookResult = ReturnType<typeof useGetPrivateCarQuery>;
export type GetPrivateCarLazyQueryHookResult = ReturnType<typeof useGetPrivateCarLazyQuery>;
export type GetPrivateCarQueryResult = Apollo.QueryResult<GetPrivateCarQuery, GetPrivateCarQueryVariables>;
export const GetTripDocument = gql`
    query GetTrip($tripId: Float!) {
  getTrip(tripId: $tripId) {
    trip {
      id
      owner {
        first_name
      }
      transaction {
        channel
        amount
      }
      car {
        name
        transmission
        seats
        doors
        daily_rate
        photos {
          secure_url
        }
      }
    }
    error
  }
}
    `;

/**
 * __useGetTripQuery__
 *
 * To run a query within a React component, call `useGetTripQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTripQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTripQuery({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function useGetTripQuery(baseOptions: Apollo.QueryHookOptions<GetTripQuery, GetTripQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTripQuery, GetTripQueryVariables>(GetTripDocument, options);
      }
export function useGetTripLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTripQuery, GetTripQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTripQuery, GetTripQueryVariables>(GetTripDocument, options);
        }
export type GetTripQueryHookResult = ReturnType<typeof useGetTripQuery>;
export type GetTripLazyQueryHookResult = ReturnType<typeof useGetTripLazyQuery>;
export type GetTripQueryResult = Apollo.QueryResult<GetTripQuery, GetTripQueryVariables>;
export const GetUnVerifiedCarsDocument = gql`
    query GetUnVerifiedCars {
  getUnVerifiedCars {
    id
    name
    id
    name
    reg_no
    description
    owner {
      first_name
      last_name
    }
    trips
    features {
      title
    }
    photos {
      ...fileInfo
    }
    reviews
  }
}
    ${FileInfoFragmentDoc}`;

/**
 * __useGetUnVerifiedCarsQuery__
 *
 * To run a query within a React component, call `useGetUnVerifiedCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnVerifiedCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnVerifiedCarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnVerifiedCarsQuery(baseOptions?: Apollo.QueryHookOptions<GetUnVerifiedCarsQuery, GetUnVerifiedCarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnVerifiedCarsQuery, GetUnVerifiedCarsQueryVariables>(GetUnVerifiedCarsDocument, options);
      }
export function useGetUnVerifiedCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnVerifiedCarsQuery, GetUnVerifiedCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnVerifiedCarsQuery, GetUnVerifiedCarsQueryVariables>(GetUnVerifiedCarsDocument, options);
        }
export type GetUnVerifiedCarsQueryHookResult = ReturnType<typeof useGetUnVerifiedCarsQuery>;
export type GetUnVerifiedCarsLazyQueryHookResult = ReturnType<typeof useGetUnVerifiedCarsLazyQuery>;
export type GetUnVerifiedCarsQueryResult = Apollo.QueryResult<GetUnVerifiedCarsQuery, GetUnVerifiedCarsQueryVariables>;