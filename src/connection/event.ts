import {EventError} from "./errors/eventError.ts";
import {makeEventActor} from "./actors.ts";
import {Identity} from "@dfinity/agent";
import {Event__1, Filter, Result, EventType as EventTypeCanister, Status} from "../declarations/event/event.did";
import {CardEvent, Event, EventStatus, EventType} from "./types/event.types.ts";

export async function addEvent(identity: Identity, event: Event): Promise<Event>{
    const actor = makeEventActor(identity);
    const addEventResult: Result = await actor.addEvent({
        id: 0,
        categories: event.categories,
        status: JSON.parse(`{"${event.status}": "null"}`),
        imagenPrincipal: event.imagenPrincipal? [event.imagenPrincipal] : [],
        title: event.title,
        participants: [],
        endDate: event.endDate,
        bannerPrincipal: event.banner? [event.banner] : [],
        speakers: event.speakers? event.speakers : [],
        shortDescription: event.shortDescription,
        ticketsAmount: event.ticketsAmount,
        participantsEmail: [],
        createdByPrincipal: [],
        place: event.place? [event.place] : [],
        price: event.price,
        createdByEmail: [],
        longDescription: event.longDescription? [event.longDescription] : [],
        startDate: event.startDate,
        eventType: JSON.parse(`{"${event.eventType}": "null"}`),
    })
    if('err' in addEventResult){
        throw new EventError(addEventResult.err)
    }
    return event
}

export async function addEventByEmail(email: string, event: Event): Promise<Event>{
    const actor = makeEventActor();
    const addEventResult: Result = await actor.addEventByEmail(email,{
        id: 0,
        categories: event.categories,
        status: JSON.parse(`{"${event.status}": "null"}`),
        imagenPrincipal: event.imagenPrincipal? [event.imagenPrincipal] : [],
        title: event.title,
        participants: [],
        endDate: event.endDate,
        bannerPrincipal: event.banner? [event.banner] : [],
        speakers: event.speakers? event.speakers : [],
        shortDescription: event.shortDescription,
        ticketsAmount: event.ticketsAmount,
        participantsEmail: [],
        createdByPrincipal: [],
        place: event.place? [event.place] : [],
        price: event.price,
        createdByEmail: [],
        longDescription: event.longDescription? [event.longDescription] : [],
        startDate: event.startDate,
        eventType: JSON.parse(`{"${event.eventType}": "null"}`),
    })
    if('err' in addEventResult){
        throw new EventError(addEventResult.err)
    }
    return event
}

function getEventType(eventType: EventTypeCanister): EventType{
    switch (eventType) {
        case { 'Online' : null }:
            return  EventType.Online
        case { 'Hybrid' : null }:
            return EventType.Hybrid
        default:
            return  EventType.OnSite
    }
}

function getEventStatus(status: Status): EventStatus{
    switch (status) {
        case {'NotStarted': null}:
            return EventStatus.NotStarted
        case {'Started': null}:
            return EventStatus.Started
        default:
            return EventStatus.Finished
    }
}

export async function getEvents(limit: number, offset: number, filter?: [Filter]): Promise<CardEvent[]>{
    const actor = makeEventActor();
    const getEventsResult: Event__1[] = await actor.getEvents(limit, offset, filter ?? [])
    return getEventsResult.map(event => {
        const  eventType: EventType = getEventType(event.eventType)
        return {
            title: event.title,
            place: event.place.length === 0 ? undefined : event.place[0],
            shortDescription: event.shortDescription,
            startDate: new Date(Math.trunc(Number(event.startDate)/1000000)),
            banner: event.bannerPrincipal.length === 0 ? undefined : event.bannerPrincipal[0],
            categories: event.categories,
            eventType: eventType,
        }
    })
}

export async function getMyEvents(identity: Identity): Promise<CardEvent[]>{
    const actor = makeEventActor(identity);
    const getEventsResult: Event__1[] = await actor.getMyEvents()
    return getEventsResult.map(event => {
        const  eventType: EventType = getEventType(event.eventType)
        return {
            title: event.title,
            place: event.place.length === 0 ? undefined : event.place[0],
            shortDescription: event.shortDescription,
            startDate: new Date(Math.trunc(Number(event.startDate) / 1000000)),
            banner: event.bannerPrincipal.length === 0 ? undefined : event.bannerPrincipal[0],
            categories: event.categories,
            eventType: eventType,
        }
    })
}

export async function getEvent(id: number): Promise<Event> {
    const actor = makeEventActor();
    const getEventResult: Result = await actor.getEvent(id)
    if ('err' in getEventResult) {
        throw new EventError(getEventResult.err)
    }
    return {
        id: Number(getEventResult.ok.id),
        title: getEventResult.ok.title,
        place: getEventResult.ok.place.length === 0 ? undefined : getEventResult.ok.place[0],
        shortDescription: getEventResult.ok.shortDescription,
        longDescription: getEventResult.ok.longDescription.length === 0 ? undefined : getEventResult.ok.longDescription[0],
        startDate: Number(getEventResult.ok.startDate),
        endDate: Number(getEventResult.ok.endDate),
        ticketsAmount: Number(getEventResult.ok.ticketsAmount),
        status: getEventStatus(getEventResult.ok.status),
        categories: getEventResult.ok.categories,
        eventType: getEventType(getEventResult.ok.eventType),
        price: Number(getEventResult.ok.price),
        banner: getEventResult.ok.bannerPrincipal.length === 0 ? undefined : getEventResult.ok.bannerPrincipal[0],
        imagenPrincipal: getEventResult.ok.imagenPrincipal.length === 0 ? undefined : getEventResult.ok.imagenPrincipal[0],
        speakers: getEventResult.ok.speakers,
    }
}