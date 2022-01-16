[참고자료: w3g.org](https://www.w3.org/WAI/fundamentals/accessibility-intro/ko#what)


## 웹 접근성 ( Web Accessibility Initiative | WAI) 정의
### " 다양한 환경의 사용자를 웹에 접근 가능하게 만드는 것"
```markdown
웹 접근성은 웹 사이트, 도구, 기술이 장애를 가진 사용자들이 사용할 수 있도록 설계 및 개발된 것을 말합니다.
웹 접근성은 웹에 접근하는 데에 영향을 주는 모든 장애를 아우릅니다.
```
```markdown
나의 생각) 다양한 환경의 사용자를 웹에 접근 가능토록 하는 것은 웹을 제작하는 개발자의 입장이나
비지니스를 운영하는 입장에서 사용자층을 확보하고 해당 서비스에서 제공하고자하는 정보전달의 정확성을
높일 수 있는 방법임으로 중요하다.
```

### ✔ 웹 접근성으로 기대할 수 있는것
- 인지, 이해, 탐색, 상호작용
- 접근, 사용성에 기여

### ✔ 도움을 받는 대상
- 장애를 갖고있는 사용자 (청각, 인지, 신경, 신체, 언어 시각)
- 작은 화면, 다른 입력 모드 등을 가진 휴대폰, 스마트 워치, 스마트 TV 및 다른 디바이스를 사용하는 사람
- 나이가 들어감에 따라 기능적 능력이 변한 연로한 사람
- 팔이 부러지거나 안경을 잃어버려서 “일시적인 장애”를 겪는 사람
- 밝은 햇빛이나 소리를 듣기 힘든 환경에 있어 “상황적 제약”을 겪는 사람
- 느린 인터넷을 사용하거나 제한적이거나 비싼 대역폭을 사용하는 사람

### ✔ 웹 접근성 관련 도구

### ✔ 스크린리더기 사용 예시

- tab 키를 사용해 타겟을 이동
- 타겟 이동은 html 대화형 요소에 접근하여 이를 읽어줌
```html
대화형 요소란?
<a>, <button>, <input> 태그와 같이 상호작용 할 수 있도록 설계된 태그를 말한다.
```

[![Video Label](https://i.ytimg.com/vi/xToJhmAJYCE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAAA80MgXdJgYxyryCaE1zQzHnyEA)](https://youtu.be/xToJhmAJYCE?t=397)

### ✔ 웹 접근성을 보장하는 코드란?

- 이미지 태그 사용
```html
<!-- 정보를 제공하지 않고 있는 이미지 태그 -->
<img src="카카오_프렌즈.png">

<!-- 정보를 제공하는 이미지 태그 -->
<img src="카카오_프렌즈.png" alt="카카오 프렌즈 캐릭터 이미지">
```

- 키보드 컨트롤을 지원하는 웹과 그렇지 못한 웹

```javascript
// 모달 닫기 버튼을 눌렀을 때만 모달을 숨겨주는 코드
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('closeBtn')
closeBtn.addEventListener('click', handleCloseModal)

function handleCloseModal() {
  modal.classList.remove('open')
}
```

```javascript
// 모달 닫기 버튼을 눌렀을 때와 Enter Key를 눌렀을때 모달을 숨겨주는 코드
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', handleCloseModal)
document.addEventListener('keyup', handleWithKeyboard)

function handleCloseModal() {
  modal.classList.remove('open')
}

function handleWithKeyboard(e) {
  const isOpen = modal.classList.contains('open')
  if (isOpen && e.key === 'Enter') {
    handleCloseModal()
  }
}
```

### ✔ 뭘 보고 접근성을 맞춰야 해?
- wai-aria: W3C에 의해 제정된 RIA(Rich Internet Applications)의 웹 접근성에 대한 표준 기술 규격을 의미함.
  https://w3c.github.io/using-aria/

```html
# Role (역할) 정의
유저 인터페이스(User Interface, 이하 UI)에 포함된 특정 컴포넌트의 역할을 정의
Abstract Roles / Widget Roles / Document Structure Roles / Landmark Roles로 분류됨

<!-- role 예시 -->
<!-- <nav>와 동일한 역할을 부여 -->
<div role="navigation"> ... </div>

# aria-* (상태) 정의
요소의 상황을 나타냄

<!-- aria 예시 -->
<!-- aria-required를 true로 지정하여 스크린리더사용자에게 해당 요소가 필수적으로 입력되어야 함을 전달. -->
<input type="checkbox" aria-required="true">

```

- 탭 UI 활용 예시

![image](https://aoa.gitbook.io/~/files/v0/b/gitbook-28427.appspot.com/o/assets%2F-LL2w96d4fwoeh4NDyDr%2F-LS-1kqajIM84kQcjxgb%2F-LS-2avIxn8GspegEUQU%2Fimage.png?alt=media&token=35df5e07-2e55-41e7-9933-a88647274b88)

탭버튼을 감싸고 있는 컨테이너 영역은 role="tablist"를 삽입하고, 탭버튼에는 role="tab"을 삽입한다. 선택된 탭버튼은 aria-selected="true"속성을 삽입하고, 비활성화된 탭버튼은aria-selected="false"를 삽입한다.
또한, 하단 콘텐츠와 연결되었다는 것을 스크린리더에서 읽을 수 있도록 aria-controls를 삽입하여 탭패널의 id 값과 연결한다.

```html
<ul role="tablist">
  <li role="tab" aria-selected="true" aria-controls="a1"
      tabindex="0" id="a1">스케줄 조회
  </li>
  <li role="tab" aria-selected="false" aria-controls="b1"
      tabindex="-1" id="b1">출도착 조회
  </li>
</ul>

<div role="tabpanel" aria-labelledby="schedule-tab" aria-expanded="true"
     tabindex="0" id="a1">
  스케줄 조회 탭패널
</div>
<div role="tabpanel" aria-labelledby="arrival-tab" aria-expanded="false"
     tabindex="-1" id="b1">
  출도착 조회 탭패널
</div>
```

```html
<!-- 스크린 리더기 상태 -->
| 탭 컨트롤
| 스케줄 조회 탭 선택됨 1/2
| 스케줄 조회 탭 패널
```

## 시맨틱 마크업 (Semantic Markup)
### HTML에 의미를 부여하여 정보전달력을 높이게 하는 수단
```html
'semantic' 이란 의미론적인 뜻을 가지며 마크업은 HTML문서 태그로 문서를 작성하는 것을 말한다. 
따라서 시멘틱 마크업이란 의미가 잘 전달되도록 HTML문서를 작성하는 것을 말한다.
```
### ✔ 우리가 알고있는 시맨틱 태그
```html
<header> 머리글, 제목, 헤더
<nav> 네이게이션, 목차, 리스트 등 다른 페이지로의 이동을 위한 링크 공간을 위주로 표현
<aside> 좌측과 우측 사이드 위치의 공간을 의미하며, 본문 외에 부수적인 내용을 주로 표현하는 태그
<section> 말그데로 주제, 카테고리 별로 섹션을 구분하는 용도의 태그로 주로 사용. 같은 테마를 가진 여러개의 콘텐츠의 그룹화
<article> 기사, 블로그 등 텍스트 위주의 페이지를 구성할때 주로 사용.
<footer> 바닥글, 문서 하단에 들어가는 정보 구분 공간을 표현하는 태그
<address> 콘텐츠 작성자나 사이트 소유자의 정보등을 부가적으로 담는 기능
<hgroup> 제목과 관련된 부제목을 묶는 태그
<main> 이름처럼 문서 <body>의 중심 주제, 주요 내용 또는 응용 프로그램의 중심 기능과 직접 관련되어나 확장되는 콘텐츠를 나타낸다.
<details> 주변 문맥에서 표시된 구절의 관련성 또는 중요성으로 인해 참조 또는 표기 목적으로 표시되거나 강조된 텍스트를 나타냅니다.
<figure> 이미지, 다이어그램, 사진 등 독립적인 컨튼츠 정의시 사용
<figcaption> <figure> 요소의 설명 캔션(caption) 정의
<mark> 현재 맥락에 관련이 깊거나 중요한 부분 강조
<time> 시간의 특정 지점 또는 구간, datetime과 같은 속성을 이용해 알림같은 기능 구현
<summary> details 요소에 대한 요약, 캡션 또는 범례를 지정합니다. summary 요소를 클릭하면 상위 details 요소의 상태가 열리고 닫힙니다.
```

### ✔ 시맨틱 태그를 잘 사용하기 어려운 이유

- 오류를 발생하지 않는다.

### ✔ 가이드
https://www.wah.or.kr:444/TR/WCAG20-TECHS/html.html

- 예시: 순서를 보장하지 못하는 마크업에서 탭 접근의 순서를 지정하고 싶을때

Tabindex의 값은 순서대로 나올 필요는 없다. 다만 어떤 특별한 값으로 시작하면 된다. 
값은 유일하지 않아도 된다. 동일한 tabindex 값을 가진 요소는 문자열이 나타나는 순서대로 탐색된다. 
그래서 다음 예제를 보면, 탭 순서가 첫번째, 세번째, 두번째, 네번째의 순서일 것이다.
```html
  <a href="" tabindex="1">one</a>
  <a href="" tabindex="2">two</a>
  <a href="" tabindex="1">three</a>
  <a href="" tabindex="2">four</a>  
```

### 참고자료
https://www.youtube.com/channel/UCTI6h7Vb05Td63qHQ3wjySQ
https://www.wah.or.kr:444/TR/WCAG20-TECHS/html.html
https://www.youtube.com/channel/UCTI6h7Vb05Td63qHQ3wjySQ
https://www.wah.or.kr:444/Participation/technique.asp?tab=2