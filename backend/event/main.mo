import Type "types";
import TypeUser "../user/types";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import List "mo:base/List";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Map "mo:map/Map";
import {nhash} "mo:map/Map";
import Time "mo:time/time";

actor class Event(initArgs : Type.InitArgs) {
  type Result<T, K> = Result.Result<T, K>;
  type EventError = Type.EventError;
  type UserEmail = TypeUser.UserEmail;
  type UserPrincipal = TypeUser.UserPrincipal;
  type EventId = Type.EventId;
  type Event = Type.Event;
  type Filter = Type.Filter;
  type EventType = Type.EventType;
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

  public query func getCustodians(): async [Principal]{
    return custodians
  };

  public shared ({caller}) func addEvent(event : Event) : async Result<Event, EventError> {
    eventIdCounter += 1;
    let newEvent: Event = {{event with createdByPrincipal = ?caller} with id = eventIdCounter};
    Map.setFront(events, nhash, eventIdCounter, newEvent);
    return #ok(event);
  };

  public shared func addEventByEmail(email: Text, event : Event) : async Result<Event, EventError> {
    eventIdCounter += 1;
    let newEvent: Event = {{event with createdByEmail = ?email} with id = eventIdCounter};
    Map.setFront(events, nhash, eventIdCounter, newEvent);
    return #ok(newEvent);
  };

  private func equalEventType(e1: EventType, e2: EventType): Bool{
    return e1 == e2
  };

  public query func getEvents(limit: Nat, offset: Nat, sortBy: ?Filter): async [Event]{
    var eventsBuffer = Buffer.fromIter<Event>(Map.vals(events));
    switch(sortBy) {
      case(?#Category(category)) { eventsBuffer.filterEntries(func(_, event){
        let categoriesBuffer = Buffer.fromArray<Text>(event.categories);
        for(c in Iter.fromArray(category)){
          if(Buffer.contains<Text>(categoriesBuffer, c, Text.equal)){
            return true
          };
        };
        return false;
      });};
      case(?#EventType(eventType)) { eventsBuffer.filterEntries(func(_, event){
        let eventTypeBuffer = Buffer.fromArray<EventType>(eventType);
        return Buffer.contains<EventType>(eventTypeBuffer, event.eventType, equalEventType);
      });};
      case(?#DateRange(from, to)) { eventsBuffer.filterEntries(func(_, event){
        return event.startDate >= from and event.startDate <= to
      });};
      case(?#Date(date)) { eventsBuffer.filterEntries(func(_, event){
        let dateTime = Time.fromNanos(date);
        let dateEvent = Time.fromNanos(event.startDate);
        return dateTime.year == dateEvent.year and dateTime.month == dateEvent.month and dateTime.day == dateEvent.day
      });};
      case(?#Place(place)) { eventsBuffer.filterEntries(func(_, event){
        let eventPlace = Option.get(event.place, "");
        return eventPlace == place
      });};
      case(?#Title(title)) { eventsBuffer.filterEntries(func(_, event){
        let patternTitle = #text title;
        return Text.contains(event.title, patternTitle);
      });};
      case(_){};
    };
    if(+eventsBuffer.size() - offset <= limit){
      if(+eventsBuffer.size() - offset <= 0){
        return [];
      };
      eventsBuffer := Buffer.subBuffer(eventsBuffer, offset, (eventsBuffer.size() - offset): Nat)
    }else{
      eventsBuffer := Buffer.subBuffer(eventsBuffer, offset, limit)
    };
    return Buffer.toArray(eventsBuffer);
  };

  public query ({caller}) func getMyEvents(): async [Event]{
    return Iter.toArray<Event>(Iter.filter(Map.vals(events), func(event: Event): Bool{ event.createdByPrincipal == ?caller }));
  };

  public query func getEvent(id: EventId): async Result<Event, EventError>{
    switch(Map.get(events, nhash, id)) {
      case(null) { return #err(#EventNotFound) };
      case(?event) { return #ok(event) };
    };
  }

};
