import Time "mo:base/Time";
module Types {
  public type EventId = Nat;

  public type Status = {
    #Finished;
    #Canceled;
    #InProgress;
  };

  public type Event = {
    name : Text;
    place : Text;
    description : Text;
    startDate : Time.Time;
    endDate : Time.Time;
    ticketsAmount : Nat;
    participantsEmail : [Text];
    participants : [Principal];
    createdByEmail: ?Text;
    createdByPrincipal: ?Principal;
    status: Status;
  };

  public type InitArgs = {
    custodians : [Principal];
  };

  public type EventError = {
    #EventNotFound;
    #UnauthorizedOwner;
  };
};
