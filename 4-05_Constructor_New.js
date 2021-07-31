//유사한 객체 여러개를 만들어야 할 때, new와 생성자 함수를 사용한다

//생성자 함수의 이름 첫글자는 대문자로 하며, 반드시 new 연산자를 붙여서 사용해야함

function User(name) {
  //this = {}라는 빈객체가 암시적으로 생성
  this.name = name;
  this.isAdmin = false;
  //return this; this라는 생성된 객체가 암시적으로 반환
}

let user = new User("보라");
//빈객체를 만들어서 this에 할당한다 => 함수본문을 실행하여 this에 할당된 객체에 새로운 프로퍼티를 추가하여 이 객체를 수정함 => this를 반환

console.log(user.name); //보라
console.log(user.isAdmin); //false

// let user = new (function (/* 받는 값 */) {
//   /* 내용 */
// })();
//이러한 생성자 함수는 익명함수이기 때문에 재사용이 불가능 => 대신 코드를 캡슐화하여 간단하게 만드는용도

//------------------ target

//target함수는 생성자 함수가 new와 함께 사용되었는지, 그렇지 않은지를 확인할 수 있는 함수이다

function User1() {
  console.log(new.target);
}

User1(); //undefined => new를 사용하여 생성자 함수를 호출하지않으면 값이 지정된것이 없기에 이러한 값을 반환

new User1(); // f User() {...} => 새로운 암시적 객체를 생성하는 생성자 함수로써 User1이 사용되었기에, 생성자 함수 자체를 반환함
//+ 이와같이 들어가는 인수가없다면 new User; 로 괄호를 생략할 수 있지만, 추천하지는 않는다

//------------------ 생성자 함수에 return이 있다면?

//생성자 함수에는 보통 return이 없다 (this에 객체가 자동으로 저장되고, 또한 반환되기 때문)

//하지만 있을경우에는 다음의 규칙을따름
// 1. return 객체; => this대신 객체가 반환된다
// 2. return 원시형; => return문이 무시된다

function BigUser() {
  this.name = "원숭이";

  return { name: "고릴라" }; // <-- this가 아닌 새로운 객체를 반환함
}

console.log(new BigUser().name); // 고릴라

function SmallUser() {
  this.name = "원숭이";

  return; // <-- this를 반환함
}

console.log(new SmallUser().name); // 원숭이

//===============과제

//Q1. new A() == new B()인 함수를 만들 수 있을까? => 있다. 외부에서 선언한 임의의 객체를 동일하게 return하게끔 하면된다.

let obj = {};

function A() {
  return obj;
}
function B() {
  return obj;
}

let a = new A();
let b = new B();

console.log(a == b); // true를  반환하도록 A,B를 만들 수 있을까?

//Q2. 계산기 만들기.

function Calculator() {
  this.read = function () {
    this.first = +prompt("첫번째값을 입력하세요", 0); //prompt앞에 +를 붙임으로써 문자열 상태로 입력된 값을 숫자로써 인식하게 한다.
    this.second = +prompt("두번째값을 입력하세요", 0);
  };

  this.sum = function () {
    return this.first + this.second;
  };
  this.mul = function () {
    return this.first * this.second;
  };
}

let calculator = new Calculator();
calculator.read();

alert("합은" + calculator.sum());
alert("곱은" + calculator.mul());

//Q3. 누산기 만들기

function Accumulator(firstValue) {
  this.value = firstValue;

  this.read = function () {
    this.value += +prompt("값을 입력해라", 0);
  };
}

let accumulator = new Accumulator(1);

accumulator.read();
accumulator.read();

alert(accumulator.value);
