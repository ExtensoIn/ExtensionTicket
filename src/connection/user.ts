import {GenericValue, Result, Result_1} from "../declarations/user/user.did";
import {makeUserActor} from "./actors";
import {UserError} from "./errors/userError.ts";
import {Identity} from "@dfinity/agent";
import {User} from "./types/user.types.ts";

export async function login(identity: Identity): Promise<User>{
  const actor = makeUserActor(identity);
  const loginResult: Result_1 = await actor.login()
  if('err' in loginResult){
    throw new UserError(loginResult.err)
  }
  return {
    name: loginResult.ok.name,
    email: loginResult.ok.email
  }
}

export async function loginByEmail(email: string, password:string): Promise<User>{
  const actor = makeUserActor();
  const loginResult: Result_1 = await actor.loginByEmail(email, password)
  if('err' in loginResult){
    throw new UserError(loginResult.err)
  }
  return {
    name: loginResult.ok.name,
    email: loginResult.ok.email
  }
}

export async function register(identity: Identity, email: string, name: string, password: string): Promise<User>{
  const actor = makeUserActor(identity);
  const registerResult: Result_1 = await actor.register({
    'password' : [password],
    'name' : name,
    'email' : email,
  })
  if('err' in registerResult){
    throw new UserError(registerResult.err)
  }
  return {
    name: registerResult.ok.name,
    email: registerResult.ok.email
  }
}

export async function registerByEmail(email: string, name: string, password: string): Promise<User>{
  const actor = makeUserActor();
  const registerResult: Result_1 = await actor.register({
    'password' : [password],
    'name' : name,
    'email' : email,
  })
  if('err' in registerResult){
    throw new UserError(registerResult.err)
  }
  return {
    name: registerResult.ok.name,
    email: registerResult.ok.email
  }
}

export async function registerToEventEmail(email: string, password: string, eventId: number, properties: [[string, GenericValue]]): Promise<void>{
  const actor = makeUserActor();
  const registerEventResult: Result = await actor.registerToEventEmail(import.meta.env.VITE_PUBLIC_PRINCIPAL, email, password, eventId, properties)
  if('err' in registerEventResult){
    throw new UserError(registerEventResult.err)
  }
}

export async function registerToEventPrincipal(identity: Identity, eventId: number, properties: [[string, GenericValue]]): Promise<void>{
  const actor = makeUserActor(identity);
  const registerEventResult: Result = await actor.registerToEventPrincipal(import.meta.env.VITE_PUBLIC_PRINCIPAL, eventId, properties)
  if('err' in registerEventResult){
    throw new UserError(registerEventResult.err)
  }
}