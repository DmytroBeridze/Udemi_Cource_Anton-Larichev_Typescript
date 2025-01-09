"use strict";
const keyUserM = "age";
const userK = {
    name: "Dimon",
    age: 45,
};
// TODO-----keyof
function getUserKValue(obj, key) {
    return obj[key];
}
getUserKValue(userK, "name");
// TODO ----typeof
let stringOrNumType;
let stringOrNumType2;
// ----
const userTypeof = {
    name: "Dimon",
    age: 45,
};
// ----
var PersMove;
(function (PersMove) {
    PersMove[PersMove["UP"] = 0] = "UP";
    PersMove[PersMove["Down"] = 1] = "Down";
})(PersMove || (PersMove = {}));
const userAccess = {
    age: 45,
    roles: [{ ipsum: 4, lorem: "STRING" }],
};
const ageUserAccess = userAccess["age"];
const roleTypes = [{ ipsum: 3, lorem: "string" }];
const Rr = { ipsum: 5, lorem: "dgdgdg" };
console.log(Rr);
// TODO---conditional types
// обычный пример для переменной
const con = Math.random() > 5 ? true : false;
const respSuccess = {
    data: 200,
    resp: "Response ok!",
};
const respFailed = {
    data: 404,
    resp: new Error(),
};
// ----пример с перешгрузкой
class UserRel {
}
class UserPersistend {
}
function UserPrintData(data) {
    if (typeof data === "string") {
        return new UserRel();
    }
    else
        return new UserPersistend();
}
// ----пример с conditional types
class ConditionalUser {
}
class MainConditionalUser {
}
function makeConditionalUser(data) {
    if (typeof data === "string") {
        return new ConditionalUser();
    }
    else
        return new MainConditionalUser();
}
const conditionalUser = makeConditionalUser("some");
const conditionalUser2 = makeConditionalUser(2);
// TODO--------infer
function transaction(trans) {
    console.log(trans);
}
transaction({ fromTo: ["str", "str"] }); // можно вызвать и так
const trans = {
    fromTo: ["String", "Also string"],
};
transaction(trans);
