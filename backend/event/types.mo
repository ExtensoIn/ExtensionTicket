import Time "mo:base/Time";
module Types {
  public type EventId = Nat;

  public type Status = {
    #NotStarted;
    #Finished;
    #Canceled;
    #InProgress;
  };

  public type Event = {
    title : Text;
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
    categories: [Text];
    eventType: Text;
  };

  public type InitArgs = {
    custodians : [Principal];
  };

  public type EventError = {
    #EventNotFound;
    #UnauthorizedOwner;
  };

  public type Filter = {
    #Category: [Text]; // Varias categorias
    #EventType: [Text]; // Varios tipos de evento
    #DateRange: (Int, Int);
    #Date: Int;
    #Place: Text;
    #Title: Text; // Patron
  }
};
