export class UserAdmin{
    email: string;
    password: string;
    role: 'Admin' | 'Manager' | 'Employee';

    constructor(
        email: string,
        password: string,
        role: 'Admin' | 'Manager' | 'Employee',
    ) {
        this.email = email;
        this.password = password;
        this.role = role;
    }


}