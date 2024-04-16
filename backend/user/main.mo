import Type "types";
import Map "mo:map/Map";
import {thash} "mo:map/Map";
import {phash} "mo:map/Map";
import Result "mo:base/Result";
import Option "mo:base/Option";
import List "mo:base/List";
import Buffer "mo:base/Buffer";

actor class User(initArgs: Type.InitArgs){
    type UserEmail = Type.UserEmail;
    type UserPrincipal = Type.UserPrincipal;
    type User = Type.User;
    type UserRegister = Type.UserRegister;
    type UserError = Type.UserError;
    type Result<T, K> = Result.Result<T, K>;
    stable let usersEmail = Map.new<UserEmail, User>();
    stable let users = Map.new<UserPrincipal, User>();
    stable var custodians = initArgs.custodians;

    public shared ({caller}) func addCustodian(custodian: Principal): async Result<(), UserError>{
        if (not List.some<Principal>(List.fromArray(custodians), func c { c == caller })){
            return #err(#UnauthorizedOwner)
        };
        let custodiansBuffer = Buffer.fromArray<Principal>(custodians);
        custodiansBuffer.add(custodian);
        custodians := Buffer.toArray(custodiansBuffer);
        return #ok
    };

    public query func loginByEmail(email: Text, password: Text): async Result<User, UserError>{
        switch(Map.get(usersEmail, thash, email)) {
            case(null) {
                return #err(#UserNotFound)
            };
            case(?user) {
                if(Option.get(user.password, "") != password){
                    return #err(#UnauthorizedUser)
                };
                return #ok({user with password = null})
            };
        };
    };

    public query ({caller}) func login(): async Result<User, UserError>{
        switch(Map.get(users, phash, caller)) {
            case(null) {
                return #err(#UserNotFound)
            };
            case(?user) {
                return #ok(user)
            };
        };
    };

    public func registerByEmail(userRegister: UserRegister): async Result<User, UserError>{
        switch(Map.get(usersEmail, thash, userRegister.email)) {
            case(null) {
                let newUser: User = {
                    email = userRegister.email;
                    password = userRegister.password;
                    name = userRegister.name;
                    nftId = ?[];
                    jointEvents = [];
                };
                Map.set<UserEmail, User>(usersEmail, thash, newUser.email, newUser);
                return #ok({newUser with password = null})
            };
            case(?user) {
                return #err(#UserAlreadyExists)
            };
        };
    };

    public shared ({caller}) func register(userRegister: UserRegister): async Result<User, UserError>{
        switch(Map.get(users, phash, caller)) {
            case(null) {
                let newUser: User = {
                    email = userRegister.email;
                    password = userRegister.password;
                    name = userRegister.name;
                    nftId = null;
                    jointEvents = [];
                };
                Map.set(users, phash, caller, newUser);
                return #ok(newUser)
            };
            case(?user) {
                return #err(#UserAlreadyExists)
            };
        };
    }
}