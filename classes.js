"use strict";
class UserClass {
    constructor(name) {
        this.name = name;
    }
}
const userClass = new UserClass("dimon");
console.log(userClass);
userClass.name = "Qubiq";
console.log(userClass);
// ---
class AdminClass {
}
const adminClass = new AdminClass();
console.log(adminClass);
// TODO----Constructor
class UserConstr {
    //   constructor(name?: string, age?:number) {
    //     if (typeof name === "string") {
    //       this.name = name;
    //     }
    //   }
    constructor(ageOrName) {
        if (typeof ageOrName === "string") {
            this.name = ageOrName;
        }
        else if (typeof ageOrName === "number") {
            this.age = ageOrName;
        }
    }
}
const userConstr = new UserConstr("Dimon");
const userConstr2 = new UserConstr();
const userConstr3 = new UserConstr(33);
const userConstr4 = new UserConstr(33, "Dimon");
console.log(userConstr4);
