"use strict";
// TODO--Bridge pattern
class TelegrammProvider {
    sendMessage(message) {
        console.log(message);
    }
    connect(config) {
        console.log(config);
    }
    disConnect() {
        console.log("disconnect-Telegramm");
    }
}
class WatsUpProvider {
    sendMessage(message) {
        console.log(message);
    }
    connect(config) {
        console.log(config);
    }
    disConnect() {
        console.log("disconnect-WatsUp");
    }
}
class NotificationSender {
    constructor(provider) {
        this.provider = provider;
    }
    send() {
        this.provider.connect("Connect");
        this.provider.sendMessage("Send message");
        this.provider.disConnect();
    }
}
// отложенный вызов
class DelayNotificdtionSender extends NotificationSender {
    constructor(provider) {
        super(provider);
    }
    sendDalayed() { }
}
const sender1 = new NotificationSender(new TelegrammProvider());
sender1.send();
const sender2 = new NotificationSender(new WatsUpProvider());
sender2.send();
// TV
class TV {
    constructor() {
        this.power = false;
        this.level = 0;
    }
    getPower() {
        return `Tv pover is:${this.power} `;
    }
    getLevel() {
        return `Tv level is:${this.level} `;
    }
    setPover(val) {
        this.power = val;
    }
    setLevel(val) {
        this.level = val;
    }
}
// Radio
class Radio {
    constructor() {
        this.power = false;
        this.level = 0;
    }
    getPower() {
        return `Radio pover is:${this.power} `;
    }
    getLevel() {
        return `Radio level is:${this.level} `;
    }
    setPover(val) {
        this.power = val;
    }
    setLevel(val) {
        this.level = val;
    }
}
class GeneralClass {
    constructor(inst) {
        this.inst = inst;
    }
    getMasterVolume() {
        return this.inst.getLevel();
    }
    getMasterPover() {
        return this.inst.getPower();
    }
    setMasterVolume(v) {
        return this.inst.setLevel(v);
    }
    setMasterPover(v) {
        return this.inst.setPover(v);
    }
}
const instanceTV = new GeneralClass(new TV());
instanceTV.setMasterVolume(10);
console.log(instanceTV.getMasterVolume());
console.log(instanceTV.getMasterPover());
const instanceRadio = new GeneralClass(new Radio());
instanceRadio.setMasterVolume(20);
instanceRadio.setMasterPover(true);
console.log(instanceRadio.getMasterVolume());
console.log(instanceRadio.getMasterPover());
class RestApi {
    async submit(url) {
        const responce = await fetch(url);
        const data = await responce.json();
        return data;
    }
}
class GraphQl {
    async submit(url, body) {
        const responce = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await responce.json();
        return data;
    }
}
class MainSubmit {
    constructor(inst) {
        this.inst = inst;
    }
    getData(url, body) {
        return this.inst.submit(url, body);
    }
}
const restApiInst = new MainSubmit(new RestApi());
const graphQlInst = new MainSubmit(new GraphQl());
// restApiInst
//   .getData("https://jsonplaceholder.typicode.com/todos/1")
//   .then((data) => console.log(data));
// graphQlInst
//   .getData("https://jsonplaceholder.typicode.com/posts", { name: "testName" })
//   .then((data) => console.log(data));
// TODO-facade pattern
class Notify {
    send(template, to) {
        console.log(`Send ${template} ${to}`);
    }
}
class LogP {
    log(message) {
        console.log(message);
    }
}
class Template {
    constructor() {
        this.templates = [{ name: "other", template: `<h1>Template</h1>` }];
    }
    getByNAme(name) {
        return this.templates.find((elem) => elem.name === name);
    }
}
class NotificationFacade {
    constructor() {
        this.notify = new Notify();
        this.template = new Template();
        this.logP = new LogP();
    }
    send(to, templateName) {
        const data = this.template.getByNAme(templateName);
        if (!data) {
            this.logP.log(`No ${templateName}`);
            return;
        }
        this.notify.send(data.template, to);
        this.logP.log(`${templateName} send`);
    }
}
const res3 = new NotificationFacade();
res3.send("some@qwerty.ua", "other");
// ------------------------
class SendData {
    sending(name, age) {
        console.log(name, age);
    }
}
class LogData {
    logging(v) {
        console.log(v);
    }
}
class FindData {
    constructor() {
        this.bd = [{ name: "Qubiq", age: 654 }];
    }
    findMessage(name) {
        const res = this.bd.find((elem) => elem.name === name);
        return res;
    }
}
class SendService {
    constructor() {
        this.findData = new FindData();
        this.logData = new LogData();
        this.sendData = new SendData();
    }
    send(name) {
        const res = this.findData.findMessage(name);
        if (!res) {
            this.logData.logging(`No this ${name}`);
            return;
        }
        this.sendData.sending(res.name, res.age);
        this.logData.logging(`Sended ${res.name}`);
    }
}
const sendRes = new SendService();
sendRes.send("Qubiq");
// message
class SendMessage {
    sendMessage(value) {
        console.log(`Send ${value} message`);
    }
}
// log
class LoggingMessage {
    logging(value) {
        console.log(value);
    }
}
// find
class FindedMessage {
    constructor() {
        this.DB = [{ name: "Qubiq", age: 3 }];
    }
    findedMessage(value) {
        return this.DB.find((elem) => elem.name === value);
    }
}
class MainService {
    constructor() {
        this.findedContract = new FindedMessage();
        this.loggingMessage = new LoggingMessage();
        this.sendMessage = new SendMessage();
    }
    send(val) {
        const res = this.findedContract.findedMessage(val);
        if (res) {
            this.sendMessage.sendMessage(res);
            this.loggingMessage.logging(`Sended ${res.name} ${res.age}`);
        }
        else {
            this.loggingMessage.logging(`${val} doesent finded`);
            return;
        }
    }
}
const sendedRes = new MainService();
sendedRes.send("Qubiq");
// TODO--adapter pattern
class KVDataBase {
    constructor() {
        this.db = new Map();
    }
    save(key, value) {
        this.db.set(key, value);
    }
}
class PersistentDB {
    savePersistent(data) {
        console.log(data);
    }
}
class PersistentDBAdapter extends KVDataBase {
    constructor(instance) {
        super();
        this.instance = instance;
    }
    save(key, value) {
        this.instance.savePersistent({ key, value });
    }
}
function run(base) {
    base.save("key", "walue");
}
run(new PersistentDBAdapter(new PersistentDB()));
// const persistentresult = new PersistentDBAdapter(new PersistentDB());
// persistentresult.save("keyTest", "some text");
// ---------------------------------------------------
class OldPaymentSystem {
    constructor() {
        this.oldDB = new Map();
    }
    pay(key, data) {
        this.oldDB.set(key, data);
        console.log(this.oldDB.get(key));
    }
}
class NewPaymentSystem {
    constructor() {
        this.newDB = { key: "", data: "" };
    }
    processPayment(key, data) {
        this.newDB.key = key;
        this.newDB.data = data;
        console.log(`New DB: ${this.newDB.key} ${this.newDB.data}`);
    }
}
class NewPaymentSystemAdater extends OldPaymentSystem {
    constructor(instance) {
        super();
        this.instance = instance;
    }
    pay(key, data) {
        this.instance.processPayment(key, data);
    }
}
function clientService(key, data, system) {
    system.pay(key, data);
}
const newInterface = new NewPaymentSystemAdater(new NewPaymentSystem());
clientService("SOMEKEY", "SOMEDATA", newInterface);
class PaimentApi {
    constructor() {
        this.data = [{ id: 1, sum: 1000 }];
    }
    getPaymentDatail(id) {
        return this.data.find((elem) => elem.id === id);
    }
}
class PaimentAccessProxy {
    constructor(api, userId) {
        this.api = api;
        this.userId = userId;
    }
    getPaymentData(id) {
        if (this.userId === 1) {
            return this.api.getPaymentDatail(id);
        }
        console.log("Access denied");
        return undefined;
    }
}
const pay1 = new PaimentAccessProxy(new PaimentApi(), 1);
console.log(pay1.getPaymentData(1));
//TODO-- composite pattern
class DeliveryItem {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
}
class DeliveryShop extends DeliveryItem {
    constructor(deliveryFee) {
        super();
        this.deliveryFee = deliveryFee;
    }
    getPrice() {
        return this.items.reduce((acc, curr) => {
            return (acc += curr.getPrice() + this.deliveryFee);
        }, 0);
    }
}
class Packsge extends DeliveryItem {
    getPrice() {
        return this.items.reduce((acc, curr) => {
            return (acc += curr.getPrice());
        }, 0);
    }
}
class ProductProd extends DeliveryItem {
    constructor(price) {
        super();
        this.price = price;
    }
    getPrice() {
        return this.price;
    }
}
const test1 = new DeliveryShop(10);
test1.addItem(new ProductProd(12));
console.log(test1.getPrice());
const pack1 = new Packsge();
pack1.addItem(new ProductProd(200));
console.log(pack1.getPrice());
// ---------------------
class ItemsDelivery {
    constructor() {
        this.items = [];
    }
    setItems(val) {
        this.items.push(val);
    }
}
class DeliveryProducts extends ItemsDelivery {
    constructor(fee = 0) {
        super();
        this.fee = fee;
    }
    getPrice() {
        return (this.items.reduce((acc, curr) => {
            return (acc += curr.getPrice());
        }, 0) + this.fee);
    }
}
class PackageProduct extends ItemsDelivery {
    constructor(price = 0) {
        super();
        this.price = price;
    }
    getPrice() {
        return this.items.reduce((acc, cur) => {
            return (acc += cur.getPrice() + this.price);
        }, 0);
    }
}
class SingleProduct extends ItemsDelivery {
    constructor(price = 0) {
        super();
        this.price = price;
    }
    getPrice() {
        return this.price;
    }
}
const singleProduct1 = new SingleProduct(500);
const singleProduct2 = new SingleProduct(510);
const packageProduct = new PackageProduct(100);
const deliveryProducts = new DeliveryProducts(20);
packageProduct.setItems(singleProduct1);
deliveryProducts.setItems(packageProduct);
deliveryProducts.setItems(singleProduct2);
console.log("!!!", deliveryProducts.getPrice());
