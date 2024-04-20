export const idlFactory = ({ IDL }) => {
  const Vec = IDL.Rec();
  const InitArgs = IDL.Record({ 'custodians' : IDL.Vec(IDL.Principal) });
  const UserError = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'UnauthorizedOwner' : IDL.Null,
    'UnauthorizedUser' : IDL.Null,
    'Other' : IDL.Text,
    'UserNotFound' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : UserError });
  const User__1 = IDL.Record({
    'password' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'email' : IDL.Text,
    'jointEvents' : IDL.Vec(IDL.Nat),
    'nftId' : IDL.Opt(IDL.Vec(IDL.Nat)),
  });
  const Result_1 = IDL.Variant({ 'ok' : User__1, 'err' : UserError });
  const UserRegister = IDL.Record({
    'password' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'email' : IDL.Text,
  });
  const EventId = IDL.Nat;
  Vec.fill(
    IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          'Nat64Content' : IDL.Nat64,
          'Nat32Content' : IDL.Nat32,
          'BoolContent' : IDL.Bool,
          'Nat8Content' : IDL.Nat8,
          'Int64Content' : IDL.Int64,
          'IntContent' : IDL.Int,
          'NatContent' : IDL.Nat,
          'Nat16Content' : IDL.Nat16,
          'Int32Content' : IDL.Int32,
          'Int8Content' : IDL.Int8,
          'FloatContent' : IDL.Float64,
          'Int16Content' : IDL.Int16,
          'BlobContent' : IDL.Vec(IDL.Nat8),
          'NestedContent' : Vec,
          'Principal' : IDL.Principal,
          'TextContent' : IDL.Text,
        }),
      )
    )
  );
  const GenericValue = IDL.Variant({
    'Nat64Content' : IDL.Nat64,
    'Nat32Content' : IDL.Nat32,
    'BoolContent' : IDL.Bool,
    'Nat8Content' : IDL.Nat8,
    'Int64Content' : IDL.Int64,
    'IntContent' : IDL.Int,
    'NatContent' : IDL.Nat,
    'Nat16Content' : IDL.Nat16,
    'Int32Content' : IDL.Int32,
    'Int8Content' : IDL.Int8,
    'FloatContent' : IDL.Float64,
    'Int16Content' : IDL.Int16,
    'BlobContent' : IDL.Vec(IDL.Nat8),
    'NestedContent' : Vec,
    'Principal' : IDL.Principal,
    'TextContent' : IDL.Text,
  });
  const User = IDL.Service({
    'addCustodian' : IDL.Func([IDL.Principal], [Result], []),
    'login' : IDL.Func([], [Result_1], ['query']),
    'loginByEmail' : IDL.Func([IDL.Text, IDL.Text], [Result_1], ['query']),
    'register' : IDL.Func([UserRegister], [Result_1], []),
    'registerByEmail' : IDL.Func([UserRegister], [Result_1], []),
    'registerToEventEmail' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          EventId,
          IDL.Vec(IDL.Tuple(IDL.Text, GenericValue)),
        ],
        [Result],
        [],
      ),
    'registerToEventPrincipal' : IDL.Func(
        [IDL.Text, EventId, IDL.Vec(IDL.Tuple(IDL.Text, GenericValue))],
        [Result],
        [],
      ),
  });
  return User;
};
export const init = ({ IDL }) => {
  const InitArgs = IDL.Record({ 'custodians' : IDL.Vec(IDL.Principal) });
  return [InitArgs];
};
