import {EventError} from "./errors/eventError.ts";
import {makeEventActor} from "./actors.ts";
import {Identity} from "@dfinity/agent";
import {Event__1, Filter, Result} from "../declarations/event/event.did";
import {Event, RegisterEvent} from "./types/event.types.ts";

export async function addEvent(identity: Identity, event: RegisterEvent): Promise<Event>{
    const actor = makeEventActor(identity);
    const addEventResult: Result = await actor.addEvent({
        categories: event.categories,
        status: JSON.parse(`{"${event.status}": "null"}`),
        title: event.title,
        participants: [],
        endDate: event.endDate,
        description: event.description,
        ticketsAmount: event.ticketsAmount,
        participantsEmail: [],
        createdByPrincipal: [],
        place: event.place,
        createdByEmail: [],
        startDate: event.startDate,
        eventType: event.eventType,
    })
    if('err' in addEventResult){
        throw new EventError(addEventResult.err)
    }
    return {
        description: event.description,
        place: event.place,
        startDate: new Date(Math.trunc(event.startDate / 1000000)),
        title: event.title
    }
}

export async function addEventByEmail(email: string, event: RegisterEvent): Promise<Event>{
    const actor = makeEventActor();
    const addEventResult: Result = await actor.addEvent(email,{
        categories: event.categories,
        status: JSON.parse(`{"${event.status}": "null"}`),
        title: event.title,
        participants: [],
        endDate: event.endDate,
        description: event.description,
        ticketsAmount: event.ticketsAmount,
        participantsEmail: [],
        createdByPrincipal: [],
        place: event.place,
        createdByEmail: [],
        startDate: event.startDate,
        eventType: event.eventType,
    })
    if('err' in addEventResult){
        throw new EventError(addEventResult.err)
    }
    return {
        description: event.description,
        place: event.place,
        startDate: new Date(Math.trunc(event.startDate / 1000000)),
        title: event.title
    }
}

export async function getEvents(limit: number, offset: number, filter?: Filter): Promise<[Event__1]>{
    const actor = makeEventActor();
    return await actor.getEvents(limit, offset, filter ?? [])
}