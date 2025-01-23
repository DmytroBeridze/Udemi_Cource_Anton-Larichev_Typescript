// TODO-- chain of command

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
console.log("---------------------");

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
