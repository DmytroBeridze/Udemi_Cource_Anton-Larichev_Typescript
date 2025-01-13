// TODO--Partial--Required--Readonly
interface UserService {
  name: string;
  age?: number;
  email: string;
}

//* --partial  делает все свойства необязательными
type UserPartial = Partial<UserService>;

// *--required делает все свойства обязательными
type UserRequired = Required<UserPartial>;

//* --readonly  делает все свойства доступными только для чтения
type UserReadonly = Readonly<UserRequired>;

// -можно комбинировать
type userReadonlyRequired = Partial<Readonly<UserPartial>>;

// TODO---Pick---Omit---Extract---Exclude

interface PaymentPersistent1 {
  id: number;
  sum: number;
  from: string;
  to: string;
}

//* ---Omit  исключает свойства (работает только с объектами)
type PaymentOmit = Omit<PaymentPersistent1, "id" | "sum">;

//*---Pick  выбирает свойства (работает только с объектами)
type PaymentPick = Pick<PaymentPersistent1, "id" | "sum">;

// * Extract ---создает новый тип, в котором будут свойства, которые есть общими в двух переданных типах(пересекаются)
// * (работает только с объединениями)
type Ex = "a" | "b" | "c" | "d";
type Ext = "a" | "b" | "n";
type ExExtr = Extract<Ex, Ext>;

type ExNumb = 45 | "from";
type ExtractEx = Extract<"from" | "to" | ExNumb, number>;

// *Exclude---создает новый тип, в котором из Ex исключены подобные свойства, что и в Ext
// * (работает только с объединениями)
type ExcludeEx = Exclude<Ex, Ext>;
type ExcludeEx2 = Exclude<"lorem" | "ipsum" | PaymentOmit, string>;

//TODO---ReturnType
// *ReturnType извлекает тип возвращаемого значения
type UserReturn = {
  name: string;
  age: number;
};

const userReturn = {
  name: "Dimon",
  age: 45,
};

function userReturnFnc(data: UserReturn): UserReturn {
  return data;
}
type ReturnFncType = ReturnType<typeof userReturnFnc>;

// возвращает не только из typeof, но и из функции
type ReturnFncGenType = ReturnType<(data: string) => string>;
type ReturnFncGenType2 = ReturnType<<T extends string>(data: string) => T>;

// TODO----Parameters
// * Parameters извлекает параметры функции

function parametersFnc(data: string, some: number) {
  return "return";
}
parametersFnc("sfggf", 67);

type ReturnFncParam = Parameters<typeof parametersFnc>;
type ReturnFncParamFirst = ReturnFncParam[0];

// TODO---ConstructorParameters
// * извлекает параметры из конструктора
class ConstructorParamUser {
  constructor(public name: string, public age: number) {}
}

type ConstructorParam = ConstructorParameters<typeof ConstructorParamUser>;

// TODO---Awaited
// извлекает тип из промиса
type PrT = Promise<string>;
type PrT2 = Awaited<Promise<string>>;
type PrT3 = Awaited<Promise<Promise<string>>>;

// ------------------------
interface AwMenu {
  name: string;
  age: number;
}

async function AwMenuFnc(): Promise<AwMenu[]> {
  return [{ name: "Dimon", age: 45 }];
}
type AwType = Awaited<ReturnType<typeof AwMenuFnc>>;
// --

async function AwPr<T>(a: T): Promise<Awaited<T>[]> {
  return [await a];
}
