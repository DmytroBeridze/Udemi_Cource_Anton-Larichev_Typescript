"use strict";
//*--------- Chain of Responsibility
const required = (value) => {
    if (!value)
        return "Field is required";
    return null;
};
const mail = (value) => {
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexp.test(value))
        return "Failed email";
    return null;
};
const validator = (values) => {
    return (value) => {
        for (const val of values) {
            const error = val(value);
            if (error)
                return error;
        }
        return null;
    };
};
const resValidator = validator([required, mail]);
console.log(resValidator("ert@gjh.com"));
const loggerWare = (data, next) => {
    console.log(`Log: ${data}`);
    return next();
};
const authWare = (data, next) => {
    if (!data.user) {
        return `Non register`;
    }
    return next();
};
const handlerWare = (data) => {
    return `Request for ${data.user}`;
};
const meddlewareCompose = (middlewares) => {
    return (data) => {
        const resWare = (val) => {
            if (val < middlewares.length) {
                const middle = middlewares[val];
                return middle(data, () => resWare(val + 1));
            }
            return undefined;
        };
        return resWare(0);
    };
};
const meddleware = meddlewareCompose([loggerWare, authWare, handlerWare]);
console.log(meddleware({ user: "Dimon" }));
//*-----------------------Command pattern
console.log("-------------Command pattern");
// Receiver: Light
const LightF = {
    on: () => console.log("Lights is on"),
    off: () => console.log("Lights is off"),
};
// Command Creator: возвращает функции для выполнения действий
const createLightOnCommandF = (LightF) => () => LightF.on();
const createLightOffCommandF = (LightF) => () => LightF.off();
// Invoker: Remote Control
const createRemoteControl = () => {
    let command = null;
    return {
        setCommand: (cmd) => {
            command = cmd;
        },
        pressButton: () => {
            if (command)
                command();
            else
                console.log("No command set");
        },
    };
};
// Создаем команды
const lightOnCommand = createLightOnCommandF(LightF);
const lightOffCommand = createLightOffCommandF(LightF);
// Создаем пульт
const remoteControl = createRemoteControl();
remoteControl.setCommand(lightOnCommand);
remoteControl.pressButton();
remoteControl.setCommand(lightOffCommand);
remoteControl.pressButton();
//*------------------------------state pattern
console.log("---------state pattern:");
const createCoffeeMachine = () => {
    let state = "insertCoin";
    const states = {
        // insert
        insertCoin: {
            insertCoin: () => {
                console.log("Coin inserted");
                state = "searchCoffee";
            },
            searchCoffee: () => console.log("Insert a Coin please first"),
            dispenseProduct: () => console.log("Insert a Coin please first"),
        },
        searchCoffee: {
            insertCoin: () => console.log("Coin already inserted"),
            searchCoffee: () => {
                console.log("Coffee selected. Preparing...");
                state = "dispenseProduct";
            },
            dispenseProduct: () => console.log("Please select a coffee first."),
        },
        dispenseProduct: {
            insertCoin: () => console.log("Please wait, coffee is being dispensed."),
            searchCoffee: () => console.log("Cannot select coffee while dispensing"),
            dispenseProduct: () => {
                console.log("Coffee dispensed. Please insert a new coin.");
                state = "insertCoin";
            },
        },
    };
    return {
        insert: () => states[state].insertCoin(),
        search: () => states[state].searchCoffee(),
        dispense: () => states[state].dispenseProduct(),
        getState: () => state,
    };
};
const coffeeMachine = createCoffeeMachine();
coffeeMachine.insert();
coffeeMachine.search();
coffeeMachine.dispense();
console.log(coffeeMachine.getState());
// --------------------iterator pattern
console.log("---------traain");
// task list
const taskListFnc = () => {
    let tasks = [];
    const sortTasks = () => {
        tasks.sort((a, b) => (a.task > b.task ? 1 : -1));
    };
    const addTask = (task) => {
        tasks.push(task);
        sortTasks();
    };
    const getTask = () => {
        return tasks;
    };
    const counter = () => {
        return tasks.length;
    };
    return { addTask, getTask, counter };
};
// iterator
const Iterator = (tasks) => {
    let index = 0;
    return {
        current: () => {
            return tasks[index];
        },
        next: () => {
            if (index < tasks.length - 1)
                index++;
            return tasks[index];
        },
        prev: () => {
            if (index > 0)
                index--;
            return tasks[index];
        },
        position: () => index,
    };
};
const taskListF = taskListFnc();
taskListF.addTask({ task: 2 });
taskListF.addTask({ task: 1 });
taskListF.addTask({ task: 5 });
const iterF = Iterator(taskListF.getTask());
console.log(iterF.current());
console.log(iterF.next());
console.log(iterF.next());
console.log(iterF.prev());
const saveFormF = (form, template) => {
    const res = template.fill(form);
    template.send(res);
    console.log(res);
};
// string
const templateMethodString = {
    fill: function (form) {
        return `Send form ${form.mail} ${form.name}`;
    },
    send: function (data) {
        console.log(` Sent ${data}`);
    },
};
// object
const templateMethodObject = {
    fill: (form) => ({ name: form.name, mail: form.mail }),
    send: (data) => console.log(`Sent object data: ${data.name} ${data.mail}`),
};
saveFormF({ name: "Dimon", mail: "sdfg@dgfh" }, templateMethodString);
saveFormF({ name: "Qubiq", mail: "dsfa@fgh" }, templateMethodObject);
console.log("--------------terator fnc");
