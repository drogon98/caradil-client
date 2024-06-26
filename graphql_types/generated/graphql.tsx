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

export type AccountNotificationsSettingsInput = {
  receive_marketing_emails: Scalars['Boolean'];
};

export type AccountOverviewResponse = {
  __typename?: 'AccountOverviewResponse';
  bookings?: Maybe<Scalars['Float']>;
  earnings?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['String']>;
  plan?: Maybe<Plan>;
  trips: Scalars['Float'];
};

export type AccountPaymentInput = {
  payment_channel?: InputMaybe<Scalars['String']>;
  payment_channel_data?: InputMaybe<PaymentChannelInput>;
};

export type AccountPlanResponse = {
  __typename?: 'AccountPlanResponse';
  error?: Maybe<Scalars['String']>;
  plan?: Maybe<Plan>;
};

export type AccountServicesOfferedInput = {
  servicesOffered: Array<Scalars['String']>;
};

export type AccountSettings = {
  __typename?: 'AccountSettings';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  payment_channel?: Maybe<Scalars['String']>;
  payment_channel_data?: Maybe<PaymentChannelData>;
  receive_marketing_emails?: Maybe<Scalars['Boolean']>;
  services_offered?: Maybe<Array<Scalars['String']>>;
  updated_at?: Maybe<Scalars['DateTime']>;
  user_id?: Maybe<Scalars['String']>;
};

export type AccountSettingsResponse = {
  __typename?: 'AccountSettingsResponse';
  accountSettings?: Maybe<AccountSettings>;
  error?: Maybe<Scalars['String']>;
};

export type BookingResponse = {
  __typename?: 'BookingResponse';
  error?: Maybe<Scalars['String']>;
  trip?: Maybe<Trip>;
};

export type CancelTripInput = {
  cancelAction: Scalars['String'];
  cancelReason: Scalars['String'];
  cancelTime: Scalars['String'];
};

export type CancelTripResponse = {
  __typename?: 'CancelTripResponse';
  email_sent?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Car = {
  __typename?: 'Car';
  advance_book_period?: Maybe<Scalars['Float']>;
  amount?: Maybe<Scalars['Float']>;
  bags?: Maybe<Scalars['Float']>;
  besties?: Maybe<Array<User>>;
  book_and_trip_days?: Maybe<Array<Scalars['Float']>>;
  car_count?: Maybe<Scalars['Float']>;
  car_market_class?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Scalars['String']>>;
  charge_extra_distance_travelled?: Maybe<Scalars['Boolean']>;
  color?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  delivery?: Maybe<Scalars['Boolean']>;
  delivery_rate?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  documents?: Maybe<Array<DocumentObj>>;
  doors?: Maybe<Scalars['Float']>;
  end_user_type?: Maybe<Scalars['String']>;
  extra_distance_fee_per_km?: Maybe<Scalars['Float']>;
  features?: Maybe<Array<FeatureObj>>;
  free_delivery_distance?: Maybe<Scalars['Float']>;
  fuel_efficiency?: Maybe<Scalars['String']>;
  fuel_policy?: Maybe<Scalars['String']>;
  gas?: Maybe<Scalars['String']>;
  has_unlimited_distance?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_or_passport_no?: Maybe<Scalars['String']>;
  is_gps_enabled?: Maybe<Scalars['Boolean']>;
  latitude?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['Float']>;
  make?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  owner_id?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<FileObj>>;
  pick_up_latitude?: Maybe<Scalars['Float']>;
  pick_up_location?: Maybe<Scalars['String']>;
  pick_up_longitude?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['Boolean']>;
  reg_no?: Maybe<Scalars['String']>;
  remaining_cars?: Maybe<Scalars['Float']>;
  reviews?: Maybe<Review>;
  seats?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  status_remarks?: Maybe<Scalars['String']>;
  transmission?: Maybe<Scalars['String']>;
  trip_type?: Maybe<Scalars['String']>;
  trips?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type CarAddEditResponse = {
  __typename?: 'CarAddEditResponse';
  car?: Maybe<Car>;
  carId?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type CarCategoriesInput = {
  categories: Array<Scalars['String']>;
};

export type CarDescriptionInput = {
  description: Scalars['String'];
};

export type CarDistanceInput = {
  charge_extra_distance_travelled: Scalars['Boolean'];
  distance: Scalars['Float'];
  has_unlimited_distance?: InputMaybe<Scalars['Boolean']>;
};

export type CarDocumentsInput = {
  documents: Array<DocumentInput>;
};

export type CarDriverAndDeliveryInput = {
  delivery: Scalars['Boolean'];
  driver_mode: Scalars['Float'];
};

export type CarFeaturesInput = {
  bags: Scalars['Float'];
  color: Scalars['String'];
  doors: Scalars['Float'];
  features: Array<FeatureInput>;
  gas: Scalars['String'];
  seats: Scalars['Float'];
  transmission: Scalars['String'];
};

export type CarFuelingInput = {
  fuel_efficiency: Scalars['String'];
  fuel_policy: Scalars['String'];
};

export type CarGeneralInfoInput = {
  car_count: Scalars['Float'];
  end_user_type: Scalars['String'];
  id_or_passport_no: Scalars['String'];
  is_gps_enabled: Scalars['Boolean'];
  make: Scalars['String'];
  name: Scalars['String'];
  reg_no: Scalars['String'];
};

export type CarLocationAndDeliveryInput = {
  delivery: Scalars['Boolean'];
  free_delivery_distance?: InputMaybe<Scalars['Float']>;
  latitude: Scalars['Float'];
  location: Scalars['String'];
  longitude: Scalars['Float'];
  pick_up_latitude: Scalars['Float'];
  pick_up_location: Scalars['String'];
  pick_up_longitude: Scalars['Float'];
};

export type CarPhotosInput = {
  photos: Array<FileInput>;
};

export type CarRatesInput = {
  amount: Scalars['Float'];
  delivery_rate?: InputMaybe<Scalars['Float']>;
  extra_distance_fee_per_km?: InputMaybe<Scalars['Float']>;
};

export type CarResponse = {
  __typename?: 'CarResponse';
  car?: Maybe<Car>;
  error?: Maybe<Scalars['String']>;
  rental_services: Array<Scalars['String']>;
};

export type CarTripSettingsInput = {
  advance_book_period: Scalars['Float'];
  book_and_trip_days: Array<Scalars['Float']>;
  car_market_class: Scalars['String'];
  trip_type: Scalars['String'];
};

export type CarsResponse = {
  __typename?: 'CarsResponse';
  cursor: MyCursor;
  data: Array<Car>;
};

export type Chat = {
  __typename?: 'Chat';
  chat_meta?: Maybe<ChatMeta>;
  chat_meta_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  read?: Maybe<Scalars['Boolean']>;
  receiver_deleted?: Maybe<Scalars['Boolean']>;
  receiver_id?: Maybe<Scalars['String']>;
  sender_deleted?: Maybe<Scalars['Boolean']>;
  sender_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type ChatInput = {
  chat_meta_id: Scalars['String'];
  message: Scalars['String'];
  receiver_id: Scalars['String'];
};

export type ChatMeta = {
  __typename?: 'ChatMeta';
  chats?: Maybe<Chat>;
  created_at?: Maybe<Scalars['DateTime']>;
  guest_id?: Maybe<Scalars['String']>;
  host_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  is_closed?: Maybe<Scalars['Boolean']>;
  latest_chat?: Maybe<Chat>;
  no_chat?: Maybe<Scalars['String']>;
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
  unread_chats_count?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Contact = {
  __typename?: 'Contact';
  created_at?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
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

export type CreateCarEditRequestResponse = {
  __typename?: 'CreateCarEditRequestResponse';
  car?: Maybe<Car>;
  error?: Maybe<Scalars['String']>;
};

export type CreateTripResponse = {
  __typename?: 'CreateTripResponse';
  success: Scalars['Boolean'];
  tripId?: Maybe<Scalars['String']>;
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

export type DriverDetailsInput = {
  age: Scalars['Float'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  license: FileInput;
  license_expiry_date: Scalars['String'];
  license_number: Scalars['String'];
};

export type DriverLicenseDetails = {
  __typename?: 'DriverLicenseDetails';
  age?: Maybe<Scalars['Float']>;
  approved_to_drive?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['DateTime']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  license?: Maybe<FileObj>;
  license_expiry_date?: Maybe<Scalars['Float']>;
  license_number?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Earning = {
  __typename?: 'Earning';
  amount?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  transaction_id?: Maybe<Scalars['String']>;
  trip_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  user_id?: Maybe<Scalars['String']>;
};

export type EditProfileInput = {
  avatar?: InputMaybe<FileInput>;
  business_name?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  user_name?: InputMaybe<Scalars['String']>;
};

export type EditProfileResponse = {
  __typename?: 'EditProfileResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Faq = {
  __typename?: 'Faq';
  answer?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  intended_user?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type FaqInput = {
  answer: Scalars['String'];
  intended_user: Scalars['String'];
  question: Scalars['String'];
};

export type FaqResponse = {
  __typename?: 'FaqResponse';
  success: Scalars['Boolean'];
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

export type HostCanListACarResponse = {
  __typename?: 'HostCanListACarResponse';
  carsListed?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['Boolean']>;
  hasPlanHistory?: Maybe<Scalars['Boolean']>;
  plan?: Maybe<Plan>;
  setupBusiness?: Maybe<Scalars['Boolean']>;
};

export type LoginInput = {
  email: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  password: Scalars['String'];
};

export type Make = {
  __typename?: 'Make';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  photo?: Maybe<FileObj>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
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
  activateCar: CreateCarEditRequestResponse;
  addEditCarGeneralInfo: CarAddEditResponse;
  addFaq: FaqResponse;
  addMake: MakeResponse;
  cancelTrip: CancelTripResponse;
  checkReservedGuestId: Scalars['Boolean'];
  contact: ContactResponse;
  createChat: Scalars['Boolean'];
  createReview: Scalars['Boolean'];
  createTrip: CreateTripResponse;
  deActivateCar: CreateCarEditRequestResponse;
  deleteUpload: Scalars['Boolean'];
  editAccountNotificationsSettings: Scalars['Boolean'];
  editAccountPayment: Scalars['Boolean'];
  editAccountServicesOffered: Scalars['Boolean'];
  editCarCategories: CarAddEditResponse;
  editCarDescription: CarAddEditResponse;
  editCarDistance: CarAddEditResponse;
  editCarDocuments: CarAddEditResponse;
  editCarDriverAndDelivery: CarAddEditResponse;
  editCarFeatures: CarAddEditResponse;
  editCarFueling: CarAddEditResponse;
  editCarLocationAndDelivery: CarAddEditResponse;
  editCarPhotos: CarAddEditResponse;
  editCarPublished: Scalars['Boolean'];
  editCarRates: CarAddEditResponse;
  editCarReservedForBooking: Scalars['Boolean'];
  editCarSuspended: Scalars['Boolean'];
  editCarTripSettings: CarAddEditResponse;
  editProfile: EditProfileResponse;
  forgotPassword: PasswordResponse;
  login: TokenResponse;
  makeCarEditable: CreateCarEditRequestResponse;
  markAllRead: Scalars['Boolean'];
  payForTrip: CreateTripResponse;
  refundOrCompensate: Scalars['Boolean'];
  register: TokenResponse;
  republishCar: CreateCarEditRequestResponse;
  rescheduleTrip: UpdateTripStatusResponse;
  resetPassword: PasswordResponse;
  revokeUserRefreshToken: Scalars['Boolean'];
  singleUpload: UploadedFileResponse;
  subscribeUpgradeRenewPlan: PlanUpgradeRenewResponse;
  updateDriverDetails: Scalars['Boolean'];
  updateFavourite: UpdateFavouriteResponse;
  updateTripStatus: UpdateTripStatusResponse;
  upgradeAccount: Scalars['Boolean'];
  verifyEmail: VerifyEmailResponse;
};


export type MutationActivateCarArgs = {
  carId: Scalars['String'];
};


export type MutationAddEditCarGeneralInfoArgs = {
  carId?: InputMaybe<Scalars['String']>;
  input: CarGeneralInfoInput;
  isEdit?: InputMaybe<Scalars['Boolean']>;
};


export type MutationAddFaqArgs = {
  input: FaqInput;
};


export type MutationAddMakeArgs = {
  input: MakeInput;
};


export type MutationCancelTripArgs = {
  input: CancelTripInput;
  tripId: Scalars['String'];
};


export type MutationCheckReservedGuestIdArgs = {
  carId: Scalars['String'];
};


export type MutationContactArgs = {
  input: ContactInput;
};


export type MutationCreateChatArgs = {
  input: ChatInput;
};


export type MutationCreateReviewArgs = {
  input: ReviewInput;
  tripId: Scalars['String'];
};


export type MutationCreateTripArgs = {
  input: TripInput;
};


export type MutationDeActivateCarArgs = {
  carId: Scalars['String'];
};


export type MutationDeleteUploadArgs = {
  publicId: Scalars['String'];
};


export type MutationEditAccountNotificationsSettingsArgs = {
  input: AccountNotificationsSettingsInput;
};


export type MutationEditAccountPaymentArgs = {
  input: AccountPaymentInput;
};


export type MutationEditAccountServicesOfferedArgs = {
  input: AccountServicesOfferedInput;
};


export type MutationEditCarCategoriesArgs = {
  carId: Scalars['String'];
  input: CarCategoriesInput;
};


export type MutationEditCarDescriptionArgs = {
  carId: Scalars['String'];
  input: CarDescriptionInput;
};


export type MutationEditCarDistanceArgs = {
  carId: Scalars['String'];
  input: CarDistanceInput;
};


export type MutationEditCarDocumentsArgs = {
  carId: Scalars['String'];
  input: CarDocumentsInput;
};


export type MutationEditCarDriverAndDeliveryArgs = {
  carId: Scalars['String'];
  input: CarDriverAndDeliveryInput;
};


export type MutationEditCarFeaturesArgs = {
  carId: Scalars['String'];
  input: CarFeaturesInput;
};


export type MutationEditCarFuelingArgs = {
  carId: Scalars['String'];
  input: CarFuelingInput;
};


export type MutationEditCarLocationAndDeliveryArgs = {
  carId: Scalars['String'];
  input: CarLocationAndDeliveryInput;
};


export type MutationEditCarPhotosArgs = {
  carId: Scalars['String'];
  input: CarPhotosInput;
};


export type MutationEditCarPublishedArgs = {
  carId: Scalars['String'];
};


export type MutationEditCarRatesArgs = {
  carId: Scalars['String'];
  input: CarRatesInput;
};


export type MutationEditCarReservedForBookingArgs = {
  carId: Scalars['String'];
};


export type MutationEditCarSuspendedArgs = {
  action: Scalars['String'];
  carId: Scalars['String'];
  suspend_reason?: InputMaybe<Scalars['String']>;
};


export type MutationEditCarTripSettingsArgs = {
  carId: Scalars['String'];
  input: CarTripSettingsInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMakeCarEditableArgs = {
  carId: Scalars['String'];
};


export type MutationPayForTripArgs = {
  input: PayForTripInput;
};


export type MutationRefundOrCompensateArgs = {
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRepublishCarArgs = {
  carId: Scalars['String'];
};


export type MutationRescheduleTripArgs = {
  input: TripRescheduleInput;
  tripId: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationRevokeUserRefreshTokenArgs = {
  userId: Scalars['Int'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationSubscribeUpgradeRenewPlanArgs = {
  input: PlanSubscribeUpgradeRenewInput;
};


export type MutationUpdateDriverDetailsArgs = {
  input: DriverDetailsInput;
};


export type MutationUpdateFavouriteArgs = {
  carId: Scalars['String'];
  opType: Scalars['String'];
};


export type MutationUpdateTripStatusArgs = {
  publish?: InputMaybe<Scalars['Boolean']>;
  remarks?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
  tripId: Scalars['String'];
};


export type MutationUpgradeAccountArgs = {
  input: UpgradeAccountInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type MyCursor = {
  __typename?: 'MyCursor';
  afterCursor?: Maybe<Scalars['String']>;
  beforeCursor?: Maybe<Scalars['String']>;
};

export type MyInputCursor = {
  afterCursor?: InputMaybe<Scalars['String']>;
  beforeCursor?: InputMaybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  created_at?: Maybe<Scalars['DateTime']>;
  from_admin?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  notification_type?: Maybe<Scalars['String']>;
  read?: Maybe<Scalars['Boolean']>;
  receiver_id?: Maybe<Scalars['String']>;
  sender?: Maybe<User>;
  sender_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type PasswordResponse = {
  __typename?: 'PasswordResponse';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PayForTripInput = {
  transaction_amount: Scalars['String'];
  transaction_channel: Scalars['String'];
  transaction_code: Scalars['String'];
  transaction_invoice_no: Scalars['String'];
  transaction_order_id: Scalars['String'];
  transaction_status: Scalars['String'];
  trip_code: Scalars['String'];
};

export type PaymentChannelData = {
  __typename?: 'PaymentChannelData';
  subject?: Maybe<Scalars['String']>;
};

export type PaymentChannelInput = {
  subject?: InputMaybe<Scalars['String']>;
};

export type Plan = {
  __typename?: 'Plan';
  active?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['DateTime']>;
  due_date?: Maybe<Scalars['Float']>;
  history?: Maybe<PlanHistory>;
  id?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type PlanHistory = {
  __typename?: 'PlanHistory';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  plan?: Maybe<Plan>;
  plan_action_type?: Maybe<Scalars['String']>;
  transaction_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type PlanSubscribeUpgradeRenewInput = {
  period?: InputMaybe<Scalars['String']>;
  plan_action_type?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  transaction_amount: Scalars['String'];
  transaction_channel: Scalars['String'];
  transaction_code: Scalars['String'];
  transaction_invoice_no: Scalars['String'];
  transaction_order_id: Scalars['String'];
  transaction_status: Scalars['String'];
};

export type PlanUpgradeRenewResponse = {
  __typename?: 'PlanUpgradeRenewResponse';
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  cars: Array<Car>;
  enquiries: Array<Contact>;
  faqs: Array<Faq>;
  getAccountOverview: AccountOverviewResponse;
  getAccountSettings: AccountSettingsResponse;
  getAdminCars: Array<Car>;
  getBooking: BookingResponse;
  getCar: CarResponse;
  getCarReviews: Array<Review>;
  getCars: CarsResponse;
  getChats: Array<Chat>;
  getDriverDetails: DriverLicenseDetails;
  getEarnings: Array<Earning>;
  getHostCars: Array<Car>;
  getMyBookings: Array<Trip>;
  getMyTrips: Array<Trip>;
  getNotifications: Array<Notification>;
  getPlan: AccountPlanResponse;
  getPopularCars: Array<Car>;
  getTransactions: Array<Transaction>;
  getTrip: TripResponse;
  getUser: UserResponse;
  getUserChatMetas: Array<ChatMeta>;
  getUsers: Array<User>;
  hostCanListACarData: HostCanListACarResponse;
  makes: Array<Make>;
  resendVerifyEmailLink: Scalars['Boolean'];
  trips: Array<Trip>;
  users: Array<User>;
};


export type QueryFaqsArgs = {
  faqIntendedUser?: InputMaybe<Scalars['String']>;
};


export type QueryGetAdminCarsArgs = {
  type_: Scalars['String'];
};


export type QueryGetBookingArgs = {
  bookingId: Scalars['String'];
};


export type QueryGetCarArgs = {
  carId: Scalars['String'];
  carName?: InputMaybe<Scalars['String']>;
};


export type QueryGetCarReviewsArgs = {
  carId: Scalars['String'];
};


export type QueryGetCarsArgs = {
  input: SearchInput;
};


export type QueryGetChatsArgs = {
  chatMetaId: Scalars['String'];
};


export type QueryGetNotificationsArgs = {
  type_?: InputMaybe<Scalars['String']>;
};


export type QueryGetTransactionsArgs = {
  type_: Scalars['String'];
};


export type QueryGetTripArgs = {
  tripId: Scalars['String'];
};

export type RealTimeUpdateCarDataObj = {
  __typename?: 'RealTimeUpdateCarDataObj';
  active?: Maybe<Scalars['Boolean']>;
  being_edited?: Maybe<Scalars['Boolean']>;
  reserved_for_booking?: Maybe<Scalars['Boolean']>;
  reserved_for_booking_guest_id?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  country: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  period?: InputMaybe<Scalars['String']>;
  plan?: InputMaybe<Scalars['String']>;
  register_via: Scalars['String'];
  role: Scalars['Float'];
};

export type ResetPasswordInput = {
  password?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type Review = {
  __typename?: 'Review';
  car?: Maybe<Car>;
  car_id?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  reviewer?: Maybe<User>;
  reviewer_id?: Maybe<Scalars['String']>;
  stars?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type ReviewInput = {
  comment: Scalars['String'];
  stars: Scalars['Float'];
};

export type SearchInput = {
  car_market_class?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  color?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<MyInputCursor>;
  end_date?: InputMaybe<Scalars['String']>;
  end_time?: InputMaybe<Scalars['String']>;
  end_user_type?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  max_rate?: InputMaybe<Scalars['String']>;
  min_rate?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['String']>;
  start_date?: InputMaybe<Scalars['String']>;
  start_time?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  trip_duration?: InputMaybe<Scalars['String']>;
  trip_type?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newChat: Chat;
  notification: Notification;
  tripStatus: TripStatus_;
  updatedCar: RealTimeUpdateCarDataObj;
  userUpdate: User;
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
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  invoice_no?: Maybe<Scalars['String']>;
  order_id?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  transaction_code?: Maybe<Scalars['String']>;
  transaction_type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type Trip = {
  __typename?: 'Trip';
  amount?: Maybe<Scalars['String']>;
  bags?: Maybe<Scalars['Float']>;
  cancelled_and_guest_want_another_car?: Maybe<Scalars['Boolean']>;
  canceller_id?: Maybe<Scalars['String']>;
  car?: Maybe<Car>;
  car_count?: Maybe<Scalars['Float']>;
  car_id?: Maybe<Scalars['String']>;
  car_owner_id?: Maybe<Scalars['String']>;
  chat_meta_id?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  confirmation_date?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['DateTime']>;
  delivery_distance?: Maybe<Scalars['String']>;
  delivery_location?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['Float']>;
  end_time?: Maybe<Scalars['String']>;
  guest_cancellation_date?: Maybe<Scalars['Float']>;
  host_cancellation_date?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['String']>;
  is_rescheduled?: Maybe<Scalars['Boolean']>;
  operational_areas?: Maybe<Array<Scalars['String']>>;
  owner?: Maybe<User>;
  owner_id?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['Boolean']>;
  reschedule_date?: Maybe<Scalars['Float']>;
  reschedule_history?: Maybe<Array<Scalars['String']>>;
  reschedule_reason?: Maybe<Scalars['String']>;
  start_date?: Maybe<Scalars['Float']>;
  start_time?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  status_remarks?: Maybe<Scalars['String']>;
  success_confirmation_date?: Maybe<Scalars['Float']>;
  to_be_delivered?: Maybe<Scalars['Boolean']>;
  transaction_ids?: Maybe<Array<Scalars['String']>>;
  travellers?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type TripInput = {
  amount: Scalars['String'];
  bags: Scalars['Float'];
  car_count: Scalars['Float'];
  car_id: Scalars['String'];
  delivery_distance?: InputMaybe<Scalars['String']>;
  delivery_location?: InputMaybe<Scalars['String']>;
  end_date: Scalars['Float'];
  end_time: Scalars['String'];
  operational_areas: Array<Scalars['String']>;
  start_date: Scalars['Float'];
  start_time: Scalars['String'];
  travellers: Scalars['Float'];
};

export type TripRescheduleInput = {
  end_date: Scalars['Float'];
  end_time: Scalars['String'];
  reschedule_reason: Scalars['String'];
  start_date: Scalars['Float'];
  start_time: Scalars['String'];
};

export type TripResponse = {
  __typename?: 'TripResponse';
  error?: Maybe<Scalars['String']>;
  trip?: Maybe<Trip>;
};

export type TripStatus_ = {
  __typename?: 'TripStatus_';
  chat_meta_id?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  trip_canceller_id?: Maybe<Scalars['String']>;
  why_cancel_trip?: Maybe<Scalars['String']>;
};

export type UpdateFavouriteResponse = {
  __typename?: 'UpdateFavouriteResponse';
  error?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type UpdateTripStatusResponse = {
  __typename?: 'UpdateTripStatusResponse';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpgradeAccountInput = {
  period?: InputMaybe<Scalars['String']>;
  plan?: InputMaybe<Scalars['String']>;
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
  avatar?: Maybe<FileObj>;
  business_name?: Maybe<Scalars['String']>;
  cars?: Maybe<Car>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  favourite_cars?: Maybe<Array<Car>>;
  first_name?: Maybe<Scalars['String']>;
  has_host_badge?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phone_verified?: Maybe<Scalars['Boolean']>;
  register_via?: Maybe<Scalars['String']>;
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

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  error?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
};

export type CarInfoFragment = { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, bags?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, status?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined };

export type CarPrivateInfoFragment = { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined };

export type ChatInfoFragment = { __typename?: 'Chat', id?: string | null | undefined, message?: string | null | undefined, receiver_id?: string | null | undefined, sender_id?: string | null | undefined, read?: boolean | null | undefined, sender_deleted?: boolean | null | undefined, receiver_deleted?: boolean | null | undefined, created_at?: any | null | undefined };

export type FileInfoFragment = { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined };

export type NotificationInfoFragment = { __typename?: 'Notification', id?: string | null | undefined, sender_id?: string | null | undefined, receiver_id?: string | null | undefined, from_admin?: boolean | null | undefined, message?: string | null | undefined, sender?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined };

export type PlanInfoFragment = { __typename?: 'Plan', id?: string | null | undefined, title?: string | null | undefined, start_date?: number | null | undefined, due_date?: number | null | undefined, active?: boolean | null | undefined, period?: string | null | undefined };

export type TripInfoFragment = { __typename?: 'Trip', id?: string | null | undefined, start_date?: number | null | undefined, end_date?: number | null | undefined, start_time?: string | null | undefined, end_time?: string | null | undefined, status?: string | null | undefined, chat_meta_id?: string | null | undefined, owner_id?: string | null | undefined, car_owner_id?: string | null | undefined, canceller_id?: string | null | undefined, delivery_location?: string | null | undefined, delivery_distance?: string | null | undefined, paid?: boolean | null | undefined, amount?: string | null | undefined, code: string, created_at?: any | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined } | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined };

export type UserInfoFragment = { __typename?: 'User', id?: string | null | undefined, user_name?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, email_verified?: boolean | null | undefined, phone?: string | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined };

export type ActivateCarMutationVariables = Exact<{
  carId: Scalars['String'];
}>;


export type ActivateCarMutation = { __typename?: 'Mutation', activateCar: { __typename?: 'CreateCarEditRequestResponse', error?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type AddEditCarGeneralInfoMutationVariables = Exact<{
  options: CarGeneralInfoInput;
  isEdit?: InputMaybe<Scalars['Boolean']>;
  carId?: InputMaybe<Scalars['String']>;
}>;


export type AddEditCarGeneralInfoMutation = { __typename?: 'Mutation', addEditCarGeneralInfo: { __typename?: 'CarAddEditResponse', carId?: string | null | undefined, error?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type AddFaqMutationVariables = Exact<{
  input: FaqInput;
}>;


export type AddFaqMutation = { __typename?: 'Mutation', addFaq: { __typename?: 'FaqResponse', success: boolean } };

export type AddCarMakeMutationVariables = Exact<{
  input: MakeInput;
}>;


export type AddCarMakeMutation = { __typename?: 'Mutation', addMake: { __typename?: 'MakeResponse', success: boolean } };

export type CancelTripMutationVariables = Exact<{
  tripId: Scalars['String'];
  input: CancelTripInput;
}>;


export type CancelTripMutation = { __typename?: 'Mutation', cancelTrip: { __typename?: 'CancelTripResponse', success?: boolean | null | undefined, email_sent?: boolean | null | undefined, error?: string | null | undefined } };

export type CheckReservedGuestIdMutationVariables = Exact<{
  carId: Scalars['String'];
}>;


export type CheckReservedGuestIdMutation = { __typename?: 'Mutation', checkReservedGuestId: boolean };

export type ContactMutationVariables = Exact<{
  input: ContactInput;
}>;


export type ContactMutation = { __typename?: 'Mutation', contact: { __typename?: 'ContactResponse', success: boolean } };

export type CreateChatMutationVariables = Exact<{
  input: ChatInput;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: boolean };

export type CreateReviewMutationVariables = Exact<{
  tripId: Scalars['String'];
  input: ReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: boolean };

export type CreateTripMutationVariables = Exact<{
  input: TripInput;
}>;


export type CreateTripMutation = { __typename?: 'Mutation', createTrip: { __typename?: 'CreateTripResponse', success: boolean, tripId?: string | null | undefined } };

export type DeActivateCarMutationVariables = Exact<{
  carId: Scalars['String'];
}>;


export type DeActivateCarMutation = { __typename?: 'Mutation', deActivateCar: { __typename?: 'CreateCarEditRequestResponse', error?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type DeleteFileMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteUpload: boolean };

export type EditAccountNotificationsSettingsMutationVariables = Exact<{
  input: AccountNotificationsSettingsInput;
}>;


export type EditAccountNotificationsSettingsMutation = { __typename?: 'Mutation', editAccountNotificationsSettings: boolean };

export type EditAccountPaymentMutationVariables = Exact<{
  input: AccountPaymentInput;
}>;


export type EditAccountPaymentMutation = { __typename?: 'Mutation', editAccountPayment: boolean };

export type EditAccountServicesOfferedMutationVariables = Exact<{
  input: AccountServicesOfferedInput;
}>;


export type EditAccountServicesOfferedMutation = { __typename?: 'Mutation', editAccountServicesOffered: boolean };

export type EditCarCategoriesMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarCategoriesInput;
}>;


export type EditCarCategoriesMutation = { __typename?: 'Mutation', editCarCategories: { __typename?: 'CarAddEditResponse', carId?: string | null | undefined, error?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarDescriptionMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarDescriptionInput;
}>;


export type EditCarDescriptionMutation = { __typename?: 'Mutation', editCarDescription: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarDistanceMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarDistanceInput;
}>;


export type EditCarDistanceMutation = { __typename?: 'Mutation', editCarDistance: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarDocumentsMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarDocumentsInput;
}>;


export type EditCarDocumentsMutation = { __typename?: 'Mutation', editCarDocuments: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarFeaturesMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarFeaturesInput;
}>;


export type EditCarFeaturesMutation = { __typename?: 'Mutation', editCarFeatures: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarFuelingMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarFuelingInput;
}>;


export type EditCarFuelingMutation = { __typename?: 'Mutation', editCarFueling: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarLocationAndDeliveryMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarLocationAndDeliveryInput;
}>;


export type EditCarLocationAndDeliveryMutation = { __typename?: 'Mutation', editCarLocationAndDelivery: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarPhotosMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarPhotosInput;
}>;


export type EditCarPhotosMutation = { __typename?: 'Mutation', editCarPhotos: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarPublishedMutationVariables = Exact<{
  carId: Scalars['String'];
}>;


export type EditCarPublishedMutation = { __typename?: 'Mutation', editCarPublished: boolean };

export type EditCarRatesMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarRatesInput;
}>;


export type EditCarRatesMutation = { __typename?: 'Mutation', editCarRates: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditCarReservedForBookingMutationVariables = Exact<{
  carId: Scalars['String'];
}>;


export type EditCarReservedForBookingMutation = { __typename?: 'Mutation', editCarReservedForBooking: boolean };

export type EditCarSuspendedMutationVariables = Exact<{
  carId: Scalars['String'];
  action: Scalars['String'];
  suspend_reason?: InputMaybe<Scalars['String']>;
}>;


export type EditCarSuspendedMutation = { __typename?: 'Mutation', editCarSuspended: boolean };

export type EditCarTripSettingsMutationVariables = Exact<{
  carId: Scalars['String'];
  input: CarTripSettingsInput;
}>;


export type EditCarTripSettingsMutation = { __typename?: 'Mutation', editCarTripSettings: { __typename?: 'CarAddEditResponse', error?: string | null | undefined, carId?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileResponse', error?: string | null | undefined, user?: { __typename?: 'User', id?: string | null | undefined, user_name?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, email_verified?: boolean | null | undefined, phone?: string | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'PasswordResponse', success?: boolean | null | undefined, error?: string | null | undefined } };

export type LoginMutationVariables = Exact<{
  payload: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenResponse', access_token?: string | null | undefined, error?: string | null | undefined } };

export type MakeCarEditbaleMutationVariables = Exact<{
  carId: Scalars['String'];
}>;


export type MakeCarEditbaleMutation = { __typename?: 'Mutation', makeCarEditable: { __typename?: 'CreateCarEditRequestResponse', error?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type MarkAllNotificationsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsReadMutation = { __typename?: 'Mutation', markAllRead: boolean };

export type PayForTripMutationVariables = Exact<{
  input: PayForTripInput;
}>;


export type PayForTripMutation = { __typename?: 'Mutation', payForTrip: { __typename?: 'CreateTripResponse', success: boolean, tripId?: string | null | undefined } };

export type RefundOrCompensateMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type RefundOrCompensateMutation = { __typename?: 'Mutation', refundOrCompensate: boolean };

export type RegisterMutationVariables = Exact<{
  payload: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'TokenResponse', access_token?: string | null | undefined, error?: string | null | undefined } };

export type RepublishCarMutationVariables = Exact<{
  carId: Scalars['String'];
}>;


export type RepublishCarMutation = { __typename?: 'Mutation', republishCar: { __typename?: 'CreateCarEditRequestResponse', error?: string | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type RescheduleTripMutationVariables = Exact<{
  tripId: Scalars['String'];
  input: TripRescheduleInput;
}>;


export type RescheduleTripMutation = { __typename?: 'Mutation', rescheduleTrip: { __typename?: 'UpdateTripStatusResponse', success?: boolean | null | undefined, error?: string | null | undefined } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'PasswordResponse', success?: boolean | null | undefined, error?: string | null | undefined } };

export type SubscribeUpgradeRenewPlanMutationVariables = Exact<{
  input: PlanSubscribeUpgradeRenewInput;
}>;


export type SubscribeUpgradeRenewPlanMutation = { __typename?: 'Mutation', subscribeUpgradeRenewPlan: { __typename?: 'PlanUpgradeRenewResponse', success: boolean } };

export type UpdateCarFavouriteMutationVariables = Exact<{
  carId: Scalars['String'];
  opType: Scalars['String'];
}>;


export type UpdateCarFavouriteMutation = { __typename?: 'Mutation', updateFavourite: { __typename?: 'UpdateFavouriteResponse', status?: boolean | null | undefined, error?: string | null | undefined } };

export type UpdateDriverDetailsMutationVariables = Exact<{
  input: DriverDetailsInput;
}>;


export type UpdateDriverDetailsMutation = { __typename?: 'Mutation', updateDriverDetails: boolean };

export type UpdateTripStatusMutationVariables = Exact<{
  tripId: Scalars['String'];
  status: Scalars['String'];
  remarks?: InputMaybe<Scalars['String']>;
  publish?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateTripStatusMutation = { __typename?: 'Mutation', updateTripStatus: { __typename?: 'UpdateTripStatusResponse', success?: boolean | null | undefined } };

export type UpgradeAccountMutationVariables = Exact<{
  input: UpgradeAccountInput;
}>;


export type UpgradeAccountMutation = { __typename?: 'Mutation', upgradeAccount: boolean };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', singleUpload: { __typename?: 'UploadedFileResponse', error?: string | null | undefined, file?: { __typename?: 'UploadedFile', public_id: string, url: string, secure_url: string } | null | undefined } };

export type EmailVerifyMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type EmailVerifyMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailResponse', userId?: string | null | undefined, role?: number | null | undefined, error?: string | null | undefined } };

export type GetAccountOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountOverviewQuery = { __typename?: 'Query', getAccountOverview: { __typename?: 'AccountOverviewResponse', trips: number, earnings?: number | null | undefined, bookings?: number | null | undefined, error?: string | null | undefined, plan?: { __typename?: 'Plan', due_date?: number | null | undefined, title?: string | null | undefined, active?: boolean | null | undefined, period?: string | null | undefined } | null | undefined } };

export type GetAccountPlanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountPlanQuery = { __typename?: 'Query', getPlan: { __typename?: 'AccountPlanResponse', error?: string | null | undefined, plan?: { __typename?: 'Plan', due_date?: number | null | undefined, title?: string | null | undefined, active?: boolean | null | undefined, period?: string | null | undefined } | null | undefined } };

export type GetAccountSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountSettingsQuery = { __typename?: 'Query', getAccountSettings: { __typename?: 'AccountSettingsResponse', error?: string | null | undefined, accountSettings?: { __typename?: 'AccountSettings', receive_marketing_emails?: boolean | null | undefined, payment_channel?: string | null | undefined, services_offered?: Array<string> | null | undefined, payment_channel_data?: { __typename?: 'PaymentChannelData', subject?: string | null | undefined } | null | undefined } | null | undefined } };

export type GetAdminCarsQueryVariables = Exact<{
  type_: Scalars['String'];
}>;


export type GetAdminCarsQuery = { __typename?: 'Query', getAdminCars: Array<{ __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined }> };

export type GetAuthUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id?: string | null | undefined, user_name?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, email_verified?: boolean | null | undefined, phone?: string | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined } };

export type GetBookingQueryVariables = Exact<{
  bookingId: Scalars['String'];
}>;


export type GetBookingQuery = { __typename?: 'Query', getBooking: { __typename?: 'BookingResponse', error?: string | null | undefined, trip?: { __typename?: 'Trip', id?: string | null | undefined, start_date?: number | null | undefined, end_date?: number | null | undefined, start_time?: string | null | undefined, end_time?: string | null | undefined, status?: string | null | undefined, chat_meta_id?: string | null | undefined, owner_id?: string | null | undefined, car_owner_id?: string | null | undefined, canceller_id?: string | null | undefined, delivery_location?: string | null | undefined, delivery_distance?: string | null | undefined, paid?: boolean | null | undefined, amount?: string | null | undefined, code: string, created_at?: any | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined } | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } | null | undefined } };

export type GetCarQueryVariables = Exact<{
  carId: Scalars['String'];
  carName: Scalars['String'];
}>;


export type GetCarQuery = { __typename?: 'Query', getCar: { __typename?: 'CarResponse', car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, bags?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, status?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type GetCarReviewsQueryVariables = Exact<{
  carId: Scalars['String'];
}>;


export type GetCarReviewsQuery = { __typename?: 'Query', getCarReviews: Array<{ __typename?: 'Review', id?: string | null | undefined, comment?: string | null | undefined, stars?: number | null | undefined, created_at?: any | null | undefined, reviewer?: { __typename?: 'User', first_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', secure_url?: string | null | undefined } | null | undefined } | null | undefined }> };

export type GetCarsQueryVariables = Exact<{
  input: SearchInput;
}>;


export type GetCarsQuery = { __typename?: 'Query', getCars: { __typename?: 'CarsResponse', data: Array<{ __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, trips?: number | null | undefined, amount?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined }>, cursor: { __typename?: 'MyCursor', beforeCursor?: string | null | undefined, afterCursor?: string | null | undefined } } };

export type GetChatsQueryVariables = Exact<{
  chatMetaId: Scalars['String'];
}>;


export type GetChatsQuery = { __typename?: 'Query', getChats: Array<{ __typename?: 'Chat', id?: string | null | undefined, message?: string | null | undefined, receiver_id?: string | null | undefined, sender_id?: string | null | undefined, read?: boolean | null | undefined, sender_deleted?: boolean | null | undefined, receiver_deleted?: boolean | null | undefined, created_at?: any | null | undefined }> };

export type GetDriverDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDriverDetailsQuery = { __typename?: 'Query', getDriverDetails: { __typename?: 'DriverLicenseDetails', first_name?: string | null | undefined, last_name?: string | null | undefined, license_number?: string | null | undefined, age?: number | null | undefined, license_expiry_date?: number | null | undefined, license?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } };

export type GetEarningsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEarningsQuery = { __typename?: 'Query', getEarnings: Array<{ __typename?: 'Earning', id?: string | null | undefined, amount?: string | null | undefined }> };

export type GetEnquiriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnquiriesQuery = { __typename?: 'Query', enquiries: Array<{ __typename?: 'Contact', id?: string | null | undefined, subject?: string | null | undefined, message?: string | null | undefined, email?: string | null | undefined, created_at?: any | null | undefined }> };

export type GetFaqsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFaqsQuery = { __typename?: 'Query', faqs: Array<{ __typename?: 'Faq', id?: string | null | undefined, question?: string | null | undefined, answer?: string | null | undefined }> };

export type GetHostCanListACarDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHostCanListACarDataQuery = { __typename?: 'Query', hostCanListACarData: { __typename?: 'HostCanListACarResponse', setupBusiness?: boolean | null | undefined, carsListed?: number | null | undefined, hasPlanHistory?: boolean | null | undefined, error?: boolean | null | undefined, plan?: { __typename?: 'Plan', id?: string | null | undefined, title?: string | null | undefined, start_date?: number | null | undefined, due_date?: number | null | undefined, active?: boolean | null | undefined, period?: string | null | undefined } | null | undefined } };

export type GetHostCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHostCarsQuery = { __typename?: 'Query', getHostCars: Array<{ __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, amount?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined, photos?: Array<{ __typename?: 'FileObj', secure_url?: string | null | undefined }> | null | undefined }> };

export type GetMakesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMakesQuery = { __typename?: 'Query', makes: Array<{ __typename?: 'Make', id?: string | null | undefined, title?: string | null | undefined, photo?: { __typename?: 'FileObj', url?: string | null | undefined, secure_url?: string | null | undefined } | null | undefined }> };

export type GetMyBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBookingsQuery = { __typename?: 'Query', getMyBookings: Array<{ __typename?: 'Trip', id?: string | null | undefined, start_date?: number | null | undefined, end_date?: number | null | undefined, start_time?: string | null | undefined, end_time?: string | null | undefined, status?: string | null | undefined, chat_meta_id?: string | null | undefined, owner_id?: string | null | undefined, car_owner_id?: string | null | undefined, canceller_id?: string | null | undefined, delivery_location?: string | null | undefined, delivery_distance?: string | null | undefined, paid?: boolean | null | undefined, amount?: string | null | undefined, code: string, created_at?: any | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined } | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined }> };

export type GetMyTripsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTripsQuery = { __typename?: 'Query', getMyTrips: Array<{ __typename?: 'Trip', id?: string | null | undefined, start_date?: number | null | undefined, end_date?: number | null | undefined, start_time?: string | null | undefined, end_time?: string | null | undefined, status?: string | null | undefined, chat_meta_id?: string | null | undefined, owner_id?: string | null | undefined, car_owner_id?: string | null | undefined, canceller_id?: string | null | undefined, delivery_location?: string | null | undefined, delivery_distance?: string | null | undefined, paid?: boolean | null | undefined, amount?: string | null | undefined, code: string, created_at?: any | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined } | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined }> };

export type GetNotificationsQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications: Array<{ __typename?: 'Notification', id?: string | null | undefined, message?: string | null | undefined, read?: boolean | null | undefined, created_at?: any | null | undefined }> };

export type GetPopularCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPopularCarsQuery = { __typename?: 'Query', getPopularCars: Array<{ __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, trips?: number | null | undefined, amount?: number | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined }> };

export type GetPrivateCarQueryVariables = Exact<{
  carId: Scalars['String'];
}>;


export type GetPrivateCarQuery = { __typename?: 'Query', getCar: { __typename?: 'CarResponse', rental_services: Array<string>, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } };

export type GetTransactionsQueryVariables = Exact<{
  type_: Scalars['String'];
}>;


export type GetTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', id?: string | null | undefined, amount?: string | null | undefined }> };

export type GetTripQueryVariables = Exact<{
  tripId: Scalars['String'];
}>;


export type GetTripQuery = { __typename?: 'Query', getTrip: { __typename?: 'TripResponse', error?: string | null | undefined, trip?: { __typename?: 'Trip', id?: string | null | undefined, start_date?: number | null | undefined, end_date?: number | null | undefined, start_time?: string | null | undefined, end_time?: string | null | undefined, status?: string | null | undefined, chat_meta_id?: string | null | undefined, owner_id?: string | null | undefined, car_owner_id?: string | null | undefined, canceller_id?: string | null | undefined, delivery_location?: string | null | undefined, delivery_distance?: string | null | undefined, paid?: boolean | null | undefined, amount?: string | null | undefined, code: string, created_at?: any | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined } | null | undefined, car?: { __typename?: 'Car', id?: string | null | undefined, name?: string | null | undefined, reg_no?: string | null | undefined, description?: string | null | undefined, trips?: number | null | undefined, seats?: number | null | undefined, doors?: number | null | undefined, transmission?: string | null | undefined, gas?: string | null | undefined, bags?: number | null | undefined, make?: string | null | undefined, location?: string | null | undefined, categories?: Array<string> | null | undefined, color?: string | null | undefined, delivery?: boolean | null | undefined, delivery_rate?: number | null | undefined, has_unlimited_distance?: boolean | null | undefined, advance_book_period?: number | null | undefined, charge_extra_distance_travelled?: boolean | null | undefined, is_gps_enabled?: boolean | null | undefined, car_market_class?: string | null | undefined, book_and_trip_days?: Array<number> | null | undefined, fuel_efficiency?: string | null | undefined, fuel_policy?: string | null | undefined, status?: string | null | undefined, trip_type?: string | null | undefined, end_user_type?: string | null | undefined, id_or_passport_no?: string | null | undefined, longitude?: number | null | undefined, latitude?: number | null | undefined, pick_up_location?: string | null | undefined, pick_up_longitude?: number | null | undefined, pick_up_latitude?: number | null | undefined, amount?: number | null | undefined, extra_distance_fee_per_km?: number | null | undefined, distance?: number | null | undefined, car_count?: number | null | undefined, remaining_cars?: number | null | undefined, free_delivery_distance?: number | null | undefined, owner?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined, created_at?: any | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } | null | undefined, features?: Array<{ __typename?: 'FeatureObj', title?: string | null | undefined }> | null | undefined, photos?: Array<{ __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined }> | null | undefined, documents?: Array<{ __typename?: 'DocumentObj', title?: string | null | undefined, file?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined }> | null | undefined, besties?: Array<{ __typename?: 'User', id?: string | null | undefined }> | null | undefined } | null | undefined } | null | undefined } };

export type GetUserChatMetasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserChatMetasQuery = { __typename?: 'Query', getUserChatMetas: Array<{ __typename?: 'ChatMeta', id?: string | null | undefined, no_chat?: string | null | undefined, unread_chats_count?: number | null | undefined, is_closed?: boolean | null | undefined, latest_chat?: { __typename?: 'Chat', id?: string | null | undefined, message?: string | null | undefined, receiver_id?: string | null | undefined, sender_id?: string | null | undefined, read?: boolean | null | undefined, sender_deleted?: boolean | null | undefined, receiver_deleted?: boolean | null | undefined, created_at?: any | null | undefined } | null | undefined, sender?: { __typename?: 'User', id?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, business_name?: string | null | undefined, email?: string | null | undefined, avatar?: { __typename?: 'FileObj', secure_url?: string | null | undefined } | null | undefined } | null | undefined, receiver?: { __typename?: 'User', id?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, business_name?: string | null | undefined, email?: string | null | undefined, avatar?: { __typename?: 'FileObj', secure_url?: string | null | undefined } | null | undefined } | null | undefined }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id?: string | null | undefined, email?: string | null | undefined }> };

export type ResendEmailVerifyLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type ResendEmailVerifyLinkQuery = { __typename?: 'Query', resendVerifyEmailLink: boolean };

export type OnNewChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnNewChatSubscription = { __typename?: 'Subscription', newChat: { __typename?: 'Chat', id?: string | null | undefined, message?: string | null | undefined, receiver_id?: string | null | undefined, sender_id?: string | null | undefined, read?: boolean | null | undefined, sender_deleted?: boolean | null | undefined, receiver_deleted?: boolean | null | undefined, created_at?: any | null | undefined } };

export type OnNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnNotificationSubscription = { __typename?: 'Subscription', notification: { __typename?: 'Notification', id?: string | null | undefined, sender_id?: string | null | undefined, receiver_id?: string | null | undefined, from_admin?: boolean | null | undefined, message?: string | null | undefined, sender?: { __typename?: 'User', first_name?: string | null | undefined, last_name?: string | null | undefined } | null | undefined } };

export type OnTripStatusSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnTripStatusSubscription = { __typename?: 'Subscription', tripStatus: { __typename?: 'TripStatus_', chat_meta_id?: number | null | undefined, status?: string | null | undefined } };

export type OnCarUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnCarUpdateSubscription = { __typename?: 'Subscription', updatedCar: { __typename?: 'RealTimeUpdateCarDataObj', being_edited?: boolean | null | undefined, reserved_for_booking?: boolean | null | undefined, reserved_for_booking_guest_id?: string | null | undefined } };

export type OnUserUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnUserUpdateSubscription = { __typename?: 'Subscription', userUpdate: { __typename?: 'User', id?: string | null | undefined, user_name?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, email_verified?: boolean | null | undefined, phone?: string | null | undefined, business_name?: string | null | undefined, avatar?: { __typename?: 'FileObj', public_id?: string | null | undefined, secure_url?: string | null | undefined, url?: string | null | undefined } | null | undefined } };

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
  seats
  bags
  doors
  transmission
  gas
  make
  location
  besties {
    id
  }
  categories
  color
  delivery
  delivery_rate
  has_unlimited_distance
  advance_book_period
  charge_extra_distance_travelled
  is_gps_enabled
  car_market_class
  book_and_trip_days
  fuel_efficiency
  fuel_policy
  trip_type
  end_user_type
  id_or_passport_no
  status
  longitude
  latitude
  pick_up_location
  pick_up_longitude
  pick_up_latitude
  amount
  extra_distance_fee_per_km
  distance
  car_count
  remaining_cars
  free_delivery_distance
}
    ${FileInfoFragmentDoc}`;
export const ChatInfoFragmentDoc = gql`
    fragment chatInfo on Chat {
  id
  message
  receiver_id
  sender_id
  read
  sender_deleted
  receiver_deleted
  created_at
}
    `;
export const NotificationInfoFragmentDoc = gql`
    fragment notificationInfo on Notification {
  id
  sender_id
  receiver_id
  sender {
    first_name
    last_name
  }
  from_admin
  message
}
    `;
export const PlanInfoFragmentDoc = gql`
    fragment planInfo on Plan {
  id
  title
  start_date
  due_date
  active
  period
}
    `;
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
  seats
  doors
  transmission
  gas
  bags
  make
  location
  besties {
    id
  }
  categories
  color
  delivery
  delivery_rate
  has_unlimited_distance
  advance_book_period
  charge_extra_distance_travelled
  is_gps_enabled
  car_market_class
  book_and_trip_days
  fuel_efficiency
  fuel_policy
  status
  trip_type
  end_user_type
  id_or_passport_no
  longitude
  latitude
  pick_up_location
  pick_up_longitude
  pick_up_latitude
  amount
  extra_distance_fee_per_km
  distance
  car_count
  remaining_cars
  free_delivery_distance
}
    ${FileInfoFragmentDoc}`;
export const TripInfoFragmentDoc = gql`
    fragment tripInfo on Trip {
  id
  owner {
    first_name
    last_name
    email
  }
  car {
    ...carPrivateInfo
  }
  start_date
  end_date
  start_time
  end_time
  status
  chat_meta_id
  owner_id
  car_owner_id
  canceller_id
  delivery_location
  delivery_distance
  paid
  amount
  code
  created_at
}
    ${CarPrivateInfoFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  user_name
  first_name
  last_name
  email
  email_verified
  phone
  avatar {
    ...fileInfo
  }
  business_name
}
    ${FileInfoFragmentDoc}`;
export const ActivateCarDocument = gql`
    mutation ActivateCar($carId: String!) {
  activateCar(carId: $carId) {
    car {
      ...carPrivateInfo
    }
    error
  }
}
    ${CarPrivateInfoFragmentDoc}`;
export type ActivateCarMutationFn = Apollo.MutationFunction<ActivateCarMutation, ActivateCarMutationVariables>;

/**
 * __useActivateCarMutation__
 *
 * To run a mutation, you first call `useActivateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateCarMutation, { data, loading, error }] = useActivateCarMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useActivateCarMutation(baseOptions?: Apollo.MutationHookOptions<ActivateCarMutation, ActivateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateCarMutation, ActivateCarMutationVariables>(ActivateCarDocument, options);
      }
export type ActivateCarMutationHookResult = ReturnType<typeof useActivateCarMutation>;
export type ActivateCarMutationResult = Apollo.MutationResult<ActivateCarMutation>;
export type ActivateCarMutationOptions = Apollo.BaseMutationOptions<ActivateCarMutation, ActivateCarMutationVariables>;
export const AddEditCarGeneralInfoDocument = gql`
    mutation AddEditCarGeneralInfo($options: CarGeneralInfoInput!, $isEdit: Boolean, $carId: String) {
  addEditCarGeneralInfo(input: $options, carId: $carId, isEdit: $isEdit) {
    carId
    error
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
export const AddFaqDocument = gql`
    mutation AddFaq($input: FaqInput!) {
  addFaq(input: $input) {
    success
  }
}
    `;
export type AddFaqMutationFn = Apollo.MutationFunction<AddFaqMutation, AddFaqMutationVariables>;

/**
 * __useAddFaqMutation__
 *
 * To run a mutation, you first call `useAddFaqMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFaqMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFaqMutation, { data, loading, error }] = useAddFaqMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFaqMutation(baseOptions?: Apollo.MutationHookOptions<AddFaqMutation, AddFaqMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFaqMutation, AddFaqMutationVariables>(AddFaqDocument, options);
      }
export type AddFaqMutationHookResult = ReturnType<typeof useAddFaqMutation>;
export type AddFaqMutationResult = Apollo.MutationResult<AddFaqMutation>;
export type AddFaqMutationOptions = Apollo.BaseMutationOptions<AddFaqMutation, AddFaqMutationVariables>;
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
export const CancelTripDocument = gql`
    mutation CancelTrip($tripId: String!, $input: CancelTripInput!) {
  cancelTrip(tripId: $tripId, input: $input) {
    success
    email_sent
    error
  }
}
    `;
export type CancelTripMutationFn = Apollo.MutationFunction<CancelTripMutation, CancelTripMutationVariables>;

/**
 * __useCancelTripMutation__
 *
 * To run a mutation, you first call `useCancelTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelTripMutation, { data, loading, error }] = useCancelTripMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelTripMutation(baseOptions?: Apollo.MutationHookOptions<CancelTripMutation, CancelTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelTripMutation, CancelTripMutationVariables>(CancelTripDocument, options);
      }
export type CancelTripMutationHookResult = ReturnType<typeof useCancelTripMutation>;
export type CancelTripMutationResult = Apollo.MutationResult<CancelTripMutation>;
export type CancelTripMutationOptions = Apollo.BaseMutationOptions<CancelTripMutation, CancelTripMutationVariables>;
export const CheckReservedGuestIdDocument = gql`
    mutation CheckReservedGuestId($carId: String!) {
  checkReservedGuestId(carId: $carId)
}
    `;
export type CheckReservedGuestIdMutationFn = Apollo.MutationFunction<CheckReservedGuestIdMutation, CheckReservedGuestIdMutationVariables>;

/**
 * __useCheckReservedGuestIdMutation__
 *
 * To run a mutation, you first call `useCheckReservedGuestIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckReservedGuestIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkReservedGuestIdMutation, { data, loading, error }] = useCheckReservedGuestIdMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useCheckReservedGuestIdMutation(baseOptions?: Apollo.MutationHookOptions<CheckReservedGuestIdMutation, CheckReservedGuestIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckReservedGuestIdMutation, CheckReservedGuestIdMutationVariables>(CheckReservedGuestIdDocument, options);
      }
export type CheckReservedGuestIdMutationHookResult = ReturnType<typeof useCheckReservedGuestIdMutation>;
export type CheckReservedGuestIdMutationResult = Apollo.MutationResult<CheckReservedGuestIdMutation>;
export type CheckReservedGuestIdMutationOptions = Apollo.BaseMutationOptions<CheckReservedGuestIdMutation, CheckReservedGuestIdMutationVariables>;
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
export const CreateChatDocument = gql`
    mutation CreateChat($input: ChatInput!) {
  createChat(input: $input)
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($tripId: String!, $input: ReviewInput!) {
  createReview(tripId: $tripId, input: $input)
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
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
export const DeActivateCarDocument = gql`
    mutation DeActivateCar($carId: String!) {
  deActivateCar(carId: $carId) {
    car {
      ...carPrivateInfo
    }
    error
  }
}
    ${CarPrivateInfoFragmentDoc}`;
export type DeActivateCarMutationFn = Apollo.MutationFunction<DeActivateCarMutation, DeActivateCarMutationVariables>;

/**
 * __useDeActivateCarMutation__
 *
 * To run a mutation, you first call `useDeActivateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeActivateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deActivateCarMutation, { data, loading, error }] = useDeActivateCarMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useDeActivateCarMutation(baseOptions?: Apollo.MutationHookOptions<DeActivateCarMutation, DeActivateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeActivateCarMutation, DeActivateCarMutationVariables>(DeActivateCarDocument, options);
      }
export type DeActivateCarMutationHookResult = ReturnType<typeof useDeActivateCarMutation>;
export type DeActivateCarMutationResult = Apollo.MutationResult<DeActivateCarMutation>;
export type DeActivateCarMutationOptions = Apollo.BaseMutationOptions<DeActivateCarMutation, DeActivateCarMutationVariables>;
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
export const EditAccountNotificationsSettingsDocument = gql`
    mutation EditAccountNotificationsSettings($input: AccountNotificationsSettingsInput!) {
  editAccountNotificationsSettings(input: $input)
}
    `;
export type EditAccountNotificationsSettingsMutationFn = Apollo.MutationFunction<EditAccountNotificationsSettingsMutation, EditAccountNotificationsSettingsMutationVariables>;

/**
 * __useEditAccountNotificationsSettingsMutation__
 *
 * To run a mutation, you first call `useEditAccountNotificationsSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccountNotificationsSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccountNotificationsSettingsMutation, { data, loading, error }] = useEditAccountNotificationsSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditAccountNotificationsSettingsMutation(baseOptions?: Apollo.MutationHookOptions<EditAccountNotificationsSettingsMutation, EditAccountNotificationsSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAccountNotificationsSettingsMutation, EditAccountNotificationsSettingsMutationVariables>(EditAccountNotificationsSettingsDocument, options);
      }
export type EditAccountNotificationsSettingsMutationHookResult = ReturnType<typeof useEditAccountNotificationsSettingsMutation>;
export type EditAccountNotificationsSettingsMutationResult = Apollo.MutationResult<EditAccountNotificationsSettingsMutation>;
export type EditAccountNotificationsSettingsMutationOptions = Apollo.BaseMutationOptions<EditAccountNotificationsSettingsMutation, EditAccountNotificationsSettingsMutationVariables>;
export const EditAccountPaymentDocument = gql`
    mutation EditAccountPayment($input: AccountPaymentInput!) {
  editAccountPayment(input: $input)
}
    `;
export type EditAccountPaymentMutationFn = Apollo.MutationFunction<EditAccountPaymentMutation, EditAccountPaymentMutationVariables>;

/**
 * __useEditAccountPaymentMutation__
 *
 * To run a mutation, you first call `useEditAccountPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccountPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccountPaymentMutation, { data, loading, error }] = useEditAccountPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditAccountPaymentMutation(baseOptions?: Apollo.MutationHookOptions<EditAccountPaymentMutation, EditAccountPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAccountPaymentMutation, EditAccountPaymentMutationVariables>(EditAccountPaymentDocument, options);
      }
export type EditAccountPaymentMutationHookResult = ReturnType<typeof useEditAccountPaymentMutation>;
export type EditAccountPaymentMutationResult = Apollo.MutationResult<EditAccountPaymentMutation>;
export type EditAccountPaymentMutationOptions = Apollo.BaseMutationOptions<EditAccountPaymentMutation, EditAccountPaymentMutationVariables>;
export const EditAccountServicesOfferedDocument = gql`
    mutation EditAccountServicesOffered($input: AccountServicesOfferedInput!) {
  editAccountServicesOffered(input: $input)
}
    `;
export type EditAccountServicesOfferedMutationFn = Apollo.MutationFunction<EditAccountServicesOfferedMutation, EditAccountServicesOfferedMutationVariables>;

/**
 * __useEditAccountServicesOfferedMutation__
 *
 * To run a mutation, you first call `useEditAccountServicesOfferedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccountServicesOfferedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccountServicesOfferedMutation, { data, loading, error }] = useEditAccountServicesOfferedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditAccountServicesOfferedMutation(baseOptions?: Apollo.MutationHookOptions<EditAccountServicesOfferedMutation, EditAccountServicesOfferedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAccountServicesOfferedMutation, EditAccountServicesOfferedMutationVariables>(EditAccountServicesOfferedDocument, options);
      }
export type EditAccountServicesOfferedMutationHookResult = ReturnType<typeof useEditAccountServicesOfferedMutation>;
export type EditAccountServicesOfferedMutationResult = Apollo.MutationResult<EditAccountServicesOfferedMutation>;
export type EditAccountServicesOfferedMutationOptions = Apollo.BaseMutationOptions<EditAccountServicesOfferedMutation, EditAccountServicesOfferedMutationVariables>;
export const EditCarCategoriesDocument = gql`
    mutation EditCarCategories($carId: String!, $input: CarCategoriesInput!) {
  editCarCategories(carId: $carId, input: $input) {
    carId
    error
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
    mutation EditCarDescription($carId: String!, $input: CarDescriptionInput!) {
  editCarDescription(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
    mutation EditCarDistance($carId: String!, $input: CarDistanceInput!) {
  editCarDistance(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
    mutation EditCarDocuments($carId: String!, $input: CarDocumentsInput!) {
  editCarDocuments(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
    mutation EditCarFeatures($carId: String!, $input: CarFeaturesInput!) {
  editCarFeatures(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
export const EditCarFuelingDocument = gql`
    mutation EditCarFueling($carId: String!, $input: CarFuelingInput!) {
  editCarFueling(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
export type EditCarFuelingMutationFn = Apollo.MutationFunction<EditCarFuelingMutation, EditCarFuelingMutationVariables>;

/**
 * __useEditCarFuelingMutation__
 *
 * To run a mutation, you first call `useEditCarFuelingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarFuelingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarFuelingMutation, { data, loading, error }] = useEditCarFuelingMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarFuelingMutation(baseOptions?: Apollo.MutationHookOptions<EditCarFuelingMutation, EditCarFuelingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarFuelingMutation, EditCarFuelingMutationVariables>(EditCarFuelingDocument, options);
      }
export type EditCarFuelingMutationHookResult = ReturnType<typeof useEditCarFuelingMutation>;
export type EditCarFuelingMutationResult = Apollo.MutationResult<EditCarFuelingMutation>;
export type EditCarFuelingMutationOptions = Apollo.BaseMutationOptions<EditCarFuelingMutation, EditCarFuelingMutationVariables>;
export const EditCarLocationAndDeliveryDocument = gql`
    mutation EditCarLocationAndDelivery($carId: String!, $input: CarLocationAndDeliveryInput!) {
  editCarLocationAndDelivery(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
    mutation EditCarPhotos($carId: String!, $input: CarPhotosInput!) {
  editCarPhotos(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
export const EditCarPublishedDocument = gql`
    mutation EditCarPublished($carId: String!) {
  editCarPublished(carId: $carId)
}
    `;
export type EditCarPublishedMutationFn = Apollo.MutationFunction<EditCarPublishedMutation, EditCarPublishedMutationVariables>;

/**
 * __useEditCarPublishedMutation__
 *
 * To run a mutation, you first call `useEditCarPublishedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarPublishedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarPublishedMutation, { data, loading, error }] = useEditCarPublishedMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useEditCarPublishedMutation(baseOptions?: Apollo.MutationHookOptions<EditCarPublishedMutation, EditCarPublishedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarPublishedMutation, EditCarPublishedMutationVariables>(EditCarPublishedDocument, options);
      }
export type EditCarPublishedMutationHookResult = ReturnType<typeof useEditCarPublishedMutation>;
export type EditCarPublishedMutationResult = Apollo.MutationResult<EditCarPublishedMutation>;
export type EditCarPublishedMutationOptions = Apollo.BaseMutationOptions<EditCarPublishedMutation, EditCarPublishedMutationVariables>;
export const EditCarRatesDocument = gql`
    mutation EditCarRates($carId: String!, $input: CarRatesInput!) {
  editCarRates(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
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
export const EditCarReservedForBookingDocument = gql`
    mutation EditCarReservedForBooking($carId: String!) {
  editCarReservedForBooking(carId: $carId)
}
    `;
export type EditCarReservedForBookingMutationFn = Apollo.MutationFunction<EditCarReservedForBookingMutation, EditCarReservedForBookingMutationVariables>;

/**
 * __useEditCarReservedForBookingMutation__
 *
 * To run a mutation, you first call `useEditCarReservedForBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarReservedForBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarReservedForBookingMutation, { data, loading, error }] = useEditCarReservedForBookingMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useEditCarReservedForBookingMutation(baseOptions?: Apollo.MutationHookOptions<EditCarReservedForBookingMutation, EditCarReservedForBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarReservedForBookingMutation, EditCarReservedForBookingMutationVariables>(EditCarReservedForBookingDocument, options);
      }
export type EditCarReservedForBookingMutationHookResult = ReturnType<typeof useEditCarReservedForBookingMutation>;
export type EditCarReservedForBookingMutationResult = Apollo.MutationResult<EditCarReservedForBookingMutation>;
export type EditCarReservedForBookingMutationOptions = Apollo.BaseMutationOptions<EditCarReservedForBookingMutation, EditCarReservedForBookingMutationVariables>;
export const EditCarSuspendedDocument = gql`
    mutation EditCarSuspended($carId: String!, $action: String!, $suspend_reason: String) {
  editCarSuspended(
    carId: $carId
    action: $action
    suspend_reason: $suspend_reason
  )
}
    `;
export type EditCarSuspendedMutationFn = Apollo.MutationFunction<EditCarSuspendedMutation, EditCarSuspendedMutationVariables>;

/**
 * __useEditCarSuspendedMutation__
 *
 * To run a mutation, you first call `useEditCarSuspendedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarSuspendedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarSuspendedMutation, { data, loading, error }] = useEditCarSuspendedMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      action: // value for 'action'
 *      suspend_reason: // value for 'suspend_reason'
 *   },
 * });
 */
export function useEditCarSuspendedMutation(baseOptions?: Apollo.MutationHookOptions<EditCarSuspendedMutation, EditCarSuspendedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarSuspendedMutation, EditCarSuspendedMutationVariables>(EditCarSuspendedDocument, options);
      }
export type EditCarSuspendedMutationHookResult = ReturnType<typeof useEditCarSuspendedMutation>;
export type EditCarSuspendedMutationResult = Apollo.MutationResult<EditCarSuspendedMutation>;
export type EditCarSuspendedMutationOptions = Apollo.BaseMutationOptions<EditCarSuspendedMutation, EditCarSuspendedMutationVariables>;
export const EditCarTripSettingsDocument = gql`
    mutation EditCarTripSettings($carId: String!, $input: CarTripSettingsInput!) {
  editCarTripSettings(carId: $carId, input: $input) {
    error
    carId
    car {
      ...carPrivateInfo
    }
  }
}
    ${CarPrivateInfoFragmentDoc}`;
export type EditCarTripSettingsMutationFn = Apollo.MutationFunction<EditCarTripSettingsMutation, EditCarTripSettingsMutationVariables>;

/**
 * __useEditCarTripSettingsMutation__
 *
 * To run a mutation, you first call `useEditCarTripSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCarTripSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCarTripSettingsMutation, { data, loading, error }] = useEditCarTripSettingsMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCarTripSettingsMutation(baseOptions?: Apollo.MutationHookOptions<EditCarTripSettingsMutation, EditCarTripSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCarTripSettingsMutation, EditCarTripSettingsMutationVariables>(EditCarTripSettingsDocument, options);
      }
export type EditCarTripSettingsMutationHookResult = ReturnType<typeof useEditCarTripSettingsMutation>;
export type EditCarTripSettingsMutationResult = Apollo.MutationResult<EditCarTripSettingsMutation>;
export type EditCarTripSettingsMutationOptions = Apollo.BaseMutationOptions<EditCarTripSettingsMutation, EditCarTripSettingsMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($input: EditProfileInput!) {
  editProfile(input: $input) {
    user {
      ...userInfo
    }
    error
  }
}
    ${UserInfoFragmentDoc}`;
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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    success
    error
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
export const MakeCarEditbaleDocument = gql`
    mutation MakeCarEditbale($carId: String!) {
  makeCarEditable(carId: $carId) {
    car {
      ...carPrivateInfo
    }
    error
  }
}
    ${CarPrivateInfoFragmentDoc}`;
export type MakeCarEditbaleMutationFn = Apollo.MutationFunction<MakeCarEditbaleMutation, MakeCarEditbaleMutationVariables>;

/**
 * __useMakeCarEditbaleMutation__
 *
 * To run a mutation, you first call `useMakeCarEditbaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeCarEditbaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeCarEditbaleMutation, { data, loading, error }] = useMakeCarEditbaleMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useMakeCarEditbaleMutation(baseOptions?: Apollo.MutationHookOptions<MakeCarEditbaleMutation, MakeCarEditbaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeCarEditbaleMutation, MakeCarEditbaleMutationVariables>(MakeCarEditbaleDocument, options);
      }
export type MakeCarEditbaleMutationHookResult = ReturnType<typeof useMakeCarEditbaleMutation>;
export type MakeCarEditbaleMutationResult = Apollo.MutationResult<MakeCarEditbaleMutation>;
export type MakeCarEditbaleMutationOptions = Apollo.BaseMutationOptions<MakeCarEditbaleMutation, MakeCarEditbaleMutationVariables>;
export const MarkAllNotificationsReadDocument = gql`
    mutation MarkAllNotificationsRead {
  markAllRead
}
    `;
export type MarkAllNotificationsReadMutationFn = Apollo.MutationFunction<MarkAllNotificationsReadMutation, MarkAllNotificationsReadMutationVariables>;

/**
 * __useMarkAllNotificationsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsReadMutation, { data, loading, error }] = useMarkAllNotificationsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllNotificationsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllNotificationsReadMutation, MarkAllNotificationsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAllNotificationsReadMutation, MarkAllNotificationsReadMutationVariables>(MarkAllNotificationsReadDocument, options);
      }
export type MarkAllNotificationsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsReadMutation>;
export type MarkAllNotificationsReadMutationResult = Apollo.MutationResult<MarkAllNotificationsReadMutation>;
export type MarkAllNotificationsReadMutationOptions = Apollo.BaseMutationOptions<MarkAllNotificationsReadMutation, MarkAllNotificationsReadMutationVariables>;
export const PayForTripDocument = gql`
    mutation PayForTrip($input: PayForTripInput!) {
  payForTrip(input: $input) {
    success
    tripId
  }
}
    `;
export type PayForTripMutationFn = Apollo.MutationFunction<PayForTripMutation, PayForTripMutationVariables>;

/**
 * __usePayForTripMutation__
 *
 * To run a mutation, you first call `usePayForTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayForTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payForTripMutation, { data, loading, error }] = usePayForTripMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePayForTripMutation(baseOptions?: Apollo.MutationHookOptions<PayForTripMutation, PayForTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PayForTripMutation, PayForTripMutationVariables>(PayForTripDocument, options);
      }
export type PayForTripMutationHookResult = ReturnType<typeof usePayForTripMutation>;
export type PayForTripMutationResult = Apollo.MutationResult<PayForTripMutation>;
export type PayForTripMutationOptions = Apollo.BaseMutationOptions<PayForTripMutation, PayForTripMutationVariables>;
export const RefundOrCompensateDocument = gql`
    mutation RefundOrCompensate($token: String!) {
  refundOrCompensate(token: $token)
}
    `;
export type RefundOrCompensateMutationFn = Apollo.MutationFunction<RefundOrCompensateMutation, RefundOrCompensateMutationVariables>;

/**
 * __useRefundOrCompensateMutation__
 *
 * To run a mutation, you first call `useRefundOrCompensateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefundOrCompensateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refundOrCompensateMutation, { data, loading, error }] = useRefundOrCompensateMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefundOrCompensateMutation(baseOptions?: Apollo.MutationHookOptions<RefundOrCompensateMutation, RefundOrCompensateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefundOrCompensateMutation, RefundOrCompensateMutationVariables>(RefundOrCompensateDocument, options);
      }
export type RefundOrCompensateMutationHookResult = ReturnType<typeof useRefundOrCompensateMutation>;
export type RefundOrCompensateMutationResult = Apollo.MutationResult<RefundOrCompensateMutation>;
export type RefundOrCompensateMutationOptions = Apollo.BaseMutationOptions<RefundOrCompensateMutation, RefundOrCompensateMutationVariables>;
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
export const RepublishCarDocument = gql`
    mutation RepublishCar($carId: String!) {
  republishCar(carId: $carId) {
    car {
      ...carPrivateInfo
    }
    error
  }
}
    ${CarPrivateInfoFragmentDoc}`;
export type RepublishCarMutationFn = Apollo.MutationFunction<RepublishCarMutation, RepublishCarMutationVariables>;

/**
 * __useRepublishCarMutation__
 *
 * To run a mutation, you first call `useRepublishCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRepublishCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [republishCarMutation, { data, loading, error }] = useRepublishCarMutation({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useRepublishCarMutation(baseOptions?: Apollo.MutationHookOptions<RepublishCarMutation, RepublishCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RepublishCarMutation, RepublishCarMutationVariables>(RepublishCarDocument, options);
      }
export type RepublishCarMutationHookResult = ReturnType<typeof useRepublishCarMutation>;
export type RepublishCarMutationResult = Apollo.MutationResult<RepublishCarMutation>;
export type RepublishCarMutationOptions = Apollo.BaseMutationOptions<RepublishCarMutation, RepublishCarMutationVariables>;
export const RescheduleTripDocument = gql`
    mutation RescheduleTrip($tripId: String!, $input: TripRescheduleInput!) {
  rescheduleTrip(tripId: $tripId, input: $input) {
    success
    error
  }
}
    `;
export type RescheduleTripMutationFn = Apollo.MutationFunction<RescheduleTripMutation, RescheduleTripMutationVariables>;

/**
 * __useRescheduleTripMutation__
 *
 * To run a mutation, you first call `useRescheduleTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRescheduleTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rescheduleTripMutation, { data, loading, error }] = useRescheduleTripMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRescheduleTripMutation(baseOptions?: Apollo.MutationHookOptions<RescheduleTripMutation, RescheduleTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RescheduleTripMutation, RescheduleTripMutationVariables>(RescheduleTripDocument, options);
      }
export type RescheduleTripMutationHookResult = ReturnType<typeof useRescheduleTripMutation>;
export type RescheduleTripMutationResult = Apollo.MutationResult<RescheduleTripMutation>;
export type RescheduleTripMutationOptions = Apollo.BaseMutationOptions<RescheduleTripMutation, RescheduleTripMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    success
    error
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SubscribeUpgradeRenewPlanDocument = gql`
    mutation SubscribeUpgradeRenewPlan($input: PlanSubscribeUpgradeRenewInput!) {
  subscribeUpgradeRenewPlan(input: $input) {
    success
  }
}
    `;
export type SubscribeUpgradeRenewPlanMutationFn = Apollo.MutationFunction<SubscribeUpgradeRenewPlanMutation, SubscribeUpgradeRenewPlanMutationVariables>;

/**
 * __useSubscribeUpgradeRenewPlanMutation__
 *
 * To run a mutation, you first call `useSubscribeUpgradeRenewPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeUpgradeRenewPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeUpgradeRenewPlanMutation, { data, loading, error }] = useSubscribeUpgradeRenewPlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubscribeUpgradeRenewPlanMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeUpgradeRenewPlanMutation, SubscribeUpgradeRenewPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeUpgradeRenewPlanMutation, SubscribeUpgradeRenewPlanMutationVariables>(SubscribeUpgradeRenewPlanDocument, options);
      }
export type SubscribeUpgradeRenewPlanMutationHookResult = ReturnType<typeof useSubscribeUpgradeRenewPlanMutation>;
export type SubscribeUpgradeRenewPlanMutationResult = Apollo.MutationResult<SubscribeUpgradeRenewPlanMutation>;
export type SubscribeUpgradeRenewPlanMutationOptions = Apollo.BaseMutationOptions<SubscribeUpgradeRenewPlanMutation, SubscribeUpgradeRenewPlanMutationVariables>;
export const UpdateCarFavouriteDocument = gql`
    mutation UpdateCarFavourite($carId: String!, $opType: String!) {
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
export const UpdateDriverDetailsDocument = gql`
    mutation UpdateDriverDetails($input: DriverDetailsInput!) {
  updateDriverDetails(input: $input)
}
    `;
export type UpdateDriverDetailsMutationFn = Apollo.MutationFunction<UpdateDriverDetailsMutation, UpdateDriverDetailsMutationVariables>;

/**
 * __useUpdateDriverDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateDriverDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDriverDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDriverDetailsMutation, { data, loading, error }] = useUpdateDriverDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDriverDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDriverDetailsMutation, UpdateDriverDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDriverDetailsMutation, UpdateDriverDetailsMutationVariables>(UpdateDriverDetailsDocument, options);
      }
export type UpdateDriverDetailsMutationHookResult = ReturnType<typeof useUpdateDriverDetailsMutation>;
export type UpdateDriverDetailsMutationResult = Apollo.MutationResult<UpdateDriverDetailsMutation>;
export type UpdateDriverDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateDriverDetailsMutation, UpdateDriverDetailsMutationVariables>;
export const UpdateTripStatusDocument = gql`
    mutation UpdateTripStatus($tripId: String!, $status: String!, $remarks: String, $publish: Boolean) {
  updateTripStatus(
    tripId: $tripId
    status: $status
    remarks: $remarks
    publish: $publish
  ) {
    success
  }
}
    `;
export type UpdateTripStatusMutationFn = Apollo.MutationFunction<UpdateTripStatusMutation, UpdateTripStatusMutationVariables>;

/**
 * __useUpdateTripStatusMutation__
 *
 * To run a mutation, you first call `useUpdateTripStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTripStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTripStatusMutation, { data, loading, error }] = useUpdateTripStatusMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *      status: // value for 'status'
 *      remarks: // value for 'remarks'
 *      publish: // value for 'publish'
 *   },
 * });
 */
export function useUpdateTripStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTripStatusMutation, UpdateTripStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTripStatusMutation, UpdateTripStatusMutationVariables>(UpdateTripStatusDocument, options);
      }
export type UpdateTripStatusMutationHookResult = ReturnType<typeof useUpdateTripStatusMutation>;
export type UpdateTripStatusMutationResult = Apollo.MutationResult<UpdateTripStatusMutation>;
export type UpdateTripStatusMutationOptions = Apollo.BaseMutationOptions<UpdateTripStatusMutation, UpdateTripStatusMutationVariables>;
export const UpgradeAccountDocument = gql`
    mutation UpgradeAccount($input: UpgradeAccountInput!) {
  upgradeAccount(input: $input)
}
    `;
export type UpgradeAccountMutationFn = Apollo.MutationFunction<UpgradeAccountMutation, UpgradeAccountMutationVariables>;

/**
 * __useUpgradeAccountMutation__
 *
 * To run a mutation, you first call `useUpgradeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgradeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgradeAccountMutation, { data, loading, error }] = useUpgradeAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpgradeAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpgradeAccountMutation, UpgradeAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpgradeAccountMutation, UpgradeAccountMutationVariables>(UpgradeAccountDocument, options);
      }
export type UpgradeAccountMutationHookResult = ReturnType<typeof useUpgradeAccountMutation>;
export type UpgradeAccountMutationResult = Apollo.MutationResult<UpgradeAccountMutation>;
export type UpgradeAccountMutationOptions = Apollo.BaseMutationOptions<UpgradeAccountMutation, UpgradeAccountMutationVariables>;
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
export const EmailVerifyDocument = gql`
    mutation EmailVerify($token: String!) {
  verifyEmail(token: $token) {
    userId
    role
    error
  }
}
    `;
export type EmailVerifyMutationFn = Apollo.MutationFunction<EmailVerifyMutation, EmailVerifyMutationVariables>;

/**
 * __useEmailVerifyMutation__
 *
 * To run a mutation, you first call `useEmailVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailVerifyMutation, { data, loading, error }] = useEmailVerifyMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useEmailVerifyMutation(baseOptions?: Apollo.MutationHookOptions<EmailVerifyMutation, EmailVerifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmailVerifyMutation, EmailVerifyMutationVariables>(EmailVerifyDocument, options);
      }
export type EmailVerifyMutationHookResult = ReturnType<typeof useEmailVerifyMutation>;
export type EmailVerifyMutationResult = Apollo.MutationResult<EmailVerifyMutation>;
export type EmailVerifyMutationOptions = Apollo.BaseMutationOptions<EmailVerifyMutation, EmailVerifyMutationVariables>;
export const GetAccountOverviewDocument = gql`
    query GetAccountOverview {
  getAccountOverview {
    plan {
      due_date
      title
      active
      period
    }
    trips
    earnings
    bookings
    error
  }
}
    `;

/**
 * __useGetAccountOverviewQuery__
 *
 * To run a query within a React component, call `useGetAccountOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountOverviewQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountOverviewQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountOverviewQuery, GetAccountOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountOverviewQuery, GetAccountOverviewQueryVariables>(GetAccountOverviewDocument, options);
      }
export function useGetAccountOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountOverviewQuery, GetAccountOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountOverviewQuery, GetAccountOverviewQueryVariables>(GetAccountOverviewDocument, options);
        }
export type GetAccountOverviewQueryHookResult = ReturnType<typeof useGetAccountOverviewQuery>;
export type GetAccountOverviewLazyQueryHookResult = ReturnType<typeof useGetAccountOverviewLazyQuery>;
export type GetAccountOverviewQueryResult = Apollo.QueryResult<GetAccountOverviewQuery, GetAccountOverviewQueryVariables>;
export const GetAccountPlanDocument = gql`
    query GetAccountPlan {
  getPlan {
    plan {
      due_date
      title
      active
      period
    }
    error
  }
}
    `;

/**
 * __useGetAccountPlanQuery__
 *
 * To run a query within a React component, call `useGetAccountPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountPlanQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountPlanQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountPlanQuery, GetAccountPlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountPlanQuery, GetAccountPlanQueryVariables>(GetAccountPlanDocument, options);
      }
export function useGetAccountPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountPlanQuery, GetAccountPlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountPlanQuery, GetAccountPlanQueryVariables>(GetAccountPlanDocument, options);
        }
export type GetAccountPlanQueryHookResult = ReturnType<typeof useGetAccountPlanQuery>;
export type GetAccountPlanLazyQueryHookResult = ReturnType<typeof useGetAccountPlanLazyQuery>;
export type GetAccountPlanQueryResult = Apollo.QueryResult<GetAccountPlanQuery, GetAccountPlanQueryVariables>;
export const GetAccountSettingsDocument = gql`
    query GetAccountSettings {
  getAccountSettings {
    accountSettings {
      receive_marketing_emails
      payment_channel
      payment_channel_data {
        subject
      }
      services_offered
    }
    error
  }
}
    `;

/**
 * __useGetAccountSettingsQuery__
 *
 * To run a query within a React component, call `useGetAccountSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>(GetAccountSettingsDocument, options);
      }
export function useGetAccountSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>(GetAccountSettingsDocument, options);
        }
export type GetAccountSettingsQueryHookResult = ReturnType<typeof useGetAccountSettingsQuery>;
export type GetAccountSettingsLazyQueryHookResult = ReturnType<typeof useGetAccountSettingsLazyQuery>;
export type GetAccountSettingsQueryResult = Apollo.QueryResult<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>;
export const GetAdminCarsDocument = gql`
    query GetAdminCars($type_: String!) {
  getAdminCars(type_: $type_) {
    id
    name
    reg_no
    photos {
      ...fileInfo
    }
    documents {
      title
      file {
        ...fileInfo
      }
    }
  }
}
    ${FileInfoFragmentDoc}`;

/**
 * __useGetAdminCarsQuery__
 *
 * To run a query within a React component, call `useGetAdminCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminCarsQuery({
 *   variables: {
 *      type_: // value for 'type_'
 *   },
 * });
 */
export function useGetAdminCarsQuery(baseOptions: Apollo.QueryHookOptions<GetAdminCarsQuery, GetAdminCarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminCarsQuery, GetAdminCarsQueryVariables>(GetAdminCarsDocument, options);
      }
export function useGetAdminCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminCarsQuery, GetAdminCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminCarsQuery, GetAdminCarsQueryVariables>(GetAdminCarsDocument, options);
        }
export type GetAdminCarsQueryHookResult = ReturnType<typeof useGetAdminCarsQuery>;
export type GetAdminCarsLazyQueryHookResult = ReturnType<typeof useGetAdminCarsLazyQuery>;
export type GetAdminCarsQueryResult = Apollo.QueryResult<GetAdminCarsQuery, GetAdminCarsQueryVariables>;
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
export const GetBookingDocument = gql`
    query GetBooking($bookingId: String!) {
  getBooking(bookingId: $bookingId) {
    trip {
      ...tripInfo
    }
    error
  }
}
    ${TripInfoFragmentDoc}`;

/**
 * __useGetBookingQuery__
 *
 * To run a query within a React component, call `useGetBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingQuery({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useGetBookingQuery(baseOptions: Apollo.QueryHookOptions<GetBookingQuery, GetBookingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingQuery, GetBookingQueryVariables>(GetBookingDocument, options);
      }
export function useGetBookingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingQuery, GetBookingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingQuery, GetBookingQueryVariables>(GetBookingDocument, options);
        }
export type GetBookingQueryHookResult = ReturnType<typeof useGetBookingQuery>;
export type GetBookingLazyQueryHookResult = ReturnType<typeof useGetBookingLazyQuery>;
export type GetBookingQueryResult = Apollo.QueryResult<GetBookingQuery, GetBookingQueryVariables>;
export const GetCarDocument = gql`
    query GetCar($carId: String!, $carName: String!) {
  getCar(carId: $carId, carName: $carName) {
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
 *      carName: // value for 'carName'
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
export const GetCarReviewsDocument = gql`
    query GetCarReviews($carId: String!) {
  getCarReviews(carId: $carId) {
    id
    reviewer {
      first_name
      avatar {
        secure_url
      }
    }
    comment
    stars
    created_at
  }
}
    `;

/**
 * __useGetCarReviewsQuery__
 *
 * To run a query within a React component, call `useGetCarReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarReviewsQuery({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useGetCarReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetCarReviewsQuery, GetCarReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarReviewsQuery, GetCarReviewsQueryVariables>(GetCarReviewsDocument, options);
      }
export function useGetCarReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarReviewsQuery, GetCarReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarReviewsQuery, GetCarReviewsQueryVariables>(GetCarReviewsDocument, options);
        }
export type GetCarReviewsQueryHookResult = ReturnType<typeof useGetCarReviewsQuery>;
export type GetCarReviewsLazyQueryHookResult = ReturnType<typeof useGetCarReviewsLazyQuery>;
export type GetCarReviewsQueryResult = Apollo.QueryResult<GetCarReviewsQuery, GetCarReviewsQueryVariables>;
export const GetCarsDocument = gql`
    query GetCars($input: SearchInput!) {
  getCars(input: $input) {
    data {
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
      besties {
        id
      }
      amount
    }
    cursor {
      beforeCursor
      afterCursor
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
export const GetChatsDocument = gql`
    query GetChats($chatMetaId: String!) {
  getChats(chatMetaId: $chatMetaId) {
    ...chatInfo
  }
}
    ${ChatInfoFragmentDoc}`;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *      chatMetaId: // value for 'chatMetaId'
 *   },
 * });
 */
export function useGetChatsQuery(baseOptions: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
      }
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;
export const GetDriverDetailsDocument = gql`
    query GetDriverDetails {
  getDriverDetails {
    first_name
    last_name
    license {
      ...fileInfo
    }
    license_number
    age
    license_expiry_date
  }
}
    ${FileInfoFragmentDoc}`;

/**
 * __useGetDriverDetailsQuery__
 *
 * To run a query within a React component, call `useGetDriverDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDriverDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDriverDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDriverDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetDriverDetailsQuery, GetDriverDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDriverDetailsQuery, GetDriverDetailsQueryVariables>(GetDriverDetailsDocument, options);
      }
export function useGetDriverDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDriverDetailsQuery, GetDriverDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDriverDetailsQuery, GetDriverDetailsQueryVariables>(GetDriverDetailsDocument, options);
        }
export type GetDriverDetailsQueryHookResult = ReturnType<typeof useGetDriverDetailsQuery>;
export type GetDriverDetailsLazyQueryHookResult = ReturnType<typeof useGetDriverDetailsLazyQuery>;
export type GetDriverDetailsQueryResult = Apollo.QueryResult<GetDriverDetailsQuery, GetDriverDetailsQueryVariables>;
export const GetEarningsDocument = gql`
    query GetEarnings {
  getEarnings {
    id
    amount
  }
}
    `;

/**
 * __useGetEarningsQuery__
 *
 * To run a query within a React component, call `useGetEarningsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEarningsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEarningsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEarningsQuery(baseOptions?: Apollo.QueryHookOptions<GetEarningsQuery, GetEarningsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEarningsQuery, GetEarningsQueryVariables>(GetEarningsDocument, options);
      }
export function useGetEarningsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEarningsQuery, GetEarningsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEarningsQuery, GetEarningsQueryVariables>(GetEarningsDocument, options);
        }
export type GetEarningsQueryHookResult = ReturnType<typeof useGetEarningsQuery>;
export type GetEarningsLazyQueryHookResult = ReturnType<typeof useGetEarningsLazyQuery>;
export type GetEarningsQueryResult = Apollo.QueryResult<GetEarningsQuery, GetEarningsQueryVariables>;
export const GetEnquiriesDocument = gql`
    query GetEnquiries {
  enquiries {
    id
    subject
    message
    email
    created_at
  }
}
    `;

/**
 * __useGetEnquiriesQuery__
 *
 * To run a query within a React component, call `useGetEnquiriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnquiriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnquiriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEnquiriesQuery(baseOptions?: Apollo.QueryHookOptions<GetEnquiriesQuery, GetEnquiriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEnquiriesQuery, GetEnquiriesQueryVariables>(GetEnquiriesDocument, options);
      }
export function useGetEnquiriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEnquiriesQuery, GetEnquiriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEnquiriesQuery, GetEnquiriesQueryVariables>(GetEnquiriesDocument, options);
        }
export type GetEnquiriesQueryHookResult = ReturnType<typeof useGetEnquiriesQuery>;
export type GetEnquiriesLazyQueryHookResult = ReturnType<typeof useGetEnquiriesLazyQuery>;
export type GetEnquiriesQueryResult = Apollo.QueryResult<GetEnquiriesQuery, GetEnquiriesQueryVariables>;
export const GetFaqsDocument = gql`
    query GetFaqs {
  faqs {
    id
    question
    answer
  }
}
    `;

/**
 * __useGetFaqsQuery__
 *
 * To run a query within a React component, call `useGetFaqsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFaqsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFaqsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFaqsQuery(baseOptions?: Apollo.QueryHookOptions<GetFaqsQuery, GetFaqsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFaqsQuery, GetFaqsQueryVariables>(GetFaqsDocument, options);
      }
export function useGetFaqsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFaqsQuery, GetFaqsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFaqsQuery, GetFaqsQueryVariables>(GetFaqsDocument, options);
        }
export type GetFaqsQueryHookResult = ReturnType<typeof useGetFaqsQuery>;
export type GetFaqsLazyQueryHookResult = ReturnType<typeof useGetFaqsLazyQuery>;
export type GetFaqsQueryResult = Apollo.QueryResult<GetFaqsQuery, GetFaqsQueryVariables>;
export const GetHostCanListACarDataDocument = gql`
    query GetHostCanListACarData {
  hostCanListACarData {
    plan {
      ...planInfo
    }
    setupBusiness
    carsListed
    hasPlanHistory
    error
  }
}
    ${PlanInfoFragmentDoc}`;

/**
 * __useGetHostCanListACarDataQuery__
 *
 * To run a query within a React component, call `useGetHostCanListACarDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHostCanListACarDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHostCanListACarDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHostCanListACarDataQuery(baseOptions?: Apollo.QueryHookOptions<GetHostCanListACarDataQuery, GetHostCanListACarDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHostCanListACarDataQuery, GetHostCanListACarDataQueryVariables>(GetHostCanListACarDataDocument, options);
      }
export function useGetHostCanListACarDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHostCanListACarDataQuery, GetHostCanListACarDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHostCanListACarDataQuery, GetHostCanListACarDataQueryVariables>(GetHostCanListACarDataDocument, options);
        }
export type GetHostCanListACarDataQueryHookResult = ReturnType<typeof useGetHostCanListACarDataQuery>;
export type GetHostCanListACarDataLazyQueryHookResult = ReturnType<typeof useGetHostCanListACarDataLazyQuery>;
export type GetHostCanListACarDataQueryResult = Apollo.QueryResult<GetHostCanListACarDataQuery, GetHostCanListACarDataQueryVariables>;
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
    amount
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
    ...tripInfo
  }
}
    ${TripInfoFragmentDoc}`;

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
    ...tripInfo
  }
}
    ${TripInfoFragmentDoc}`;

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
export const GetNotificationsDocument = gql`
    query GetNotifications($type: String) {
  getNotifications(type_: $type) {
    id
    message
    read
    created_at
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetPopularCarsDocument = gql`
    query GetPopularCars {
  getPopularCars {
    id
    name
    trips
    photos {
      ...fileInfo
    }
    besties {
      id
    }
    amount
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
    query GetPrivateCar($carId: String!) {
  getCar(carId: $carId) {
    car {
      ...carPrivateInfo
    }
    rental_services
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
export const GetTransactionsDocument = gql`
    query GetTransactions($type_: String!) {
  getTransactions(type_: $type_) {
    id
    amount
  }
}
    `;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      type_: // value for 'type_'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetTripDocument = gql`
    query GetTrip($tripId: String!) {
  getTrip(tripId: $tripId) {
    trip {
      ...tripInfo
    }
    error
  }
}
    ${TripInfoFragmentDoc}`;

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
export const GetUserChatMetasDocument = gql`
    query GetUserChatMetas {
  getUserChatMetas {
    id
    latest_chat {
      ...chatInfo
    }
    no_chat
    unread_chats_count
    is_closed
    sender {
      id
      first_name
      last_name
      business_name
      email
      avatar {
        secure_url
      }
    }
    receiver {
      id
      first_name
      last_name
      business_name
      email
      avatar {
        secure_url
      }
    }
  }
}
    ${ChatInfoFragmentDoc}`;

/**
 * __useGetUserChatMetasQuery__
 *
 * To run a query within a React component, call `useGetUserChatMetasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChatMetasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChatMetasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserChatMetasQuery(baseOptions?: Apollo.QueryHookOptions<GetUserChatMetasQuery, GetUserChatMetasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserChatMetasQuery, GetUserChatMetasQueryVariables>(GetUserChatMetasDocument, options);
      }
export function useGetUserChatMetasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserChatMetasQuery, GetUserChatMetasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserChatMetasQuery, GetUserChatMetasQueryVariables>(GetUserChatMetasDocument, options);
        }
export type GetUserChatMetasQueryHookResult = ReturnType<typeof useGetUserChatMetasQuery>;
export type GetUserChatMetasLazyQueryHookResult = ReturnType<typeof useGetUserChatMetasLazyQuery>;
export type GetUserChatMetasQueryResult = Apollo.QueryResult<GetUserChatMetasQuery, GetUserChatMetasQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getUsers {
    id
    email
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const ResendEmailVerifyLinkDocument = gql`
    query ResendEmailVerifyLink {
  resendVerifyEmailLink
}
    `;

/**
 * __useResendEmailVerifyLinkQuery__
 *
 * To run a query within a React component, call `useResendEmailVerifyLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useResendEmailVerifyLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResendEmailVerifyLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useResendEmailVerifyLinkQuery(baseOptions?: Apollo.QueryHookOptions<ResendEmailVerifyLinkQuery, ResendEmailVerifyLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResendEmailVerifyLinkQuery, ResendEmailVerifyLinkQueryVariables>(ResendEmailVerifyLinkDocument, options);
      }
export function useResendEmailVerifyLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResendEmailVerifyLinkQuery, ResendEmailVerifyLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResendEmailVerifyLinkQuery, ResendEmailVerifyLinkQueryVariables>(ResendEmailVerifyLinkDocument, options);
        }
export type ResendEmailVerifyLinkQueryHookResult = ReturnType<typeof useResendEmailVerifyLinkQuery>;
export type ResendEmailVerifyLinkLazyQueryHookResult = ReturnType<typeof useResendEmailVerifyLinkLazyQuery>;
export type ResendEmailVerifyLinkQueryResult = Apollo.QueryResult<ResendEmailVerifyLinkQuery, ResendEmailVerifyLinkQueryVariables>;
export const OnNewChatDocument = gql`
    subscription onNewChat {
  newChat {
    ...chatInfo
  }
}
    ${ChatInfoFragmentDoc}`;

/**
 * __useOnNewChatSubscription__
 *
 * To run a query within a React component, call `useOnNewChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnNewChatSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnNewChatSubscription, OnNewChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnNewChatSubscription, OnNewChatSubscriptionVariables>(OnNewChatDocument, options);
      }
export type OnNewChatSubscriptionHookResult = ReturnType<typeof useOnNewChatSubscription>;
export type OnNewChatSubscriptionResult = Apollo.SubscriptionResult<OnNewChatSubscription>;
export const OnNotificationDocument = gql`
    subscription onNotification {
  notification {
    ...notificationInfo
  }
}
    ${NotificationInfoFragmentDoc}`;

/**
 * __useOnNotificationSubscription__
 *
 * To run a query within a React component, call `useOnNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnNotificationSubscription, OnNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnNotificationSubscription, OnNotificationSubscriptionVariables>(OnNotificationDocument, options);
      }
export type OnNotificationSubscriptionHookResult = ReturnType<typeof useOnNotificationSubscription>;
export type OnNotificationSubscriptionResult = Apollo.SubscriptionResult<OnNotificationSubscription>;
export const OnTripStatusDocument = gql`
    subscription onTripStatus {
  tripStatus {
    chat_meta_id
    status
  }
}
    `;

/**
 * __useOnTripStatusSubscription__
 *
 * To run a query within a React component, call `useOnTripStatusSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnTripStatusSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnTripStatusSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnTripStatusSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnTripStatusSubscription, OnTripStatusSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnTripStatusSubscription, OnTripStatusSubscriptionVariables>(OnTripStatusDocument, options);
      }
export type OnTripStatusSubscriptionHookResult = ReturnType<typeof useOnTripStatusSubscription>;
export type OnTripStatusSubscriptionResult = Apollo.SubscriptionResult<OnTripStatusSubscription>;
export const OnCarUpdateDocument = gql`
    subscription onCarUpdate {
  updatedCar {
    being_edited
    reserved_for_booking
    reserved_for_booking_guest_id
  }
}
    `;

/**
 * __useOnCarUpdateSubscription__
 *
 * To run a query within a React component, call `useOnCarUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnCarUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnCarUpdateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnCarUpdateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnCarUpdateSubscription, OnCarUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnCarUpdateSubscription, OnCarUpdateSubscriptionVariables>(OnCarUpdateDocument, options);
      }
export type OnCarUpdateSubscriptionHookResult = ReturnType<typeof useOnCarUpdateSubscription>;
export type OnCarUpdateSubscriptionResult = Apollo.SubscriptionResult<OnCarUpdateSubscription>;
export const OnUserUpdateDocument = gql`
    subscription onUserUpdate {
  userUpdate {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useOnUserUpdateSubscription__
 *
 * To run a query within a React component, call `useOnUserUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnUserUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnUserUpdateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnUserUpdateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnUserUpdateSubscription, OnUserUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnUserUpdateSubscription, OnUserUpdateSubscriptionVariables>(OnUserUpdateDocument, options);
      }
export type OnUserUpdateSubscriptionHookResult = ReturnType<typeof useOnUserUpdateSubscription>;
export type OnUserUpdateSubscriptionResult = Apollo.SubscriptionResult<OnUserUpdateSubscription>;