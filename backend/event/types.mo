import Time "mo:base/Time";
module Types {
  public type EventId = Nat;

  public type Event = {
    eventId : EventId;
    name : Text;
    place : Text;
    description : Text;
    startDate : Time.Time;
    endDate : Time.Time;
    ticketsAmount : Nat;
    participantsEmail : [Text];
    participants : [Principal];
  };

  public type InitArgs = {
    custodians : [Principal];
  };

  public type EventError = {
    #EventNotFound;
    #UnauthorizedOwner;
  };
};
