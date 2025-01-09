"use strict";
// TODO---встроенные generics
const aGen = [1, 2, 3, 4];
async function promFnc() {
    const promGen = await new Promise((resolve, reject) => {
        resolve(1);
    });
}
// TODO---Record
// типизирует ключ и значение
const checkGen = {
    drive: true,
    kpp: false,
    engine: false,
};
// TODO----functions with generics
function logMiddleware(data) {
    console.log(data);
    return data;
}
const resGen = logMiddleware(10);
const resGen2 = logMiddleware("10");
const resGen3 = logMiddleware("10");
function getSplittedHalf(data) {
    const t = Math.floor(data.length / 2);
    return data.splice(0, t);
}
console.log(getSplittedHalf([1, 2, 3, 4, 5, 6, 7, 8, 9]));
function toStringGen(data) {
    if (typeof data === "string")
        return data;
    if (typeof data === "number" || typeof data === "boolean") {
        return data.toString();
    }
    if (Array.isArray(data))
        return data.join("-");
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
        return JSON.stringify(data);
    }
    return undefined;
}
console.log(toStringGen({ name: "Dimon" }));
// --------------
function funcGener(data) {
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
console.log(funcGener((a) => {
    return a;
}));
// TODO---generics in types
function getSpl(a) {
    return a.splice(0, a.length / 2);
}
console.log(getSpl([1, 2, 3, 4, 5]));
const constSpl = getSpl;
console.log(constSpl([1, 3, 4, 5, 67, 78, 98, 9]));
const logline = {
    timeStamp: new Date(),
    data: {
        a: 1,
    },
};
const logline2 = {
    timeStamp: new Date(),
    data: {
        a: 1,
    },
};
//TODO---ограничение generic
class VehicleGen {
}
function nmToMiles(veh) {
    veh.run = veh.run / 0.62;
    return veh;
}
class TestC extends VehicleGen {
}
const newVehicleGen = nmToMiles(new VehicleGen());
const newTestC = nmToMiles(new TestC());
console.log(newVehicleGen);
console.log(newTestC);
console.log(nmToMiles({ run: 1 }));
// ------
function logIdGen(id) {
    return id;
}
function logObjGen(a, b) {
    return { a, b };
}
console.log(logObjGen("first", 24));
// TODO-----generic классы
class RespGener {
    constructor(data, error) {
        if (data) {
            this.data = data;
        }
        if (error) {
            this.error = error;
        }
    }
}
const respGener = new RespGener("Some data", 0);
// --------наследование-----
class HTTPResp extends RespGener {
    setCode(code) {
        this.code = code;
    }
}
const httpSesp = new HTTPResp("Some dta", 2);
class ListMix {
    constructor(items) {
        this.items = items;
    }
}
// наследование
class ExtendListClass extends ListMix {
    first() {
        return this.items[0];
    }
}
// ------------------------------------------------Теперь TypeScript понимает, что базовый класс должен иметь свойство name типа string[].
function TestFncMixin(Base) {
    return class extends Base {
        meth() {
            return this.name;
        }
    };
}
class TestClassMixin {
    constructor(name) {
        this.name = name;
    }
}
const TestMixin = TestFncMixin(TestClassMixin);
const testRes = new TestMixin(["Dimon", "Qubiq", "Maria"]);
function MyFunction(Base) {
    return class extends Base {
        myMeth() {
            return this.data;
        }
    };
}
class MyClass {
    constructor(data) {
        this.data = data;
    }
}
const NewClass = MyFunction(MyClass);
const MyRes = new NewClass(["Lorem", "Ipsum", "Dolor"]);
console.log(NewClass);
var Tddd;
(function (Tddd) {
    Tddd[Tddd["Lorem"] = 0] = "Lorem";
    Tddd[Tddd["ipsum"] = 1] = "ipsum";
    Tddd[Tddd["dolor"] = 2] = "dolor";
})(Tddd || (Tddd = {}));
function trtrt() {
    console.log("!!!");
}
function hhhhhh() { }
