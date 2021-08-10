//객체를 원시형으로 변환

//객체끼리 더하거나 빼는등의 연산을 할때, 또는 alert등으로 출력할때 객체는 원시형으로 자동 형 변환이 이루어진 후에 연산을 수행하게 된다

//객체의 형변환시
// 1. 객체는 무조건 boolean값으로 true에 해당한다 => 그렇기에 객체는 숫자/문자형으로만 형변환이 이루어진다
// 2. 객체 => 숫자형 으로의 변환은 객체끼리 빼는등의 수학적 연산을 할때에 일어남
// 3. 객체 => 문자형 으로의 변환은 alert와 같이, 출력을 하려고할때 일어남

//객체형 변환은 string, number, default 세종류로 구분된다. 이때 구분하기 위해서 'hint'라는값(목표하는 자료형)이 구분기준값이된다

let obj = {
  name: "jone",
  age: 39,
  money: 10,
};

console.log(obj); // 이때는 hint가 string이 된다
console.log(obj.age + 1); // 이때는 hint가 number가 된다

console.log(obj.money + "$");
console.log(obj.money + 10);

console.log("=".repeat(10));

//이런식으로 10에 문자열 $를 붙여서 10달러라는 의미를 부여할지, +10을해서 20이라는 수치가 될지 확실치 않은경우가 있음
//이때는 hint가 default가 된다
//또한 == 연산자를 이용하여 객체-문자형, 객체-숫자형, 객체-심볼형 끼리 비교할때도 default가 된다

//js에서 객체의 형변환이 필요할때 다음의 과정을 통해서 필요한 메서드를 찾아 호출함
// 1. 객체에 obj[Symbol.toPrimitive](hint) 메서드가 있다면 이를 호출
// 2. 1에 해당하지 않고 hint가 "string"일시 => obj.toString() or obj.valueOf() 호출
// 3. 1,2에 해당하지 않고 hint가 "number" or "default" => obj.valueOf() or obj.toString() 호출

let objPre = {
  name: "john",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  },
};

// alert(objPre); //alert는 기본적으로 문자형으로 취급하기때문에 hint: string, john으로 나오는것이 맞다
// console.log(objPre);는 hint 출력없이 객체 전체 내부를 출력한다
console.log(`${objPre}`); //hint: string, {name: "john"}이 출력된다
console.log(+objPre); //hint: number, 1000이 출력
console.log(objPre + 500); //hint: default, 1500이 출력

//toString, valueOf는 반드시 원시값만을 반환해야함. 객체등을 반환하게하면 그냥 없는것처럼 행동함
//toString은 문자열 "[object Object]"를 반환함
//valueOf는 자기자신을 반환함

let objTest = {
  name: "john",
};

console.log(`${objTest}`); // [object Object] => alert(objtest)와 동일한 결과
console.log(objTest.valueOf() === objTest); // true => 자기자신을 그대로 반환한다는 증거

let objTest2 = {
  name: "john",
  money: 1000,

  // hint가 "string"인 경우
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint가 "number"나 "default"인 경우
  valueOf() {
    return this.money;
  },
};

console.log(`${objTest2}`);
console.log(+objTest2);
console.log(objTest2 + 500); //이 3값은 위의 objPre떄와 동일한 결과를 출력함

let objTest3 = {
  name: "john",

  toString() {
    return this.name;
  },
};

console.log(`${objTest3}`); //john
console.log(objTest3 + 500); //john500 => valueOf가 없기에 toString이 모든것을 처리함

// string/number/default 이 세가지 hint는 무조건 각각에 명시된 대로 출력된다고 보장하지는 않지만, 최소한 원시값을 반환한다는것은 보장함

let obj2 = {
  // 다른 메서드가 없으면 toString에서 모든 형 변환을 처리합니다.
  toString() {
    return "2";
  },
};

console.log(`${obj2}` * 2); // 4 => 일단 obj에서 "2"로 출력하지만, *연산을 위해서는 숫자형으로 바꿔야하므로, 2로 바꿔서 2*2연산을 수행한 4가 출력
console.log(`${obj2}` + 2); // 22 => 하지만 덧셈은 문자열간 연산도 지원하기때문에 "2"를 숫자2로 바꾸지않고, 뒤의 숫자열 2를 문자로 바꿔서 "22"로 출력
