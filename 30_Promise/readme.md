[학습자료: 캡틴판교1988](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/#promise%EA%B0%80-%EB%AD%94%EA%B0%80%EC%9A%94)

# Promise
프로미스는 자바스크립트 비동기 처리에 사용되는 객체

## 왜 필요한가?
비동기로 데이터를 요청할때 응답받은 데이터가 완전히 받아와졌는지 상태를 확인하고
데이터를 다루기 위해 사용됨

## 프로미스의 3가지 상태(states)
- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

## 프로미스의 에러 처리 방법
- then()의 두 번째 인자로 에러를 처리하는 방법
```javascript
getData().then(
  handleSuccess,
  handleError
);
```

- catch()를 이용하는 방법
```javascript
getData().then().catch();
```

```markdown
개개인의 코딩 스타일에 따라서 then()의 두 번째 인자로 처리할 수도 있고 catch()로 처리할 수도 있겠지만 가급적 catch()로 에러를 처리하는 게 더 효율적입니다.
```