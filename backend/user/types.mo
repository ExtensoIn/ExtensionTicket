module Types{
    public type UserEmail = Text;

    public type UserPrincipal = Principal;

    public type InitArgs = {
        custodians: [Principal];
    };

    public type UserRegister = {
        email: Text;
        password: ?Text;
        name: Text; 
    };

    public type User = {
        email: Text;
        password: ?Text;
        name: Text;
        nftId: ?[Nat];
        jointEvents: [Nat];
    };

    public type UserError = {
        #UnauthorizedOwner;
        #UnauthorizedUser;
        #UserNotFound;
        #UserAlreadyExists;
        #Other: Text;
    }
}