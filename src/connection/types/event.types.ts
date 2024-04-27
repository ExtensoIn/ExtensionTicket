export interface Event {
    id: number
    title: string
    place?: string
    shortDescription: string
    longDescription?: string
    startDate: number
    endDate: number
    ticketsAmount: number
    status: "Finished" | "NotStarted" | "Started"
    categories: string[]
    eventType: "OnSite" | "Online" | "Hybrid"
    price: number
    banner?: string
    imagenPrincipal?: string
    speakers?: Speaker[]
}

export interface Speaker{
    name: string
    position: string
}

export interface CardEvent {
    title: string,
    place?: string,
    shortDescription: string,
    startDate: Date,
    banner?: string,
    categories: string[],
    eventType: "OnSite" | "Online" | "Hybrid",
}