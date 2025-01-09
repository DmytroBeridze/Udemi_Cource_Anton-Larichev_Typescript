// TODO---встроенные generics

const aGen: Array<number> = [1, 2, 3, 4];

async function promFnc() {
  const promGen = await new Promise<number>((resolve, reject) => {
    resolve(1);
  });
}

// TODO---Record
// типизирует ключ и значение
const checkGen: Record<string, boolean> = {
  drive: true,
  kpp: false,
  engine: false,
};

// делает то же, что и это:
type testType = {
  [key: string]: boolean;
};

// TODO----functions with generics

function logMiddleware<T>(data: T): T {
  console.log(data);
  return data;
}

const resGen = logMiddleware(10);
const resGen2 = logMiddleware("10");
const resGen3 = logMiddleware<string>("10");

function getSplittedHalf<T>(data: T[]): T[] {
  const t = Math.floor(data.length / 2);
  return data.splice(0, t);
}
console.log(getSplittedHalf([1, 2, 3, 4, 5, 6, 7, 8, 9]));

// ------------------------------упражнение 5
function toStringGen(data: string): string;
function toStringGen(data: number): string;
function toStringGen(data: boolean): string;
function toStringGen(data: Array<any>): string;
function toStringGen(data: object): string;

function toStringGen<T>(data: T): string | undefined {
  if (typeof data === "string") return data;
  if (typeof data === "number" || typeof data === "boolean") {
    return data.toString();
  }
  if (Array.isArray(data)) return data.join("-");
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    return JSON.stringify(data);
  }

  return undefined;
}
console.log(toStringGen({ name: "Dimon" }));
// --------------

function funcGener<T>(data: T): string | undefined {
  if (Array.isArray(data)) {
    return data.toString();
  }

  switch (typeof data) {
    case "string":
      return data;
    case "number":
      return data.toString();
    case "boolean":
      return data.toString();
    case "bigint":
      return data.toString();
    case "symbol":
      return data.toString();
    case "function":
      return data.toString();
    case "object":
      return JSON.stringify(data);
    default:
      break;
  }

  return undefined;
}

console.log(
  funcGener((a: any) => {
    return a;
  })
);

// TODO---generics in types

function getSpl<T>(a: T[]): T[] {
  return a.splice(0, a.length / 2);
}
console.log(getSpl([1, 2, 3, 4, 5]));

const constSpl: <T>(a: T[]) => T[] = getSpl;

console.log(constSpl([1, 3, 4, 5, 67, 78, 98, 9]));
// ---

interface Logline<T> {
  timeStamp: Date;
  data: T;
}

type LoglineType<T> = {
  timeStamp: Date;
  data: {
    a: T;
  };
};

const logline: Logline<{ a: number }> = {
  timeStamp: new Date(),
  data: {
    a: 1,
  },
};

const logline2: LoglineType<number> = {
  timeStamp: new Date(),
  data: {
    a: 1,
  },
};

//TODO---ограничение generic

class VehicleGen {
  run: number;
}

function nmToMiles<T extends VehicleGen>(veh: T): T {
  veh.run = veh.run / 0.62;
  return veh;
}

class TestC extends VehicleGen {
  capacity: number;
}

const newVehicleGen = nmToMiles(new VehicleGen());
const newTestC = nmToMiles(new TestC());

console.log(newVehicleGen);
console.log(newTestC);

console.log(nmToMiles({ run: 1 }));

// ------
function logIdGen<T extends string | number>(id: T): T {
  return id;
}

function logObjGen<T extends string | number, Y>(a: T, b: Y): { a: T; b: Y } {
  return { a, b };
}

console.log(logObjGen("first", 24));

// TODO-----generic классы

class RespGener<D, E> {
  data?: D;
  error?: E;

  constructor(data?: D, error?: E) {
    if (data) {
      this.data = data;
    }
    if (error) {
      this.error = error;
    }
  }
}

const respGener = new RespGener<string, number>("Some data", 0);

// --------наследование-----
class HTTPResp<F> extends RespGener<string, number> {
  code: F;

  setCode(code: F) {
    this.code = code;
  }
}

const httpSesp = new HTTPResp("Some dta", 2);

// TODO--Mixins

type Constructor = new (...args: any[]) => {};
type GConstructor<T = {}> = new (...args: any[]) => T;

class ListMix {
  constructor(public items: string[]) {}
}

type listType = GConstructor<ListMix>;

// наследование
class ExtendListClass extends ListMix {
  first() {
    return this.items[0];
  }
}
// -mixin

type TestTypeMixin<T = {}> = new (...args: any[]) => T;

// ------------------------------------------------Теперь TypeScript понимает, что базовый класс должен иметь свойство name типа string[].
function TestFncMixin<TBase extends TestTypeMixin<{ name: string[] }>>(
  Base: TBase
) {
  return class extends Base {
    meth(): string[] {
      return this.name;
    }
  };
}

class TestClassMixin {
  name: string[];
  constructor(name: string[]) {
    this.name = name;
  }
}

const TestMixin = TestFncMixin(TestClassMixin);
const testRes = new TestMixin(["Dimon", "Qubiq", "Maria"]);

type MyConstructor<T = {}> = new (...args: any[]) => T;

function MyFunction<TBase extends MyConstructor<{ data: string[] }>>(
  Base: TBase
) {
  return class extends Base {
    myMeth() {
      return this.data;
    }
  };
}

class MyClass {
  data: string[];
  constructor(data: string[]) {
    this.data = data;
  }
}

const NewClass = MyFunction(MyClass);
const MyRes = new NewClass(["Lorem", "Ipsum", "Dolor"]);

console.log(NewClass);

enum Tddd {
  "Lorem",
  "ipsum",
  "dolor",
}

function trtrt() {
  console.log("!!!");
}
function hhhhhh() {}
