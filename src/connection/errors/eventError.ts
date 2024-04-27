import {EventError as EventCanisterError} from "../../declarations/event/event.did";

export class EventError extends Error{
    public readonly statusCode: number;
    public readonly error: string;

    constructor(eventError: EventCanisterError) {
        super("EventError");
        const {statusCode, error} = this.getStatusCode(eventError);
        this.statusCode = statusCode;
        this.error = error
        this.message = `Code Status ${this.statusCode} - ${this.error} ${Object.entries(eventError)[0][0]}`
        Object.setPrototypeOf(this, EventError.prototype);
    }

    private getStatusCode (userError: EventCanisterError) {
        switch (Object.entries(userError)[0][0]) {
            case "EventNotFound":
                return {statusCode: 404, error: "NotFound"};
            case "UnauthorizedOwner":
                return {statusCode: 403, error: "Forbidden"};
            default:
                return {statusCode: 500, error: "InternalServerError"};
        }
    }
}