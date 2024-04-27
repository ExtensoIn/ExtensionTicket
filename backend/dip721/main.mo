import Type "types";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat64 "mo:base/Nat64";
import Cycles "mo:base/ExperimentalCycles";
import Buffer "mo:base/Buffer";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Map "mo:map/Map";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import {nhash} "mo:map/Map";
import {phash} "mo:map/Map";

actor class Dip721NFT(init_args : Type.Metadata) {
    // actor class Dip721NFT() {
    type Metadata = Type.Metadata;
    type Stats = Type.Stats;
    type TxEvent = Type.TxEvent;
    type Result<T, K> = Result.Result<T, K>;
    type NftError = Type.NftError;
    type TokenMetadata = Type.TokenMetadata;
    type SupportedInterface = Type.SupportedInterface;
    type GenericValue = Type.GenericValue;
    stable var logo_attr : ?Text = init_args.logo;
    stable var name_attr : ?Text = init_args.name;
    stable var symbol_attr : ?Text = init_args.symbol;
    stable var created_at : Int = Time.now();
    stable var upgraded_at : Int = Time.now();
    stable var custodians_attr = init_args.custodians;
    stable var nftId = 0;
    stable let nfts = Map.new<Nat, TokenMetadata>();
    stable let operators = Map.new<Principal, [Nat]>();
    stable let history = Map.new<Nat, TxEvent>();
    stable var transaction_id = 1;
    stable let default_principal = Principal.fromActor(actor "aaaaa-aa");
    stable let nft_default : TokenMetadata = {
        transferred_at = null;
        transferred_by = null;
        owner = null;
        operator = null;
        properties = [];
        is_burned = true;
        token_identifier = 0;
        burned_at = null;
        burned_by = null;
        approved_at = null;
        approved_by = null;
        minted_at = 0;
        minted_by = default_principal;
    };

    public query func metadata() : async Metadata {
        return {
            logo = logo_attr;
            name = name_attr;
            created_at = Nat64.fromNat(Int.abs(created_at));
            upgraded_at = Nat64.fromNat(Int.abs(upgraded_at));
            custodians = custodians_attr;
            symbol = symbol_attr;
        };
    };

    public query func stats() : async Stats {
        return {
            cycles = Cycles.balance();
            total_transactions = Iter.size(Map.vals(history));
            total_unique_holders = Array.size(custodians_attr);
            total_supply = Iter.size(Map.vals(nfts));
        };
    };

    public query func logo() : async ?Text {
        return logo_attr;
    };

    public shared ({ caller }) func setLogo(new_logo : Text) {
        if (List.some<Principal>(List.fromArray(custodians_attr), func c { c == caller })) logo_attr := ?new_logo;
    };

    public query func name() : async ?Text {
        return name_attr;
    };

    public shared ({ caller }) func setName(new_name : Text) {
        if (List.some<Principal>(List.fromArray(custodians_attr), func c { c == caller })) name_attr := ?new_name;
    };

    public query func symbol() : async ?Text {
        return symbol_attr;
    };

    public shared ({ caller }) func setSymbol(new_symbol : Text) {
        if (List.some<Principal>(List.fromArray(custodians_attr), func c { c == caller })) symbol_attr := ?new_symbol;
    };

    public query func custodians() : async [Principal] {
        return custodians_attr;
    };

    public shared ({ caller }) func setCustodians(new_custodians : [Principal]) {
        if (List.some<Principal>(List.fromArray(custodians_attr), func c { c == caller })) custodians_attr := new_custodians;
    };

    public query func cycles() : async Nat {
        return Cycles.balance();
    };

    public query func totalUniqueHolders() : async Nat {
        return Array.size(custodians_attr);
    };

    //NFT
    public query func tokenMetadata(token_identifier : Nat) : async Result<TokenMetadata, NftError> {
        let metadata_res = Map.find<Nat, TokenMetadata>(nfts, func(id, nft) { nft.token_identifier == token_identifier });
        switch (metadata_res) {
            case null {
                return #err(#TokenNotFound);
            };
            case (?token) {
                return #ok(token.1);
            };
        };
    };

    public query func balanceOf(user : Principal) : async Result<Nat, NftError> {
        let nft_amount = Iter.size(
            Iter.filter<TokenMetadata>(Map.vals(nfts), func(nft) { Option.get(nft.owner, default_principal) == user })
        );
        switch (nft_amount) {
            case 0 {
                return #err(#OwnerNotFound);
            };
            case (_) {
                return #ok(nft_amount);
            };
        };
    };

    func ownerOf_(token_identifier : Nat) : Result<?Principal, NftError> {
        let item = Map.find<Nat, TokenMetadata>(nfts, func(id, nft) { nft.token_identifier == token_identifier });
        switch (item) {
            case null {
                return #err(#TokenNotFound);
            };
            case (?token) {
                return #ok(token.1.owner);
            };
        };
    };

    public query func ownerOf(token_identifier : Nat) : async Result<?Principal, NftError> {
        return ownerOf_(token_identifier);
    };

    func ownerTokenIdentifiers_(user : Principal) : Result<[Nat], NftError> {
        let res = Map.mapFilter<Nat, TokenMetadata, Nat>(
            nfts,
            nhash,
            func(id, nft) {
                if (Option.get(nft.owner, default_principal) == user) {
                    return ?nft.token_identifier;
                };
                return null;
            },
        );
        switch (Iter.size(Map.vals(res))) {
            case 0 {
                return #err(#OwnerNotFound);
            };
            case (_) {
                return #ok(Iter.toArray(Map.vals(res)));
            };
        };
    };

    public query func ownerTokenIdentifiers(user : Principal) : async Result<[Nat], NftError> {
        return ownerTokenIdentifiers_(user);
    };

    public query func ownerTokenMetadata(user : Principal) : async Result<[TokenMetadata], NftError> {
        let res = Iter.filter<TokenMetadata>(
            Map.vals(nfts),
            func nft {
                Option.get(nft.owner, default_principal) == user;
            },
        );
        switch (Iter.size(res)) {
            case 0 {
                return #err(#OwnerNotFound);
            };
            case (_) {
                return #ok(Iter.toArray(res));
            };
        };
    };

    public query func operatorOf(token_identifier : Nat) : async Result<?Principal, NftError> {
        let item = Map.find<Nat, TokenMetadata>(nfts, func(id, nft) { nft.token_identifier == token_identifier });
        switch (item) {
            case null {
                return #err(#TokenNotFound);
            };
            case (?token) {
                return #ok(token.1.operator);
            };
        };
    };

    public query func operatorTokenIdentifiers(user : Principal) : async Result<[Nat], NftError> {
        let res = Map.mapFilter<Nat, TokenMetadata, Nat>(
            nfts,
            nhash,
            func(id, nft) {
                if (Option.get(nft.operator, default_principal) == user) {
                    return ?nft.token_identifier;
                };
                return null;
            },
        );
        switch (Iter.size(Map.vals(res))) {
            case 0 {
                return #err(#OperatorNotFound);
            };
            case (_) {
                return #ok(Iter.toArray(Map.vals(res)));
            };
        };
    };

    public query func operatorTokenMetadata(user : Principal) : async Result<[TokenMetadata], NftError> {
        let res = Iter.filter<TokenMetadata>(
            Map.vals(nfts),
            func nft {
                Option.get(nft.operator, default_principal) == user;
            },
        );
        switch (Iter.size(res)) {
            case 0 {
                return #err(#OperatorNotFound);
            };
            case (_) {
                return #ok(Iter.toArray(res));
            };
        };
    };

    public query func supportedInterfaces() : async [SupportedInterface] {
        return [#Burn, #Mint, #Approval, #TransactionHistory];
    };

    public query func totalSupply() : async Nat {
        return Map.size(nfts);
    };

    func createTransaction_(operation : Text, details : [(Text, GenericValue)], caller : Principal) : Nat {
        let newTransaction : TxEvent = {
            time = Nat64.fromNat(Int.abs(Time.now()));
            operation = operation;
            details = details;
            caller = caller;
        };
        let id = transaction_id;
        Map.set<Nat, TxEvent>(history, nhash, id, newTransaction);
        transaction_id += 1;
        return id;
    };

    func approve_(token_identifier : Nat, caller : Principal, operator : ?Principal) {
        ignore Map.update<Nat, TokenMetadata>(
            nfts,
            nhash,
            token_identifier,
            func(k, v) {
                var new_nft : TokenMetadata = {
                    {
                        {
                            Option.get(v, nft_default) with operator = operator
                        } with approved_by = ?caller
                    } with approved_at = ?Nat64.fromNat(Int.abs(Time.now()))
                };
                ?new_nft;
            },
        );
    };

    public shared ({ caller }) func approve(operator : Principal, token_identifier : Nat) : async Result<Nat, NftError> {
        if (caller == operator) return #err(#SelfApprove);
        switch (ownerOf_(token_identifier)) {
            case (#err(res)) { return #err(res) };
            case (#ok(res)) {
                if (Option.get(res, default_principal) != caller) return #err(#UnauthorizedOwner);
            };
        };
        let token = Option.get(Map.get(nfts, nhash, token_identifier), nft_default);
        update_operator_cache(token_identifier, token.operator, ?operator);
        approve_(token_identifier, caller, ?operator);
        return #ok(
            createTransaction_(
                "approve",
                [
                    ("operator", #Principal(operator)),
                    ("token_identifier", #NatContent(token_identifier)),
                ],
                caller,
            )
        );
    };

    private func update_operator_cache(token_identifier : Nat, old_operator : ?Principal, new_operator : ?Principal) {
        if (old_operator != null) {
            let old_operator_nn = Option.get(old_operator, default_principal);
            switch (Map.get<Principal, [Nat]>(operators, phash, old_operator_nn)) {
                case (null) {};
                case (?ids) {
                    let aux = Buffer.fromArray<Nat>(ids);
                    ignore Map.update<Principal, [Nat]>(
                        operators,
                        phash,
                        old_operator_nn,
                        func(k, v) {
                            aux.filterEntries(func(_, x) { x != token_identifier });
                            Buffer.removeDuplicates(aux, Nat.compare);
                            return ?Buffer.toArray(aux);
                        },
                    );
                    if (Buffer.isEmpty(aux)) {
                        Map.delete(operators, phash, old_operator_nn);
                    };
                };
            };
        };

        if (new_operator != null) {
            let new_operator_nn = Option.get(new_operator, default_principal);
            switch (Map.get<Principal, [Nat]>(operators, phash, new_operator_nn)) {
                case (null) {
                    Map.set<Principal, [Nat]>(operators, phash, new_operator_nn, [token_identifier]);
                };
                case (?ids) {
                    let aux = Buffer.fromArray<Nat>(ids);
                    ignore Map.update<Principal, [Nat]>(
                        operators,
                        phash,
                        new_operator_nn,
                        func(k, v) {
                            aux.add(token_identifier);
                            Buffer.removeDuplicates(aux, Nat.compare);
                            return ?Buffer.toArray<Nat>(aux);
                        },
                    );
                };
            };
        };
    };

    public shared ({ caller }) func setApprovalForAll(operator : Principal, is_approved : Bool) : async Result<Nat, NftError> {
        if (caller == operator) return #err(#SelfApprove);
        switch (await balanceOf(caller)) {
            case (#err(res)) { return #err(res) };
            case (#ok(res)) {
                let token_metadata = Map.vals(Map.filter<Nat, TokenMetadata>(nfts, nhash, func(k, v) { Option.get(v.owner, default_principal) == caller }));
                let new_operator : ?Principal = if is_approved { ?operator } else {
                    null;
                };
                for (nft in token_metadata) {
                    let old_operator : ?Principal = if is_approved { null } else {
                        ?operator;
                    };
                    update_operator_cache(nft.token_identifier, old_operator, new_operator);
                    if (not is_approved) approve_(nft.token_identifier, caller, new_operator);
                };
                return #ok(
                    createTransaction_(
                        "approve",
                        [
                            ("operator", #Principal(operator)),
                            ("is_approved", #BoolContent(is_approved)),
                        ],
                        caller,
                    )
                );
            };
        };
    };

    public query func isApprovedForAll(owner : Principal, operator : Principal) : async Result<Bool, NftError> {
        switch (ownerTokenIdentifiers_(owner)) {
            case (#err(res)) { return #err(res) };
            case (#ok(res)) {
                let operator_ids = Buffer.fromArray<Nat>(Option.get(Map.get(operators, phash, operator), []));
                return #ok(Buffer.forAll<Nat>(Buffer.fromArray(res), func(x) { Buffer.contains(operator_ids, x, Nat.equal) }));
            };
        };
    };

    func transfer_(transferred_by : Principal, token_identifier : Nat, new_owner : ?Principal) {
        ignore Map.update<Nat, TokenMetadata>(
            nfts,
            nhash,
            token_identifier,
            func(k, v) {
                var new_nft : TokenMetadata = {
                    {
                        {
                            {
                                Option.get(v, nft_default) with owner = new_owner
                            } with transferred_by = ?transferred_by
                        } with transferred_at = ?Nat64.fromNat(Int.abs(Time.now()))
                    } with operator = null
                };
                ?new_nft;
            },
        );
    };

    public shared ({ caller }) func transfer(to : Principal, token_identifier : Nat) : async Result<Nat, NftError> {
        if (caller == to) {
            return #err(#SelfTransfer);
        };
        let old_owner = Option.get(Map.get(nfts, nhash, token_identifier), nft_default).owner;
        let old_operator = Option.get(Map.get(nfts, nhash, token_identifier), nft_default).operator;
        if (old_owner == null or Option.get(old_owner, default_principal) != caller) {
            return #err(#UnauthorizedOwner);
        };
        update_operator_cache(token_identifier, old_operator, null);
        let old_operators = Map.keys(Map.filter<Principal, [Nat]>(operators, phash, func(k, v) { Buffer.contains(Buffer.fromArray<Nat>(v), token_identifier, Nat.equal) }));
        for (operator in old_operators) {
            update_operator_cache(token_identifier, ?operator, null);
        };
        transfer_(caller, token_identifier, ?to);
        return #ok(
            createTransaction_(
                "transfer",
                [
                    ("owner", #Principal(caller)),
                    ("to", #Principal(to)),
                    ("token_identifier", #NatContent(token_identifier)),
                ],
                caller,
            )
        );
    };

    public shared ({ caller }) func transferFrom(from : Principal, to : Principal, token_identifier : Nat) : async Result<Nat, NftError> {
        if (from == to) {
            return #err(#SelfTransfer);
        };
        let old_owner = Option.get(Map.get(nfts, nhash, token_identifier), nft_default).owner;
        let old_operator = Option.get(Map.get(nfts, nhash, token_identifier), nft_default).operator;
        let old_operator_nn = Option.get(old_operator, default_principal);
        let operator_ids = Option.get(Map.get(operators, phash, caller), []);
        if (old_owner == null or Option.get(old_owner, default_principal) != from) {
            return #err(#UnauthorizedOwner);
        };
        if (
            caller != old_operator_nn and
            not Buffer.contains<Nat>(Buffer.fromArray<Nat>(operator_ids), token_identifier, Nat.equal)
        ) {
            return #err(#UnauthorizedOperator);
        };
        update_operator_cache(token_identifier, old_operator, null);
        let old_operators = Map.keys(Map.filter<Principal, [Nat]>(operators, phash, func(k, v) { Buffer.contains(Buffer.fromArray<Nat>(v), token_identifier, Nat.equal) }));
        for (operator in old_operators) {
            update_operator_cache(token_identifier, ?operator, null);
        };
        transfer_(caller, token_identifier, ?to);
        return #ok(
            createTransaction_(
                "transfer",
                [
                    ("owner", #Principal(caller)),
                    ("to", #Principal(to)),
                    ("token_identifier", #NatContent(token_identifier)),
                ],
                caller,
            )
        );
    };

    public shared ({ caller }) func mint(to : Principal, _ : Nat, properties : [(Text, GenericValue)]) : async Result<Nat, NftError> {
        if (not List.some<Principal>(List.fromArray(custodians_attr), func(f) { f == caller })) {
            return #err(#Other("Unauthorized caller for mint"));
        };
        if (Buffer.contains(Buffer.fromIter<Nat>(Map.keys(nfts)), nftId + 1, Nat.equal)) {
            return #err(#ExistedNFT);
        };
        nftId += 1;
        Map.set<Nat, TokenMetadata>(
            nfts,
            nhash,
            nftId,
            {
                transferred_at = null;
                transferred_by = null;
                owner = ?to;
                operator = null;
                properties = properties;
                is_burned = false;
                token_identifier = nftId;
                burned_at = null;
                burned_by = null;
                approved_at = null;
                approved_by = null;
                minted_at = Nat64.fromNat(Int.abs(Time.now()));
                minted_by = caller;
            },
        );
        return #ok(
            createTransaction_(
                "mint",
                [
                    ("to", #Principal(to)),
                    ("token_identifier", #NatContent(nftId)),
                ],
                caller,
            )
        );
    };
    //sOLO CUSTODIANS
    public shared ({ caller }) func burn(token_identifier : Nat) : async Result<Nat, NftError> {
        let old_owner = Option.get(Map.get(nfts, nhash, token_identifier), nft_default).owner;
        if(Option.get(old_owner, default_principal) != caller) return #err(#UnauthorizedOwner);

        let old_operator = Option.get(Map.get(nfts, nhash, token_identifier), nft_default).operator;
        update_operator_cache(token_identifier, old_operator, null);
        ignore Map.update<Nat, TokenMetadata>(
            nfts,
            nhash,
            token_identifier,
            func(k, v) {
                let new_nft : TokenMetadata = {
                    {
                        {
                            {
                                {
                                    Option.get(v, nft_default) with owner = null
                                } with is_burned = true
                            } with burned_at = ?Nat64.fromNat(Int.abs(Time.now()))
                        } with operator = null
                    } with burned_by = ?caller
                };
                ?new_nft;
            },
        );
        return #ok(
            createTransaction_(
                "burn",
                [("token_identifier", #NatContent(token_identifier))],
                caller,
            )
        );
    };

    public query func transaction(tx_id : Nat) : async Result<TxEvent, NftError> {
        let item = Map.find<Nat, TxEvent>(history, func(k, v) { k == tx_id });
        switch (item) {
            case (null) { return #err(#TxNotFound) };
            case (?token) { return #ok(token.1) };
        };
    };

    public query func totalTransactions() : async Nat {
        return Map.size(history);
    };
};
