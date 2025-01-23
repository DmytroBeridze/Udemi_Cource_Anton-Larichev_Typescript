//TODO------------задача ИИ на перегрузку функий

/*
Реализуй функцию управления заказами, которая может работать в нескольких режимах:

    Если функция вызывается без аргументов, она ничего не возвращает.
    Если передаётся строка (ID товара), функция возвращает объект товара из массива товаров (или null, если товар не найден).
    Если передаётся объект товара, он добавляется в массив товаров.
    Если передаётся массив объектов товаров, они добавляются в массив, и возвращается общее количество всех товаров (сумма quantity всех объектов).

*/

interface Goods {
  id: string | null;
  quantity: number;
  description: string;
}

let goodsArr: Goods[] = [];

function goodsGuard(data: any): data is Goods {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "quantity" in data &&
    "description" in data
  );
}

function orderManagement(): undefined;
function orderManagement(id: string): Goods;
function orderManagement(order: Goods): void;
function orderManagement(orders: Goods[]): number;

function orderManagement(
  data?: string | Goods | Goods[]
): Goods | number | void | undefined {
  if (typeof data === "string") {
    return goodsArr.find((elem) => elem.id === data);
  } else if (goodsGuard(data)) {
    goodsArr = [...goodsArr, data];
    return;
  } else if (Array.isArray(data)) {
    goodsArr.push(...data);

    return data.reduce((acc, curr) => {
      acc += curr.quantity;
      return acc;
    }, 0);
  }
  return;
}

console.log(
  orderManagement([
    { id: "2", quantity: 2, description: "hdhfsdhfs" },
    { id: "4", quantity: 5, description: "hdhfsdhfs" },
  ])
);
console.log(goodsArr);
console.log(orderManagement("4"));

//TODO-----Задание: Реализация класса с перегрузкой конструкторов (ИИ)

/*
Реализуй класс Product, который будет иметь перегруженные конструкторы. 
Этот класс должен описывать товар в интернет-магазине.

Условия:

    Свойства класса:
        id — идентификатор товара (строка).
        name — название товара (строка).
        price — цена товара (число).
        quantity — количество товара на складе (по умолчанию 0).

    Перегруженные конструкторы:
        Конструктор может принимать только ID (например, для поиска товара).
        Конструктор может принимать ID и имя товара.
        Конструктор может принимать ID, имя и цену товара.
        Конструктор может принимать ID, имя, цену и количество товара.

    Методы:
        getInfo() — возвращает строку с полной информацией о товаре:
        "Product ID: {id}, Name: {name}, Price: {price}, Quantity: {quantity}"

    Если какой-то из параметров не указан:
        name — "Unknown".
        price — 0.

*/

// interface GoodsProps {
//   id: string;
//   name: string | undefined;
//   price: number | undefined;
//   quantity: number | undefined;

//   getInfo(): string;
// }

// class ProductCatal implements GoodsProps {
//   id: string;
//   name: string | undefined;
//   price: number | undefined;
//   quantity: number | undefined = 0;

//   constructor(id: string);
//   constructor(id: string, name: string);
//   constructor(id: string, name: string, price: number);
//   constructor(id: string, name: string, price: number, quantity: number);

//   constructor(id: string, name?: string, price?: number, quantity?: number) {
//     if (typeof id === "string") {
//       this.id = id;
//     }
//     if (name && typeof name === "string") {
//       this.name = name;
//     }
//     if (price && typeof price === "number") {
//       this.price = price;
//     }
//     if (quantity && typeof quantity === "number") {
//       this.quantity = quantity;
//     }
//   }

//   getInfo(): string {
//     return `Product ID: ${this.id || "Unknown"}, Name: ${
//       this.name || "Unknown"
//     }, Price: ${this.price || 0}, Quantity: ${this.quantity || 0}`;
//   }
// }

// const testSome = new ProductCatal("dimon");
// console.log(testSome);

interface GoodsProps {
  id: string;
  name: string;
  price: number;
  quantity: number;

  getInfo(): string;
}

class ProductCatal implements GoodsProps {
  id: string;
  name: string = "Unknown";
  price: number = 0;
  quantity: number = 0;

  constructor(id: string);
  constructor(id: string, name: string);
  constructor(id: string, name: string, price: number);
  constructor(id: string, name: string, price: number, quantity: number);

  constructor(
    id: string,
    name: string = "Unknown",
    price: number = 0,
    quantity: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getInfo(): string {
    return `Product ID: ${this.id || "Unknown"}, Name: ${
      this.name || "Unknown"
    }, Price: ${this.price || 0}, Quantity: ${this.quantity || 0}`;
  }
}

// TODO-Задание на дженерики-написать ф-цию сортировки любых объектов, которые имеют ID, по возр или убыв
interface DataGen {
  id?: number | string;
  name: string;
  [key: string]: any;
}

type SortType = "more" | "less";

const dataGen: DataGen[] = [
  { id: 1, name: "Dimon" },
  { id: 3, name: "Maria" },
  { id: 2, name: "Qubiq" },
  { id: 8, name: "Noname" },
  { name: "Max" },
  { id: 4, name: "Aryryry" },
];

function sortingArrayGen<T extends DataGen>(arr: T[], type: SortType): T[] {
  const arrayWithId = arr.filter((elem: DataGen) => "id" in elem);
  const sortArray = arrayWithId.sort((a: DataGen, b: DataGen): number => {
    if (type === "less") {
      return Number(a.id) - Number(b.id);
    } else return Number(b.id) - Number(a.id);
  });
  return sortArray;
}

// ---------------------------
const genDta = [
  { id: 1, name: "Dimon" },
  { id: 3, name: "Maria" },
  { id: 2, name: "Qubiq" },
  // { name: "Qubiq2" },
];

interface GenDta {
  id: number;
}

function sortArrayGen<T extends GenDta>(arr: T[], type: "less" | "more"): T[] {
  return arr.sort((a, b) => {
    switch (type) {
      case "less":
        return a.id - b.id;
      case "more":
        return b.id - a.id;
    }
  });
}

// TODO----Задание на keyOf

// with Map
interface DataK {
  group: number;
  name: string;
}

interface GroupedData {
  [key: string]: DataK[];
}

const arrayData: DataK[] = [
  { group: 1, name: "Dimon" },
  { group: 1, name: "Qubiq" },
  { group: 2, name: "Erich" },
  { group: 2, name: "Maria" },
  { group: 2, name: "Remarque" },
];

function dataGroup<T extends DataK, K extends keyof T>(
  arr: T[],
  key: K
): GroupedData {
  let newMap = new Map<T[K], T[]>();

  arr.forEach((elem) => {
    if (newMap.has(elem[key])) {
      newMap.set(elem[key], [...(newMap.get(elem[key]) ?? []), elem]);
    } else newMap.set(elem[key], [elem]);
  });

  return Object.fromEntries(newMap);
}

console.log(dataGroup(arrayData, "group"));

// ----------with object---------------------------------------------
interface DataK2 {
  group: number;
  name: string;
}
interface SortedUsers {
  [key: string]: DataK2[];
}

const arrayData2: DataK2[] = [
  { group: 1, name: "Dimon" },
  { group: 1, name: "Qubiq" },
  { group: 2, name: "Erich" },
  { group: 2, name: "Maria" },
  { group: 2, name: "Remarque" },
];

function sortDataUsers<T extends DataK2, K extends keyof T>(
  arr: T[],
  key: K
): SortedUsers {
  let result: SortedUsers = {};
  arr.forEach((elem) => {
    const elemKey = String([elem[key]]);

    if (!result[elemKey]) {
      result[elemKey] = [];
    } else result[elemKey] = [...result[elemKey], elem];
  });

  return result;
}
console.log(sortDataUsers(arrayData2, "group"));

// ----------задание на ту же тему от ИИ
/*
У тебя есть массив данных о сотрудниках. Каждый объект содержит информацию об имени 
сотрудника, отделе и его возрасте. Тебе нужно написать функцию, которая будет группировать
 сотрудников по отделам и возвращать результат в виде объекта, где:

    Ключи — это названия отделов.
    Значения — это массивы сотрудников из соответствующего отдела, причём сотрудники в этих массивах 
    должны быть отсортированы по возрасту (по возрастанию).

Напиши функцию groupAndSortByDepartment, которая принимает массив сотрудников и группирует их по отделам.
Каждый отдел должен содержать массив сотрудников, отсортированных по возрасту.
*/

interface EmployeEList {
  name: string;
  department: string;
  age: number;
}

interface SortedEmploye {
  [key: string]: EmployeEList[];
}

const employees: EmployeEList[] = [
  { name: "Alice", department: "HR", age: 25 },
  { name: "Bob", department: "IT", age: 30 },
  { name: "Charlie", department: "HR", age: 22 },
  { name: "David", department: "IT", age: 35 },
  { name: "Eve", department: "Marketing", age: 29 },
  { name: "Frank", department: "Marketing", age: 27 },
];

function sortedEmploye<T extends EmployeEList, K extends keyof T>(
  arr: T[],
  key: K
): SortedEmploye {
  const result: SortedEmploye = {};

  arr.forEach((elem) => {
    const elemKey = String(elem[key]);

    if (result[elemKey]) {
      result[elemKey] = [...result[elemKey], elem].sort(
        (a, b) => a.age - b.age
      );
    } else result[elemKey] = [elem];
  });

  return result;
}
console.log(sortedEmploye(employees, "department"));

// -------with map--------------------------------
function sortedEmployeMap<T extends EmployeEList, K extends keyof T>(
  arr: T[],
  key: K
): SortedEmploye {
  const newMap = new Map<T[K], T[]>();

  for (const element of arr) {
    if (newMap.has(element[key])) {
      const oldData = newMap.get(element[key]);

      oldData &&
        newMap.set(
          element[key],
          [...oldData, element].sort((a, b) => a.age - b.age)
        );
    } else newMap.set(element[key], [element]);
  }

  return Object.fromEntries(newMap) as SortedEmploye;
}

console.log("Map:", sortedEmployeMap(employees, "department"));

// --with Reduce------------------

function sortedEmployeReduce<T extends EmployeEList, K extends keyof T>(
  arr: T[],
  key: K
): SortedEmploye {
  return arr.reduce((acc, curr): SortedEmploye => {
    let keyElem = String(curr[key]);

    if (acc[keyElem]) {
      acc[keyElem] = [...acc[keyElem], curr].sort((a, b) => a.age - b.age);
    } else acc[keyElem] = [curr];

    return acc;
  }, {} as SortedEmploye);
}
console.log("reduce:", sortedEmployeReduce(employees, "department"));

// TODO-- mapped types для валидации форм

/*
необходимо сделать тип для результата валидации формы, основываясь на типе формы
*/

interface IForm {
  name: string;
  password: string;
}

const formM: IForm = {
  name: "Dimon",
  password: "456",
};

// --так выглядит ответ валидации
const formMValidation: FormValid<IForm> = {
  name: { isValid: true },
  password: { isValid: false, errorMessage: "Error message" },
};

// мое решение
type ValidModif = true | false;

type ParamsMod<T> = {
  [Params in keyof T]: { isValid: ValidModif; errorMessage?: string };
};

type FormMValidationType = ParamsMod<IForm>;

// решение автора

type FormValid<T> = {
  [Key in keyof T]:
    | {
        isValid: true;
      }
    | { isValid: false; errorMessage: string };
};

// TODO задание на декораторы класса

/* 
Создать декоратор,который добавляет св-во createAt в класс, 
фиксируя дату создания инстанса  
*/

interface IUserDec {
  users: number;
  getUsersInDatabase(): number;
}

@userDecServiceDecorator
class UserDecService implements IUserDec {
  users: number = 456;
  getUsersInDatabase(): number {
    return this.users;
  }
}

function userDecServiceDecorator<T extends { new (...args: any[]): {} }>(
  target: T
): T {
  return class extends target {
    createAt: Date = new Date();
  };
}

/* 
const userDecService = new UserDecService ();  так не видно createAt 

Проблема заключается в том, как TypeScript обрабатывает классы с декораторами. 
TypeScript проверяет типы на этапе компиляции, а декораторы работают уже на этапе 
выполнения.

Когда вы добавляете новое свойство через декоратор, оно не становится 
частью интерфейса класса, поэтому TypeScript не видит это свойство в инстансе.

*/

// дополнительный тип для свойства createAt
type AdditionalType = {
  createAt: Date;
};

const userDecService = new (UserDecService as any)(); //  необходимо явно расширить тип класса внутри декоратора.

const userDecService2 = new UserDecService() as IUserDec & AdditionalType; //правильнее так
console.log(userDecService2.createAt);

// TODO--задание на декоратор метода. Перехват ошибок
interface ErrorCatchInterface {
  name: string;
  throwMeth(data: number): string;
}

class ErrorCatchClass implements ErrorCatchInterface {
  name: string;

  @RethrowError(false)
  // @ErrorCatchFnc
  throwMeth(val: number): string {
    if (val < 1) {
      throw new Error("New Error Throw");
    } else return `Ok! ${val}`;
  }
}

function RethrowError(val: false | true) {
  return (
    target: object,
    name: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ) => {
    const oldMethod = descriptor.value;
    descriptor.value = function (...args: any[]): any {
      try {
        return oldMethod?.apply(this, args);
      } catch (error) {
        if (error instanceof Error) {
          if (val) {
            throw new Error(error.message);
          }

          console.log(error.message);
          return `Error in ${name}`;
        }
      }
    };
  };
}

// function ErrorCatchFnc(
//   target: object,
//   name: string,
//   descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
// ) {
//   const oldValue = descriptor.value;
//   descriptor.value = function (...args: any[]): any {
//     try {
//       return oldValue?.apply(this, args);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log(error.message);
//         return `Method ${name} error`;
//       }
//     }
//   };
// }

console.log(new ErrorCatchClass().throwMeth(-1));

// TODO--задание на Factory pattern (ИИ)

enum PersonsType {
  WARRIOR = "Warrior",
  ARCHER = "Archer",
  MAGE = "Mage",
}

enum PersonsWeapons {
  SWORD = "sword",
  BOW = "bow",
  STICK = "stick",
}

interface PersonsContract {
  type: PersonsType;
  weapon: PersonsWeapons;
  attack(): string;
}

// Warrior
class Warrior implements PersonsContract {
  type: PersonsType = PersonsType.WARRIOR;
  weapon: PersonsWeapons = PersonsWeapons.SWORD;

  attack(): string {
    return `${this.type} attacks with ${this.weapon}`;
  }
}

// Archer
class Archer implements PersonsContract {
  type: PersonsType = PersonsType.ARCHER;
  weapon: PersonsWeapons = PersonsWeapons.BOW;

  attack(): string {
    return `${this.type} attacks with ${this.weapon}`;
  }
}

// Mage
class Mage implements PersonsContract {
  type: PersonsType = PersonsType.MAGE;
  weapon: PersonsWeapons = PersonsWeapons.STICK;

  attack(): string {
    return `${this.type} attacks with ${this.weapon}`;
  }
}

class PersonFactory {
  static create_character(type: PersonsType): PersonsContract {
    switch (type) {
      case PersonsType.WARRIOR:
        return new Warrior();
      case PersonsType.ARCHER:
        return new Archer();
      case PersonsType.MAGE:
        return new Mage();
      default:
        throw new Error("No person!");
    }
  }
}

const archer = PersonFactory.create_character(PersonsType.ARCHER);
const warrior = PersonFactory.create_character(PersonsType.WARRIOR);
const mage = PersonFactory.create_character(PersonsType.MAGE);
console.log(archer.attack());
console.log(warrior.attack());
console.log(mage.attack());

// TODO--задание на Singleton pattern (ИИ)

interface LoggerContract {
  message: string;
  log(): void;
  setMessage(val: string): void;
}

class LoggerClass implements LoggerContract {
  message: string;

  static instance: LoggerContract;
  private constructor() {}

  log(): void {
    console.log(this.message);
  }

  setMessage(val: string) {
    this.message = val;
  }

  static getInstance(): LoggerContract {
    if (!LoggerClass.instance) {
      LoggerClass.instance = new LoggerClass();
    }
    return LoggerClass.instance;
  }
}

const firstTest = LoggerClass.getInstance();
const firstTest2 = LoggerClass.getInstance();
firstTest.setMessage("Some message");
firstTest.log();

firstTest2.log();
firstTest2.setMessage("Another message");

firstTest.log();
firstTest2.log();

// -----------------задание на Singleton pattern (ИИ)

type PropType = string | number | boolean;
type PropsType = { [key: string]: PropType };

interface ConfigurationContract {
  props: PropsType;
  get(val: string): PropType;
  set(value: string, data: any): void;
  load(url: string): Promise<any>;
}

class Configuration implements ConfigurationContract {
  props: PropsType = {};

  private static instance: Configuration;
  private constructor() {}

  // get
  get(val: string): PropType {
    if (this.props && val in this.props) {
      return this.props[val];
    }
    throw new Error("No this prop");
  }
  // set
  set(value: string, data: PropType) {
    {
      this.props[value] = data;
    }
  }
  // load
  async load(url: string): Promise<any> {
    try {
      const responce = await fetch(url, {
        method: "GET",
      });

      if (responce.ok) {
        const data = await responce.json();
        this.props = data;
        return data;
      } else throw new Error("Bad request");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  // create instance
  static getInstance(): ConfigurationContract {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }
    return Configuration.instance;
  }
}
const tess = Configuration.getInstance();
tess.set("width", 10);
console.log(tess);
console.log(tess.get("width"));
tess.set("width", 11);
console.log(tess.get("width"));
const tess2 = Configuration.getInstance();
tess2.set("height", 30);

console.log(tess2.get("width"));
console.log(tess.get("height"));
console.log(tess2.get("height"));
