"use strict";
// TODO-- Chain of Responsibility
class AbstractMiddleware {
    next(mid) {
        this.nexteMiddleware = mid;
        return mid;
    }
    handle(request) {
        if (this.nexteMiddleware) {
            return this.nexteMiddleware.handle(request);
        }
        return;
    }
}
class AuthMiddleware extends AbstractMiddleware {
    handle(request) {
        console.log("AuthMiddleware");
        if (request.userId === 1) {
            return super.handle(request);
        }
        return { erroe: "You dont registered" };
    }
}
class ValidationMiddleware extends AbstractMiddleware {
    handle(request) {
        console.log("ValidationMiddleware");
        if (request.body) {
            return super.handle(request);
        }
        return { error: "Doesnt have a body" };
    }
}
class ControllerMiddleware extends AbstractMiddleware {
    handle(request) {
        console.log("ControllerMiddleware: OK");
        return { success: request };
    }
}
const controller = new ControllerMiddleware();
const validate = new ValidationMiddleware();
const auth = new AuthMiddleware();
auth.next(validate).next(controller);
console.log(auth.handle({ userId: 1, body: "Some body" }));
class Mediated {
    setMediator(med) {
        this.mediator = med;
    }
}
class Notifications {
    send() {
        console.log("Sending message");
    }
}
class Log {
    log(message) {
        console.log(message);
    }
}
class EventHandler extends Mediated {
    myEvent() {
        this.mediator.notify("EventHandler", "MyEvent");
    }
}
class NotificationMediator {
    constructor(notifications, logger, eventHandler) {
        this.notifications = notifications;
        this.logger = logger;
        this.eventHandler = eventHandler;
    }
    notify(sender, event) {
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
// базовый компонент
class Component {
    constructor(mediator) {
        this.mediator = mediator;
    }
    sendEvent(event) {
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
class DialogMediator {
    setButton(button) {
        this.button = button;
    }
    setCheckbox(checkbox) {
        this.checkBox = checkbox;
    }
    notify(sender, event) {
        if (sender === this.button && event === "ButtonClicked") {
            console.log("Медиатор реагирует на событие кнопки и вызывает Checkbox.check()");
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
    sendMessage(message, user) {
        console.log(`${user.name} ${message}`);
    }
}
class UserU {
    constructor(name, chatroom) {
        this.name = name;
        this.chatroom = chatroom;
    }
    send(message) {
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
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    sendMessage(sender, message) {
        this.users.forEach((user) => {
            if (user.type === "moderator" || user === sender) {
                console.log(user.type + " " + sender.name + " " + message);
            }
        });
    }
}
class UserSimple {
    constructor(name, type, chat) {
        this.name = name;
        this.type = type;
        this.chat = chat;
        this.chat.addUser(this);
    }
    send(message) {
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
class MyComponentClass {
    constructor(mediator) {
        this.mediator = mediator;
    }
    senNotify(send) {
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
class MyMediatorTrain {
    sendButton(btn) {
        this.button = btn;
    }
    sendCheckbox(chcek) {
        this.checkbox = chcek;
    }
    notify(sender, send) {
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
class TurnOnLightCommand {
    constructor(light) {
        this.light = light;
    }
    execute() {
        this.light.turnOn();
    }
}
class TurnOffLightCommand {
    constructor(light) {
        this.light = light;
    }
    execute() {
        this.light.turnOf();
    }
}
// Отправитель (Invoker)
class RemoteControl {
    setCommand(com) {
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
// TextAdd
class TextAdd {
    constructor(control, data) {
        this.control = control;
        this.data = data;
    }
    add() {
        this.control.newTextAdd(this.data);
    }
    remove() {
        this.control.newTextRemove(this.data);
    }
}
// ControlMy
class ControlMy {
    constructor() {
        this.text = "";
    }
    newTextAdd(newText) {
        this.text += newText;
    }
    newTextRemove(newText) {
        this.text = this.text.replaceAll(newText, "");
    }
    newTextGet() {
        return this.text;
    }
}
//
class MainControl {
    constructor() {
        this.bd = [];
    }
    controlAddText(method) {
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
// Состояние: Ожидание монеты
class WaitingForCoinState {
    constructor(vendingMachine) {
        this.vendingMachine = vendingMachine;
    }
    // Обработка вставки монеты
    insertCoin() {
        console.log("Coin inserted. You can now select a product.");
        this.vendingMachine.setState(this.vendingMachine.getProductSelectionState());
    }
    // Нельзя выбрать продукт без монеты
    selectProduct() {
        console.log(console.log("Insert a coin first!"));
    }
    // Нельзя выдать продукт без монеты и выбора продукта
    dispenseProduct() {
        console.log("You need to insert a coin and select a product first.");
    }
}
// Состояние: Выбор продукта
class ProductSelectionState {
    constructor(vendingMachine) {
        this.vendingMachine = vendingMachine;
    }
    // Нельзя вставить монету, так как монета уже вставлена
    insertCoin() {
        console.log("You already inserted a coin.");
    }
    // Обработка выбора продукта
    selectProduct() {
        console.log("Product selected. Dispensing now...");
        this.vendingMachine.setState(this.vendingMachine.getDispensingState());
    }
    // Нельзя выдать продукт без выбора
    dispenseProduct() {
        console.log("Select a product first.");
    }
}
// Состояние: Выдача продукта
class DispensingState {
    constructor(vendingMachine) {
        this.vendingMachine = vendingMachine;
    }
    // Нельзя вставить монету, пока продукт не выдан
    insertCoin() {
        console.log("Please wait, we're already dispensing your product");
    }
    // Нельзя выбрать продукт, пока идет выдача продукта
    selectProduct() {
        console.log("Please wait, we're already dispensing your product.");
    }
    // Обработка выдачи продукта
    dispenseProduct() {
        console.log("Here is your product. Thank you!");
        this.vendingMachine.setState(this.vendingMachine.getWaitingForCoinState());
    }
}
// . Класс торгового автомата
class VendingMachine {
    constructor() {
        // Инициализация состояний
        this.waitingForCoinState = new WaitingForCoinState(this);
        this.productSelectionState = new ProductSelectionState(this);
        this.dispensingState = new DispensingState(this);
        // Устанавливаем начальное состояние (ожидание монеты
        this.currentstate = this.waitingForCoinState;
    }
    // Устанавливаем текущее состояние автомата
    setState(state) {
        this.currentstate = state;
    }
    // Получаем состояние ожидания монеты
    getWaitingForCoinState() {
        return this.waitingForCoinState;
    }
    // Получаем состояние выбора продукт
    getProductSelectionState() {
        return this.productSelectionState;
    }
    // Получаем состояние выдачи продукта
    getDispensingState() {
        return this.dispensingState;
    }
    // ---
    // Обработка вставки монеты
    insertCoin() {
        this.currentstate.insertCoin();
    }
    // Обработка выбора продукта
    selectProduct() {
        this.currentstate.selectProduct();
    }
    // Обработка выдачи продукта
    dispenseProduct() {
        this.currentstate.dispenseProduct();
    }
}
// Использование торгового автомата
const vendingMachine = new VendingMachine();
vendingMachine.insertCoin(); // "Coin inserted. You can now select a product."
vendingMachine.selectProduct(); // "Product selected. Dispensing now..."
vendingMachine.dispenseProduct(); // "Here is your product. Thank you!"
vendingMachine.dispenseProduct(); // "You need to insert a coin and select a product first."
class InsertCoin {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        this.machine.setCurrentState(this.machine.getSearchCoffe());
        console.log("Coin inserted");
    }
    searchCoffe() {
        console.log("Please insert coin");
    }
    dispenceProduct() {
        console.log("Please insert coin");
    }
}
class SearchCoffe {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Coin inserted");
    }
    searchCoffe() {
        this.machine.setCurrentState(this.machine.getDispenceProduct());
        console.log("Search coffe");
    }
    dispenceProduct() {
        console.log("Please insert coin");
    }
}
class DispenceProduct {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Coin inserted");
    }
    searchCoffe() {
        console.log("Coffe Searched");
    }
    dispenceProduct() {
        this.machine.setCurrentState(this.machine.getInsertCoin());
        console.log("Dispence Coffe");
    }
}
class CoffeMachine {
    constructor() {
        this.insertCoin = new InsertCoin(this);
        this.searchCoffe = new SearchCoffe(this);
        this.dispenceProduct = new DispenceProduct(this);
        this.currentState = this.insertCoin;
    }
    setCurrentState(state) {
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
}
class AuthSt {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(str) {
        this.strategy = str;
    }
    authUser(user) {
        return this.strategy.auth(user);
    }
}
class JWTStrategy {
    auth(user) {
        if (user.jwtToken) {
            return true;
        }
        return false;
    }
}
class GithubStrategy {
    auth(user) {
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
    constructor(priority) {
        this.priority = priority;
    }
}
class TaskList {
    constructor() {
        this.tasks = [];
    }
    sortByPriority() {
        this.tasks.sort((a, b) => (a.priority > b.priority ? 1 : -1));
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
    count() {
        return this.tasks.length;
    }
    getIterator() {
        return new PriorityIterator(this);
    }
}
class PriorityIterator {
    constructor(tasklist) {
        this.position = 0;
        tasklist.sortByPriority();
        this.tasklist = tasklist;
    }
    current() {
        return this.tasklist.getTasks()[this.position];
    }
    next() {
        this.position += 1;
        return this.tasklist.getTasks()[this.position];
    }
    prev() {
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
    constructor(name) {
        this.name = name;
    }
}
class SaveForm {
    save(form) {
        const res = this.fill(form);
        this.log(res);
    }
    log(data) {
        console.log(data);
    }
}
class FirstApi extends SaveForm {
    fill(form) {
        return `Filled ${form.name}`;
    }
    send(data) {
        console.log(`Send ${data}`);
    }
}
class SecondApi extends SaveForm {
    fill(form) {
        return { data: "fdfdfdfdfd" };
    }
    send(data) {
        throw new Error("Method not implemented.");
    }
}
const firstApi = new FirstApi();
firstApi.save(new Form("Qwerty"));
//  реализация класса Subject
class NotificationService {
    constructor() {
        this.observers = [];
        this.message = "";
    }
    attach(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    detach(observer) {
        // this.observers = this.observers.filter((obs) => obs !== observer);
        const index = this.observers.indexOf(observer);
        if (index === -1) {
            return;
        }
        this.observers.splice(index, 1);
    }
    // Рассылает уведомления (notify) всем подписчикам.
    notify() {
        this.observers.forEach((obs) => obs.update(this.message));
    }
    // Устанавливает сообщение и уведомляет подписчиков (sendMessage).
    sendMessage(message) {
        this.message = message;
        this.notify();
    }
}
// Создаём наблюдателей (Observers)
class UserObs {
    constructor(name) {
        this.name = name;
    }
    update(message) {
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
class SubjectTrain {
    constructor() {
        this.observers = [];
    }
    add(observer) {
        if (!this.observers.includes(observer))
            this.observers.push(observer);
    }
    dell(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    send(message) {
        this.observers.forEach((obs) => obs.upload(message));
    }
    setMessage(message) {
        this.message = message;
        this.send(message);
    }
}
class ObserverTrain {
    constructor(user) {
        this.user = user;
    }
    upload(message) {
        console.log(`${this.user} get message ${message} `);
    }
}
const subjectTrain = new SubjectTrain();
const us1 = new ObserverTrain("Dimon");
const us2 = new ObserverTrain("Qubiq");
subjectTrain.add(us1);
subjectTrain.add(us2);
subjectTrain.setMessage("This message");
