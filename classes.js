"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Vehicle_price;
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
    constructor(ageOrName, age) {
        if (typeof ageOrName === "string") {
            this.name = ageOrName;
        }
        else if (typeof ageOrName === "number") {
            this.age = ageOrName;
        }
        else if (typeof age === "number") {
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
var StatusM;
(function (StatusM) {
    StatusM[StatusM["Holded"] = 0] = "Holded";
    StatusM[StatusM["Processed"] = 1] = "Processed";
    StatusM[StatusM["Revesed"] = 2] = "Revesed";
})(StatusM || (StatusM = {}));
class PaymentM {
    constructor(id) {
        this.id = id;
        this.createdAt = new Date();
        this.status = StatusM.Holded;
    }
    getPaymentLifeTime() {
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
var MyPaymentStatus;
(function (MyPaymentStatus) {
    MyPaymentStatus[MyPaymentStatus["Holded"] = 0] = "Holded";
    MyPaymentStatus[MyPaymentStatus["Proccessed"] = 1] = "Proccessed";
    MyPaymentStatus[MyPaymentStatus["Reversed"] = 2] = "Reversed";
})(MyPaymentStatus || (MyPaymentStatus = {}));
class MyPayment {
    constructor(id) {
        this.id = id;
        this.statusPayment = MyPaymentStatus.Holded;
        this.createdData = new Date();
    }
    updateStatusPayment() {
        if (this.statusPayment === MyPaymentStatus.Proccessed) {
            throw new Error("Payment cannot be returned ");
        }
        this.statusPayment = MyPaymentStatus.Reversed;
        this.updatedData = new Date();
    }
    updatePaymentDate() {
        return new Date().getTime() - this.createdData.getTime();
    }
}
const myPayment = new MyPayment(1);
myPayment.updatePaymentDate();
myPayment.updateStatusPayment();
console.log(myPayment);
// TODO----перегрузка методов
class Exercise {
    constructor() {
        this.skills = [];
    }
    addSkill(val) {
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
function reloadFnc(numOrStr) {
    if (typeof numOrStr === "string") {
        return `String ${numOrStr}`;
    }
    else
        return numOrStr + 3;
}
// TODO---Getter Setter
class UserAcces {
    set login(val) {
        this._login = ` My login - ${val}`;
    }
    get login() {
        return this._login;
    }
    // акссесоры нельзя делать аинхронными
    // можно только методы
    setPass(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            // какой-то асинхронный код Promise для шифрования пароля
        });
    }
}
const userAcces = new UserAcces();
userAcces.login = "login";
console.log(userAcces);
class Logger {
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.log(...args);
    }
}
class UserI {
    pay(val) {
        ///
    }
    dalete() {
        ///
    }
}
class PaymentClass {
    constructor(id) {
        this.id = id;
    }
    pay() {
        this.status = "paid";
    }
}
class ParsistandPaymentClass extends PaymentClass {
    constructor() {
        const id = Math.random();
        super(id);
    }
    save() {
        // save data
    }
    // новый метод override, говорящий, что мы переопределили метод родительский
    //будет работать и без него
    pay(date) {
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
    constructor() {
        this.name = "user";
        console.log(this.name);
    }
}
class AdminC extends UserC {
    constructor() {
        super();
        this.name = "admin";
        console.log(this.name);
    }
}
new AdminC();
new Error("");
class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code !== null && code !== void 0 ? code : 500;
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
    constructor(name) {
        this.name = name;
    }
}
class UsersInher extends Array {
    findByName(name) {
        return this.filter((elem) => elem.name === name);
    }
    toString() {
        return this.map((elem) => elem.name).join(". ");
    }
}
const usersInher = new UsersInher();
usersInher.push(new UserIn("Dimon"));
usersInher.push(new UserIn("Qubiq"));
console.log(usersInher.toString());
// композиция
class UserCompos {
    constructor(name) {
        this.name = name;
    }
}
class UsersCompos {
    constructor() {
        this.users = [];
    }
    addUsers(user) {
        this.users.push(user);
    }
}
const usersCompos = new UsersCompos();
usersCompos.addUsers(new UserCompos("Remark"));
console.log(usersCompos);
class UserPay {
}
class UserWithPay {
    constructor(name, payment) {
        this.name = name;
        this.payment = payment;
    }
}
// ---------------
class PayMent {
    constructor(date) {
        this.date = date;
    }
}
class UserP {
    constructor(name, payment) {
        this.name = name;
        this.payment = payment;
    }
}
const dt = new Date();
const userP = new UserP("Dimon", new PayMent(dt));
console.log(userP);
//TODO------ видимость свойств: Public, Protected, Privat, Readonly
class Vehicle {
    constructor() {
        _Vehicle_price.set(this, void 0); //тоже приватное свойство . Объявляется так же, как в JS и работает в JS
    }
    addDamage(val) {
        this.damages.push(val);
        __classPrivateFieldSet(this, _Vehicle_price, 1000, "f");
    }
    set model(val) {
        this._model = val;
    }
    get model() {
        return this.model;
    }
}
_Vehicle_price = new WeakMap();
class Eurotrack extends Vehicle {
    setRun(km) {
        this.run = km / 0.62;
    }
}
const vehicle = new Vehicle();
// product class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
// cart class
class Cart {
    constructor() {
        this.cart = [];
        this.delivery = null;
    }
    // add
    addProducts(product) {
        this.cart.push(product);
    }
    // delete
    deleteProducts(id) {
        const check = this.cart.findIndex((elem) => elem.id === id);
        if (check != -1) {
            this.cart = this.cart.filter((elem) => elem.id !== id);
        }
        else
            console.log("Not element");
    }
    // quantity
    allPrice() {
        return this.cart.reduce((acc, curr) => (acc += curr.price), 0);
    }
    // set delivery
    setDelivery(data) {
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
// cart.addProducts(new Product(1, "Dimon", 23));
// cart.addProducts(new Product(2, "Qubiq", 50));
// cart.addProducts(new Product(3, "Erich Maria Remarque", 50));
cart.deleteProducts(2);
let dta = new Date();
cart.setDelivery({ date: dta, address: "address" });
// cart.setDelivery({ date: dta, id: 456 });
console.log(cart);
const allProductPrice = cart.allPrice();
console.log(allProductPrice);
console.log(cart.productsCheckout());
