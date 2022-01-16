[학습자료: yujo velog](https://velog.io/@yujo/JS%ED%81%B4%EB%A1%9C%EC%A0%80Closure%EC%99%80-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC)


```javascript
if (true) {
  let f = function() {
    let a = 1;
    return function () {
      
    }
    // B
  }
  f()
  console.log(a) // a is not defined
}
```

## 클로저란?
- 어떤 함수 A(outer)에서 선언한 변수 a를 참조하는 내부함수 B(inner)를 외부로 전달할 경우
  A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상
- 자바스크립트 고유의 개념은 아닌 여러 함수형 프로그래밍 언어에 등장하는 보편적인 특성

```javascript
const outer = () => {
  let a = 1;
  const inner = () => {
    return ++a;
  };
  return inner;
};

let outer2 = outer();
console.log(outer2());
> 2
console.log(outer2());
> 3

```
- 위의 코드를 실행해 보면 outer2() 함수가 한번 실행 된 이후에도 a의 값이 가비지 콜렉터에 의해 수집되지 않고 그대로 남아 다시 outer2()를 호출했을 때 값이 2 -> 3으로 증가하는 것을 확인할 수 있습니다.
- 이를 이해하기 위해서는 가비지 컬렉터의 동작 방식을 알아야 합니다. 가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 않습니다.
- 위의 코드를 보면 outer()함수는 종료 시점에서 inner()함수를 반환합니다. 외부함수인 outer()가 종료되더라도 내부함수인 inner()함수는 outer2()함수에 의해 호출될 가능성이 생긴 것입니다. 언젠가 다시 호출되어 inner()함수의 실행 컨텍스트가 활성화되면 outer()함수의 LexicalEnvironment를 필요로 하므로 수집 대상에서 제외됩니다.

```html
✅ 가비지 컬렉션 (Garbage Collection): 더 이상 사용하지 않는 메모리를 찾아서 해제하는 것
✅ 가비지 컬렉터 (Garbage Collector): 가비지 컬렉션을 하는 것
```

- 흐름 읽기
https://docs.google.com/presentation/d/1BZgWX8EHwloyWVCbsnTXW53_coIoImcmZz16JP7X-Ws/edit#slide=id.p

### 어떤 이유로 사용되는가?
- 전역 변수 사용 억제
- 정보 은닉화

```javascript
  <script>
    // Box Color Toggler
    const box = document.querySelector('.box');

    const toggleColor = (function () {
      let isGreen = true;
      // 클로저 반환
      return function () {
        box.style.background = isGreen ? 'red' : 'green';
        // 상태 변경
        isGreen = !isGreen;
      };
    })();
  
    // 박스 클릭 이벤트
    box.addEventListener('click', toggleColor);
  </script>
```