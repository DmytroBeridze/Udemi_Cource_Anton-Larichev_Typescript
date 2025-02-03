//*--------- Chain of Responsibility

// Пример: Валидация формы
type ValidatorType = (value: string) => string | null;

const required: ValidatorType = (value: string): string | null => {
  if (!value) return "Field is required";
  return null;
};

const mail: ValidatorType = (value: string): string | null => {
  const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexp.test(value)) return "Failed email";
  return null;
};

const validator = (values: ValidatorType[]) => {
  return (value: string) => {
    for (const val of values) {
      const error = val(value);
      if (error) return error;
    }
    return null;
  };
};

const resValidator = validator([required, mail]);
console.log(resValidator("ert@gjh.com"));

// ------------------------

type MiddlewareTest = (data: any, next: () => any) => any;

const loggerWare: MiddlewareTest = (data, next) => {
  console.log(`Log: ${data}`);

  return next();
};

const authWare: MiddlewareTest = (data: any, next: () => any) => {
  if (!data.user) {
    return `Non register`;
  }
  return next();
};

const handlerWare: MiddlewareTest = (data: any) => {
  return `Request for ${data.user}`;
};

const meddlewareCompose = (middlewares: MiddlewareTest[]) => {
  return (data: any) => {
    const resWare = (val: number) => {
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

type TLightF = {
  on: () => void;
  off: () => void;
};

// Receiver: Light
const LightF: TLightF = {
  on: () => console.log("Lights is on"),
  off: () => console.log("Lights is off"),
};
// Command Creator: возвращает функции для выполнения действий

const createLightOnCommandF = (LightF: { on: () => void }) => () => LightF.on();
const createLightOffCommandF = (LightF: { off: () => void }) => () =>
  LightF.off();

// Invoker: Remote Control
const createRemoteControl = () => {
  let command: (() => void) | null = null;

  return {
    setCommand: (cmd: () => void) => {
      command = cmd;
    },
    pressButton: () => {
      if (command) command();
      else console.log("No command set");
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
type StateMachineFnc = "insertCoin" | "searchCoffee" | "dispenseProduct";

const createCoffeeMachine = () => {
  let state: StateMachineFnc = "insertCoin";

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
// type
type TaskFnc = { task: number };

// task list
const taskListFnc = () => {
  let tasks: TaskFnc[] = [];

  const sortTasks = () => {
    tasks.sort((a, b) => (a.task > b.task ? 1 : -1));
  };
  const addTask = (task: TaskFnc) => {
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
const Iterator = (tasks: TaskFnc[]) => {
  let index = 0;

  return {
    current: () => {
      return tasks[index];
    },
    next: () => {
      if (index < tasks.length - 1) index++;
      return tasks[index];
    },
    prev: () => {
      if (index > 0) index--;
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
// -----------------------------------

type FormF = { name: string; mail: string };

type TemplateMethod<T> = {
  fill: (form: FormF) => T;
  send: (data: T) => void;
};

const saveFormF = <T>(form: FormF, template: TemplateMethod<T>) => {
  const res = template.fill(form);
  template.send(res);
  console.log(res);
};

// string
const templateMethodString: TemplateMethod<string> = {
  fill: function (form: FormF): string {
    return `Send form ${form.mail} ${form.name}`;
  },
  send: function (data: string): void {
    console.log(` Sent ${data}`);
  },
};
// object
const templateMethodObject: TemplateMethod<{ name: string; mail: string }> = {
  fill: (form) => ({ name: form.name, mail: form.mail }),
  send: (data) => console.log(`Sent object data: ${data.name} ${data.mail}`),
};

saveFormF({ name: "Dimon", mail: "sdfg@dgfh" }, templateMethodString);
saveFormF({ name: "Qubiq", mail: "dsfa@fgh" }, templateMethodObject);

console.log("--------------terator fnc");
