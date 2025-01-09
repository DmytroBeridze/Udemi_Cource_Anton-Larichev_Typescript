interface UserM {
  name: string;
  age: number;
}

type KeyUserM = keyof UserM;
const keyUserM: KeyUserM = "age";

// -----------

interface UserK {
  name: string;
  age: number;
}

const userK: UserK = {
  name: "Dimon",
  age: 45,
};
// TODO-----keyof
function getUserKValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

getUserKValue(userK, "name");

// TODO ----typeof

let stringOrNumType: string | number;

let stringOrNumType2: typeof stringOrNumType;

// ----
const userTypeof = {
  name: "Dimon",
  age: 45,
};

type userTypeof2 = keyof typeof userTypeof;
// ----
enum PersMove {
  UP,
  Down,
}

type PersMoveType = keyof typeof PersMove;

//TODO--Indexed Access Types

interface RoleAccess {
  lorem: string;
  ipsum: number;
}

interface UserAccess {
  age: number;
  roles: RoleAccess[];
}

const userAccess: UserAccess = {
  age: 45,
  roles: [{ ipsum: 4, lorem: "STRING" }],
};

const ageUserAccess = userAccess["age"];

// ------обращение к roles
type RoleTypes = UserAccess["roles"];
const roleTypes: RoleTypes = [{ ipsum: 3, lorem: "string" }];

// ----------
type RollRolls = UserAccess["roles"][number]; //это раскрывает массив[{ ipsum: 3, lorem: "string" }]
const Rr: RollRolls = { ipsum: 5, lorem: "dgdgdg" };
console.log(Rr);

// TODO---conditional types
// обычный пример для переменной
const con: boolean = Math.random() > 5 ? true : false;

// пример для типов----
interface HttpRespCon<T extends "success" | "error"> {
  data: number;
  resp: T extends "success" ? string : Error;
}

const respSuccess: HttpRespCon<"success"> = {
  data: 200,
  resp: "Response ok!",
};

const respFailed: HttpRespCon<"error"> = {
  data: 404,
  resp: new Error(),
};

// ----пример с перешгрузкой

class UserRel {
  name: "Dimon";
  age: 45;
}

class UserPersistend {
  userId: 45;
}

function UserPrintData(data: string): UserRel;
function UserPrintData(data: number): UserPersistend;
function UserPrintData(data: string | number): UserPersistend | UserRel {
  if (typeof data === "string") {
    return new UserRel();
  } else return new UserPersistend();
}

// ----пример с conditional types

class ConditionalUser {
  name: "Dimon";
  id: 23;
}

class MainConditionalUser {
  userId: 45;
}

type MakeConditionalUserType<T extends string | number> = T extends string
  ? ConditionalUser
  : MainConditionalUser;

function makeConditionalUser<T extends string | number>(
  data: T
): MakeConditionalUserType<T> {
  if (typeof data === "string") {
    return new ConditionalUser() as MakeConditionalUserType<T>;
  } else return new MainConditionalUser() as MakeConditionalUserType<T>;
}
const conditionalUser = makeConditionalUser("some");
const conditionalUser2 = makeConditionalUser(2);

// TODO--------infer
function transaction(trans: { fromTo: [string, string] }) {
  console.log(trans);
}

transaction({ fromTo: ["str", "str"] as [string, string] }); // можно вызвать и так

//  с использованием infer

type InferType<T> = T extends (data: infer Type, ...args: any[]) => any
  ? Type
  : never;

const trans: InferType<typeof transaction> = {
  fromTo: ["String", "Also string"],
};
transaction(trans);

// TODO--mapped types

type Modifier = "read" | "update" | "create";

type UserRolesMod = {
  customers?: Modifier;
  projects?: Modifier;
  adminPanel: Modifier;
};

type ModifierToAcc<Type> = {
  +readonly [Property in keyof Type]+?: boolean;
};

type UserAccessMod = ModifierToAcc<Modifier>;

// -----------------

// TODO--Template Literal Types

type ReadOrWright = "read" | "wright";
type Bulk = "bulk" | "some";

type RWAccess = `can ${ReadOrWright}${Bulk}`;

// вытаскиваем
type ReadOrWrightBulk<T> = T extends `can${infer R}` ? R : never;
type ReadOrWri = ReadOrWrightBulk<RWAccess>;
