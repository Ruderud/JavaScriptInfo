"use strict";

//Js의 메모리관리 방법. 도달가능성을 따져서 필요없는 데이터를 삭제한다
//Root값(현재함수의 지역변수,매개변수/중첩함수내의 채인에있는 함수의 변수,매개변수/전역변수 등)은 존재자체가 도달가능성을 가지고있기에 삭제 x
//+루트가 참조가능한 값 또는 체이닝으로 루트에 참조할 수 있는 값도 삭제 x

let user = {    //현재 전역변수를 만들고, 여기에 객체를 할당해서 name이라는 프로퍼티를 넣음. 현재상태에서는 도달가능성 존재
    name : "John"
};

user = null;        //이제 원래 user에 할당했던 객체대신, null을 할당했기에, 원래 객체의 프로퍼티인 name은 절대 도달할 수 없는 상태가 되었음
                    //-> name:"John" 삭제

let user1 = {
    name : "John"
};

let admin = user1;      //user1에 할당한 객체와 그 내부 프로퍼티를 admin이라는 변수에서 접근할 수 있게 했음

user1 = null;       //이때 user1의 값을 위와같이 삭제했지만, 여전히 admin이라는 변수를통해 객체의 프로퍼티 name에 접근할 수 있기에 삭제되지않음


//연결된 객체
function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;
  
    return {
      father: man,
      mother: woman
    }
  }
  
  let family = marry({name: "John"}, {name: "Ann"});
//family라는 전역변수를 할당하고, 여기에서 결혼함수를 수행해서 두 객체간에 관계를 가지게 했음 (ex - family.father = name."john")

//여기서 이와같이 관게를 가지게하는 객체내의 프로퍼티를 제거시키면
delete family.father;
delete family.mother.husband;

//ann의 남편이라는 관계와, 가족에서 아빠라는 관계가 소멸되어 name:"John"은 도달불가능한 프로퍼티가 되어서 삭제된다.
//둘중 하나만 지우면 여전히 john에 도달하는 관계가 남아있기때문에 삭제되지 않았을것
//john에게서 ann으로 향하는 관계는 있지만, 이것은 외부에서 john에게 들어가는 참조가 존재하지 않기때문에 무시된다.
//위의 가비지 컬렉션후 메모리구조는 family.mother = {name:"Ann"}이 된다.

console.log(family.mother)

//그리고 위의 38,39라는 프로퍼티 제거수행하지 않은상태에서 family = null;을 명령하여 family내용을 다 지워버리면 설상 내부에서 서로 참조하는 관계가 설정되어있어도
//외부와 고립되기 때문에 삭제된다.

/*mark(기억) and sweep(삭제) 알고리즘
1. 처음는 root를 mark한다
2. root에서 참조하고있는 것들을 mark한다
3. (1~2)과정을 계속 반복하고, 도달하지못해 mark되지 않은 데이터들은 모두 sweep(삭제)한다
*/

/*이 알고리즘의 최적화기법으로는 
generational collection(생성-역할수행직후 금방 필요없어지는것들을 공격적으로 제거하고, 일정시간을 버틴것에 대해서는 느슨한 감시를 적용),
incremental collection(한번에 모든 root를 mark한다면 시간이 오래걸리기에, 이를 해결하고자 여러 파트로 나누고 순서를 정해 별도로 수행),
idle-time collection(CPU가 유휴상태일때만 가비지 컬렉션을 수행)
이 있음*/