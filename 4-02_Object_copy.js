"use strict";

let message = "hello!";
let phrase = message;
//각각의 독립된 변수에 값을 할당하면 각각의 변수에 문자열이 할당된다

let user1 = {
    name: "john"
};
//하지만 "john"이라는 데이터는 메모리 어딘가에 저장하고, user1 이라는 서랍에 name이라는 "john"이라는 값을 찾을수있는(참조)값을 저장하는 형식
let admin = user1; //admin이라는 서랍을 새로만들었는데, 이는 user1과 같은 형태를 가지는 서랍

admin.name = 'Pete' //user1과 같은 서랍이므로 참조값을 수정할 수 있음

alert(user1.name) //pete가 출력

//객채비교시에도 ==와 ===는 동일하게 동작한다. 피연산자가 되는 두 객체가 동일한 객체인 경우에 참을 반환

let a = {};
let b = a;

alert(a==b);    //true
alert(a===b);   //true

let c = {};

alert(a==c);    //false 서랍a와 c는 서로 다르다!

/*
객체 내용정리(중요)
let A = B일때
B.num = 1 이라 선언하면 A는 어떻게될까?
-> 일단 B.num = 1이라는 말은 B가 가리키고있는 값의 .num을 1로 바꾼다는 말이다.
이떄, let A = B라는 선언으로인해 A도 그 값을 동일하게 가르키게되므로, A.num = 1이 된다.
이러한 상자(겉) 단위에서 복사하는것을 shallow copy(얕은 복사)라 한다.

반대로, A라는 상자에 num2=x... 등의 다른값을 할당해야해서 상자 단위에서 복사하지 않고, 상자속의 값만 복사할때가 있다.
이때는 let A로 A를 별도의 상자로써 선언하고, A.num = B.num 처럼 상자속의 값만 같게 가져가게해야한다.
이렇게 상자속 단위에서 복사하는 것을 Deep copy(깊은 복사)라 한다.


1뎁스는 깊이가 한개의 상자단위를 의미하며,
n뎁스는 상자가 n중으로 되어있는 구조를 의미한다.
ex) 아래는 A상자속에 a라는 상자가 들어있는 2뎁스 상태이다.
let A = {
    a : {
    (내용)
    }
}

깊은복사로직은 직접구현하기보다 라이브러리를 응용하는편인데, 1뎁스정도는 for문으로 해결되지만
2뎁스이상으로 깊어질수록 재귀식으로 들어가서 복사해야하기에 복잡해지기 때문이다.
*/



//객체 복사, 병합, object.assign

//객체 내용을 복사해본다
let user2 = {
    name: "John",
    age: 30
  };

let clone = {};    //새로운 빈객체를 선언
for (let key in user2) {    //user2의 key값을 하나씩 불러와서 클론 객체에 복사해넣음 -> deep copy
    clone[key] = user2[key];
}

clone.name = 'pete' //복사한 객체의 내용일부를 바꿨음.
alert(user2.name) // john이 출력됨. 원본은 내용이 바뀌지 않음.

//Object.assign(dest(목표로하는 객체), [src1(복사하고자 하는 객체), src2, src3...])을 사용할 수도있음. for문을 안써도되서 간편!
//(단, 이때 붙여넣는객체에 동일한 key이름을 가지는 프로퍼티가 존재할 시, 기존값에 복사해넣는 값이 덮어씌워짐)

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

Object.assign(user2, permissions1,permissions2);

for (let key in user2) {
    alert(key)
    alert(user2[key])
}   //name-john/age-30/canview-true/canedit-true 가 출력된다.


let user3 = {
    name: "John",
    sizes: {        //2뎁스
      height: 182,
      width: 50
    }
  };

//clone2.sizes = user3.sizes의 프로퍼티 복사방식은 객체단위까지 복사할 수가 없음. user3.size는 객체이기에 참조값이 복사되기 때문.
//clone2.sizes = user3.sizes 방식으로 프로퍼티 복사시 아래처럼 된다.

let clone2 = Object.assign({}, user3);

alert( user3.sizes === clone2.sizes ); // true, 같은 객체입니다.

// user와 clone는 sizes를 공유합니다.
user3.sizes.width++;       // 한 객체에서 프로퍼티를 변경합니다.
alert(clone2.sizes.width); // 51, 다른 객체에서 변경 사항을 확인할 수 있습니다. -> 완전히 다른 별개의 객체가 되지 않음.

//그렇기에 이러한 문제를 해결하려면 user[key]의 각 값을 검사하면서 객체일때, 객체의 구조도 복사해주는 반복문을 써야하는데,
//자바스크립트 라이브러리 lodash의 메서드인 _.cloneDeep(obj)을 사용하면 깊은 복사 시 사용되는 표준 알고리즘인 Structured cloning algorithm을 구현하지 않고도 복사가능

