export interface Event {
    id: number
    title: string
    shortDescription: string
    startDate: number
    endDate: number
    ticketsAmount: number
    status: "Finished" | "NotStarted" | "Started"
    categories: string[]
    eventType: "OnSite" | "Online" | "Hybrid"
    price: number
    longDescription?: string
    place?: string
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