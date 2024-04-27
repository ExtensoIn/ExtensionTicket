import Time "mo:base/Time";
module Types {
  public type EventId = Nat;

  public type Status = {
    #NotStarted;
    #Finished;
    #Started;
  };

  public type Speaker = {
    name: Text;
    position: Text;
  };

  public type Event = {
    id: EventId;
    title : Text;
    place : ?Text;
    shortDescription: Text;
    longDescription : ?Text;
    startDate : Time.Time;
    endDate : Time.Time;
    ticketsAmount : Nat;
    participantsEmail : [Text];
    participants : [Principal];
    createdByEmail: ?Text;
    createdByPrincipal: ?Principal;
    status: Status;
    categories: [Text];
    eventType: EventType;
    price: Nat;
    bannerPrincipal: ?Text;
    imagenPrincipal: ?Text;
    speakers: [Speaker];
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
    #EventType: [EventType]; // Varios tipos de evento
    #DateRange: (Int, Int);
    #Date: Int;
    #Place: Text;
    #Title: Text; // Patron
  };

  public type EventType = {
    #OnSite;
    #Online;
    #Hybrid;
  }
};
