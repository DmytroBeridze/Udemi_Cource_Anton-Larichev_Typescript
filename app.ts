// -----------------использование

let revenue: number = 1000;
let bonus: number = 500;
let c: string = "str";
let d: boolean = true;

let res: number = revenue + bonus;
console.log(res);

//TODO -----типы в функциях

function getFullName(firstName: string, surName: string): string {
  return `${firstName} ${surName}`;
}

const getFullNameErrow = (first: string, sur: string): string => {
  return `${first} ${sur}`;
};

console.log(getFullName("Dimon", "Ber"));

//TODO -----объекты

function userFullName(user: { firstName: string; lastName: string }): string {
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
let info: {
  officeId: number;
  isOpened: boolean;
  contacts: {
    phone: string;
    email: string;
    address: {
      city: string;
    };
  };
} = {
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

const skills: string[] = ["Dev", "Devops", "Testing"];

for (const element of skills) {
  console.log(element.toLowerCase());
}

let resSkills = skills
  .filter((elem: string) => elem !== "Devops")
  .map((elem) => elem + "!")
  .reduce((acc, curr) => acc + curr);

console.log(resSkills);

//TODO -----кортежи  Tupple

let myTupple: [string, number, boolean] = ["Str", 45, true];
let id = myTupple[1];
let tuppleName = myTupple[0];
// деструктуризация как в массиве
let [stringType, numberType, booleanType] = myTupple;
console.log(stringType, numberType, booleanType);

let myTupple2: [number, string, ...boolean[]] = [
  2,
  "string",
  true,
  false,
  true,
];
let [frst, scnd, bln1, bln2, bln3] = myTupple2;
console.log(frst, scnd, bln1, bln2, bln3);

//TODO -----Readonly

let readonTupple: readonly [string, number] = ["str", 45];
let readonArr: readonly number[] = [1, 2, 3, 4];

let readonArrGen: ReadonlyArray<string> = ["yeyeye", "kkfkfk"];

//TODO -----Enums

enum StatusCode {
  SUCCESS,
  IN_PROCESS,
  FAILED,
}

const responseMessage = {
  message: "Payment is successful",
  statusCode: StatusCode.SUCCESS,
};

if (responseMessage.statusCode === StatusCode.SUCCESS) {
}

// 1-успех
// 2- в процессе
// 3-отклонен

function comp(val: number): number {
  return val + 1;
}
enum Roles {
  ADMIN = 1,
  USER = ADMIN + 2,
  SOME = comp(ADMIN),
}

console.log(Roles);
console.log(Roles.SOME);

// enum это функция при компиляции в JS. Если нам не нужна эта ф-ция, а нужны константы,
// то используется const enum. Тогда после компиляции в новую переменную прилетит просто значение
// такого вида: const constEnum = 0 /* ConstEnum.ADMIN */;
const enum ConstEnum {
  ADMIN,
  USER,
}

const constEnum = ConstEnum.ADMIN;
console.log(constEnum);

// --------------------------------упражнение 2

enum Statuses {
  Published = "published",
  Draft = "draft",
  Deleted = "deleted",
}

async function getFacs(param: { topicId: number; status: Statuses }): Promise<
  {
    question: string;
    answer: string;
    tags: string[];
    likes: number;
    status: Statuses;
  }[]
> {
  const resp = await fetch("/test", {
    method: "POST",
    body: JSON.stringify(param),
  });
  const data = await resp.json();
  return data;
}

//TODO -----Union

const myUn = [1, "atrind"];
const ggg: string | number = 5;

// --------сужение типов
function logId(id: string | number | boolean) {
  if (typeof id === "string") {
    console.log(id.toString());
  } else console.log(id);
}

logId(1);
logId("1");
logId(true);

function logError(err: string | string[]) {
  if (Array.isArray(err)) {
    console.log("This is Array");
  } else console.log("This is string");
}
logError(["1", "2"]);

function logObj(obj: { a: number } | { b: number }) {
  if ("a" in obj) {
    console.log(obj.a);
  } else console.log(obj.b);
}
logObj({ a: 20 });

function logMultiplay(a: string | number, b: string | boolean) {
  if (a === b) {
    console.log(a.toUpperCase());
    console.log(b.toUpperCase());
  } else console.log(b);
}

logMultiplay("string", "string");

//TODO -----Literal types

// enum RequestType {
//   GET = "get",
//   POST = "post",
// }

// function fetchWithAuth(url: string, method: RequestType) {}
function fetchWithAuth(url: string, method: "get" | "post"): 1 | 2 {
  return 1;
}
fetchWithAuth("http://", "get");

let meth = "post";
const meth2 = "get";
// fetchWithAuth("http://", meth) ---потому что тип meth==="string"
fetchWithAuth("http://", meth2); //---потому что тип meth2==="get"

fetchWithAuth("http://", meth as "post");
fetchWithAuth("http://", <"post">meth);

enum Method {
  POST = "post",
  GET = "get",
}

const trainFnc = (url: string, method: Method): 1 | 2 => {
  return 2;
};
trainFnc("http://", Method.POST);

//TODO------Types   (type aliases)

type FetchMethod = "get" | "post";

function fetchWithAuthAlias(url: string, method: FetchMethod) {}

fetchWithAuthAlias("http://", "post");

type ObjType = {
  name: string;
  age: string | number;
  skills: string[];
};

type ObjType2 = {
  id: number;
};

// -----------------объединение объектов intersection
type MixedObjType = ObjType & ObjType2;

const objType: MixedObjType = {
  name: "Dimon",
  age: 45,
  skills: ["1", "2", "3"],
  id: 123,
};

//TODO --------Interfaces

interface ObjInterface {
  name: string;
  age?: number | string;
  method: (id: number) => string;
}

interface ObjInterface2 extends ObjInterface {
  id: number;
}

const objInterface: ObjInterface2 = {
  name: "Qudiq",
  age: 2.5,
  id: 123,
  method(id) {
    return "";
  },
};

// ----индексные свойства

interface UserLibrary {
  [index: number]: string;
}

const userLibraryObj = {
  1: "first",
  2: "second",
};

const recordObj: Record<number, string> = {
  1: "first",
  2: "second",
};

// --тлт
type RecordType = Record<number, string>;
const recordObj2: RecordType = {
  1: "first",
  2: "second",
};

// ----------------------Types или Interfaces

interface UserIn {
  name: string;
}

interface UserIn {
  age: number;
}
// если одинаковые имена интерыейсов, то они мерджатся
const userInObj: UserIn = {
  name: "Dimon",
  age: 45,
};

type UserTy = string | number;

// !--Type нужно использовать с примитивными типами
// !--inteface нужно использовать с объектами

// TODO------Optional опциональность
interface UserOpt {
  login: string;
  password?: number;
}
type UserOptType = {
  login: string;
  password?: number;
};

function multyplyOpt(first: number = 5, second?: number): number {
  if (second) {
    return first * second;
  } else return first * first;
}

console.log(multyplyOpt(undefined, 2));
console.log(multyplyOpt(10));

// ---
interface UserProInt {
  login: string;
  password?: {
    test: string | number;
  };
}

function userProPass(user: UserProInt) {
  return user.password?.test;
}
function userProPass2(user: UserProInt) {
  return user.password!.test; // когда мы уверены, что password точно есть
}

function checkFnc(param?: number) {
  return param ?? "some code"; //если  param ===null или  param ===undefined
} //то возвращаем "some code"

// ---------------------------Упражнение 3
enum Status {
  SUCCESS = "success",
  FAILED = "failed",
}
// предположим, что это описание структуры самого платежа
interface Payment {
  sum: number;
  from: number;
  to: number;
}
//  а это - описание самого запроса
interface RequestPiment extends Payment {}

interface ResponceData extends RequestPiment {
  databaseId: number;
}

interface Success {
  status: Status.SUCCESS;
  data: ResponceData;
}

interface Failed {
  status: Status.FAILED;
  data: { errorMessage: string; errorCode: number };
}

async function fetchExercize3(val: RequestPiment): Promise<Success | Failed> {
  const response = await fetch("http", {
    method: "POST",
    body: JSON.stringify(val),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (data.status === Status.SUCCESS) {
    return data as Success;
  } else return data as Failed;
}

//TODO-------Void
function logIdVoid(id: string | number): void {
  console.log(id);
}

function multiplyVoid(f: number, s?: number) {
  if (s) {
    return f * s;
  } else return f * f;
}

type VoidFnc = () => void;

const f1: VoidFnc = () => {};
// даже если тип возвращаемого значения void, но мы возвращаем что-то другое
// то тип остается void
/* возвращаемое значение (true) не проигнорировано на уровне JavaScript, но TypeScript предупреждает разработчика, что он не должен использовать результат функции, типизированной как void.  */
const f2: VoidFnc = () => {
  return true;
};

const resVoid = f2();
console.log("1111111111", resVoid);

// ---
const skillsVoid = ["Dev", "DevOps"];
const userVoid = {
  s: [] as string[],
};

// forEach ожидает void так как ничего не возвращает, а push возвращает данные, то есть меняет длину массива.
// для этой совместимости и есть такое свойство у void, допускать возвращение результатов
skillsVoid.forEach((elem) => userVoid.s.push(elem));

console.log(userVoid);

// TODO-------unknown

let inputUnknown: unknown;
inputUnknown = 3;
inputUnknown = ["qwe", "wer"];

// let resUnknown: string = inputUnknown;

function runUnknown(i: unknown) {
  if (typeof i === "number") {
    i++;
  } else {
    i; //остается unknown
  }
}

runUnknown(inputUnknown);

// -----try catch
async function getTestUnknown() {
  try {
    await fetch("http://");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

type Unknown1 = unknown | string; //тип всегда unknown

type Unknown2 = unknown & string;
type Unknown = number & string;

//TODO -----never
function generateError(message: string): never {
  throw new Error(message);
}

function dumpErr(): never {
  while (true) {}
}

function recNever(): never {
  return recNever();
}

// это проверка на то что если в PaymentAction придет еще какой то тип,
// то мы обработаем его свитч кейсом и на нем не сработает default
type PaymentAction = "refund" | "checkout" | "reject";

function processAction(action: PaymentAction) {
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
      const _: never = action;
      throw new Error("Error does not action");
  }
}

// ---

function genErr(err: string): never {
  throw new Error(err);
}

function isString(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }
  genErr("Error");
  // throw new Error();
}

//TODO------null
const n: null = null;
const n1: any = null;
// const n2: string = null; //error
// const n3: number = null; //error
// const n4: boolean = null; //error
// const n5: undefined = null; //error

interface NullUser {
  name: string;
}

function getBaseUser(): NullUser | null {
  if (Math.random() > 0.5) {
    return null;
  } else {
    return {
      name: "user",
    } as NullUser;
  }
}

const nullUser = getBaseUser();
if (nullUser) {
  const nullU = nullUser.name;
}

// --
function getBaseUser2(): NullUser | undefined {
  if (Math.random() <= 0.5) {
    return { name: "DMOM" };
  }
}

const nullUser2 = getBaseUser2();
const nullU2 = nullUser2?.name;
console.log(nullU2);

// TODO ----приведение типов

let aCast = 5;
let bCast: string = aCast.toString();

let cCast = "4";
let eCast = parseInt(cCast);

console.log(typeof eCast);

// --type1
interface CastUser {
  name: string;
  age: number;
  email: string;
}

// const castUser: = {
//   name: "Dimon",
//   age: 45,
//   email: "qwerty@qwer.qw",
// }as CastUser ;

const castUser: CastUser = {
  name: "Dimon",
  age: 45,
  email: "qwerty@qwer.qw",
};

// не зовсім вірне перетворення. В castAdmin залишаються непотрібні властивості з castUser
interface CastAdmin {
  name: string;
  role: number;
}

const castAdmin: CastAdmin = {
  ...castUser,
  role: 21,
};
console.log(castAdmin);

// вірне перетворення

function createNewObj(obj: CastUser): CastAdmin {
  return {
    name: obj.name,
    role: 21,
  } as CastAdmin;
}
const castAdmin2 = createNewObj(castUser);
console.log(castAdmin2);

// ------
interface FirstPerson {
  name: string;
  surName: string;
  age: number;
}

const firstPerson: FirstPerson = {
  name: "Dimon",
  age: 45,
  surName: "Ber",
};

interface SecondPerson {
  name: string;
  role: number;
}

function createAd(obj: FirstPerson): SecondPerson {
  return {
    name: obj.name,
    role: 4,
  };
}

const secondPerson = createAd(firstPerson);
console.log(secondPerson);

// TODO----the Type Guard

function logGuardId(id: string | number): void {
  if (typeof id === "string") {
    console.log(id); //type==="string"
  }
  if (typeof id === "number") {
    console.log(id); //type==="number"
  }
  id; //type==="string | number"
}

// Type Guard
function isStringGuard(x: string | number): x is string {
  return typeof x === "string"; //true or false
}
console.log(isStringGuard("string"));
console.log(isStringGuard(2));

function logIdGuard(id: string | number): void {
  if (isStringGuard(id)) {
    console.log(id);
  } else {
    console.log(id);
  }
}

// ----------
function personGuard(p: FirstPerson | SecondPerson): p is SecondPerson {
  return "role" in p;
}
// або такий варіант
function personGuardAlternative(
  p: FirstPerson | SecondPerson
): p is SecondPerson {
  return (p as SecondPerson).role !== undefined;
}

function logPerson(person: FirstPerson | SecondPerson): void {
  if (personGuard(person)) {
    person.role = 456;
  } else throw new Error("This is not  SecondPerson ");
}

logPerson(secondPerson);
console.log(secondPerson);

// -------------------------------упражнение 4

enum StatusesOfPay {
  SUCCESS = "success",
  FAILED = "failed",
}

interface RequestObj {
  sum: number;
  from: number;
  to: number;
}

interface RequestPay extends RequestObj {}

interface ReqPay extends RequestPay {
  databaseId: number;
}

interface DataMessages {
  errorMessage: string;
  errorCode: number;
}

interface ResponceSuccess {
  status: StatusesOfPay.SUCCESS;
  data: ReqPay;
}

interface ResponceFailed {
  status: StatusesOfPay.FAILED;
  data: DataMessages;
}

function dataResponceGuard(
  d: ResponceSuccess | ResponceFailed
): d is ResponceSuccess {
  return d.status === StatusesOfPay.SUCCESS;
}

function dataResponce(res: ResponceSuccess | ResponceFailed): number {
  if (dataResponceGuard(res)) {
    return res.data.databaseId;
  } else {
    throw new Error(res.data.errorMessage);
  }
}

// TODO----Assert (функция утверждения типов)

interface AssUser {
  name: string;
}

const ass = {};
function assUser(obj: unknown): asserts obj is AssUser {
  if (typeof obj === "object" && !!obj && "name" in obj) {
    return;
  }
  throw new Error("Dont User");
}

const o = null;
console.log(!!o);

interface TrUsAs {
  name: string;
}

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

function trAsserts(obj: unknown): asserts obj is TrUsAs {
  if (obj && typeof obj === "object" && "name" in obj) {
    return;
  }
  throw new Error("Dont User");
}
