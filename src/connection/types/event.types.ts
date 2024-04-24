export enum EventStatus {
    Finished,
    InProgress,
    Canceled,
    NotStarted,
}

export interface RegisterEvent {
    title: string
    place: string
    description: string
    startDate: number
    endDate: number
    ticketsAmount: number
    status: EventStatus
    categories: string[]
    eventType: string
}

export interface Event {
    title: string,
    place: string,
    description: string,
    startDate: Date,
}