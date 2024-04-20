export const idlFactory = ({ IDL }) => {
  const InitArgs = IDL.Record({ 'custodians' : IDL.Vec(IDL.Principal) });
  const EventError = IDL.Variant({
    'UnauthorizedOwner' : IDL.Null,
    'EventNotFound' : IDL.Null,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : EventError });
  const EventId = IDL.Nat;
  const Status = IDL.Variant({
    'Finished' : IDL.Null,
    'InProgress' : IDL.Null,
    'Canceled' : IDL.Null,
  });
  const Time = IDL.Int;
  const Event__1 = IDL.Record({
    'status' : Status,
    'participants' : IDL.Vec(IDL.Principal),
    'endDate' : Time,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'ticketsAmount' : IDL.Nat,
    'participantsEmail' : IDL.Vec(IDL.Text),
    'createdByPrincipal' : IDL.Opt(IDL.Principal),
    'place' : IDL.Text,
    'createdByEmail' : IDL.Opt(IDL.Text),
    'startDate' : Time,
  });
  const Result = IDL.Variant({ 'ok' : Event__1, 'err' : EventError });
  const Event = IDL.Service({
    'addCustodian' : IDL.Func([IDL.Principal], [Result_1], []),
    'addEvent' : IDL.Func([EventId, Event__1], [Result], []),
    'addEventByEmail' : IDL.Func([IDL.Text, Event__1, EventId], [Result], []),
  });
  return Event;
};
export const init = ({ IDL }) => {
  const InitArgs = IDL.Record({ 'custodians' : IDL.Vec(IDL.Principal) });
  return [InitArgs];
};
