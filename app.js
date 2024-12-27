"use strict";
// -----------------использование
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let revenue = 1000;
let bonus = 500;
let c = "str";
let d = true;
let res = revenue + bonus;
console.log(res);
//TODO -----типы в функциях
function getFullName(firstName, surName) {
    return `${firstName} ${surName}`;
}
const getFullNameErrow = (first, sur) => {
    return `${first} ${sur}`;
};
console.log(getFullName("Dimon", "Ber"));
//TODO -----объекты
function userFullName(user) {
    return `${user.firstName} ${user.lastName}`;
}
const user = {
    firstName: "Qubiq",
    lastName: "Cat",
    city: "Poltava",
    age: 45,
    skills: {
        dev: true,
        devops: false,
    },
};
console.log(userFullName(user));
/// --------------------------------------УПРАЖНЕНИЕ 1
let info = {
    officeId: 45,
    isOpened: false,
    contacts: {
        phone: "+45465435435435",
        email: "test@mail.com",
        address: {
            city: "Poltava",
        },
    },
};
///TODO -----массивы
const skills = ["Dev", "Devops", "Testing"];
for (const element of skills) {
    console.log(element.toLowerCase());
}
let resSkills = skills
    .filter((elem) => elem !== "Devops")
    .map((elem) => elem + "!")
    .reduce((acc, curr) => acc + curr);
console.log(resSkills);
//TODO -----кортежи  Tupple
let myTupple = ["Str", 45, true];
let id = myTupple[1];
let tuppleName = myTupple[0];
// деструктуризация как в массиве
let [stringType, numberType, booleanType] = myTupple;
console.log(stringType, numberType, booleanType);
let myTupple2 = [
    2,
    "string",
    true,
    false,
    true,
];
let [frst, scnd, bln1, bln2, bln3] = myTupple2;
console.log(frst, scnd, bln1, bln2, bln3);
//TODO -----Readonly
let readonTupple = ["str", 45];
let readonArr = [1, 2, 3, 4];
let readonArrGen = ["yeyeye", "kkfkfk"];
//TODO -----Enums
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 0] = "SUCCESS";
    StatusCode[StatusCode["IN_PROCESS"] = 1] = "IN_PROCESS";
    StatusCode[StatusCode["FAILED"] = 2] = "FAILED";
})(StatusCode || (StatusCode = {}));
const responseMessage = {
    message: "Payment is successful",
    statusCode: StatusCode.SUCCESS,
};
if (responseMessage.statusCode === StatusCode.SUCCESS) {
}
// 1-успех
// 2- в процессе
// 3-отклонен
function comp(val) {
    return val + 1;
}
var Roles;
(function (Roles) {
    Roles[Roles["ADMIN"] = 1] = "ADMIN";
    Roles[Roles["USER"] = 3] = "USER";
    Roles[Roles["SOME"] = comp(Roles.ADMIN)] = "SOME";
})(Roles || (Roles = {}));
console.log(Roles);
console.log(Roles.SOME);
const constEnum = 0 /* ConstEnum.ADMIN */;
console.log(constEnum);
// --------------------------------упражнение 2
var Statuses;
(function (Statuses) {
    Statuses["Published"] = "published";
    Statuses["Draft"] = "draft";
    Statuses["Deleted"] = "deleted";
})(Statuses || (Statuses = {}));
function getFacs(param) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("/test", {
            method: "POST",
            body: JSON.stringify(param),
        });
        const data = yield resp.json();
        return data;
    });
}
//TODO -----Union
const myUn = [1, "atrind"];
const ggg = 5;
// --------сужение типов
function logId(id) {
    if (typeof id === "string") {
        console.log(id.toString());
    }
    else
        console.log(id);
}
logId(1);
logId("1");
logId(true);
function logError(err) {
    if (Array.isArray(err)) {
        console.log("This is Array");
    }
    else
        console.log("This is string");
}
logError(["1", "2"]);
function logObj(obj) {
    if ("a" in obj) {
        console.log(obj.a);
    }
    else
        console.log(obj.b);
}
logObj({ a: 20 });
function logMultiplay(a, b) {
    if (a === b) {
        console.log(a.toUpperCase());
        console.log(b.toUpperCase());
    }
    else
        console.log(b);
}
logMultiplay("string", "string");
//TODO -----Literal types
// enum RequestType {
//   GET = "get",
//   POST = "post",
// }
// function fetchWithAuth(url: string, method: RequestType) {}
function fetchWithAuth(url, method) {
    return 1;
}
fetchWithAuth("http://", "get");
let meth = "post";
const meth2 = "get";
// fetchWithAuth("http://", meth) ---потому что тип meth==="string"
fetchWithAuth("http://", meth2); //---потому что тип meth2==="get"
fetchWithAuth("http://", meth);
fetchWithAuth("http://", meth);
var Method;
(function (Method) {
    Method["POST"] = "post";
    Method["GET"] = "get";
})(Method || (Method = {}));
const trainFnc = (url, method) => {
    return 2;
};
trainFnc("http://", Method.POST);
function fetchWithAuthAlias(url, method) { }
fetchWithAuthAlias("http://", "post");
const objType = {
    name: "Dimon",
    age: 45,
    skills: ["1", "2", "3"],
    id: 123,
};
const objInterface = {
    name: "Qudiq",
    age: 2.5,
    id: 123,
    method(id) {
        return "";
    },
};
const userLibraryObj = {
    1: "first",
    2: "second",
};
const recordObj = {
    1: "first",
    2: "second",
};
const recordObj2 = {
    1: "first",
    2: "second",
};
// если одинаковые имена интерыейсов, то они мерджатся
const userInObj = {
    name: "Dimon",
    age: 45,
};
function multyplyOpt(first = 5, second) {
    if (second) {
        return first * second;
    }
    else
        return first * first;
}
console.log(multyplyOpt(undefined, 2));
console.log(multyplyOpt(10));
function userProPass(user) {
    var _a;
    return (_a = user.password) === null || _a === void 0 ? void 0 : _a.test;
}
function userProPass2(user) {
    return user.password.test; // когда мы уверены, что password точно есть
}
function checkFnc(param) {
    return param !== null && param !== void 0 ? param : "some code"; //если  param ===null или  param ===undefined
} //то возвращаем "some code"
// ---------------------------Упражнение 3
var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["FAILED"] = "failed";
})(Status || (Status = {}));
function fetchExercize3(val) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http", {
            method: "POST",
            body: JSON.stringify(val),
            headers: { "Content-Type": "application/json" },
        });
        const data = yield response.json();
        if (data.status === Status.SUCCESS) {
            return data;
        }
        else
            return data;
    });
}
//TODO-------Void
function logIdVoid(id) {
    console.log(id);
}
function multiplyVoid(f, s) {
    if (s) {
        return f * s;
    }
    else
        return f * f;
}
const f1 = () => { };
// даже если тип возвращаемого значения void, но мы возвращаем что-то другое
// то тип остается void
/* возвращаемое значение (true) не проигнорировано на уровне JavaScript, но TypeScript предупреждает разработчика, что он не должен использовать результат функции, типизированной как void.  */
const f2 = () => {
    return true;
};
const resVoid = f2();
console.log("1111111111", resVoid);
// ---
const skillsVoid = ["Dev", "DevOps"];
const userVoid = {
    s: [],
};
// forEach ожидает void так как ничего не возвращает, а push возвращает данные, то есть меняет длину массива.
// для этой совместимости и есть такое свойство у void, допускать возвращение результатов
skillsVoid.forEach((elem) => userVoid.s.push(elem));
console.log(userVoid);
// TODO-------unknown
let inputUnknown;
inputUnknown = 3;
inputUnknown = ["qwe", "wer"];
// let resUnknown: string = inputUnknown;
function runUnknown(i) {
    if (typeof i === "number") {
        i++;
    }
    else {
        i; //остается unknown
    }
}
runUnknown(inputUnknown);
// -----try catch
function getTestUnknown() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch("http://");
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    });
}
//TODO -----never
function generateError(message) {
    throw new Error(message);
}
function dumpErr() {
    while (true) { }
}
function recNever() {
    return recNever();
}
function processAction(action) {
    switch (action) {
        case "refund":
            // .....
            break;
        case "checkout":
        // .......
        case "reject":
            // ....
            break;
        default:
            const _ = action;
            throw new Error("Error does not action");
    }
}
// ---
function genErr(err) {
    throw new Error(err);
}
function isString(x) {
    if (typeof x === "string") {
        return true;
    }
    else if (typeof x === "number") {
        return false;
    }
    genErr("Error");
    // throw new Error();
}
//TODO------null
const n = null;
const n1 = null;
function getBaseUser() {
    if (Math.random() > 0.5) {
        return null;
    }
    else {
        return {
            name: "user",
        };
    }
}
const nullUser = getBaseUser();
if (nullUser) {
    const nullU = nullUser.name;
}
// --
function getBaseUser2() {
    if (Math.random() <= 0.5) {
        return { name: "DMOM" };
    }
}
const nullUser2 = getBaseUser2();
const nullU2 = nullUser2 === null || nullUser2 === void 0 ? void 0 : nullUser2.name;
console.log(nullU2);
// TODO ----приведение типов
let aCast = 5;
let bCast = aCast.toString();
let cCast = "4";
let eCast = parseInt(cCast);
console.log(typeof eCast);
// const castUser: = {
//   name: "Dimon",
//   age: 45,
//   email: "qwerty@qwer.qw",
// }as CastUser ;
const castUser = {
    name: "Dimon",
    age: 45,
    email: "qwerty@qwer.qw",
};
const castAdmin = Object.assign(Object.assign({}, castUser), { role: 21 });
console.log(castAdmin);
// вірне перетворення
function createNewObj(obj) {
    return {
        name: obj.name,
        role: 21,
    };
}
const castAdmin2 = createNewObj(castUser);
console.log(castAdmin2);
const firstPerson = {
    name: "Dimon",
    age: 45,
    surName: "Ber",
};
function createAd(obj) {
    return {
        name: obj.name,
        role: 4,
    };
}
const secondPerson = createAd(firstPerson);
console.log(secondPerson);
// TODO----the Type Guard
function logGuardId(id) {
    if (typeof id === "string") {
        console.log(id); //type==="string"
    }
    if (typeof id === "number") {
        console.log(id); //type==="number"
    }
    id; //type==="string | number"
}
// Type Guard
function isStringGuard(x) {
    return typeof x === "string"; //true or false
}
console.log(isStringGuard("string"));
console.log(isStringGuard(2));
function logIdGuard(id) {
    if (isStringGuard(id)) {
        console.log(id);
    }
    else {
        console.log(id);
    }
}
// ----------
function personGuard(p) {
    return "role" in p;
}
// або такий варіант
function personGuardAlternative(p) {
    return p.role !== undefined;
}
function logPerson(person) {
    if (personGuard(person)) {
        person.role = 456;
    }
    else
        throw new Error("This is not  SecondPerson ");
}
logPerson(secondPerson);
console.log(secondPerson);
// -------------------------------упражнение 4
var StatusesOfPay;
(function (StatusesOfPay) {
    StatusesOfPay["SUCCESS"] = "success";
    StatusesOfPay["FAILED"] = "failed";
})(StatusesOfPay || (StatusesOfPay = {}));
function dataResponceGuard(d) {
    return d.status === StatusesOfPay.SUCCESS;
}
function dataResponce(res) {
    if (dataResponceGuard(res)) {
        return res.data.databaseId;
    }
    else {
        throw new Error(res.data.errorMessage);
    }
}
const ass = {};
function assUser(obj) {
    if (typeof obj === "object" && !!obj && "name" in obj) {
        return;
    }
    throw new Error("Dont User");
}
const o = null;
console.log(!!o);
const tr = {};
trAsserts(tr);
tr.name = "eee";
// try {
//   trAsserts(tr);
// } catch (error) {
//   if (error instanceof Error) {
//     console.log(error.message);
//   }
// }
function trAsserts(obj) {
    if (obj && typeof obj === "object" && "name" in obj) {
        return;
    }
    throw new Error("Dont User");
}
