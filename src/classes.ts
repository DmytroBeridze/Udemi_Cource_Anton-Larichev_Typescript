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

// -------
class Test {
  name: string = "";
  age: number = 0;

  constructor();
  constructor(name: string);
  constructor(age: number);
  constructor(name: string, age: number);
  constructor(params?: string | number, age?: number) {
    if (typeof params === "string") {
      this.name = params;

      if (typeof age === "number") {
        this.age = age;
      }
    } else if (typeof params === "number") {
      this.age = params;
    }
  }
}
const test = new Test(2.5);
console.log(test);

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

// ------------Composition and Inheritance
/*
  1.Inheritance — наследование: позволяет создавать новые классы на основе 
  существующих, чтобы разделить иерархии и повторно использовать функциональность.
  2 .Composition — композиция: предполагает создание сложных объектов за счёт включения 
объектов других классов вместо наследования. */

// наследование
class UserIn {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class UsersInher extends Array<UserIn> {
  findByName(name: string) {
    return this.filter((elem) => elem.name === name);
  }
  override toString(): string {
    return this.map((elem) => elem.name).join(". ");
  }
}

const usersInher = new UsersInher();
usersInher.push(new UserIn("Dimon"));
usersInher.push(new UserIn("Qubiq"));
console.log(usersInher.toString());

// композиция
class UserCompos {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class UsersCompos {
  users: UserCompos[] = [];

  addUsers(user: UserCompos) {
    this.users.push(user);
  }
}

const usersCompos = new UsersCompos();
usersCompos.addUsers(new UserCompos("Remark"));
console.log(usersCompos);

class UserPay {
  date: Date;
}

class UserWithPay {
  name: string;
  payment: UserPay;

  constructor(name: string, payment: UserPay) {
    this.name = name;
    this.payment = payment;
  }
}

// ---------------

class PayMent {
  date: Date;
  constructor(date: Date) {
    this.date = date;
  }
}

class UserP {
  name: string;
  payment: PayMent;

  constructor(name: string, payment: PayMent) {
    this.name = name;
    this.payment = payment;
  }
}

const dt = new Date();

const userP = new UserP("Dimon", new PayMent(dt));
console.log(userP);

//TODO------ видимость свойств: Public, Protected, Privat, Readonly

class Vehicle {
  public make: string;
  private damages: string[]; //не доступен в расширяемом классе и извне
  private _model: string; //не доступен в расширяемом классе и извне
  protected run: number; // доступен в расширяемом классе

  #price: number; //тоже приватное свойство . Объявляется так же, как в JS и работает в JS

  public addDamage(val: string) {
    this.damages.push(val);
    this.#price = 1000;
  }

  set model(val: string) {
    this._model = val;
  }

  get model() {
    return this.model;
  }
}

class Eurotrack extends Vehicle {
  setRun(km: number) {
    this.run = km / 0.62;
  }
}

const vehicle = new Vehicle();

// -----------------------Упражнение 4

interface ProductsInterface {
  id: number;
  name: string;
  price: number;
}

interface HomeDelivery {
  date: Date;
  address: string;
}

interface PointDelivery {
  date: Date;
  id: number;
}
// product class
class Product implements ProductsInterface {
  id: number;
  name: string;
  price: number;
  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
// cart class
class Cart {
  private cart: Product[] = [];
  private delivery: HomeDelivery | PointDelivery | null = null;
  // add
  addProducts(product: Product): void {
    this.cart.push(product);
  }
  // delete
  deleteProducts(id: number): void {
    const check = this.cart.findIndex((elem) => elem.id === id);
    if (check != -1) {
      this.cart = this.cart.filter((elem) => elem.id !== id);
    } else console.log("Not element");
  }
  // quantity
  allPrice(): number {
    return this.cart.reduce((acc, curr) => (acc += curr.price), 0);
  }
  // set delivery
  setDelivery(data: HomeDelivery | PointDelivery) {
    this.delivery = data;
  }
  //checkout

  productsCheckout() {
    if (this.cart.length === 0) {
      throw new Error("Empty cart");
    }

    if (!this.delivery) {
      throw new Error("No delivery address");
    }
    return { success: true };
  }
}
const cart = new Cart();
cart.addProducts(new Product(1, "Dimon", 23));
cart.addProducts(new Product(2, "Qubiq", 50));
cart.addProducts(new Product(3, "Erich Maria Remarque", 50));
cart.deleteProducts(2);

let dta = new Date();
cart.setDelivery({ date: dta, address: "address" });
// cart.setDelivery({ date: dta, id: 456 });
console.log(cart);

const allProductPrice = cart.allPrice();
console.log(allProductPrice);
console.log(cart.productsCheckout());

// TODO-----Static
class UserService {
  static db: any = 12;
  static getUserById(id: number) {
    return this.db.findById(id);
  }
  create() {
    return UserService.db;
  }
  // статический блок
  //в этом блоке код срабатывает сразу при инициализации класса
  static {
    UserService.db = "статический блок";
  }
}
UserService.db;
const userService = new UserService();
// console.log(userService.create());
console.log(UserService);

//TODO-работа с-this
class PaymenrThis {
  private date: Date = new Date();

  getDate(this: PaymenrThis) {
    //чтобы не терялся контекст при вызове этой ф-ции в другом объекте
    return this.date;
  }

  // стрелочный метод всегда сохраняет контекст
  arrowGetDate = () => this.date;
}
const paymentThis = new PaymenrThis();
console.log(paymentThis.getDate());

const userThis = {
  id: 1,
  paymentDate: paymentThis.getDate, //теняется контекст. This в этом случае-userThis
  paymentDate2: paymentThis.getDate.bind(paymentThis),
  // paymentDate2: paymentThis.getDate.bind(paymentThis),

  arrowDate: paymentThis.arrowGetDate,
};

console.log(userThis.paymentDate2());
console.log(userThis.arrowDate());

// -----случай когда стрелочный метод не будет работать

class PaymentPersistent extends PaymenrThis {
  save() {
    // return super.getDate();
    // return super.arrowGetDate();//не будет работать, потому что стрелочной ф-ции нет в прототипе класса
    return this.arrowGetDate(); // а так будет
  }
}

console.log(new PaymentPersistent().save()); // работает

// TODO--типизация this

class UserBuilder {
  name: string;
  setName(val: string): this {
    this.name = val;
    return this;
  }

  isAdmin(): this is AdminBuilder {
    return this instanceof AdminBuilder;
  }
}
class AdminBuilder extends UserBuilder {
  roles: string[];
}

// const userBuilder = new UserBuilder();
// console.log(userBuilder.setName("Qubiq"));

// const adminBuilder = new AdminBuilder();
// console.log(adminBuilder.setName("Dimon"));

let userT: AdminBuilder | UserBuilder = new UserBuilder();

if (userT.isAdmin()) {
  console.log(userT);
} else console.log(userT);
// -----------
class MainClass {
  name: string = "Dimon";
  age: number = 45;

  fullData(): string {
    return `${this.name} ${this.age}`;
  }

  getClass(): this is ExtendMainClass {
    return this instanceof ExtendMainClass;
  }
}

class ExtendMainClass extends MainClass {
  role: string = "admin";
}

const childObj = new MainClass();
if (childObj.getClass()) {
  console.log("ExtendMainClass", childObj);
} else console.log("MainClass", childObj);

// TODO---abstract class

abstract class Controller {
  abstract handle(req: any): void;

  handleWithLogs(req: any) {
    console.log("Start");
    this.handle(req);
    console.log("End");
  }
}

// new Controller() // ERROR

class UserController extends Controller {
  handle(req: any): void {
    console.log(req);
  }
}

const userController = new UserController();
userController.handle("qwerty");
userController.handleWithLogs("test");
