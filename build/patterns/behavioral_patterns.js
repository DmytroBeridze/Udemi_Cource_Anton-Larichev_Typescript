"use strict";
// TODO-- chain of command
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
// --------------------
console.log("---------------------");
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
// --------------------------------------------
console.log("---------simple example");
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
// ---------------------------------------------
console.log("---Train------simple example");
class ChatSimple {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    sendMessage(sender, message) {
        this.users.map((user) => {
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
