import Type "types";
import TypeUser "../user/types";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import List "mo:base/List";
import Map "mo:map/Map";
import {nhash} "mo:map/Map";

actor class Event(initArgs : Type.InitArgs) {
  type Result<T, K> = Result.Result<T, K>;
  type EventError = Type.EventError;
  type UserEmail = TypeUser.UserEmail;
  type UserPrincipal = TypeUser.UserPrincipal;
  type EventId = Type.EventId;
  type Event = Type.Event;
  stable var custodians = initArgs.custodians;
  stable var eventIdCounter: EventId = 0;
  stable let events = Map.new<EventId, Event>();

  public shared ({ caller }) func addCustodian(custodian : Principal) : async Result<(), EventError> {
    if (not List.some<Principal>(List.fromArray(custodians), func c { c == caller })) {
      return #err(#UnauthorizedOwner);
    };
    let custodiansBuffer = Buffer.fromArray<Principal>(custodians);
    custodiansBuffer.add(custodian);
    custodians := Buffer.toArray(custodiansBuffer);
    return #ok;
  };

  public shared ({caller}) func addEvent(eventId: EventId, event : Event) : async Result<Event, EventError> {
    eventIdCounter += 1;
    let newEvent: Event = {event with createdByPrincipal = ?caller};
    Map.set(events, nhash, eventId, newEvent);
    return #ok(event);
  };

  public shared func addEventByEmail(email: Text, event : Event, eventId: EventId) : async Result<Event, EventError> {
    eventIdCounter += 1;
    let newEvent: Event = {event with createdByEmail = ?email};
    Map.set(events, nhash, eventId, newEvent);
    return #ok(newEvent);
  };

};
