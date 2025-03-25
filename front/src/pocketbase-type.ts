/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Events = "events",
  Registrations = "registrations",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type EventsRecord = {
  id?: RecordIdString;
  description?: string;
  picture?: string;
  title?: string;
};

export type RegistrationsRecord = {
  id?: RecordIdString;
  eventId?: RecordIdString;
  firstname?: string;
  lastname?: string;
  company?: string;
  arrivedAt?: string;
};

export type UsersRecord = {
  avatar?: string;
  name?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> &
  BaseSystemFields<Texpand>;
export type RegistrationsResponse<Texpand = unknown> =
  Required<RegistrationsRecord> & BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  events: EventsRecord;
  registrations: RegistrationsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  events: EventsResponse;
  registrations: RegistrationsResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "events"): RecordService<EventsResponse>;
  collection(idOrName: "registrations"): RecordService<RegistrationsResponse>;
  collection(idOrName: "users"): RecordService<UsersResponse>;
};
