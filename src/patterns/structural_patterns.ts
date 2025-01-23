// TODO--Bridge pattern

interface IProvider {
  sendMessage(message: string): void;
  connect(config: string): void;
  disConnect(): void;
}

class TelegrammProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message);
  }
  connect(config: string): void {
    console.log(config);
  }
  disConnect(): void {
    console.log("disconnect-Telegramm");
  }
}
class WatsUpProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message);
  }
  connect(config: string): void {
    console.log(config);
  }
  disConnect(): void {
    console.log("disconnect-WatsUp");
  }
}

class NotificationSender {
  constructor(private provider: IProvider) {}

  send() {
    this.provider.connect("Connect");
    this.provider.sendMessage("Send message");
    this.provider.disConnect();
  }
}

// отложенный вызов
class DelayNotificdtionSender extends NotificationSender {
  constructor(provider: IProvider) {
    super(provider);
  }

  sendDalayed() {}
}
const sender1 = new NotificationSender(new TelegrammProvider());
sender1.send();
const sender2 = new NotificationSender(new WatsUpProvider());
sender2.send();

// --------------------------------
interface GeneralContract {
  power: boolean;
  level: number;

  getPower(): string;
  getLevel(): string;

  setPover(val: boolean): void;
  setLevel(val: number): void;
}

// TV
class TV implements GeneralContract {
  power: boolean = false;
  level: number = 0;

  getPower(): string {
    return `Tv pover is:${this.power} `;
  }
  getLevel(): string {
    return `Tv level is:${this.level} `;
  }
  setPover(val: boolean): void {
    this.power = val;
  }
  setLevel(val: number): void {
    this.level = val;
  }
}

// Radio
class Radio implements GeneralContract {
  power: boolean = false;
  level: number = 0;

  getPower(): string {
    return `Radio pover is:${this.power} `;
  }
  getLevel(): string {
    return `Radio level is:${this.level} `;
  }
  setPover(val: boolean): void {
    this.power = val;
  }
  setLevel(val: number): void {
    this.level = val;
  }
}

class GeneralClass {
  constructor(private inst: GeneralContract) {}

  getMasterVolume() {
    return this.inst.getLevel();
  }
  getMasterPover() {
    return this.inst.getPower();
  }

  setMasterVolume(v: number) {
    return this.inst.setLevel(v);
  }

  setMasterPover(v: boolean) {
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

// -----------------------------
interface MasterSubmit {
  submit(url: string, body?: any): Promise<any>;
}

class RestApi implements MasterSubmit {
  async submit(url: string): Promise<any> {
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  }
}

class GraphQl implements MasterSubmit {
  async submit(url: string, body: any) {
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
  constructor(private inst: MasterSubmit) {}
  getData(url: string, body?: any) {
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
  send(template: string, to: string) {
    console.log(`Send ${template} ${to}`);
  }
}

class LogP {
  log(message: string) {
    console.log(message);
  }
}

class Template {
  private templates = [{ name: "other", template: `<h1>Template</h1>` }];

  getByNAme(name: string) {
    return this.templates.find((elem) => elem.name === name);
  }
}

class NotificationFacade {
  private notify: Notify;
  private logP: LogP;
  private template: Template;
  constructor() {
    this.notify = new Notify();
    this.template = new Template();
    this.logP = new LogP();
  }

  send(to: string, templateName: string) {
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
  sending(name: string, age: number) {
    console.log(name, age);
  }
}

class LogData {
  logging(v: string) {
    console.log(v);
  }
}

class FindData {
  private bd = [{ name: "Qubiq", age: 654 }];

  findMessage(name: string) {
    const res = this.bd.find((elem) => elem.name === name);
    return res;
  }
}

class SendService {
  private sendData: SendData;
  private logData: LogData;
  private findData: FindData;

  constructor() {
    this.findData = new FindData();
    this.logData = new LogData();
    this.sendData = new SendData();
  }

  send(name: string) {
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

// ---------------
type SendMessType = {
  name: string;
  age: number;
};

interface SendMessageContract {
  sendMessage(value: SendMessType): void;
}

interface LoggingMessageContract {
  logging(value: string): void;
}

interface FindedContract {
  DB: SendMessType[];
  findedMessage(value: string): SendMessType | undefined;
}
// message
class SendMessage implements SendMessageContract {
  sendMessage(value: SendMessType): void {
    console.log(`Send ${value} message`);
  }
}
// log
class LoggingMessage implements LoggingMessageContract {
  logging(value: string): void {
    console.log(value);
  }
}
// find
class FindedMessage implements FindedContract {
  DB: SendMessType[] = [{ name: "Qubiq", age: 3 }];

  findedMessage(value: string): SendMessType | undefined {
    return this.DB.find((elem) => elem.name === value);
  }
}

class MainService {
  sendMessage: SendMessageContract;
  loggingMessage: LoggingMessageContract;
  findedContract: FindedContract;

  constructor() {
    this.findedContract = new FindedMessage();
    this.loggingMessage = new LoggingMessage();
    this.sendMessage = new SendMessage();
  }

  send(val: string) {
    const res = this.findedContract.findedMessage(val);
    if (res) {
      this.sendMessage.sendMessage(res);
      this.loggingMessage.logging(`Sended ${res.name} ${res.age}`);
    } else {
      this.loggingMessage.logging(`${val} doesent finded`);
      return;
    }
  }
}

const sendedRes = new MainService();
sendedRes.send("Qubiq");

// TODO--adapter pattern
class KVDataBase {
  private db: Map<string, string> = new Map();

  save(key: string, value: string) {
    this.db.set(key, value);
  }
}

class PersistentDB {
  savePersistent(data: { key: string; value: string }) {
    console.log(data);
  }
}

class PersistentDBAdapter extends KVDataBase {
  constructor(public instance: PersistentDB) {
    super();
  }

  override save(key: string, value: string): void {
    this.instance.savePersistent({ key, value });
  }
}

function run(base: KVDataBase) {
  base.save("key", "walue");
}
run(new PersistentDBAdapter(new PersistentDB()));

// const persistentresult = new PersistentDBAdapter(new PersistentDB());
// persistentresult.save("keyTest", "some text");

// ---------------------------------------------------

class OldPaymentSystem {
  oldDB: Map<string, string> = new Map();

  pay(key: string, data: string) {
    this.oldDB.set(key, data);
    console.log(this.oldDB.get(key));
  }
}
type NewDB = { key: string; data: string };

class NewPaymentSystem {
  newDB: NewDB = { key: "", data: "" };
  processPayment(key: string, data: string) {
    this.newDB.key = key;
    this.newDB.data = data;
    console.log(`New DB: ${this.newDB.key} ${this.newDB.data}`);
  }
}

class NewPaymentSystemAdater extends OldPaymentSystem {
  constructor(public instance: NewPaymentSystem) {
    super();
  }
  override pay(key: string, data: string): void {
    this.instance.processPayment(key, data);
  }
}

function clientService(key: string, data: string, system: OldPaymentSystem) {
  system.pay(key, data);
}
const newInterface = new NewPaymentSystemAdater(new NewPaymentSystem());
clientService("SOMEKEY", "SOMEDATA", newInterface);

// TODO --proxy pattern

interface PaimentApiContract {
  getPaymentDatail(id: number): void;
}

interface PaimentAccessProxyContract {
  getPaymentData(id: number): TypeData | undefined;
}

type TypeData = { id: number; sum: number };

class PaimentApi implements PaimentApiContract {
  data: TypeData[] = [{ id: 1, sum: 1000 }];

  getPaymentDatail(id: number) {
    return this.data.find((elem) => elem.id === id);
  }
}

class PaimentAccessProxy implements PaimentAccessProxyContract {
  constructor(private api: PaimentApi, public userId: number) {}
  getPaymentData(id: number) {
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

abstract class DeliveryItem {
  items: DeliveryItem[] = [];

  addItem(item: DeliveryItem) {
    this.items.push(item);
  }

  abstract getPrice(): number;
}

class DeliveryShop extends DeliveryItem {
  constructor(private deliveryFee: number) {
    super();
  }

  getPrice(): number {
    return this.items.reduce((acc, curr) => {
      return (acc += curr.getPrice() + this.deliveryFee);
    }, 0);
  }
}

class Packsge extends DeliveryItem {
  getPrice(): number {
    return this.items.reduce((acc, curr) => {
      return (acc += curr.getPrice());
    }, 0);
  }
}

class ProductProd extends DeliveryItem {
  constructor(private price: number) {
    super();
  }

  getPrice(): number {
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

abstract class ItemsDelivery {
  items: ItemsDelivery[] = [];

  setItems(val: ItemsDelivery) {
    this.items.push(val);
  }

  abstract getPrice(): number;
}

class DeliveryProducts extends ItemsDelivery {
  constructor(private fee: number = 0) {
    super();
  }

  getPrice(): number {
    return (
      this.items.reduce((acc, curr) => {
        return (acc += curr.getPrice());
      }, 0) + this.fee
    );
  }
}

class PackageProduct extends ItemsDelivery {
  constructor(private price: number = 0) {
    super();
  }

  getPrice(): number {
    return this.items.reduce((acc, cur) => {
      return (acc += cur.getPrice() + this.price);
    }, 0);
  }
}

class SingleProduct extends ItemsDelivery {
  constructor(private price: number = 0) {
    super();
  }

  getPrice(): number {
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
