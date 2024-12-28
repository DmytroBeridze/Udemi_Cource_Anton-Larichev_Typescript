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
