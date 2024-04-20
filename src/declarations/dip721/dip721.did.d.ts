import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Dip721NFT {
  'approve' : ActorMethod<[Principal, bigint], Result>,
  'balanceOf' : ActorMethod<[Principal], Result>,
  'burn' : ActorMethod<[bigint], Result>,
  'custodians' : ActorMethod<[], Array<Principal>>,
  'cycles' : ActorMethod<[], bigint>,
  'isApprovedForAll' : ActorMethod<[Principal, Principal], Result_6>,
  'logo' : ActorMethod<[], [] | [string]>,
  'metadata' : ActorMethod<[], Metadata__1>,
  'mint' : ActorMethod<
    [Principal, bigint, Array<[string, GenericValue__1]>],
    Result
  >,
  'name' : ActorMethod<[], [] | [string]>,
  'operatorOf' : ActorMethod<[bigint], Result_5>,
  'operatorTokenIdentifiers' : ActorMethod<[Principal], Result_4>,
  'operatorTokenMetadata' : ActorMethod<[Principal], Result_3>,
  'ownerOf' : ActorMethod<[bigint], Result_5>,
  'ownerTokenIdentifiers' : ActorMethod<[Principal], Result_4>,
  'ownerTokenMetadata' : ActorMethod<[Principal], Result_3>,
  'setApprovalForAll' : ActorMethod<[Principal, boolean], Result>,
  'setCustodians' : ActorMethod<[Array<Principal>], undefined>,
  'setLogo' : ActorMethod<[string], undefined>,
  'setName' : ActorMethod<[string], undefined>,
  'setSymbol' : ActorMethod<[string], undefined>,
  'stats' : ActorMethod<[], Stats>,
  'supportedInterfaces' : ActorMethod<[], Array<SupportedInterface>>,
  'symbol' : ActorMethod<[], [] | [string]>,
  'tokenMetadata' : ActorMethod<[bigint], Result_2>,
  'totalSupply' : ActorMethod<[], bigint>,
  'totalTransactions' : ActorMethod<[], bigint>,
  'totalUniqueHolders' : ActorMethod<[], bigint>,
  'transaction' : ActorMethod<[bigint], Result_1>,
  'transfer' : ActorMethod<[Principal, bigint], Result>,
  'transferFrom' : ActorMethod<[Principal, Principal, bigint], Result>,
}
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
export type GenericValue__1 = { 'Nat64Content' : bigint } |
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
export interface Metadata {
  'logo' : [] | [string],
  'name' : [] | [string],
  'created_at' : bigint,
  'upgraded_at' : bigint,
  'custodians' : Array<Principal>,
  'symbol' : [] | [string],
}
export interface Metadata__1 {
  'logo' : [] | [string],
  'name' : [] | [string],
  'created_at' : bigint,
  'upgraded_at' : bigint,
  'custodians' : Array<Principal>,
  'symbol' : [] | [string],
}
export type NftError = { 'UnauthorizedOperator' : null } |
  { 'SelfTransfer' : null } |
  { 'TokenNotFound' : null } |
  { 'UnauthorizedOwner' : null } |
  { 'TxNotFound' : null } |
  { 'SelfApprove' : null } |
  { 'OperatorNotFound' : null } |
  { 'ExistedNFT' : null } |
  { 'OwnerNotFound' : null } |
  { 'Other' : string };
export type Result = { 'ok' : bigint } |
  { 'err' : NftError };
export type Result_1 = { 'ok' : TxEvent } |
  { 'err' : NftError };
export type Result_2 = { 'ok' : TokenMetadata } |
  { 'err' : NftError };
export type Result_3 = { 'ok' : Array<TokenMetadata> } |
  { 'err' : NftError };
export type Result_4 = { 'ok' : Array<bigint> } |
  { 'err' : NftError };
export type Result_5 = { 'ok' : [] | [Principal] } |
  { 'err' : NftError };
export type Result_6 = { 'ok' : boolean } |
  { 'err' : NftError };
export interface Stats {
  'cycles' : bigint,
  'total_transactions' : bigint,
  'total_unique_holders' : bigint,
  'total_supply' : bigint,
}
export type SupportedInterface = { 'Burn' : null } |
  { 'Mint' : null } |
  { 'Approval' : null } |
  { 'TransactionHistory' : null };
export interface TokenMetadata {
  'transferred_at' : [] | [bigint],
  'transferred_by' : [] | [Principal],
  'owner' : [] | [Principal],
  'operator' : [] | [Principal],
  'approved_at' : [] | [bigint],
  'approved_by' : [] | [Principal],
  'properties' : Array<[string, GenericValue]>,
  'is_burned' : boolean,
  'token_identifier' : bigint,
  'burned_at' : [] | [bigint],
  'burned_by' : [] | [Principal],
  'minted_at' : bigint,
  'minted_by' : Principal,
}
export interface TxEvent {
  'time' : bigint,
  'operation' : string,
  'details' : Array<[string, GenericValue]>,
  'caller' : Principal,
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
export interface _SERVICE extends Dip721NFT {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
