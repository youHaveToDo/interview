[참고자료: PoiemaWeb](https://poiemaweb.com/js-execution-context)
[참고자료: {풀스택} JavaScript 10강 - 실행 코드로 알아보는 실행컨텍스트 동작 원리](https://www.youtube.com/watch?v=pfQfEwnJHRs)


# 실행 컨텍스트
실행 컨텍스트(Execution Context)는 scope, hoisting, this, function, closure 등의 동작원리를 담고있는
자바스크립트의 핵심원리이다.

- 한줄 요약
```markdown
코드를 실행하는데 필요한 환경을 제공하는 객체이며 식별자 결정을 더욱 효율적으로 하기 위한 수단
```

## 실행 컨텍스트가 생성되는 시점
- 전역 코드
- 함수 코드
- eval
- 모듈

## 실행 컨텍스트의 3가지 객체
- Variable Object (VO/변수객체)
- Scope chain
- this value

### VO/변수객체
실행 컨텍스트가 생성되면 자바스크립트 엔진은 실행에 필요한 여러 정보들을 담을 객체를 생성,
VO는 코드가 실행 될때 엔진에 의해 참조되며 코드에서는 접근 할 수 없다.

#### VO가 담고 있는 객체 정보
- 변수
- 매개변수(parameter)와 인수 정보(arguments)
- 함수 선언(함수 표현식은 제외)

#### 전역 컨텍스트와 함수 컨텍스트에서 VO
- 전역 컨텍스트의 VO는 최상위에 위치하여 모든 전역 변수, 전역 함수 등의 정보를 포함하는 Global Object/GO를 가리킨다.
- 함수 컨텍스트의 VO는 Activation Object/AO(활성객체)를 가리키며 매개변수와 인수들의 정보를 담고있는 객체인 arguments objects가 추가되어 있다.

### Scope chain
스코프 체인은 각각의 실행 컨텍스트가 참조 할 수 있는 스코프의 정보를 리스트 형태로 저장하고 있는것을 말한다.
이를 통해 전역 객체와 중첩된 함수는 상위 컨텍스트를 탐색하며 식별자를 결정 할 수 있게 된다.

### this value
this 프로퍼티에는 this 값이 할당된다. this에 할당되는 값은 함수 호출 패턴에 의해 결정된다.

// 추후 업데이트 필요

