import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type EventId = bigint;
export type GenericValue = { 'Nat64Content' : bigint } |
  { 'Nat32Content' : number } |
  { 'BoolContent' : boolean } |
  { 'Nat8Content' : number } |
  { 'Int64Content' : bigint } |
  { 'IntContent' : bigint } |
  { 'NatContent' : bigint } |
  { 'Nat16Content' : number } |
  { 'Int32Content' : number } |
  { 'Int8Content' : number } |
  { 'FloatContent' : number } |
  { 'Int16Content' : number } |
  { 'BlobContent' : Uint8Array | number[] } |
  { 'NestedContent' : Vec } |
  { 'Principal' : Principal } |
  { 'TextContent' : string };
export interface InitArgs { 'custodians' : Array<Principal> }
export type Result = { 'ok' : null } |
  { 'err' : UserError };
export type Result_1 = { 'ok' : User__1 } |
  { 'err' : UserError };
export interface User {
  'addCustodian' : ActorMethod<[Principal], Result>,
  'login' : ActorMethod<[], Result_1>,
  'loginByEmail' : ActorMethod<[string, string], Result_1>,
  'register' : ActorMethod<[UserRegister], Result_1>,
  'registerByEmail' : ActorMethod<[UserRegister], Result_1>,
  'registerToEventEmail' : ActorMethod<
    [string, string, string, EventId, Array<[string, GenericValue]>],
    Result
  >,
  'registerToEventPrincipal' : ActorMethod<
    [string, EventId, Array<[string, GenericValue]>],
    Result
  >,
}
export type UserError = { 'UserAlreadyExists' : null } |
  { 'UnauthorizedOwner' : null } |
  { 'UnauthorizedUser' : null } |
  { 'Other' : string } |
  { 'UserNotFound' : null };
export interface UserRegister {
  'password' : [] | [string],
  'name' : string,
  'email' : string,
}
export interface User__1 {
  'password' : [] | [string],
  'name' : string,
  'email' : string,
  'jointEvents' : Array<bigint>,
  'nftId' : [] | [Array<bigint>],
}
export type Vec = Array<
  [
    string,
    { 'Nat64Content' : bigint } |
      { 'Nat32Content' : number } |
      { 'BoolContent' : boolean } |
      { 'Nat8Content' : number } |
      { 'Int64Content' : bigint } |
      { 'IntContent' : bigint } |
      { 'NatContent' : bigint } |
      { 'Nat16Content' : number } |
      { 'Int32Content' : number } |
      { 'Int8Content' : number } |
      { 'FloatContent' : number } |
      { 'Int16Content' : number } |
      { 'BlobContent' : Uint8Array | number[] } |
      { 'NestedContent' : Vec } |
      { 'Principal' : Principal } |
      { 'TextContent' : string },
  ]
>;
export interface _SERVICE extends User {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
