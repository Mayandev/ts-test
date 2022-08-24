function f() {
  console.log("f(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {



    const originDescriptors = descriptor.value;
    const name = originDescriptors.name;
    console.log('22222');
    descriptor.value = async function (...args: unknown[]) {
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
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('11111');
    const originDescriptors = descriptor.value;
    const originFunctionProps =
      Object.getOwnPropertyDescriptors(originDescriptors);
    const name = originDescriptors.name;
    debugger;
    descriptor.value = async function (...args: unknown[]) {
      console.log('44444');
      
      await originDescriptors.apply(target, [...args]);
      console.log("originDescriptors", originDescriptors);
    };
    Object.defineProperties(descriptor.value, { ...originFunctionProps });

    return descriptor;
  };
}

class C {
  @f()
  @g()
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