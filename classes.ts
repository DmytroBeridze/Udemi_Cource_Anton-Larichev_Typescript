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
  constructor(name: string, age: number);
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
const userConstr4 = new UserConstr("Dimon");
console.log(userConstr4);

// TODO-------------Methods

enum StatusM {
  Holded,
  Processed,
  Revesed,
}

class PaymentM {
  id: number;
  status: StatusM;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number) {
    this.id = id;
    this.createdAt = new Date();
    this.status = StatusM.Holded;
  }
  getPaymentLifeTime(): number {
    return new Date().getTime() - this.createdAt.getTime();
  }
  unholdPaynent() {
    if (this.status === StatusM.Processed) {
      throw new Error("Payment cannot be returned");
    }
    this.status = StatusM.Revesed;
    this.updatedAt = new Date();
  }
}

const paymentM = new PaymentM(1);
paymentM.unholdPaynent();
const timeM = paymentM.getPaymentLifeTime();
console.log(paymentM);
console.log(timeM);
// ------------------------

enum MyPaymentStatus {
  Holded,
  Proccessed,
  Reversed,
}

class MyPayment {
  id: number;
  statusPayment: MyPaymentStatus;
  createdData: Date;
  updatedData: Date;

  constructor(id: number) {
    this.id = id;
    this.statusPayment = MyPaymentStatus.Holded;
    this.createdData = new Date();
  }
  updateStatusPayment(): void {
    if (this.statusPayment === MyPaymentStatus.Proccessed) {
      throw new Error("Payment cannot be returned ");
    }
    this.statusPayment = MyPaymentStatus.Reversed;
    this.updatedData = new Date();
  }

  updatePaymentDate(): number {
    return new Date().getTime() - this.createdData.getTime();
  }
}

const myPayment = new MyPayment(1);
myPayment.updatePaymentDate();
myPayment.updateStatusPayment();
console.log(myPayment);

// TODO----перегрузка методов

class Exercise {
  skills: string[];
  constructor() {
    this.skills = [];
  }

  addSkill(val: string): void;
  addSkill(val: string[]): void;
  addSkill(val: string | string[]): void {
    if (typeof val === "object") {
      this.skills = [...this.skills, ...val];
    }
    if (typeof val === "string") {
      this.skills.push(val);
    }
  }
}
const exercise = new Exercise();
exercise.addSkill(["string", "number", "boolean"]);
console.log(exercise);

// ---перегрузка функции

function reloadFnc(num: number): number;
function reloadFnc(str: string): string;
function reloadFnc(numOrStr: number | string): number | string {
  if (typeof numOrStr === "string") {
    return `String ${numOrStr}`;
  } else return numOrStr + 3;
}

// TODO---Getter Setter
class UserAcces {
  _login: string;
  password: number;

  set login(val: string) {
    this._login = ` My login - ${val}`;
  }

  get login() {
    return this._login;
  }
  // акссесоры нельзя делать аинхронными
  // можно только методы

  async setPass(pass: string) {
    // какой-то асинхронный код Promise для шифрования пароля
  }
}

const userAcces = new UserAcces();
userAcces.login = "login";
console.log(userAcces);

// TODO-----Implemetation
interface ILogger {
  // log(...args: (string | number)[]): void;
  // error(...args: (string | number)[]): void;

  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

class Logger implements ILogger {
  log(...args: any[]): void {
    console.log(...args);
  }
  error(...args: any[]): void {
    console.log(...args);
  }
}
// ---

interface IPayable {
  pay: (val: number) => void;
  price?: number;
}
interface IDeletable {
  dalete: () => void;
}

class UserI implements IPayable, IDeletable {
  pay(val: number): void {
    ///
  }
  dalete(): void {
    ///
  }
  price?: number | undefined;
}

//TODO---Extends

type PaymentClassStatus = "new" | "paid";

class PaymentClass {
  id: number;
  status: PaymentClassStatus;
  constructor(id: number) {
    this.id = id;
  }

  pay() {
    this.status = "paid";
  }
}

class ParsistandPaymentClass extends PaymentClass {
  databaseId: number;
  paidAt: Date;

  constructor() {
    const id = Math.random();
    super(id);
  }
  save() {
    // save data
  }

  // новый метод override, говорящий, что мы переопределили метод родительский
  //будет работать и без него
  override pay(date?: Date) {
    super.pay();
    if (date) {
      this.paidAt = date;
    }
  }
}
// new PaymentClass().
// new ParsistandPaymentClass().

// TODO- особенности наследования
// порядок вызова конструкторов

class UserC {
  name: string = "user";
  constructor() {
    console.log(this.name);
  }
}

class AdminC extends UserC {
  name: string = "admin";
  constructor() {
    super();
    console.log(this.name);
  }
}
new AdminC();

new Error("");

class HttpError extends Error {
  code: number;
  constructor(message: string, code?: number) {
    super(message);
    this.code = code ?? 500;
  }
}
console.log(new HttpError("Not found", 404).message);
console.log(new HttpError("Not found", 404).code);
