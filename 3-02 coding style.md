가독성좋은 코드를 짜기위한 여러 규칙과 문법.



이 규칙을 지키는지는 Linter라는 도구를 사용하면 표준가이드를 지키는지, 명명한 변수나 함수에 오타가없는지 확인이 가능하다

(JSLint, JSHinter, ESLint등을 사용)



![image-20210502141554795](/Users/jeong-gyeonghun/Library/Application Support/typora-user-images/image-20210502141554795.png)

물론 무조건 저걸 다 따라야한다는 법은 없음.

최대가로길이는 80~120자정도로 많이들정함. 가로로 길수록 읽기가 힘들다.



가로 들여쓰기는 공란 두개를 사용하는데, 요새는 탭보다는 스페이스바 두번이 더 종종쓰이는듯.

세로 들여쓰기는 논리블록사이에 빈줄을 넣어서 이렇게 구분한다. (웬만하면 9줄이상 연속으로 줄이 작성되게끔 하지않는것을 목표로)

```js
function pow(x, n) {
  let result = 1;
  //              <--
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  //              <--
  return result;
}
```



중첩레벨은 되도록 얕게 하는것이 좋음. 너무 깊이가 깊어진다면 continue를 써보는게 어떨까??

```js
function pow(x, n) {
  if (n < 0) {
    alert("'n'은 음수가 될 수 없습니다.");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {		//else에서 해당문장을 쓰므로 이부분이 깊어진다.
      result *= x;
    }

    return result;
  }
}


//위 내용을 continue를 쓰면 아래처럼 얕게 쓸수있다.


function pow(x, n) {
  if (n < 0) {
    alert("'n'은 음수가 될 수 없습니다.");			//if 조건에 맞으면 그냥그걸로 끝! else를 쓰지않고 나가버린다.
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```





헬퍼함수 여러개를 만들어서 사용한다면, 해당 함수선언문을 모아서 작성하고, 핼퍼함수들을 모아서 따로 선언.

```js
//1안. 함수 선언 
function createElement() {
  ...
}

function setHandler(elem) {
  ...
}

function walkAround() {
  ...
}

//2안. 헬퍼 함수를 사용하는 코드		--> 함수명만봐도, 그함수가 어떤 역할을 하는지 알도록 이름을 지었다면 보통 이방법을 많이씀.
let elem = createElement();
setHandler(elem);
walkAround();

  
// 헬퍼 함수를 사용하는 코드
let elem = createElement();
setHandler(elem);
walkAround();

// --- 헬퍼 함수 ---
function createElement() {
  ...
}

function setHandler(elem) {
  ...
}

function walkAround() {
  ...
}


//3안. 필요할때마다 그때그때 선언하기 -> 번잡해지기때문에 비추!
```