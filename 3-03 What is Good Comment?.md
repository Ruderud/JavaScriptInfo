주석



"가장 좋은코드는 주석이 필요없는 코드이다"

라는것을 항상 염두에두고, 누가읽어도 그냥 바로 이해할수 있도록 쉽게 써야한다.



1.

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

    // i가 소수인지를 확인함
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert(i);
  }
}
```

n까지의 소수를 순서대로 보여주는 함수인데, 여기서 함수내부에 소수인지를 판별하는 for문이 존재한다.

이를 isPrime이라는 함수를 따로 선언하여 작성하면 더 좋은 코드가 된다.



```js
function ShowPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;
  
    alert(i);
  }
}

function isPrime(n) {
  for (let j = 2; j < n; j++) {
    if (n % j == 0) return false;
  }
  return true;
}
```

여기서 isPrime이라는 함수는 함수명 자체가 자신을 설명하고있는 자기설명형 함수이다.



2.

```js
// 위스키를 더해줌
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// 주스를 더해줌
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

이런식으로 아래로 계속 늘어지는 형식의 코드 또한 좋지못한 코드임.



```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

이렇게 glass에 음료를 넣는 과정을  addwhiskey/juice로써 따로 빼서 함수선언을하고 작성(리팩토링)하면서

수직적으로 흘러내리는 형식이 아닌, 수평적인 느낌으로 작성이 되었다.



3. 왜 그러한 방법으로 문제를 해결했는지, 그 이유를 설명하는 주석은 필요하다.

   과거에 왜 그방법을 사용하지않았는지 주석을 달아놓는다면 

   미래의 자신, 혹은 동료가 시간을 과거에 시도했다가 실패한 일을 하기위해 시간버리지 않게 될 것 이다.

