"use strict";
const userReturn = {
    name: "Dimon",
    age: 45,
};
function userReturnFnc(data) {
    return data;
}
// TODO----Parameters
// * Parameters извлекает параметры функции
function parametersFnc(data, some) {
    return "return";
}
parametersFnc("sfggf", 67);
// TODO---ConstructorParameters
// * извлекает параметры из конструктора
class ConstructorParamUser {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
async function AwMenuFnc() {
    return [{ name: "Dimon", age: 45 }];
}
// --
async function AwPr(a) {
    return [await a];
}
