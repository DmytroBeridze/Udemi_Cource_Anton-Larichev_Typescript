// TODO -namespace

namespace nameA {
  export const An = 10;
  export interface Bn {
    Cn: number;
  }
}
console.log(nameA.An);
// TODO --модульность на backend (commonJs)
// в tsconfig.json должно быть------
//  "module": "commonjs" /* Specify what module code is generated. */,
// "outDir": "./build"

export const moduleTest = 117;
export const moduleTest2 = 17;

// ES6---------------------
// в tsconfig.json должно быть------
//  "module": "ES6" /* Specify what module code is generated. */,
// в package.json надо добавить  "type": "module",
export const moduleTestES6 = 42;

// TODO--модульность на frontend

/* Для того, чтоб модули работали на фронте, нужно указать type="module" в HTML :*/
/*  <script src="../build/modules_and_libraries_import.js" type="module"  ></script> */

export function testExportFnc(data: any) {
  console.log(data);
}

// TODO--import export
// !type и interface не может быть дефолтным экспортом

// импорт типа
// import {SomeType} from "./"
// import type {SomeType} from "./"
// TODO--типизация сторонних библиотек
/* Если библиотека не типизирована, можно избавиться от ошибок 
использовав комментарий: */
/*  // @ts-ignore   */

// -правильный вариант-------------------------------------
/* нужно создать файл  types.d.ts */
import rjson from "really-relaxed-json";
const rjsonString = "[ one two three {foo:bar} ]";
const json = rjson.toJson(rjsonString);
console.log(json);

/* потом перейти в node_modules, найти really-relaxed-json, src/index.js 
и найти там импортируемую функцию toJson
*/
