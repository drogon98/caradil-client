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
  available?: Maybe<Scalars['Boolean']>;
  bags?: Maybe<Scalars['Float']>;
  besties?: Maybe<Array<User>>;
  book_requests?: Maybe<Scalars['Boolean']>;
  booked?: Maybe<Scalars['Boolean']>;
  cars?: Maybe<Trip>;
  categories?: Maybe<Array<Scalars['String']>>;
  color?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  custom_availability?: Maybe<Scalars['Boolean']>;
  custom_availability_data?: Maybe<CustomAvailabilityObj>;
  daily_rate?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['String']>;
  discount_days?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<DocumentObj>>;
  doors?: Maybe<Scalars['Float']>;
  driver_daily_rate?: Maybe<Scalars['Float']>;
  extra_mile_rate?: Maybe<Scalars['Float']>;
  faqs?: Maybe<Scalars['Boolean']>;
  features?: Maybe<Array<FeatureObj>>;
  gas?: Maybe<Scalars['String']>;
  guidelines?: Maybe<Scalars['Boolean']>;
  has_driver?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  luxury_vip_services?: Maybe<Array<Scalars['String']>>;
  make?: Maybe<Scalars['String']>;
  miles_per_day?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  offer_bulk_hire?: Maybe<Scalars['Boolean']>;
  owner?: Maybe<User>;
  owner_id?: Maybe<Scalars['Float']>;
  photos?: Maybe<Array<PhotoObj>>;
  reg_no?: Maybe<Scalars['String']>;
  reviews?: Maybe<Scalars['Boolean']>;
  seats?: Maybe<Scalars['Float']>;
  transmission?: Maybe<Scalars['String']>;
  trips?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type CarAddEditResponse = {
  __typename?: 'CarAddEditResponse';
  carId?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['Float']>;
};

export type CarAvailabilityInput = {
  available: Scalars['Boolean'];
  custom_availability: Scalars['Boolean'];
  custom_availability_data?: InputMaybe<CustomAvailabilityDataInput>;
};

export type CarCategoriesInput = {
  categories: Array<Scalars['String']>;
};

export type CarDescriptionInput = {
  description: Scalars['String'];
};

export type CarDocumentsInput = {
  documents: Array<DocumentInput>;
};

export type CarGeneralInfoInput = {
  make: Scalars['String'];
  name: Scalars['String'];
  reg_no: Scalars['String'];
};

export type CarLocationInput = {
  location: Scalars['String'];
};

export type CarLuxuryAndVipServicesInput = {
  services: Array<Scalars['String']>;
};

export type CarMilesInput = {
  miles_per_day: Scalars['Float'];
};

export type CarPhotosInput = {
  photos: Array<PhotoInput>;
};

export type CarPrimaryFeaturesInput = {
  color: Scalars['String'];
  doors: Scalars['Float'];
  gas: Scalars['String'];
  seats: Scalars['Float'];
  transmission: Scalars['String'];
};

export type CarRatesInput = {
  daily_rate: Scalars['Float'];
  discount?: InputMaybe<Scalars['String']>;
  discount_days?: InputMaybe<Scalars['String']>;
  extra_mile_rate?: InputMaybe<Scalars['Float']>;
};

export type CarResponse = {
  __typename?: 'CarResponse';
  car?: Maybe<Car>;
  error?: Maybe<Scalars['String']>;
};

export type CarSecondaryFeaturesInput = {
  features: Array<FeatureInput>;
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
  file: PhotoInput;
  title: Scalars['String'];
};

export type DocumentObj = {
  __typename?: 'DocumentObj';
  file?: Maybe<PhotoObj>;
  title?: Maybe<Scalars['String']>;
};

export type DriverIsApprovedResponse = {
  __typename?: 'DriverIsApprovedResponse';
  approved?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  notApprovedReason?: Maybe<Scalars['String']>;
};

export type EditProfileInput = {
  avatar?: InputMaybe<PhotoInput>;
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

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Make = {
  __typename?: 'Make';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Float']>;
  photo?: Maybe<PhotoObj>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MakeInput = {
  photo: PhotoInput;
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
  editCarDocuments: CarAddEditResponse;
  editCarLocation: CarAddEditResponse;
  editCarLuxuryAndVipServices: CarAddEditResponse;
  editCarMiles: CarAddEditResponse;
  editCarPhotos: CarAddEditResponse;
  editCarPrimaryFeatures: CarAddEditResponse;
  editCarRates: CarAddEditResponse;
  editCarSecondaryFeatures: CarAddEditResponse;
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


export type MutationEditCarDocumentsArgs = {
  carId: Scalars['Float'];
  input: CarDocumentsInput;
};


export type MutationEditCarLocationArgs = {
  carId: Scalars['Float'];
  input: CarLocationInput;
};


export type MutationEditCarLuxuryAndVipServicesArgs = {
  carId: Scalars['Float'];
  input: CarLuxuryAndVipServicesInput;
};


export type MutationEditCarMilesArgs = {
  carId: Scalars['Float'];
  input: CarMilesInput;
};


export type MutationEditCarPhotosArgs = {
  carId: Scalars['Float'];
  input: CarPhotosInput;
};


export type MutationEditCarPrimaryFeaturesArgs = {
  carId: Scalars['Float'];
  input: CarPrimaryFeaturesInput;
};


export type MutationEditCarRatesArgs = {
  carId: Scalars['Float'];
  input: CarRatesInput;
};


export type MutationEditCarSecondaryFeaturesArgs = {
  carId: Scalars['Float'];
  input: CarSecondaryFeaturesInput;
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

export type PhotoInput = {
  public_id: Scalars['String'];
  secure_url: Scalars['String'];
  url: Scalars['String'];
};

export type PhotoObj = {
  __typename?: 'PhotoObj';
  public_id?: Maybe<Scalars['String']>;
  secure_url?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
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
  avatar?: Maybe<PhotoObj>;
  business_name?: Maybe<Scalars['String']>;
  cars?: Maybe<Car>;
  created_at?: Maybe<Scalars['DateTime']>;
  driving_license_data?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  favourite_cars?: Maybe<Array<Car>>;
  first_name?: Maybe<Scalars['String']>;
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

export type AddEditCarGeneralInfoMutationVariables = Exact<{
  options: CarGeneralInfoInput;
  isEdit?: InputMaybe<Scalars['Boolean']>;
  carId?: InputMaybe<Scalars['Float']>;
}>;


export type AddEditCarGeneralInfoMutation = { __typename?: 'Mutation', addEditCarGeneralInfo: { __typename?: 'CarAddEditResponse', carId?: number | null | undefined, error?: number | null | undefined } };

export type AddCarMakeMutationVariables = Exact<{
  input: MakeInput;
}>;


export type AddCarMakeMutation = { __typename?: 'Mutation', addMake: { __typename?: 'MakeResponse', success: boolean } };

export type CreateTripMutationVariables = Exact<{
  input: TripInput;
}>;


export type CreateTripMutation = { __typename?: 'Mutation', createTrip: { __typename?: 'CreateTripResponse', success: boolean, tripId?: number | null | undefined } };

export type ContactMutationVariables = Exact<{
  input: ContactInput;
}>;


export type ContactMutation = { __typename?: 'Mutation', contact: { __typename?: 'ContactResponse', success: boolean } };

export type DeleteFileMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteUpload: boolean };

export type EditCarAvailabilityMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarAvailabilityInput;
}>;


export type EditCarAvailabilityMutation = { __typename?: 'Mutation', editCarAvailability: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

export type EditCarCategoriesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarCategoriesInput;
}>;


export type EditCarCategoriesMutation = { __typename?: 'Mutation', editCarCategories: { __typename?: 'CarAddEditResponse', carId?: number | null | undefined, error?: number | null | undefined } };

export type EditCarDescriptionMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarDescriptionInput;
}>;


export type EditCarDescriptionMutation = { __typename?: 'Mutation', editCarDescription: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

export type EditCarDocumentsMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarDocumentsInput;
}>;


export type EditCarDocumentsMutation = { __typename?: 'Mutation', editCarDocuments: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

export type EditCarLocationMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarLocationInput;
}>;


export type EditCarLocationMutation = { __typename?: 'Mutation', editCarLocation: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

export type EditCarLuxuryAndVipServicesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarLuxuryAndVipServicesInput;
}>;


export type EditCarLuxuryAndVipServicesMutation = { __typename?: 'Mutation', editCarLuxuryAndVipServices: { __typename?: 'CarAddEditResponse', carId?: number | null | undefined, error?: number | null | undefined } };

export type EditCarMilesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarMilesInput;
}>;


export type EditCarMilesMutation = { __typename?: 'Mutation', editCarMiles: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

export type EditCarPhotosMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarPhotosInput;
}>;


export type EditCarPhotosMutation = { __typename?: 'Mutation', editCarPhotos: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

export type EditCarPrimaryFeaturesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarPrimaryFeaturesInput;
}>;


export type EditCarPrimaryFeaturesMutation = { __typename?: 'Mutation', editCarPrimaryFeatures: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

export type EditCarRatesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarRatesInput;
}>;


export type EditCarRatesMutation = { __typename?: 'Mutation', editCarRates: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

export type EditCarSecondaryFeaturesMutationVariables = Exact<{
  carId: Scalars['Float'];
  input: CarSecondaryFeaturesInput;
}>;


export type EditCarSecondaryFeaturesMutation = { __typename?: 'Mutation', editCarSecondaryFeatures: { __typename?: 'CarAddEditResponse', error?: number | null | undefined, carId?: number | null | undefined } };

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


export type GetAuthUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id?: number | null | undefined, user_name?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, phone?: string | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined } | null | undefined } | null | undefined } };

export type GetCarQueryVariables = Exact<{
  carId: Scalars['Float'];
}>;


export type GetCarQuery = { __typename?: 'Query', getCar: { __typename?: 'CarResponse', car?: { __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, verified?: boolean | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, daily_rate?: number | null | undefined, discount?: string | null | undefined, discount_days?: string | null | undefined, available?: boolean | null | undefined, custom_availability?: boolean | null | undefined, make?: string | null | undefined, location?: string | null | undefined, miles_per_day?: number | null | undefined, extra_mile_rate?: number | null | undefined, booked?: boolean | null | undefined, categories?: Array<string> | null | undefined, luxury_vip_services?: Array<string> | null | undefined, color?: string | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'PhotoObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined } | null | undefined }> | null | undefined, custom_availability_data?: { __typename?: 'CustomAvailabilityObj', startDate?: string | null | undefined, startTime?: string | null | undefined, endDate?: string | null | undefined, endTime?: string | null | undefined } | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined } | null | undefined } };

export type GetCarsQueryVariables = Exact<{
  input: SearchInput;
}>;


export type GetCarsQuery = { __typename?: 'Query', getCars: Array<{ __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, daily_rate?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined }> };

export type GetHostCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHostCarsQuery = { __typename?: 'Query', getHostCars: Array<{ __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, reg_no?: string | null | undefined, daily_rate?: number | null | undefined, booked?: boolean | null | undefined, available?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'PhotoObj', secure_url?: string | null | undefined }> | null | undefined }> };

export type GetMakesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMakesQuery = { __typename?: 'Query', makes: Array<{ __typename?: 'Make', id?: number | null | undefined, title?: string | null | undefined, photo?: { __typename?: 'PhotoObj', url?: string | null | undefined, secure_url?: string | null | undefined } | null | undefined }> };

export type GetMyTripsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTripsQuery = { __typename?: 'Query', getMyTrips: Array<{ __typename?: 'Trip', id?: number | null | undefined, owner_id?: number | null | undefined, start_date?: any | null | undefined, status?: string | null | undefined, end_date?: any | null | undefined, start_time?: string | null | undefined, end_time?: string | null | undefined }> };

export type GetPopularCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPopularCarsQuery = { __typename?: 'Query', getPopularCars: Array<{ __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, daily_rate?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: number | null | undefined }> | null | undefined }> };

export type GetTripQueryVariables = Exact<{
  tripId: Scalars['Float'];
}>;


export type GetTripQuery = { __typename?: 'Query', getTrip: { __typename?: 'TripResponse', error?: string | null | undefined, trip?: { __typename?: 'Trip', id?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined } | null | undefined, transaction: { __typename?: 'Transaction', channel?: string | null | undefined, amount?: string | null | undefined }, car?: { __typename?: 'Car', name?: string | null | undefined, transmission?: string | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, daily_rate?: number | null | undefined, photos?: Array<{ __typename?: 'PhotoObj', secure_url?: string | null | undefined }> | null | undefined } | null | undefined } | null | undefined } };

export type GetUnVerifiedCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnVerifiedCarsQuery = { __typename?: 'Query', getUnVerifiedCars: Array<{ __typename?: 'Car', id?: number | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, reviews?: boolean | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'PhotoObj', public_id?: string | null | undefined, url?: string | null | undefined, secure_url?: string | null | undefined } | null | undefined }> | null | undefined }> };


export const AddEditCarGeneralInfoDocument = gql`
    mutation AddEditCarGeneralInfo($options: CarGeneralInfoInput!, $isEdit: Boolean, $carId: Float) {
  addEditCarGeneralInfo(input: $options, carId: $carId, isEdit: $isEdit) {
    carId
    error
  }
}
    `;
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
  }
}
    `;
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
  }
}
    `;
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
  }
}
    `;
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
export const EditCarDocumentsDocument = gql`
    mutation EditCarDocuments($carId: Float!, $input: CarDocumentsInput!) {
  editCarDocuments(carId: $carId, input: $input) {
    error
    carId
  }
}
    `;
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
export const EditCarLocationDocument = gql`
    mutation EditCarLocation($carId: Float!, $input: CarLocationInput!) {
  editCarLocation(carId: $carId, input: $input) {
    error
    carId
  }
}
    `;
export type EditCarLocationMutationFn = Apollo.MutationFunction<EditCarLocationMutation, EditCarLocationMutationVariables>;

/**
 * __useEditCarLocationMutation__
 *
 * To run a mutation, you first call `useEditCarLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarLocationMutation, { data, loading, error }] = useEditCarLocationMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarLocationMutation(baseOptions?: Apollo.MutationHookOptions<EditCarLocationMutation, EditCarLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarLocationMutation, EditCarLocationMutationVariables>(EditCarLocationDocument, options);
      }
export type EditCarLocationMutationHookResult = ReturnType<typeof useEditCarLocationMutation>;
export type EditCarLocationMutationResult = Apollo.MutationResult<EditCarLocationMutation>;
export type EditCarLocationMutationOptions = Apollo.BaseMutationOptions<EditCarLocationMutation, EditCarLocationMutationVariables>;
export const EditCarLuxuryAndVipServicesDocument = gql`
    mutation EditCarLuxuryAndVipServices($carId: Float!, $input: CarLuxuryAndVipServicesInput!) {
  editCarLuxuryAndVipServices(carId: $carId, input: $input) {
    carId
    error
  }
}
    `;
export type EditCarLuxuryAndVipServicesMutationFn = Apollo.MutationFunction<EditCarLuxuryAndVipServicesMutation, EditCarLuxuryAndVipServicesMutationVariables>;

/**
 * __useEditCarLuxuryAndVipServicesMutation__
 *
 * To run a mutation, you first call `useEditCarLuxuryAndVipServicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarLuxuryAndVipServicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarLuxuryAndVipServicesMutation, { data, loading, error }] = useEditCarLuxuryAndVipServicesMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarLuxuryAndVipServicesMutation(baseOptions?: Apollo.MutationHookOptions<EditCarLuxuryAndVipServicesMutation, EditCarLuxuryAndVipServicesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarLuxuryAndVipServicesMutation, EditCarLuxuryAndVipServicesMutationVariables>(EditCarLuxuryAndVipServicesDocument, options);
      }
export type EditCarLuxuryAndVipServicesMutationHookResult = ReturnType<typeof useEditCarLuxuryAndVipServicesMutation>;
export type EditCarLuxuryAndVipServicesMutationResult = Apollo.MutationResult<EditCarLuxuryAndVipServicesMutation>;
export type EditCarLuxuryAndVipServicesMutationOptions = Apollo.BaseMutationOptions<EditCarLuxuryAndVipServicesMutation, EditCarLuxuryAndVipServicesMutationVariables>;
export const EditCarMilesDocument = gql`
    mutation EditCarMiles($carId: Float!, $input: CarMilesInput!) {
  editCarMiles(carId: $carId, input: $input) {
    error
    carId
  }
}
    `;
export type EditCarMilesMutationFn = Apollo.MutationFunction<EditCarMilesMutation, EditCarMilesMutationVariables>;

/**
 * __useEditCarMilesMutation__
 *
 * To run a mutation, you first call `useEditCarMilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarMilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarMilesMutation, { data, loading, error }] = useEditCarMilesMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarMilesMutation(baseOptions?: Apollo.MutationHookOptions<EditCarMilesMutation, EditCarMilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarMilesMutation, EditCarMilesMutationVariables>(EditCarMilesDocument, options);
      }
export type EditCarMilesMutationHookResult = ReturnType<typeof useEditCarMilesMutation>;
export type EditCarMilesMutationResult = Apollo.MutationResult<EditCarMilesMutation>;
export type EditCarMilesMutationOptions = Apollo.BaseMutationOptions<EditCarMilesMutation, EditCarMilesMutationVariables>;
export const EditCarPhotosDocument = gql`
    mutation EditCarPhotos($carId: Float!, $input: CarPhotosInput!) {
  editCarPhotos(carId: $carId, input: $input) {
    error
    carId
  }
}
    `;
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
export const EditCarPrimaryFeaturesDocument = gql`
    mutation EditCarPrimaryFeatures($carId: Float!, $input: CarPrimaryFeaturesInput!) {
  editCarPrimaryFeatures(carId: $carId, input: $input) {
    error
    carId
  }
}
    `;
export type EditCarPrimaryFeaturesMutationFn = Apollo.MutationFunction<EditCarPrimaryFeaturesMutation, EditCarPrimaryFeaturesMutationVariables>;

/**
 * __useEditCarPrimaryFeaturesMutation__
 *
 * To run a mutation, you first call `useEditCarPrimaryFeaturesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarPrimaryFeaturesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarPrimaryFeaturesMutation, { data, loading, error }] = useEditCarPrimaryFeaturesMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarPrimaryFeaturesMutation(baseOptions?: Apollo.MutationHookOptions<EditCarPrimaryFeaturesMutation, EditCarPrimaryFeaturesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarPrimaryFeaturesMutation, EditCarPrimaryFeaturesMutationVariables>(EditCarPrimaryFeaturesDocument, options);
      }
export type EditCarPrimaryFeaturesMutationHookResult = ReturnType<typeof useEditCarPrimaryFeaturesMutation>;
export type EditCarPrimaryFeaturesMutationResult = Apollo.MutationResult<EditCarPrimaryFeaturesMutation>;
export type EditCarPrimaryFeaturesMutationOptions = Apollo.BaseMutationOptions<EditCarPrimaryFeaturesMutation, EditCarPrimaryFeaturesMutationVariables>;
export const EditCarRatesDocument = gql`
    mutation EditCarRates($carId: Float!, $input: CarRatesInput!) {
  editCarRates(carId: $carId, input: $input) {
    error
    carId
  }
}
    `;
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
export const EditCarSecondaryFeaturesDocument = gql`
    mutation EditCarSecondaryFeatures($carId: Float!, $input: CarSecondaryFeaturesInput!) {
  editCarSecondaryFeatures(carId: $carId, input: $input) {
    error
    carId
  }
}
    `;
export type EditCarSecondaryFeaturesMutationFn = Apollo.MutationFunction<EditCarSecondaryFeaturesMutation, EditCarSecondaryFeaturesMutationVariables>;

/**
 * __useEditCarSecondaryFeaturesMutation__
 *
 * To run a mutation, you first call `useEditCarSecondaryFeaturesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarSecondaryFeaturesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarSecondaryFeaturesMutation, { data, loading, error }] = useEditCarSecondaryFeaturesMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarSecondaryFeaturesMutation(baseOptions?: Apollo.MutationHookOptions<EditCarSecondaryFeaturesMutation, EditCarSecondaryFeaturesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarSecondaryFeaturesMutation, EditCarSecondaryFeaturesMutationVariables>(EditCarSecondaryFeaturesDocument, options);
      }
export type EditCarSecondaryFeaturesMutationHookResult = ReturnType<typeof useEditCarSecondaryFeaturesMutation>;
export type EditCarSecondaryFeaturesMutationResult = Apollo.MutationResult<EditCarSecondaryFeaturesMutation>;
export type EditCarSecondaryFeaturesMutationOptions = Apollo.BaseMutationOptions<EditCarSecondaryFeaturesMutation, EditCarSecondaryFeaturesMutationVariables>;
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
      id
      user_name
      first_name
      last_name
      email
      phone
      avatar {
        public_id
        url
        secure_url
      }
      business_name
    }
  }
}
    `;

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
      id
      name
      reg_no
      description
      owner {
        first_name
        last_name
        created_at
        avatar {
          public_id
          secure_url
          url
        }
        business_name
      }
      trips
      features {
        title
      }
      photos {
        public_id
        url
        secure_url
      }
      documents {
        title
        file {
          public_id
          url
          secure_url
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
      miles_per_day
      extra_mile_rate
      besties {
        id
      }
      booked
      categories
      luxury_vip_services
      color
    }
  }
}
    `;

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
      public_id
      url
      secure_url
    }
    documents {
      title
      file {
        public_id
        url
        secure_url
      }
    }
    reviews
    daily_rate
    trips
    besties {
      id
    }
  }
}
    `;

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
    description
    owner {
      first_name
      last_name
    }
    trips
    features {
      title
    }
    reviews
    photos {
      secure_url
    }
    reg_no
    daily_rate
    booked
    available
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
      public_id
      url
      secure_url
    }
    documents {
      title
      file {
        public_id
        url
        secure_url
      }
    }
    reviews
    daily_rate
    trips
    besties {
      id
    }
  }
}
    `;

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
      public_id
      url
      secure_url
    }
    documents {
      title
      file {
        public_id
        url
        secure_url
      }
    }
    reviews
  }
}
    `;

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