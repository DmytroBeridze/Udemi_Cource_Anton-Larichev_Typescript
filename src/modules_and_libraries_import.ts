//* commonJs syntax
// import { moduleTest, moduleTest2 } from "./modules_and_libraries";
// console.log(moduleTest);
// console.log(moduleTest2);

// * ES6 syntax
import { moduleTestES6 } from "./modules_and_libraries.js";
console.log(moduleTestES6);

import { testExportFnc } from "./modules_and_libraries.js";
testExportFnc("Worked");
