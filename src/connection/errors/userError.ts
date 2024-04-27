import {UserError as UserCanisterError} from "../../declarations/user/user.did";

export class UserError extends Error{
    public readonly statusCode: number;
    public readonly error: string;

    constructor(userError: UserCanisterError) {
        super("UserError");
        const {statusCode, error} = this.getStatusCode(userError);
        this.statusCode = statusCode;
        this.error = error
        this.message = `Code Status ${this.statusCode} - ${this.error} ${Object.entries(userError)[0][0]}`
        Object.setPrototypeOf(this, UserError.prototype);
    }

    private getStatusCode (userError: UserCanisterError) {
        switch (Object.entries(userError)[0][0]) {
            case "UserAlreadyExists":
                return {statusCode: 400, error: "BadRequest"};
            case "UnauthorizedOwner":
                return {statusCode: 403, error: "Forbidden"};
            case "UnauthorizedUser":
                return {statusCode: 403, error: "Forbidden"};
            case "Other":
                return {statusCode: 400, error: `BadRequest: ${Object.entries(userError)[0][1]}`};
            case "UserNotFound":
                return {statusCode: 404, error: "NotFound"};
            default:
                return {statusCode: 500, error: "InternalServerError"};
        }
    }
}