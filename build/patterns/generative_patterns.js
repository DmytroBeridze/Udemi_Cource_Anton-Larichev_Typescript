"use strict";
//TODO--- factory pattern
class TFInsurance {
    setVehicle(veh) {
        this.vehicle = veh;
    }
    async submit() {
        const res = await fetch("ab", {
            method: "POST",
            body: JSON.stringify({ vehicle: this.vehicle }),
        });
        const data = await res.json();
        return data.isSuccess;
    }
}
class ABInsurance {
    setVehicle(veh) {
        this.veihicle = veh;
    }
    async submit() {
        const res = await fetch("bc", {
            method: "POST",
            body: JSON.stringify({ vehicle: this.veihicle }),
        });
        const data = await res.json();
        return data.yes;
    }
}
class InsuranceFactory {
    saveHistory(ins) {
        this.db.save(ins.id, ins.status);
    }
}
class TFInsuranceFactory extends InsuranceFactory {
    createInsur() {
        return new TFInsurance();
    }
}
class ABInsuranceFactory extends InsuranceFactory {
    createInsur() {
        return new ABInsurance();
    }
}
const tFInsuranceFactory = new TFInsuranceFactory();
const ins = tFInsuranceFactory.createInsur();
// TODO singleton--------------------------------
class MyMap {
    constructor() {
        this.map = new Map();
    }
    static get() {
        if (!MyMap.inst) {
            MyMap.inst = new MyMap();
        }
        return MyMap.inst;
    }
}
class Serv1 {
    addM(key, value) {
        const MapNew = MyMap.get();
        MapNew.map.set(key, value);
    }
}
const restYY = new Serv1();
// console.log(restYY.addM);
// --------------------------------
class Singleton {
    constructor() {
        this.map = new Map();
    }
    static createSingleton() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
class Single1 {
    mapSet(key, data) {
        Singleton.createSingleton().map.set(key, data);
    }
}
class Single2 {
    mapGet(key) {
        return Singleton.createSingleton().map.get(key);
    }
}
const single1 = new Single1();
single1.mapSet("Dimon", 45);
const single2 = new Single2();
console.log(single2.mapGet("Dimon"));
class PrototypeClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    createPrototype() {
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
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["Png"] = "png";
    ImageFormat["Jpeg"] = "jpeg";
})(ImageFormat || (ImageFormat = {}));
class ImageBuilder {
    constructor() {
        this.formats = [];
        this.resolution = [];
    }
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
    addResolution(width, height) {
        this.resolution.push({ width, height });
        return this;
    }
    build() {
        const res = [];
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
console.log(resultImages
    .addJpg()
    .addPng()
    .addResolution(45, 20)
    .addResolution(100, 200)
    .build());
// ----------------------------------
