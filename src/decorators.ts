//TODO ---Pattern decorator

interface IUserServiceD {
  users: number;
  getUsersInDataBase(): number;
}

class UserSer implements IUserServiceD {
  users: number = 1000;

  getUsersInDataBase(): number {
    return this.users;
  }
}

// function decorator
function UserSerDecorator(obj: IUserServiceD) {
  obj.users = 0;
  return obj;
}

function UserSerDecorator2(obj: IUserServiceD): IUserServiceD {
  console.log(`This users:  ${obj.users}`);
  return obj;
}

console.log(new UserSer().getUsersInDataBase());

console.log(UserSerDecorator(new UserSer()).getUsersInDataBase());

console.log(UserSerDecorator2(UserSerDecorator(new UserSer())));

// TODO---Decorator of class

interface TsDecoratorInterface {
  name: string;
  age: number;
  method: () => number;
}
@logA()
@logB()
@tsDecoratorFunc
@factoryDecorFnc(870)
class TsDecoratorClass implements TsDecoratorInterface {
  age: number = 200;
  name: string;

  method(): number {
    return this.age;
  }
}

function tsDecoratorFunc<T extends { new (...args: any[]): {} }>(target: T): T {
  return class extends target {
    name: "Mod";
    age: 8;
  };
}

const impl = new TsDecoratorClass();

//?--- порядок работы декораторов
function logA() {
  console.log("A init");
  return (target: Function) => {
    console.log("A run");
  };
}

function logB() {
  console.log("B init");
  return (target: Function) => {
    console.log("B run");
  };
}
/* 
Порядок выведения:
1) A init
2) В init
3) В run
4) А run

*/
// ?--------------------------

// TODO--factory  Decorators

function factoryDecorFnc(data: number) {
  return <T extends { new (...params: any[]): {} }>(target: T): T => {
    return class extends target {
      age = data;
    };
  };
}

const fact = new TsDecoratorClass();
// console.log(fact.method());

// TODO---Decorator of method

interface UserDecMeth {
  name: string;
  age: number;
  method(): number;
}

class UserDecMethClass implements UserDecMeth {
  name: string;
  age: number;

  @UserDecMethDeco
  method(): number {
    throw new Error("ERROR!!!");
  }
}

function UserDecMethDeco(
  target: Object, //сам класс
  propartyKey: string, //название метода
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any> //дескриптор
) {
  console.log(target);
  console.log(propartyKey);
  console.log(descriptor);

  descriptor.value = () => {
    console.log("New descriptor");
  };
}

new UserDecMethClass().method();

// TODO---property decorator
interface PropertyDecorInterface {
  users: number;
}

class PropertyDecorClass implements PropertyDecorInterface {
  @PropertyDecorFunc(1000)
  users: number = 1000;
}

function PropertyDecorFunc(maxData: number) {
  return function (target: object, propertyKey: string) {
    let value: number = 0;

    const setter = (val: number) => {
      if (val > maxData) {
        throw new Error(`Data > ${maxData} `);
      } else value = val;
    };

    const getter = () => {
      return value;
    };

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
      enumerable: true,
      configurable: true,
    });
  };
}

console.log((new PropertyDecorClass().users = 10));

//TODO----decorator accessor
interface DecoratorAccessorInterface {
  name: string;
  age: number;

  set valueAge(v: number);
  get valueAge(): number;
}

class DecoratorAccessorClass implements DecoratorAccessorInterface {
  age: number = 11;
  name: string;

  @DecoratorAccessorFnc
  set valueAge(v: number) {
    this.age = v;
  }
  get valueAge(): number {
    return this.age;
  }
}

function DecoratorAccessorFnc(
  target: object,
  keyProp: string,
  descriptor: PropertyDescriptor
) {
  const oldDescriptor = descriptor.set;

  descriptor.set = function (data: number) {
    if (data > 2) {
      oldDescriptor?.call(this, data + 2);
    } else throw new Error("Data >2!!!");
  };
}

const decoratorAcces = new DecoratorAccessorClass();
decoratorAcces.valueAge = 12;
console.log(decoratorAcces.age);

// TODO --порядок декораторов

class MuUniClass {
  @Uni("props")
  props: any;

  @Uni("static props")
  static props1: any;

  @Uni("Method")
  method(val: any) {}
  static method1(
    @Uni("parm")
    val: any
  ) {}
  constructor(@Uni("class param") val: any) {}
}

function Uni(name: string): any {
  console.log(`Init ${name}`);
  return function () {
    console.log(`Call ${name}`);
  };
}
