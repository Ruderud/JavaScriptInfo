//옵셔널 체이닝을 쓰면, 프로퍼티를 가져올때 문제가 발생해도 에러없이 안전하게 수행가능함

let user = {}; // 주소 정보가 없는 사용자

alert(user.address.street); //이러면 에러가 발생함

//옵셔널 체이닝 ?.은 앞 평가대상이 undefined나 null일경우 평가를 멈추고 undefined를 반환하게하는 기능임

alert(user?.address?.street); // undefined, 에러가 발생하지 않음

//하지만 이를 남용하면 실제 디버깅시, Error의 요인을 찾기어려워지므로 꼭 필요한 부분에서만 사용할 것
//또한 ?.의 앞변수에 대해서는 반드시 선언되어있는 상태어야 한다

let user = null;
let x = 0;

user?.sayHi(x++); // 아무 일도 일어나지 않습니다.

alert(x); // 0, x는 증가하지 않습니다. => 이는 ?.에의해 sayHi가 존재하지 않기때문에 평가를 멈췄고, 이때문에 x에 대한 연산은 아예 이루어지지않았음

let user1 = {
  admin() {
    alert("관리자 계정입니다.");
  },
};

let user2 = {};

user1.admin?.(); // 관리자 계정입니다. => 이런식으로 ()앞에 붙여서 사용도 가능함. 즉, 객체존재여부가 확실치 않을때에 안전하게 사용가능
user2.admin?.();

delete user?.name; // user가 존재하면 user.name을 삭제. => 이처럼 ?.는 읽기/삭제는 가능한데, 쓰기는 불가능함
