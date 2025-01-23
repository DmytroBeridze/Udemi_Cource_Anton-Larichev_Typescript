"use strict";
//TODO ---Pattern decorator
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
class UserSer {
    constructor() {
        this.users = 1000;
    }
    getUsersInDataBase() {
        return this.users;
    }
}
// function decorator
function UserSerDecorator(obj) {
    obj.users = 0;
    return obj;
}
function UserSerDecorator2(obj) {
    console.log(`This users:  ${obj.users}`);
    return obj;
}
console.log(new UserSer().getUsersInDataBase());
console.log(UserSerDecorator(new UserSer()).getUsersInDataBase());
console.log(UserSerDecorator2(UserSerDecorator(new UserSer())));
let TsDecoratorClass = class TsDecoratorClass {
    constructor() {
        this.age = 200;
    }
    method() {
        return this.age;
    }
};
TsDecoratorClass = __decorate([
    logA(),
    logB(),
    tsDecoratorFunc,
    factoryDecorFnc(870)
], TsDecoratorClass);
function tsDecoratorFunc(target) {
    return class extends target {
    };
}
const impl = new TsDecoratorClass();
//?--- порядок работы декораторов
function logA() {
    console.log("A init");
    return (target) => {
        console.log("A run");
    };
}
function logB() {
    console.log("B init");
    return (target) => {
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
function factoryDecorFnc(data) {
    return (target) => {
        return class extends target {
            constructor() {
                super(...arguments);
                this.age = data;
            }
        };
    };
}
const fact = new TsDecoratorClass();
class UserDecMethClass {
    method() {
        throw new Error("ERROR!!!");
    }
}
__decorate([
    UserDecMethDeco
], UserDecMethClass.prototype, "method", null);
function UserDecMethDeco(target, //сам класс
propartyKey, //название метода
descriptor //дескриптор
) {
    console.log(target);
    console.log(propartyKey);
    console.log(descriptor);
    descriptor.value = () => {
        console.log("New descriptor");
    };
}
new UserDecMethClass().method();
class PropertyDecorClass {
    constructor() {
        this.users = 1000;
    }
}
__decorate([
    PropertyDecorFunc(1000)
], PropertyDecorClass.prototype, "users", void 0);
function PropertyDecorFunc(maxData) {
    return function (target, propertyKey) {
        let value = 0;
        const setter = (val) => {
            if (val > maxData) {
                throw new Error(`Data > ${maxData} `);
            }
            else
                value = val;
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
class DecoratorAccessorClass {
    constructor() {
        this.age = 11;
    }
    set valueAge(v) {
        this.age = v;
    }
    get valueAge() {
        return this.age;
    }
}
__decorate([
    DecoratorAccessorFnc
], DecoratorAccessorClass.prototype, "valueAge", null);
function DecoratorAccessorFnc(target, keyProp, descriptor) {
    const oldDescriptor = descriptor.set;
    descriptor.set = function (data) {
        if (data > 2) {
            oldDescriptor === null || oldDescriptor === void 0 ? void 0 : oldDescriptor.call(this, data + 2);
        }
        else
            throw new Error("Data >2!!!");
    };
}
const decoratorAcces = new DecoratorAccessorClass();
decoratorAcces.valueAge = 12;
console.log(decoratorAcces.age);
// TODO --порядок декораторов
let MuUniClass = class MuUniClass {
    method(val) { }
    static method1(val) { }
    constructor(val) { }
};
__decorate([
    Uni("props")
], MuUniClass.prototype, "props", void 0);
__decorate([
    Uni("Method")
], MuUniClass.prototype, "method", null);
__decorate([
    Uni("static props")
], MuUniClass, "props1", void 0);
__decorate([
    __param(0, Uni("parm"))
], MuUniClass, "method1", null);
MuUniClass = __decorate([
    __param(0, Uni("class param"))
], MuUniClass);
function Uni(name) {
    console.log(`Init ${name}`);
    return function () {
        console.log(`Call ${name}`);
    };
}
