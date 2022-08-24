var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        const originDescriptors = descriptor.value;
        const name = originDescriptors.name;
        console.log('22222');
        descriptor.value = async function (...args) {
            console.log('33333');
            await originDescriptors.apply(target, [...args]);
            console.log("fn", originDescriptors);
        };
        Object.defineProperties(descriptor.value, { ...originDescriptors });
        return descriptor;
    };
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log('11111');
        const originDescriptors = descriptor.value;
        const originFunctionProps = Object.getOwnPropertyDescriptors(originDescriptors);
        const name = originDescriptors.name;
        debugger;
        descriptor.value = async function (...args) {
            console.log('44444');
            await originDescriptors.apply(target, [...args]);
            console.log("originDescriptors", originDescriptors);
        };
        Object.defineProperties(descriptor.value, { ...originFunctionProps });
        return descriptor;
    };
}
class C {
    async method() {
        console.log("method start");
        await new Promise((resolve, reject) => {
            setTimeout(function () {
                console.log("await exec");
                resolve(1);
            }, 1000);
        });
    }
}
__decorate([
    f(),
    g(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], C.prototype, "method", null);
const c = new C();
c.method();
// 输出顺序
// f(): evaluated
// g(): evaluated
// 11111
// 22222
// 33333
// 44444
// method start
// await exec
// originDescriptors...
// fn ...
//# sourceMappingURL=test.js.map