// import {createActor as createUserActor, canisterId as nftCanisterId} from "../src/declarations/nft_container";
// import {createActor as createPageActor, canisterId as registroCanisterId} from "../src/declarations/registro_acciones";

// export const makeActor = (canisterId: any, createActor: any) => {
//   return createActor(canisterId, {
//     agentOptions: {
//       host: process.env.NEXT_PUBLIC_IC_HOST
//     }
//   })
// }

// export function makeNftActor() {
//   return makeActor(nftCanisterId, createUserActor)
// }

// export function makeRegistroActor() {
//   return makeActor(registroCanisterId, createPageActor)
// }
import {createActor as createUserActor, canisterId as userCanisterId} from "../declarations/user";
import {createActor as createNftActor, canisterId as nftCanisterId} from "../declarations/dip721";
import {createActor as createEventActor, canisterId as eventCanisterId} from "../declarations/event";
import {HttpAgent, Identity} from "@dfinity/agent";

export const makeActor = (canisterId: string, createActor: any, identity?: Identity) => {
  if(identity){
    const agent = new HttpAgent({
      identity: identity,
      host: import.meta.env.VITE_PUBLIC_IC_HOST,
      
    });
    return createActor(canisterId, {
      agent 
    })
  }
  console.log("NO IDENTITY")
  return createActor(canisterId, {
    agentOptions: {
      host: import.meta.env.VITE_PUBLIC_IC_HOST
    }
  })
}

export function makeNftActor(identity?: Identity) {
  return makeActor(nftCanisterId, createNftActor, identity)
}

export function makeUserActor(identity?: Identity) {
  return makeActor(userCanisterId, createUserActor, identity)
}

export function makeEventActor(identity?: Identity) {
  return makeActor(eventCanisterId, createEventActor, identity)
}