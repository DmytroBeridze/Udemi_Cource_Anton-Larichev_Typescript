// TODO-- Chain of Responsibility

interface IMiddleware {
  next(mid: IMiddleware): IMiddleware;
  handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
  private nexteMiddleware: IMiddleware;

  next(mid: IMiddleware): IMiddleware {
    this.nexteMiddleware = mid;
    return mid;
  }
  handle(request: any) {
    if (this.nexteMiddleware) {
      return this.nexteMiddleware.handle(request);
    }
    return;
  }
}

class AuthMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log("AuthMiddleware");

    if (request.userId === 1) {
      return super.handle(request);
    }
    return { erroe: "You dont registered" };
  }
}

class ValidationMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log("ValidationMiddleware");
    if (request.body) {
      return super.handle(request);
    }
    return { error: "Doesnt have a body" };
  }
}

class ControllerMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log("ControllerMiddleware: OK");
    return { success: request };
  }
}

const controller = new ControllerMiddleware();
const validate = new ValidationMiddleware();
const auth = new AuthMiddleware();

auth.next(validate).next(controller);

console.log(auth.handle({ userId: 1, body: "Some body" }));

//TODO---mediator pattern

interface Mediator {
  notify(sender: string, event: string): void;
}

abstract class Mediated {
  mediator: Mediator;
  setMediator(med: Mediator) {
    this.mediator = med;
  }
}

class Notifications {
  send() {
    console.log("Sending message");
  }
}

class Log {
  log(message: string) {
    console.log(message);
  }
}

class EventHandler extends Mediated {
  myEvent() {
    this.mediator.notify("EventHandler", "MyEvent");
  }
}

class NotificationMediator implements Mediator {
  constructor(
    public notifications: Notifications,
    public logger: Log,
    public eventHandler: EventHandler
  ) {}
  notify(sender: string, event: string): void {
    switch (event) {
      case "MyEvent":
        this.notifications.send();
        this.logger.log("Sended");
    }
  }
}
const handler = new EventHandler();
const logger = new Log();
const notications = new Notifications();

const med = new NotificationMediator(notications, logger, handler);
handler.setMediator(med);
handler.myEvent();

// --------------------

// Интерфейс медиатора
interface IMediator {
  notify(sender: Component, event: string): void;
}
// базовый компонент
class Component {
  constructor(protected mediator: IMediator) {}

  sendEvent(event: string) {
    console.log(`${this.constructor.name} send event ${event}`);
    this.mediator.notify(this, event);
  }
}

// Конкретные компоненты
class Button extends Component {
  click() {
    this.sendEvent("ButtonClicked");
  }
}

class CheckBox extends Component {
  checked() {
    this.sendEvent("CheckedChecked");
  }
}

// Конкретный медиатор
class DialogMediator implements IMediator {
  private button: Button;
  private checkBox: CheckBox;

  setButton(button: Button) {
    this.button = button;
  }
  setCheckbox(checkbox: CheckBox) {
    this.checkBox = checkbox;
  }

  notify(sender: Component, event: string): void {
    if (sender === this.button && event === "ButtonClicked") {
      console.log(
        "Медиатор реагирует на событие кнопки и вызывает Checkbox.check()"
      );
      this.checkBox.checked;
    }
    if (sender === this.checkBox && event === "CheckedChecked") {
      console.log("Медиатор реагирует на событие чекбокса.");
    }
  }
}

const mediator = new DialogMediator();
const button = new Button(mediator);
const checkbox = new CheckBox(mediator);

mediator.setButton(button);
mediator.setCheckbox(checkbox);

button.click();
// ----------simple example----------------------------------

class Chatroom {
  sendMessage(message: string, user: UserU): void {
    console.log(`${user.name} ${message}`);
  }
}

class UserU {
  constructor(public name: string, private chatroom: Chatroom) {}

  send(message: string) {
    this.chatroom.sendMessage(message, this);
  }
}
const chatroom = new Chatroom();
const UserU1 = new UserU("Dimon", chatroom);
const UserU2 = new UserU("Qubiq", chatroom);

UserU1.send("First send");
UserU2.send("Second send");

// -simple example--------------------------------------------

class ChatSimple {
  users: UserSimple[] = [];

  addUser(user: UserSimple) {
    this.users.push(user);
  }

  sendMessage(sender: UserSimple, message: string) {
    this.users.forEach((user) => {
      if (user.type === "moderator" || user === sender) {
        console.log(user.type + " " + sender.name + " " + message);
      }
    });
  }
}

class UserSimple {
  constructor(
    public name: string,
    public type: "user" | "moderator",
    private chat: ChatSimple
  ) {
    this.chat.addUser(this);
  }

  send(message: string) {
    this.chat.sendMessage(this, message);
  }
}

const chatSimple = new ChatSimple();
const qubuq = new UserSimple("Qubiq", "user", chatSimple);
const dimon = new UserSimple("Dimon", "user", chatSimple);
const erique = new UserSimple("Erique", "moderator", chatSimple);

qubuq.send("Hello!");
dimon.send("Hi!");
erique.send("Attention");

console.log("----------------train");

interface IMyMediatorTrain {
  notify(sender: MyComponentClass, send: string): void;
}

class MyComponentClass {
  constructor(private mediator: IMyMediatorTrain) {}
  senNotify(send: string) {
    this.mediator.notify(this, send);
  }
}

class MyButtonTrain extends MyComponentClass {
  send() {
    this.senNotify("Button");
  }
}

class MyCheckboxTrain extends MyComponentClass {
  send() {
    this.senNotify("Checkbox");
  }
}

class MyMediatorTrain implements IMyMediatorTrain {
  button: MyButtonTrain;
  checkbox: MyCheckboxTrain;
  sendButton(btn: MyButtonTrain) {
    this.button = btn;
  }
  sendCheckbox(chcek: MyCheckboxTrain) {
    this.checkbox = chcek;
  }

  notify(sender: MyComponentClass, send: string): void {
    if (sender === this.button && send === "Button") {
      console.log("Button click");
      this.checkbox.send();
    }
    if (sender === this.checkbox && send === "Checkbox") {
      console.log("Checkbox checked");
    }
  }
}

const myMediatorTrain = new MyMediatorTrain();

const myButtonTrain = new MyButtonTrain(myMediatorTrain);
const myCheckboxTrain = new MyCheckboxTrain(myMediatorTrain);

myMediatorTrain.sendButton(myButtonTrain);
myMediatorTrain.sendCheckbox(myCheckboxTrain);

myButtonTrain.send();
myCheckboxTrain.send();

// TODO--Command pattern

console.log("------Command pattern");

interface Command {
  execute(): void;
}

// Receiver
class Light {
  turnOn() {
    console.log("Light is on");
  }
  turnOf() {
    console.log("Light is off");
  }
}

// ConcreteCommand
class TurnOnLightCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOn();
  }
}

class TurnOffLightCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOf();
  }
}

// Отправитель (Invoker)
class RemoteControl {
  private command: Command;

  setCommand(com: Command) {
    this.command = com;
  }

  pressButton() {
    this.command.execute();
  }
}

const light = new Light();

const turnOnLightCommand = new TurnOnLightCommand(light);
const turnOfLightCommand = new TurnOffLightCommand(light);

const remote = new RemoteControl();
remote.setCommand(turnOnLightCommand);
remote.pressButton();

remote.setCommand(turnOfLightCommand);
remote.pressButton();

//----------command pattrn от ИИ  добавление и удаление строки с сохранение в массив команд, что бы была возможность делать отмену----

interface IControlMy {
  add(): void;
  remove(): void;
}
// TextAdd
class TextAdd implements IControlMy {
  constructor(private control: ControlMy, private data: string) {}

  add(): void {
    this.control.newTextAdd(this.data);
  }
  remove(): void {
    this.control.newTextRemove(this.data);
  }
}
// ControlMy
class ControlMy {
  private text: string = "";

  newTextAdd(newText: string) {
    this.text += newText;
  }
  newTextRemove(newText: string) {
    this.text = this.text.replaceAll(newText, "");
  }
  newTextGet() {
    return this.text;
  }
}

//
class MainControl {
  private bd: IControlMy[] = [];

  controlAddText(method: TextAdd) {
    method.add();
    this.bd.push(method);
  }

  controlRemoveText() {
    const res = this.bd.pop();
    if (res) {
      res.remove();
    }
  }
}

const controlMy = new ControlMy();
const textAdd = new TextAdd(controlMy, "Qubiq");
const mainControl = new MainControl();

mainControl.controlAddText(textAdd);
console.log(controlMy.newTextGet());

mainControl.controlRemoveText();
console.log(controlMy.newTextGet());

// TODO----state pattern
// интерфейс состояний
interface VendingMachineState {
  insertCoin(): void; // Метод для обработки вставки монеты
  selectProduct(): void; // Метод для обработки выбора продукта
  dispenseProduct(): void; // Метод для обработки выдачи продукта
}
// Состояние: Ожидание монеты
class WaitingForCoinState implements VendingMachineState {
  constructor(private vendingMachine: VendingMachine) {}

  // Обработка вставки монеты
  insertCoin(): void {
    console.log("Coin inserted. You can now select a product.");
    this.vendingMachine.setState(
      this.vendingMachine.getProductSelectionState()
    );
  }

  // Нельзя выбрать продукт без монеты
  selectProduct(): void {
    console.log(console.log("Insert a coin first!"));
  }
  // Нельзя выдать продукт без монеты и выбора продукта
  dispenseProduct(): void {
    console.log("You need to insert a coin and select a product first.");
  }
}

// Состояние: Выбор продукта
class ProductSelectionState implements VendingMachineState {
  constructor(private vendingMachine: VendingMachine) {}

  // Нельзя вставить монету, так как монета уже вставлена
  insertCoin(): void {
    console.log("You already inserted a coin.");
  }

  // Обработка выбора продукта
  selectProduct(): void {
    console.log("Product selected. Dispensing now...");
    this.vendingMachine.setState(this.vendingMachine.getDispensingState());
  }

  // Нельзя выдать продукт без выбора
  dispenseProduct(): void {
    console.log("Select a product first.");
  }
}

// Состояние: Выдача продукта
class DispensingState implements VendingMachineState {
  constructor(private vendingMachine: VendingMachine) {}

  // Нельзя вставить монету, пока продукт не выдан
  insertCoin(): void {
    console.log("Please wait, we're already dispensing your product");
  }

  // Нельзя выбрать продукт, пока идет выдача продукта
  selectProduct(): void {
    console.log("Please wait, we're already dispensing your product.");
  }

  // Обработка выдачи продукта
  dispenseProduct(): void {
    console.log("Here is your product. Thank you!");
    this.vendingMachine.setState(this.vendingMachine.getWaitingForCoinState());
  }
}

// . Класс торгового автомата
class VendingMachine {
  private waitingForCoinState: VendingMachineState; // Состояние ожидания монеты
  private productSelectionState: VendingMachineState; // Состояние выбора продукта
  private dispensingState: VendingMachineState; // Состояние выдачи продукта

  private currentstate: VendingMachineState; // Текущее состояние автомата

  constructor() {
    // Инициализация состояний
    this.waitingForCoinState = new WaitingForCoinState(this);
    this.productSelectionState = new ProductSelectionState(this);
    this.dispensingState = new DispensingState(this);

    // Устанавливаем начальное состояние (ожидание монеты
    this.currentstate = this.waitingForCoinState;
  }

  // Устанавливаем текущее состояние автомата
  setState(state: VendingMachineState): void {
    this.currentstate = state;
  }

  // Получаем состояние ожидания монеты
  getWaitingForCoinState(): VendingMachineState {
    return this.waitingForCoinState;
  }

  // Получаем состояние выбора продукт
  getProductSelectionState(): VendingMachineState {
    return this.productSelectionState;
  }

  // Получаем состояние выдачи продукта
  getDispensingState(): VendingMachineState {
    return this.dispensingState;
  }
  // ---
  // Обработка вставки монеты
  insertCoin(): void {
    this.currentstate.insertCoin();
  }

  // Обработка выбора продукта
  selectProduct(): void {
    this.currentstate.selectProduct();
  }

  // Обработка выдачи продукта
  dispenseProduct(): void {
    this.currentstate.dispenseProduct();
  }
}

// Использование торгового автомата
const vendingMachine = new VendingMachine();
vendingMachine.insertCoin(); // "Coin inserted. You can now select a product."
vendingMachine.selectProduct(); // "Product selected. Dispensing now..."
vendingMachine.dispenseProduct(); // "Here is your product. Thank you!"

vendingMachine.dispenseProduct(); // "You need to insert a coin and select a product first."

// ------------------

interface ICoffeMachine {
  insertCoin(): void;
  searchCoffe(): void;
  dispenceProduct(): void;
}

class InsertCoin implements ICoffeMachine {
  constructor(private machine: CoffeMachine) {}
  insertCoin(): void {
    this.machine.setCurrentState(this.machine.getSearchCoffe());
    console.log("Coin inserted");
  }
  searchCoffe(): void {
    console.log("Please insert coin");
  }
  dispenceProduct(): void {
    console.log("Please insert coin");
  }
}

class SearchCoffe implements ICoffeMachine {
  constructor(private machine: CoffeMachine) {}

  insertCoin(): void {
    console.log("Coin inserted");
  }
  searchCoffe(): void {
    this.machine.setCurrentState(this.machine.getDispenceProduct());
    console.log("Search coffe");
  }
  dispenceProduct(): void {
    console.log("Please insert coin");
  }
}

class DispenceProduct implements ICoffeMachine {
  constructor(private machine: CoffeMachine) {}
  insertCoin(): void {
    console.log("Coin inserted");
  }
  searchCoffe(): void {
    console.log("Coffe Searched");
  }
  dispenceProduct(): void {
    this.machine.setCurrentState(this.machine.getInsertCoin());
    console.log("Dispence Coffe");
  }
}

class CoffeMachine {
  private insertCoin: ICoffeMachine;
  private searchCoffe: ICoffeMachine;
  private dispenceProduct: ICoffeMachine;

  private currentState: ICoffeMachine;

  constructor() {
    this.insertCoin = new InsertCoin(this);
    this.searchCoffe = new SearchCoffe(this);
    this.dispenceProduct = new DispenceProduct(this);

    this.currentState = this.insertCoin;
  }

  setCurrentState(state: ICoffeMachine) {
    this.currentState = state;
  }

  getInsertCoin() {
    return this.insertCoin;
  }
  getSearchCoffe() {
    return this.searchCoffe;
  }
  getDispenceProduct() {
    return this.dispenceProduct;
  }
  //
  insertCoinMethod() {
    this.currentState.insertCoin();
  }
  searchCoffeMethod() {
    this.currentState.searchCoffe();
  }
  dispenceProductMethod() {
    this.currentState.dispenceProduct();
  }
}

const coffeMachine = new CoffeMachine();
coffeMachine.insertCoinMethod();
coffeMachine.searchCoffeMethod();
coffeMachine.dispenceProductMethod();
coffeMachine.dispenceProductMethod();
// ------------------------

// TODO ---strategy pattern

class UserSt {
  githubToken: string;
  jwtToken: string;
}

interface AuthStrategy {
  auth(user: UserSt): boolean;
}

class AuthSt {
  constructor(private strategy: AuthStrategy) {}

  setStrategy(str: AuthStrategy) {
    this.strategy = str;
  }
  public authUser(user: UserSt): boolean {
    return this.strategy.auth(user);
  }
}

class JWTStrategy implements AuthStrategy {
  auth(user: UserSt): boolean {
    if (user.jwtToken) {
      return true;
    }
    return false;
  }
}

class GithubStrategy implements AuthStrategy {
  auth(user: UserSt): boolean {
    if (user.githubToken) {
      return true;
    }
    return false;
  }
}

const userSt = new UserSt();
userSt.jwtToken = "token";
const authSt = new AuthSt(new JWTStrategy());
console.log(authSt.authUser(userSt));

authSt.setStrategy(new GithubStrategy());
console.log(authSt.authUser(userSt));

// TODO----iterator pattern

class Task {
  constructor(public priority: number) {}
}

class TaskList {
  private tasks: Task[] = [];

  public sortByPriority() {
    this.tasks.sort((a, b) => (a.priority > b.priority ? 1 : -1));
  }

  public addTask(task: Task) {
    this.tasks.push(task);
  }
  public getTasks() {
    return this.tasks;
  }
  public count() {
    return this.tasks.length;
  }

  public getIterator() {
    return new PriorityIterator(this);
  }
}

interface IIterator<T> {
  current(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}

class PriorityIterator implements IIterator<Task> {
  private position: number = 0;
  private tasklist: TaskList;

  constructor(tasklist: TaskList) {
    tasklist.sortByPriority();
    this.tasklist = tasklist;
  }

  current(): Task | undefined {
    return this.tasklist.getTasks()[this.position];
  }
  next(): Task | undefined {
    this.position += 1;
    return this.tasklist.getTasks()[this.position];
  }
  prev(): Task | undefined {
    this.position -= 1;
    return this.tasklist.getTasks()[this.position];
  }
  index() {
    return this.position;
  }
}

const tasklist = new TaskList();
tasklist.addTask(new Task(8));
tasklist.addTask(new Task(2));
tasklist.addTask(new Task(10));

const iterator = tasklist.getIterator();
console.log(iterator.next());
console.log(iterator.current());
console.log(iterator.prev());
console.log(iterator.prev());
// ----------------------------------------
// TODO--template pattern

class Form {
  constructor(public name: string) {}
}

abstract class SaveForm<T> {
  save(form: Form) {
    const res = this.fill(form);
    this.log(res);
  }

  abstract fill(form: Form): T;

  log(data: T) {
    console.log(data);
  }
  abstract send(data: T): void;
}

class FirstApi extends SaveForm<string> {
  fill(form: Form): string {
    return `Filled ${form.name}`;
  }
  send(data: string): void {
    console.log(`Send ${data}`);
  }
}

class SecondApi extends SaveForm<{ data: string }> {
  fill(form: Form): { data: string } {
    return { data: "fdfdfdfdfd" };
  }
  send(data: { data: string }): { data: string } {
    throw new Error("Method not implemented.");
  }
}

const firstApi = new FirstApi();
firstApi.save(new Form("Qwerty"));

//TODO----- observer pattern

// Observer — это интерфейс для классов, которые хотят получать обновления.
interface Observer {
  update(message: string): void;
}

// Subject — это интерфейс для класса, который будет уведомлять подписчиков.
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}
//  реализация класса Subject
class NotificationService implements Subject {
  private observers: Observer[] = [];
  private message: string = "";

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    // this.observers = this.observers.filter((obs) => obs !== observer);
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      return;
    }
    this.observers.splice(index, 1);
  }

  // Рассылает уведомления (notify) всем подписчикам.
  notify(): void {
    this.observers.forEach((obs) => obs.update(this.message));
  }

  // Устанавливает сообщение и уведомляет подписчиков (sendMessage).
  sendMessage(message: string): void {
    this.message = message;
    this.notify();
  }
}

// Создаём наблюдателей (Observers)
class UserObs implements Observer {
  constructor(private name: string) {}
  update(message: string): void {
    console.log(`${this.name} get send message:${message} `);
  }
}

// --

const notificationService = new NotificationService();
const userObs1 = new UserObs("Qubiq");
const userObs2 = new UserObs("Dimon");

notificationService.attach(userObs1);
notificationService.attach(userObs2);

// Qubiq получил уведомление:  Новое сообщение!
// Dimon получил уведомление:  Новое сообщение!
notificationService.sendMessage("New Message");
notificationService.detach(userObs1);
notificationService.sendMessage("Enother message");

// рассылает снова всем пользователям
notificationService.notify();
// -------------------------------
console.log("---------------Train");

interface IObserverTrain {
  upload(message: string): void;
}

interface ISubjectTrain {
  add(observer: IObserverTrain): void;
  dell(observer: IObserverTrain): void;
  send(message: string): void;
}

class SubjectTrain implements ISubjectTrain {
  private observers: IObserverTrain[] = [];
  private message: string;

  add(observer: IObserverTrain): void {
    if (!this.observers.includes(observer)) this.observers.push(observer);
  }

  dell(observer: IObserverTrain) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  send(message: string) {
    this.observers.forEach((obs) => obs.upload(message));
  }

  setMessage(message: string) {
    this.message = message;
    this.send(message);
  }
}

class ObserverTrain implements IObserverTrain {
  constructor(public user: string) {}
  upload(message: string): void {
    console.log(`${this.user} get message ${message} `);
  }
}

const subjectTrain = new SubjectTrain();
const us1 = new ObserverTrain("Dimon");
const us2 = new ObserverTrain("Qubiq");

subjectTrain.add(us1);
subjectTrain.add(us2);

subjectTrain.setMessage("This message");
