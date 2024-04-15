module Types{
    public type UserEmail = Text;
    public type UserPrincipal = Principal;

    public type User = {
        email: Text;
        password: ?Text;
        name: Text;
        nftId: [Nat]
    };

    public type UserError = {
        #UnauthorizedUser;
        #UserNotFound;
        #UserAlreadyExists;
        #Other;
    }
}