import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Event {
  'addCustodian' : ActorMethod<[Principal], Result_1>,
  'addEvent' : ActorMethod<[EventId, Event__1], Result>,
  'addEventByEmail' : ActorMethod<[string, Event__1, EventId], Result>,
}
export type EventError = { 'UnauthorizedOwner' : null } |
  { 'EventNotFound' : null };
export type EventId = bigint;
export interface Event__1 {
  'status' : Status,
  'participants' : Array<Principal>,
  'endDate' : Time,
  'name' : string,
  'description' : string,
  'ticketsAmount' : bigint,
  'participantsEmail' : Array<string>,
  'createdByPrincipal' : [] | [Principal],
  'place' : string,
  'createdByEmail' : [] | [string],
  'startDate' : Time,
}
export interface InitArgs { 'custodians' : Array<Principal> }
export type Result = { 'ok' : Event__1 } |
  { 'err' : EventError };
export type Result_1 = { 'ok' : null } |
  { 'err' : EventError };
export type Status = { 'Finished' : null } |
  { 'InProgress' : null } |
  { 'Canceled' : null };
export type Time = bigint;
export interface _SERVICE extends Event {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
