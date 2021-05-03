테스트 자동화



함수를 하나 만들어서 이를 테스트 해볼때,

Case 1에 대해서는 통과했지만, case2 에서 실패할경우, 이를 고치고 case2만 트라이한다면 이는 잘못된 테스트이다.

Case 1이 여전히 잘되는지 보장이 안되기 때문.

그렇기에 다양한 조건에서 테스트 해보는것이 중요하다.





BDD방법론(Behavior Driven Development)

BDD는 Test + Documentation + Example을 모아놓은 개념이다.



```js
describe("pow", function() {		//구현하고자 하는 기능에 대한 설명

  it("주어진 숫자의 n 제곱", function() {	//use case 설명
    assert.equal(pow(2, 3), 8);			 //해당함수를 수행해보고, 기대한 결과가 나오는지 확인
  });

});
```



이를 실제로 사용하면 다음과 같다

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 결과 출력에 사용되는 mocha css를 불러옵니다. -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
  <!-- Mocha 프레임워크 코드를 불러옵니다. -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
  <script>
    mocha.setup('bdd'); // 기본 셋업
  </script>
  <!-- chai를 불러옵니다 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
  <script>
    // chai의 다양한 기능 중, assert를 전역에 선언합니다.
    let assert = chai.assert;
  </script>
</head>

<body>

  <script>
      describe("pow", function() {		//구현하고자 하는 기능에 대한 설명

        it("주어진 숫자의 n 제곱", function() {	//use case 설명
        assert.equal(pow(2, 3), 8);			 //해당함수를 수행해보고, 기대한 결과가 나오는지 확인
        //  assert.equal(pow(3, 4), 81); 기존 it에다가 assert를 추가하는 방법도있지만, 이는 다양한 실패정보를 가져오지 않으므로 it을 따로쓰는것을 권장
        });

        it("3을 4번 곱하면 81", function() {
        assert.equal(pow(3, 4), 81);
        })

        it("n이 음수일 때 결과는 NaN입니다.", function() {      //음수상황에 대한 테스트
            assert.isNaN(pow(2, -1));
        });

        it("n이 정수가 아닐 때 결과는 NaN입니다.", function() { //정수가아닌 유리수범위에서 테스트
            assert.isNaN(pow(2, 1.5));
        });


        function makeTest(x) {  //세제곱 테스트
            let expected = x * x * x;
            it(`${x}을/를 세 번 곱하면 ${expected}입니다.`, function() {
                assert.equal(pow(x, 3), expected);
            });
        }

        for (let x = 1; x <= 5; x++) { //for문을 이용해서 1부터 5까지 세제곱 결과를 테스트함
            makeTest(x);
        }

        describe("x를 세 번 곱합니다.", function() { //중첩desribe문을 쓰면 테스트에대한 새로운 하위그룹을 정의할수있고, 그결과또한 들여쓰기로 알려줌

            function makeTest(x) {
                let expected = x * x * x;
                it(`${x}을/를 세 번 곱하면 ${expected}입니다.`, function() {
                    assert.equal(pow(x, 3), expected);
            });
            }

            for (let x = 1; x <= 5; x++) {
                makeTest(x);
            }

        });

    });

    function pow(x, n) {
      if (n < 0) return NaN;
      if (Math.round(n) != n) return NaN;

      let result = 1;

      for (let i = 0; i < n; i++) {
          result *= x;
      }
      
      return result;
    }
  </script>

  <!-- 테스트(describe, it...)가 있는 스크립트를 불러옵니다. -->
  <script src="test.js"></script>

  <!-- 테스트 결과를 id가 "mocha"인 요소에 출력하도록 합니다.-->
  <div id="mocha"></div>

  <!-- 테스트를 실행합니다! -->
  <script>
    mocha.run();
  </script>
</body>

</html>
```



또한 describe에 전제테스트의 시작/종료, 각 단일 셈플테스트에대한 시작/종료 함수도 지정할 수 있다.

```js
describe("test", function() {

  before(() => alert("테스트를 시작합니다 - 테스트가 시작되기 전"));
  after(() => alert("테스트를 종료합니다 - 테스트가 종료된 후"));

  beforeEach(() => alert("단일 테스트를 시작합니다 - 각 테스트 시작 전"));
  afterEach(() => alert("단일 테스트를 종료합니다 - 각 테스트 종료 후"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
/*
테스트를 시작합니다 - 테스트가 시작되기 전          (before)
단일 테스트를 시작합니다 - 각 테스트 시작 전         (beforeEach)
1
단일 테스트를 종료합니다 - 각 테스트 종료 후         (afterEach)
단일 테스트를 시작합니다 - 각 테스트 시작 전         (beforeEach)
2
단일 테스트를 종료합니다 - 각 테스트 종료 후         (afterEach)
테스트를 종료합니다 - 테스트가 종료된 후            (after)
*/
```

