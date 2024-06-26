module Types {
    public type Metadata = {
        logo : ?Text;
        name : ?Text;
        created_at : Nat64;
        upgraded_at : Nat64;
        custodians : [Principal];
        symbol : ?Text;
    };

    public type Stats = {
        cycles : Nat;
        total_transactions : Nat;
        total_unique_holders : Nat;
        total_supply : Nat;
    };

    public type GenericValue = {
        #Nat64Content : Nat64;
        #Nat32Content : Nat32;
        #BoolContent : Bool;
        #Nat8Content : Nat8;
        #Int64Content : Int64;
        #IntContent : Int;
        #NatContent : Nat;
        #Nat16Content : Nat16;
        #Int32Content : Int32;
        #Int8Content : Int8;
        #FloatContent : Float;
        #Int16Content : Int16;
        #BlobContent : [Nat8];
        #NestedContent : Vec;
        #Principal : Principal;
        #TextContent : Text;
    };

    public type TokenMetadata = {
        transferred_at : ?Nat64;
        transferred_by : ?Principal;
        owner : ?Principal;
        operator : ?Principal;
        is_burned : Bool;
        properties : [(Text, GenericValue)];
        token_identifier : Nat;
        burned_at : ?Nat64;
        burned_by : ?Principal;
        approved_at : ?Nat64;
        approved_by : ?Principal;
        minted_at : Nat64;
        minted_by : Principal;
    };

    public type NftError = {
        #SelfTransfer;
        #TokenNotFound;
        #TxNotFound;
        #SelfApprove;
        #OperatorNotFound;
        #UnauthorizedOwner;
        #UnauthorizedOperator;
        #ExistedNFT;
        #OwnerNotFound;
        #Other : Text;
    };

    public type SupportedInterface = {
        #Burn;
        #Mint;
        #Approval;
        #TransactionHistory;
    };

    public type TxEvent = {
        time : Nat64;
        operation : Text;
        details : [(Text, GenericValue)];
        caller : Principal;
    };

    public type Vec = [(
        Text,
        {
            #Nat64Content : Nat64;
            #Nat32Content : Nat32;
            #BoolContent : Bool;
            #Nat8Content : Nat8;
            #Int64Content : Int64;
            #IntContent : Int;
            #NatContent : Nat;
            #Nat16Content : Nat16;
            #Int32Content : Int32;
            #Int8Content : Int8;
            #FloatContent : Float;
            #Int16Content : Int16;
            #BlobContent : [Nat8];
            #NestedContent : Vec;
            #Principal : Principal;
            #TextContent : Text;
        },
    )];
};
