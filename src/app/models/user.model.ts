export class UserModel {
    
    username: string = '';
    password: string = '';
    email: string = '';
    enabled: boolean = false;
    lastPasswordResetDate: Date = new Date();

}
