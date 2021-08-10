//js는 객체 프로퍼티 키로 문자형, 심볼형만을 사용함
//심볼형은 원시형 데이터로써, 다음과 같이 만들 수 있음

let id = Symbol("이 심볼은 id를 의미"); //id라는 심볼에 대한 설명을 달 수 있음

//심볼형은 html,css의 id처럼 유일성을 보장받는 자료형이기에, 동일한 이름을 붙여도 실제 각 심볼값은 다름
//그렇기에 심볼에 붙이는 설명은 어떤것에도 영향을 주지않는 그냥 "이름표"역할만 한다

let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 == id2); //false

//주의! 심볼은 JS의 특징인, 암시적 형변환이 일어나지 않음. 그렇기에 alert에서 symbol을 문자형처럼 호출할경우 error를 발생함

let testId = Symbol("TEST_ID");
// alert(testId); // TypeError: Cannot convert a Symbol value to a string
//굳이 alert로 호출해야할 상황이라면 toString()을 사용해서 문자형으로 명시한 후 alert출력을 해야함
// alert(testId.toString());
// alert(testId.description); //"TEST_ID" 이렇게 하면 testId라는 심볼에 대한 설명이 출력된다

//심볼을 이용하면 서드파티 코드의 객체의 유일성을 보존하면서 객체에 데이터를 추가할 수 있음

let user = {
  //서드파티 코드에서 가져왔다고 가정
  name: "john",
};

let id3 = Symbol("id");

user[id3] = 1;

console.log(user); //{ name: 'john', [Symbol(id)]: 1 }
console.log(user[id3]); // 1

//이렇게 하는 이유는 user라는 객체를 다른곳에서 가져왔는데,
//이 객체에 그냥 user.id3 = 1라고 값을 등록해버리면 그쪽에서 user.id3에 다른값이 있었다고 하면 덮어씌워져 버리기 때문
//그래서 symbol을 이용해서 객체를 만들면, 이는 유일성이 보장되기때문에 서드파티에서 해당 객체를 사용할때에도 덮어씌워지는등으로 인해 값이 변경되지 않게된다

let id4 = Symbol("id4");
user[id4] = "제3 스크립트 id값";
console.log(user); //{ name: 'john', [Symbol(id)]: 1, [Symbol(id4)]: '제3 스크립트 id값' }

//또한 객체 리터럴 {...}을 사용해서 객체를 만든경우, 대괄호를 사용해서 심볼형 키를 만들어줘야함

let id5 = Symbol("id5");

let user1 = {
  name: "john",
  age: 29,
  [id5]: 123, //심볼형 키값. "id5":123은 안된다는것을 명심
};

//또한 심볼key값을 통해 만들어진 객체 프로퍼티는 for..in 반복문으로 접근할 수 없음

for (let key in user1) console.log(key); //name, age 출력 => [id5]는 출력되지않음
console.log(user1[id5]); //123; 하지만 이렇게 직접 출력하면 잘 나옴

let cloneUser1 = Object.assign({}, user1); //user1객체를 그대로 복사함
console.log("user1과 cloneUser1는 같은가?", user1 == cloneUser1); //false;
console.log(cloneUser1); //{ name: 'john', age: 29, [Symbol(id5)]: 123 } => Object.assign으로 user1객체를 복사할경우 symbol까지 복사된다.

//기본적으로 심볼은 유일성을 지키기때문에, 이름이 같더라도 별개로 취급된다
//하지만, 한 심볼 프로퍼티를 여러곳에서 접근해야할때가 있는데, 이때는 전역 심볼 레지스트리를 이용함. 이를 사용하면 이름이 같을때 동일한 심볼을 반환함

let globalId = Symbol.for("전역 심볼 레지스트리"); //[id6]라는 심볼이 없다면 새로 추가함
let otherGlobalId = Symbol.for("전역 심볼 레지스트리"); //[id6]와 같은것을 가르키게됨

console.log(globalId === otherGlobalId); //true;

let sym = Symbol.for("SYM");
let sym1 = Symbol.for("SYM1");
let sym2 = Symbol("im not Global Symbol"); //전역심볼이 아니기때문에 description값이 항상 존재함

console.log(Symbol.keyFor(sym)); //전역에서 sym의 이름표인 SYM을 가져온다
console.log(Symbol.keyFor(sym2)); //sym2는 전역 심볼이 아니기때문에 undefined를 반환한다
console.log(sym2.description); //description을 통해서 전역 심볼이 아닌 심볼의 이름표를 가져온다
