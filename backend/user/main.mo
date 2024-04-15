import Type "types";
import Map "mo:map/Map";
import {thash} "mo:map/Map";
import {phash} "mo:map/Map";
import Result "mo:base/Result";
import Option "mo:base/Option";

actor{
    type UserEmail = Type.UserEmail;
    type UserPrincipal = Type.UserPrincipal;
    type User = Type.User;
    type UserError = Type.UserError;
    type Result<T, K> = Result.Result<T, K>;
    stable let usersEmail = Map.new<UserEmail, User>();
    stable let users = Map.new<UserPrincipal, User>();

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

    public func registerByEmail(newUser: User): async Result<User, UserError>{
        switch(Map.get(usersEmail, thash, newUser.email)) {
            case(null) {
                Map.set(usersEmail, thash, newUser.email, newUser);
                return #ok({newUser with password = null})
            };
            case(?user) {
                return #err(#UserAlreadyExists)
            };
        };
    };

    public shared ({caller}) func register(newUser: User): async Result<User, UserError>{
        switch(Map.get(users, phash, caller)) {
            case(null) {
                Map.set(users, phash, caller, newUser);
                return #ok(newUser)
            };
            case(?user) {
                return #err(#UserAlreadyExists)
            };
        };
    }
}