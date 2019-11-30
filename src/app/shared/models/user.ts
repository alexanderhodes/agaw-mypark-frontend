
export class User {

    private id: number;
    private name: string;
    private password: string;
    private email: string;
    private firstName: string;
    private lastName: string;

    constructor(id: number, name: string, password: string, email: string,
                firstName: string, lastName: string) {
            this.id = id;
            this.name = name;
            this.password = password;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
    }

    // private long id;
    // @Column(name = "name")
    // private String name;
    // @Column(name = "password")
    // private String password;
    // @Column(name = "email")
    // private String email;
    // @Column(name = "firstName")
    // private String firstName;
    // @Column(name = "lastName")
    // private String lastName;

}