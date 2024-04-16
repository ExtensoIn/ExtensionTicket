import Type "types";
import TypeUser "../user/types";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import List "mo:base/List";
import Map "mo:map/Map";
import {thash} "mo:map/Map";
import {phash} "mo:map/Map";

actor class Event(initArgs : Type.InitArgs) {
  type Result<T, K> = Result.Result<T, K>;
  type EventError = Type.EventError;
  type UserEmail = TypeUser.UserEmail;
  type UserPrincipal = TypeUser.UserPrincipal;
  type EventId = Type.EventId;
  type Event = Type.Event;
  stable var custodians = initArgs.custodians;
  stable var eventIdCounter: EventId = 0;
  stable var events: [Event] = [];
  stable let eventUserEmail = Map.new<UserEmail, Event>();
  stable let eventUserPrincipal = Map.new<UserPrincipal, Event>();

  public shared ({ caller }) func addCustodian(custodian : Principal) : async Result<(), EventError> {
    if (not List.some<Principal>(List.fromArray(custodians), func c { c == caller })) {
      return #err(#UnauthorizedOwner);
    };
    let custodiansBuffer = Buffer.fromArray<Principal>(custodians);
    custodiansBuffer.add(custodian);
    custodians := Buffer.toArray(custodiansBuffer);
    return #ok;
  };

  public shared ({caller}) func addEvent(event : Event) : async Result<Event, EventError> {
    eventIdCounter += 1;
    let newEvent: Event = {event with eventId = eventIdCounter};
    Map.set(eventUserPrincipal, phash, caller, newEvent);
    let bufferEvents = Buffer.fromArray<Event>(events);
    bufferEvents.add(newEvent);
    events := Buffer.toArray(bufferEvents);
    return #ok(newEvent);
  };

  public shared func addEventByEmail(email: Text, event : Event) : async Result<Event, EventError> {
    eventIdCounter += 1;
    let newEvent: Event = {event with eventId = eventIdCounter};
    Map.set(eventUserEmail, thash, email, newEvent);
    let bufferEvents = Buffer.fromArray<Event>(events);
    bufferEvents.add(newEvent);
    events := Buffer.toArray(bufferEvents);
    return #ok(newEvent);
  };

};
