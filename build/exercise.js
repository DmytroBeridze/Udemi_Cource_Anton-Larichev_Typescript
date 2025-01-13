"use strict";
//TODO------------задача ИИ на перегрузку функий
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let goodsArr = [];
function goodsGuard(data) {
    return (typeof data === "object" &&
        data !== null &&
        "id" in data &&
        "quantity" in data &&
        "description" in data);
}
function orderManagement(data) {
    if (typeof data === "string") {
        return goodsArr.find((elem) => elem.id === data);
    }
    else if (goodsGuard(data)) {
        goodsArr = [...goodsArr, data];
        return;
    }
    else if (Array.isArray(data)) {
        goodsArr.push(...data);
        return data.reduce((acc, curr) => {
            acc += curr.quantity;
            return acc;
        }, 0);
    }
    return;
}
console.log(orderManagement([
    { id: "2", quantity: 2, description: "hdhfsdhfs" },
    { id: "4", quantity: 5, description: "hdhfsdhfs" },
]));
console.log(goodsArr);
console.log(orderManagement("4"));
class ProductCatal {
    constructor(id, name = "Unknown", price = 0, quantity = 0) {
        this.name = "Unknown";
        this.price = 0;
        this.quantity = 0;
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    getInfo() {
        return `Product ID: ${this.id || "Unknown"}, Name: ${this.name || "Unknown"}, Price: ${this.price || 0}, Quantity: ${this.quantity || 0}`;
    }
}
const dataGen = [
    { id: 1, name: "Dimon" },
    { id: 3, name: "Maria" },
    { id: 2, name: "Qubiq" },
    { id: 8, name: "Noname" },
    { name: "Max" },
    { id: 4, name: "Aryryry" },
];
function sortingArrayGen(arr, type) {
    const arrayWithId = arr.filter((elem) => "id" in elem);
    const sortArray = arrayWithId.sort((a, b) => {
        if (type === "less") {
            return Number(a.id) - Number(b.id);
        }
        else
            return Number(b.id) - Number(a.id);
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
function sortArrayGen(arr, type) {
    return arr.sort((a, b) => {
        switch (type) {
            case "less":
                return a.id - b.id;
            case "more":
                return b.id - a.id;
        }
    });
}
const arrayData = [
    { group: 1, name: "Dimon" },
    { group: 1, name: "Qubiq" },
    { group: 2, name: "Erich" },
    { group: 2, name: "Maria" },
    { group: 2, name: "Remarque" },
];
function dataGroup(arr, key) {
    let newMap = new Map();
    arr.forEach((elem) => {
        var _a;
        if (newMap.has(elem[key])) {
            newMap.set(elem[key], [...((_a = newMap.get(elem[key])) !== null && _a !== void 0 ? _a : []), elem]);
        }
        else
            newMap.set(elem[key], [elem]);
    });
    return Object.fromEntries(newMap);
}
console.log(dataGroup(arrayData, "group"));
const arrayData2 = [
    { group: 1, name: "Dimon" },
    { group: 1, name: "Qubiq" },
    { group: 2, name: "Erich" },
    { group: 2, name: "Maria" },
    { group: 2, name: "Remarque" },
];
function sortDataUsers(arr, key) {
    let result = {};
    arr.forEach((elem) => {
        const elemKey = String([elem[key]]);
        if (!result[elemKey]) {
            result[elemKey] = [];
        }
        else
            result[elemKey] = [...result[elemKey], elem];
    });
    return result;
}
console.log(sortDataUsers(arrayData2, "group"));
const employees = [
    { name: "Alice", department: "HR", age: 25 },
    { name: "Bob", department: "IT", age: 30 },
    { name: "Charlie", department: "HR", age: 22 },
    { name: "David", department: "IT", age: 35 },
    { name: "Eve", department: "Marketing", age: 29 },
    { name: "Frank", department: "Marketing", age: 27 },
];
function sortedEmploye(arr, key) {
    const result = {};
    arr.forEach((elem) => {
        const elemKey = String(elem[key]);
        if (result[elemKey]) {
            result[elemKey] = [...result[elemKey], elem].sort((a, b) => a.age - b.age);
        }
        else
            result[elemKey] = [elem];
    });
    return result;
}
console.log(sortedEmploye(employees, "department"));
// -------with map--------------------------------
function sortedEmployeMap(arr, key) {
    const newMap = new Map();
    for (const element of arr) {
        if (newMap.has(element[key])) {
            const oldData = newMap.get(element[key]);
            oldData &&
                newMap.set(element[key], [...oldData, element].sort((a, b) => a.age - b.age));
        }
        else
            newMap.set(element[key], [element]);
    }
    return Object.fromEntries(newMap);
}
console.log("Map:", sortedEmployeMap(employees, "department"));
// --with Reduce------------------
function sortedEmployeReduce(arr, key) {
    return arr.reduce((acc, curr) => {
        let keyElem = String(curr[key]);
        if (acc[keyElem]) {
            acc[keyElem] = [...acc[keyElem], curr].sort((a, b) => a.age - b.age);
        }
        else
            acc[keyElem] = [curr];
        return acc;
    }, {});
}
console.log("reduce:", sortedEmployeReduce(employees, "department"));
const formM = {
    name: "Dimon",
    password: "456",
};
// --так выглядит ответ валидации
const formMValidation = {
    name: { isValid: true },
    password: { isValid: false, errorMessage: "Error message" },
};
let UserDecService = class UserDecService {
    constructor() {
        this.users = 456;
    }
    getUsersInDatabase() {
        return this.users;
    }
};
UserDecService = __decorate([
    userDecServiceDecorator
], UserDecService);
function userDecServiceDecorator(target) {
    return class extends target {
        constructor() {
            super(...arguments);
            this.createAt = new Date();
        }
    };
}
const userDecService = new UserDecService(); //  необходимо явно расширить тип класса внутри декоратора.
const userDecService2 = new UserDecService(); //правильнее так
console.log(userDecService2.createAt);
class ErrorCatchClass {
    // @ErrorCatchFnc
    throwMeth(val) {
        if (val < 1) {
            throw new Error("New Error Throw");
        }
        else
            return `Ok! ${val}`;
    }
}
__decorate([
    RethrowError(false)
    // @ErrorCatchFnc
], ErrorCatchClass.prototype, "throwMeth", null);
function RethrowError(val) {
    return (target, name, descriptor) => {
        const oldMethod = descriptor.value;
        descriptor.value = function (...args) {
            try {
                return oldMethod === null || oldMethod === void 0 ? void 0 : oldMethod.apply(this, args);
            }
            catch (error) {
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
