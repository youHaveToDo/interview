[학습자료: developer.mozilla.org: CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)


## CORS: 교차 출처 리소스 공유 (Cross-Origin-Resource-Sharing)
```html
CORS는 HTTP의 일부로, 어떤 호스트에서 자신의 콘텐츠를 불러갈 수 있는지 서버에 지정할 수 있는 방법입니다.
CORS를 사용해 교차 출처 접근을 허용하세요. 
```

### 출처 Origin
서로 다른 출처인지 어떻게 판단 하는가?
![image](./uri.png)

먼저 출처(Origin)란 <code style="background-color: #31bba1; font-weight: bold;" >Protocol</code>, <code style="background-color: #31bba1; font-weight: bold;" >Host</code>, <code style="background-color: #31bba1; font-weight: bold;" >Port</code>로 구성된다.<br/>
따라서 동일 출처라는 것은  <code style="background-color: #31bba1; font-weight: bold;" >Protocol</code>, <code style="background-color: #31bba1; font-weight: bold;" >Host</code>, <code style="background-color: #31bba1; font-weight: bold;" >Port</code>이 모두 같을때 이다.



### CORS가 왜 필요한가?
기본적으로 브라우저는 같은 출처에서만 리소스를 공유할 수 있도록 제한하는 보안 방식을 사용한다.<br/>
이것을 SOP(same-origin-policy)라 하며, SOP는 서로 다른 출처에서 통신할때 악의적인 공격에 대한 보안을 확보하기 위해 사용된다.
SOP가 없다면 CSRF, XSS와 같은 방법으로 정보를 탈취 할 수 있기 때문에 동일 출처 정책으로 잠재적인 공격의 경로를 줄 일 수 있다.

```html
따라서, SOP를 우회하기 위해서 권장되는 방법으로 CORS를 사용한다.
```

### CORS 동작 방식

#### 1. simple request

- 예를들어, https://foo.example 의 웹 컨텐츠가  https://bar.other 도메인의 컨텐츠를 호출하길 원합니다. foo.example에 배포된 자바스크립트에는 아래와 같은 코드가 사용될 수 있습니다.
```javascript
const xhr = new XMLHttpRequest();
const url = 'https://bar.other/resources/public-data/';

xhr.open('GET', url);
xhr.onreadystatechange = someHandler;
xhr.send();
```

클라이언트와 서버간에 간단한 통신을 하고, CORS 헤더를 사용하여 권한을 처리합니다.

![image](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/simple-req-updated.png)

이 경우 브라우저가 서버로 전송하는 내용을 살펴보고, 서버의 응답을 확인합니다.

```markdown
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

요청 헤더의 Origin을 보면, https://foo.example로부터 요청이 왔다는 것을 알 수 있습니다.

```markdown
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml

[…XML Data…]
```

서버는 이에 대한 응답으로 Access-Control-Allow-Origin 헤더를 다시 전송합니다. 가장 간단한 접근 제어 프로토콜은 Origin 헤더와 Access-Control-Allow-Origin 을 사용하는 것입니다. 이 경우 서버는 Access-Control-Allow-Origin: *, 으로 응답해야 하며, 이는 모든 도메인에서 접근할 수 있음을 의미합니다. https://bar.other 의 리소스 소유자가 오직 https://foo.example 의 요청만 리소스에 대한 접근을 허용하려는 경우 다음을 전송합니다.
```markdown
Access-Control-Allow-Origin: https://foo.example
```

#### 2. preflighted request
- 먼저 OPTIONS 메서드를 통해 다른 도메인의 리소스로 HTTP 요청을 보내 실제 요청이 전송하기에 안전한지 확인합니다.

```markdown
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://bar.other/resources/post-here/');
xhr.setRequestHeader('Ping-Other', 'pingpong');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = handler;
xhr.send('<person><name>Arun</name></person>');
```

위의 예제는 POST 요청과 함께 함께 보낼 XML body를 만듭니다. 또한 비표준 HTTP Ping-Other 요청 헤더가 설정됩니다.<br/> 이러한 헤더는 HTTP/1.1의 일부가 아니지만 일반적으로 웹 응용 프로그램에 유용합니다. Content-Type 이 application/xml이고, 사용자 정의 헤더가 설정되었기 때문에 이 요청은 preflighted 처리됩니다.

![image](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/preflight_correct.png)

preflight request
```markdown
OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type


HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```
preflight request가 완료되면 실제 요청을 전송합니다.
```markdown
POST /resources/post-here/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
X-PINGOTHER: pingpong
Content-Type: text/xml; charset=UTF-8
Referer: https://foo.example/examples/preflightInvocation.html
Content-Length: 55
Origin: https://foo.example
Pragma: no-cache
Cache-Control: no-cache

<person><name>Arun</name></person>


HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:40 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 235
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: text/plain

[Some GZIP'd payload]
```

### CORS 오류 해결하기
- Access-Control-Allow-Origin 응답 헤더 세팅
```javascript
// 서버측 응답에서 접근 권한을 주는 헤더를 추가하여 해결
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
  res.header("Access-Control-Allow-Origin", "https://example.com"); // 특정 도메인
});
```

- cors 모듈 사용
```javascript
// 모든 origin 요청에 대해 open
const cors = require("cors");
const app = express();

app.use(cors());
```

```javascript
// 특정 origin 요청에 대해 open
const options = {
  origin: "http://example.com", // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

app.use(cors(options));
```

```javascript
// 특정요청에 대해 open
app.get("/example/:id", cors(), function (req, res, next) {
  res.json({ msg: "example" });
});
```

- webpack-dev-server proxy 기능 (프론트단 해결방법)
```javascript
// 리액트 개발환경에서, 서버쪽 코드를 수정하지 않고 해결할 수도 있다. 
// 아래와 같이 프록시 속성을 설정하면, 서버에서 해당 요청을 받아준다.

// 프록시 쓰지 않았을때
// localhost:8080(클라이언트 측) --X (CORS)--> domain.com (서버 측)

// 프록시를 설정 후
// localhost:8080(클라이언트 측) --O 프록시가 설정된 Webpack Dev Server--> domain.com (서버 측)

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "domain.com",
        changeOrigin: true,
      },
    },
  },
};
```
- create-react-app 으로 생성한 프로젝트에서는, package.json 에 proxy 값을 설정하여 proxy 기능을 활성화 하는 방법도 있다.
```javascript
{
    //...
    "proxy": "http://localhost:4000"
}
```