import {NftError as NftCanisterError} from "../../declarations/dip721/dip721.did";

export class NftError extends Error{
  public readonly statusCode: number;
  public readonly error: string;

  constructor(nftError: NftCanisterError) {
    super("NftError");
    const {statusCode, error} = this.getStatusCode(nftError);
    this.statusCode = statusCode;
    this.error = error
    this.message = `Code Status ${this.statusCode} - ${this.error} ${Object.entries(nftError)[0][0]}`
    Object.setPrototypeOf(this, NftError.prototype);
  }

  private getStatusCode (userError: NftCanisterError) {
    switch (Object.entries(userError)[0][0]) {
      case "UnauthorizedOperator":
        return {statusCode: 403, error: "Forbidden"};
      case "SelfTransfer":
        return {statusCode: 400, error: "BadRequest"};
      case "TokenNotFound":
        return {statusCode: 404, error: "NotFound"};
      case "UnauthorizedOwner":
        return {statusCode: 403, error: "Forbidden"};
      case "TxNotFound":
        return {statusCode: 404, error: "NotFound"};
      case "SelfApprove":
        return {statusCode: 400, error: "BadRequest"};
      case "OperatorNotFound":
        return {statusCode: 404, error: "NotFound"};
      case "ExistedNFT":
        return {statusCode: 400, error: "BadRequest"};
      case "OwnerNotFound":
        return {statusCode: 404, error: "NotFound"};
      case "Other":
        return {statusCode: 400, error: `BadRequest: ${Object.entries(userError)[0][1]}`};
      default:
        return {statusCode: 500, error: "InternalServerError"};
    }
  }
}