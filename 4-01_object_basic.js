"use strict";

//자료형중에 객체형은 하나씩만 할당할 수 있는 다른 자료형과는 달리, 다양한 데이터를 담을 수 있음.

let user1 = new Object(); //객체 생성자 문법
let user2 = {};           //객체 리터럴 문법          -> 이 두가지가 빈 객체(서랍)을 만드는방법인데, 두번째를 주로사용한다.

let user = {
    hisName: "John",            // 프로퍼티가 key : value 쌍으로 저장된다. (마치 dict형태와 같다)
    hisAge: 30,
    "todays lunch" : 'gimbob',       // 키값이 복수의 단어로 만들어지는경우, 따옴표로 묶어줘야함.  +마지막 프로퍼티뒤에 ','을 달고 끝낼수도있음.
};

alert(user.hisName);
alert(user.hisAge);

user.isAdmin = true;        //이렇게 객체에 새로운 프로퍼티를 추가할 수도있음. 또한 자료형에 제한도없음
alert(user.isAdmin);

delete user.hisAge;
alert(user.hisAge);         //사라졌기에 Undefined가 출력된다.

const user3 = {
    hisName2: "John"
  };

user3.hisName2 = "Pete"; // (*) -> const라서 수정못할것같지만 그렇지않다! user자체는 고정하지만, 그내용은 고정하지않기때문.
  
alert(user3.hisName2); // Pete


// user.todays lunch = true -> 복수의 단어로 프로퍼티를 넣은경우에는 이런식으로 호출할 수 없음. 점을 이용한 호출은 숫자시작x, 공백x, $,_제외 특문 x이어야함
alert(user["todays lunch"]) //이런식으로 따옴표와 대괄호로 싸주어야함

let key = prompt("얻고자하는 사용자의 정보", "hisName");
alert(user[key]); //John이 출력된다. -> 대괄호식 표현시 [key] = ["hisName"]이므로 user["hisName"]을 사용하는것과 같은 효과를 가짐(33행)
alert(user.key);  //undefined가 출력된다. 이는 user에 "key"라는 이름의 프로퍼티값을 가져오려고했기때문.


/*1번
let fruit = prompt("뭐살래?","strawberry")
let bag = {
    [fruit]:5       //변수 fruit에서 프로퍼티 이름을 동적으로 가져옴.
}
alert(bag.strawberry) // 5가 출력됨
*/

//2번 -> 이방법이 더 깔끔함. 객체 리터럴 안의 프로퍼티키가 대괄호로 둘러싸여이있을때 '계산된 프로퍼티'라고 함.
let fruit = prompt("어떤 과일을 구매하시겠습니까?", "apple");
let bag = {};
bag[fruit] = 5;
alert(bag.apple);

let bag1 = {
    [fruit + 'computers'] : 5
};
alert(bag1.applecomputers)//5가 출력됨 fruit = 'apple'이므로 두 문자열의 합이 키가 되었음.


//단축 프로퍼티: 이름과 그 값이 변수의 이름과 동일할때, property value shorthand를 쓰면 더 짧게 줄일 수 있음. 이는 한 객채에서 일반프로퍼티와 혼합사용가능
function makeUser(name, age) {
    return {
      name: name,
      age: age,
    };
  }

function makeUser(name, age) {
  return {
    name, // name: name 과 같음
    age,  // age: age 와 같음
  };
}

//객체 프로퍼티의 key에는 for, let, return 등의 값을 사용할 수 있긴하다. 예시) let obj = { for:1 };
//또한 key에 숫자 0을 그냥 쓰면, 문자열"0"으로 자동변환되어 사용된다. 그리고 호출시 0으로쓰든, "0"으로쓰든 같은 값을 가져오기도함.

//하지만 특별히 대우받는 이름이 있음.
let obj = {};
obj.__proto__ = 5; // 숫자를 할당합니다.
alert(obj.__proto__); //[object Object] 가 출력된다, 숫자를 할당했지만 객체가 된 것이다.

//Js의 특징은 없는 프로퍼티값을 호출해도 에러가 발생하지않고 undefined가 출력된다는 것임. in연산자를 사용하면 프로퍼티 존재여부를 확인할 수 있음

alert( "hisName" in user ); // user.hisName이 존재하므로 true가 출력됩니다.
alert( "blabla" in user ); // user.blabla는 없으므로 false가 출력됩니다.

//let user = { age: 30 };
/* in왼쪽에는 반드시 프로퍼티 이름이 와야한다.
let user = { age: 30 };

let key = "age";
alert( key in user );  -> true, 이렇게해버리면 key = "age"가 user안에 존재하는 프로퍼티인지 검사하기떄문에 true가 된다.
*/

//undefined가 있음에도 in연산자가 있는 이유는, (대체로 ===undefined로 검사가 가능하지만서도) 프로퍼티 값 자체가 undefined가 할당되어있을때 확인하기 위함임



//for..in 반복문은 이전의 for (;;)문과는 완전히 다르다. 이는 객체내의 모든키를 순회하기 위해 존재함.

/* 일반형
for (key in Object) {
    //key값에 따라 실행할 본문
}
*/


let food = {
    apple: "pie",
    egg : 30,
    isAdmin2 : true,
}

for (let key in food) {
    //key
    alert(key);
    //value
    alert(food[key]);
}  //apple - pie / egg - 30 / isAdmin2 - true 순으로 출력된다.


//객체는 "특별한 방식"으로 정렬되어 순서를 가진다.
//정수는 자동정렬, 그외에는 객체에 추가정리한 순서 그대로 정렬

let codes = {
    "49": "독일",
    "41": "스위스",
    "44": "영국",
    // ..,
    "1": "미국"
  };
  
  for (let code in codes) {
    alert(code); // 1, 41, 44, 49
  }

//독일번호를 맨앞에 출력하게 하기 위해선 정수가 안되도록 만들어야한다 -> 앞에 +를 붙이는 등의 방법을 이용하면 "49"등의 key가 정수로 취급되지 않는다

let codes = {
    "49": "독일",
    "41": "스위스",
    "44": "영국",
    // ..,
    "1": "미국"
};
  
for (let code in codes) {
    alert(+code); // 49,41,44,1 -> +를 사용함으로써 입력순서대로 출력하게 되었다.
}

//Q1

let user4 = { };

user4.name = "John";
user4.surname = "Smith";
user4.name = "Pete";

delete user4.name;

//Q2

function isEmpty(obj) {
    for (let key in obj) {
        return false;       //obj를 순회하면서 값이 하나라도 있다면 false, 없어서 빠져나가면 true
    }
    
    return true;
}

//Q4
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
  }

  let sum=0;

  for (let key in salaries) {
    sum+=salaries[key];
  }

  alert(sum);

//Q5
function multiplyNumeric(menu) {
    for (let key in menu) {
      if (typeof menu[key] == 'number') {       //데이터 타입을 보여주는것은 string이기에 ''로 묶었어야했다.
        menu[key] *= 2;
      }
    }
  }

  // 함수 호출 전
  let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };


  multiplyNumeric(menu);


  alert(menu.width); //400 출력