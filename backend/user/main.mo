import Type "types";
import TypeNft "../dip721/types";
import TypeEvent "../event/types";
import Map "mo:map/Map";
import { thash } "mo:map/Map";
import { phash } "mo:map/Map";
import Result "mo:base/Result";
import Option "mo:base/Option";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";

actor class User(initArgs : Type.InitArgs) {
  type UserEmail = Type.UserEmail;
  type UserPrincipal = Type.UserPrincipal;
  type User = Type.User;
  type UserRegister = Type.UserRegister;
  type UserError = Type.UserError;
  type GenericValue = TypeNft.GenericValue;
  type NftError = TypeNft.NftError;
  type TxEvent = TypeNft.TxEvent;
  type EventId = TypeEvent.EventId;
  type Result<T, K> = Result.Result<T, K>;
  let nftController = actor ("be2us-64aaa-aaaaa-qaabq-cai") : actor {
    mint : (Principal, Nat, [(Text, GenericValue)]) -> async Result<Nat, NftError>;
    transaction: (Nat) -> async Result<TxEvent, NftError>;
  };
  stable let usersEmail = Map.new<UserEmail, User>();
  stable let users = Map.new<UserPrincipal, User>();
  stable var custodians = initArgs.custodians;

  public shared ({ caller }) func addCustodian(custodian : Principal) : async Result<(), UserError> {
    if (not List.some<Principal>(List.fromArray(custodians), func c { c == caller })) {
      return #err(#UnauthorizedOwner);
    };
    let custodiansBuffer = Buffer.fromArray<Principal>(custodians);
    custodiansBuffer.add(custodian);
    custodians := Buffer.toArray(custodiansBuffer);
    return #ok;
  };

  public query func loginByEmail(email : Text, password : Text) : async Result<User, UserError> {
    switch (Map.get(usersEmail, thash, email)) {
      case (null) {
        return #err(#UserNotFound);
      };
      case (?user) {
        if (Option.get(user.password, "") != password) {
          return #err(#UnauthorizedUser);
        };
        return #ok({ user with password = null });
      };
    };
  };

  public query ({ caller }) func login() : async Result<User, UserError> {
    switch (Map.get(users, phash, caller)) {
      case (null) {
        return #err(#UserNotFound);
      };
      case (?user) {
        return #ok(user);
      };
    };
  };

  public func registerByEmail(userRegister : UserRegister) : async Result<User, UserError> {
    switch (Map.get(usersEmail, thash, userRegister.email)) {
      case (null) {
        let newUser : User = {
          email = userRegister.email;
          password = userRegister.password;
          name = userRegister.name;
          nftId = ?[];
          jointEvents = [];
        };
        Map.set<UserEmail, User>(usersEmail, thash, newUser.email, newUser);
        return #ok({ newUser with password = null });
      };
      case (?user) {
        return #err(#UserAlreadyExists);
      };
    };
  };

  public shared ({ caller }) func register(userRegister : UserRegister) : async Result<User, UserError> {
    switch (Map.get(users, phash, caller)) {
      case (null) {
        let newUser : User = {
          email = userRegister.email;
          password = userRegister.password;
          name = userRegister.name;
          nftId = null;
          jointEvents = [];
        };
        Map.set(users, phash, caller, newUser);
        return #ok(newUser);
      };
      case (?user) {
        return #err(#UserAlreadyExists);
      };
    };
  };

  private func getNatContent(details: GenericValue): Nat{
    switch(details) {
      case(#NatContent(n)) { return n };
      case(_) { return 0; };
    };
  };

  public shared func registerToEventEmail(actorId : Text, email: Text, password: Text, eventId: EventId, properties: [(Text, GenericValue)]) : async Result<(), UserError> {
    let custodian = Principal.fromText(actorId);
    if (not List.some<Principal>(List.fromArray(custodians), func(f) { f == custodian })) {
      return #err(#UnauthorizedOwner);
    };
    switch (Map.get(usersEmail, thash, email)) {
      case (null) {
        return #err(#UserNotFound);
      };
      case (?user) {
        if (Option.get(user.password, "") != password) {
          return #err(#UnauthorizedUser);
        };
        switch(await nftController.mint(custodian, 0, properties)) {
          case(#err(e)) { return #err(#Other("Error during mint"))};
          case(#ok(transactionId)){
            switch(await nftController.transaction(transactionId)) {
              case(#err(ev)) {return #err(#Other("Transaction does not exist"))};
              case(#ok(transaction)) {
                let nftIdsBuffer = Buffer.fromArray<Nat>(Option.get(user.nftId, []));
                let jointEventsBuffer = Buffer.fromArray<Nat>(user.jointEvents);
                nftIdsBuffer.add(getNatContent(transaction.details[0].1));
                jointEventsBuffer.add(eventId);
                ignore Map.replace(usersEmail, thash, email, {{user with nftId = ?Buffer.toArray(nftIdsBuffer)} with jointEvents = Buffer.toArray(jointEventsBuffer)});
                return #ok()
              };
            };
          };
        };
      };
    };
  };

  public shared ({caller}) func registerToEventPrincipal(actorId : Text, eventId: EventId, properties: [(Text, GenericValue)]): async Result<(), UserError>{
    let custodian = Principal.fromText(actorId);
    if (not List.some<Principal>(List.fromArray(custodians), func(f) { f == custodian })) {
      return #err(#UnauthorizedOwner);
    };
    switch (Map.get(users, phash, caller)) {
      case (null) {
        return #err(#UserNotFound);
      };
      case (?user) {
        switch(await nftController.mint(caller, 0, properties)) {
          case(#err(e)) { return #err(#Other("Error during mint"))};
          case(#ok(transactionId)){
            let jointEventsBuffer = Buffer.fromArray<Nat>(user.jointEvents);
            jointEventsBuffer.add(eventId);
            ignore Map.replace(users, phash, caller, {user with jointEvents = Buffer.toArray(jointEventsBuffer)});
            return #ok()
          };
        };
      };
    };
  };
};
