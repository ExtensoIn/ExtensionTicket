import {makeNftActor} from "./actors.ts";
import {NftError} from "./errors/nftError.ts";
import {Principal} from "@dfinity/principal";
import {GenericValue} from "../declarations/user/user.did";

export async function mint(to: Principal, properties: [[string, GenericValue]]): Promise<void> {
    const actor = makeNftActor()
    const mintResult = await actor.mint(to, 0, properties)
    if('err' in mintResult){
        throw new NftError(mintResult.err)
    }
}