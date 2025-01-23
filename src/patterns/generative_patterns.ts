//TODO--- factory pattern

interface IInsurance {
  id: number;
  status: string;

  setVehicle(vehicle: any): void;
  submit(): Promise<boolean>;
}

class TFInsurance implements IInsurance {
  id: number;
  status: string;
  private vehicle: any;
  setVehicle(veh: any): void {
    this.vehicle = veh;
  }

  async submit(): Promise<boolean> {
    const res = await fetch("ab", {
      method: "POST",
      body: JSON.stringify({ vehicle: this.vehicle }),
    });
    const data = await res.json();
    return data.isSuccess;
  }
}
class ABInsurance implements IInsurance {
  id: number;
  status: string;
  private veihicle: any;
  setVehicle(veh: any): void {
    this.veihicle = veh;
  }

  async submit(): Promise<boolean> {
    const res = await fetch("bc", {
      method: "POST",
      body: JSON.stringify({ vehicle: this.veihicle }),
    });
    const data = await res.json();
    return data.yes;
  }
}

abstract class InsuranceFactory {
  db: any;
  abstract createInsur(): IInsurance;

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status);
  }
}

class TFInsuranceFactory extends InsuranceFactory {
  createInsur(): IInsurance {
    return new TFInsurance();
  }
}

class ABInsuranceFactory extends InsuranceFactory {
  createInsur(): IInsurance {
    return new ABInsurance();
  }
}

const tFInsuranceFactory = new TFInsuranceFactory();
const ins = tFInsuranceFactory.createInsur();

// TODO singleton--------------------------------
class MyMap {
  private static inst: MyMap;

  map: Map<number, string> = new Map();

  private constructor() {}

  public static get(): MyMap {
    if (!MyMap.inst) {
      MyMap.inst = new MyMap();
    }
    return MyMap.inst;
  }
}

class Serv1 {
  addM(key: number, value: string) {
    const MapNew = MyMap.get();
    MapNew.map.set(key, value);
  }
}

const restYY = new Serv1();
// console.log(restYY.addM);

// --------------------------------
class Singleton {
  private static instance: Singleton;
  map: Map<string, number> = new Map();

  private constructor() {}

  static createSingleton(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

class Single1 {
  mapSet(key: string, data: number) {
    Singleton.createSingleton().map.set(key, data);
  }
}

class Single2 {
  mapGet(key: string) {
    return Singleton.createSingleton().map.get(key);
  }
}
const single1 = new Single1();
single1.mapSet("Dimon", 45);

const single2 = new Single2();
console.log(single2.mapGet("Dimon"));

// TODO --Prototype pattern
interface PrototypePattern<T> {
  name: string;
  age: number;

  createPrototype(): T;
}

class PrototypeClass implements PrototypePattern<PrototypeClass> {
  constructor(public name: string, public age: number) {}

  createPrototype(): PrototypeClass {
    let target = new PrototypeClass(this.name, this.age);
    return target;
  }
}

const prot = new PrototypeClass("Dimon", 45);
const pr1 = prot.createPrototype();
const pr2 = prot.createPrototype();
console.log(pr1);
console.log(pr2);

// TODO Builder pattern--------------------------------

enum ImageFormat {
  Png = "png",
  Jpeg = "jpeg",
}
interface ImageResolution {
  width: number;
  height: number;
}

interface ImageConversion extends ImageResolution {
  format: ImageFormat;
}

class ImageBuilder {
  private formats: ImageFormat[] = [];
  private resolution: ImageResolution[] = [];

  addPng() {
    if (this.formats.includes(ImageFormat.Png)) {
      return this;
    }
    this.formats.push(ImageFormat.Png);
    return this;
  }
  addJpg() {
    if (this.formats.includes(ImageFormat.Jpeg)) {
      return this;
    }
    this.formats.push(ImageFormat.Jpeg);
    return this;
  }

  addResolution(width: number, height: number) {
    this.resolution.push({ width, height });
    return this;
  }

  build() {
    const res: any[] = [];
    for (const f of this.formats) {
      for (const r of this.resolution) {
        res.push({
          format: f,
          height: r.height,
          width: r.width,
        });
      }
    }
    return res;
  }
}

const resultImages = new ImageBuilder();
console.log(
  resultImages
    .addJpg()
    .addPng()
    .addResolution(45, 20)
    .addResolution(100, 200)
    .build()
);
// ----------------------------------
