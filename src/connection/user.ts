import { Result_1 } from "../declarations/user/user.did";
import { makeUserActor } from "./actors";

export async function login(email: string, password:string){
  const actor = makeUserActor();
  const loginResult: Result_1 = await actor.loginByEmail(email, password)
  if('err' in loginResult){
    throw new Error(loginResult.err.toString())
  }
  console.log(loginResult.ok)
}

// export async function login(){
//   const actor = makeUserActor();
//   const loginResult: Result_1 = await actor.loginByEmail(email, password)
//   if('err' in loginResult){
//     throw new Error(loginResult.err.toString())
//   }
//   console.log(loginResult.ok)
// }