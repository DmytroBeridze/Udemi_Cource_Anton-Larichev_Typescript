class UserClass {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const userClass = new UserClass("dimon");

console.log(userClass);
userClass.name = "Qubiq";
console.log(userClass);
// ---
class AdminClass {
  role: number;
}

const adminClass = new AdminClass();
console.log(adminClass);

// TODO----Constructor

class UserConstr {
  name: string;
  age: number;

  constructor();
  constructor(name: string);
  constructor(age: number);
  constructor(age: number, name: string);
  //   constructor(name?: string, age?:number) {
  //     if (typeof name === "string") {
  //       this.name = name;
  //     }
  //   }
  constructor(ageOrName?: number | string, age?: number) {
    if (typeof ageOrName === "string") {
      this.name = ageOrName;
    } else if (typeof ageOrName === "number") {
      this.age = ageOrName;
    } else if (typeof age === "number") {
      this.age = age;
    }
  }
}
const userConstr = new UserConstr("Dimon");
const userConstr2 = new UserConstr();
const userConstr3 = new UserConstr(33);
const userConstr4 = new UserConstr(33, "Dimon");
console.log(userConstr4);
