[학습자료: 캡틴판교 - 웹 개발자를 위한 Web Protocols 정리](https://joshua1988.github.io/web-development/web-protocols/)

# 웹 프로토콜
- URL
- HTTP
- FTP
- SMTP
- MIME

## URL (Uniform Resource Locator)
웹에서 웹 페이지를 정의하고 접근하기 위해 URL을 사용

```markdown
http://www.netbook.cs.purdue.edu/toc/toc01.htm
(protocol://computer_name:port/document_name?parameters)
```
각 단위의 역할
- protocol : 문서를 접근하기 위해 사용하는 프로토콜 이름
- computer_name : 문서가 있는 컴퓨터의 도메인 이름
- port : 서버가 어떤 포트 숫자를 바라보고 있는지 (선택 사항)
- document_name : 서버 컴퓨터에 있는 특정 문서의 이름
- parameters : 페이지에 넘기는 변수 (선택 사항)

## HTTP (Hyper Text Transfer Protocol)
HTTP 는 브라우저가 웹 서버와 통신하기 위해 사용하는 주요 프로토콜이다. <br/>
HTTP 4가지 요청 형식은 아래와 같다.

- GET : 문서를 요청. 서버가 클라이언트에 상태 정보와 복제된 문서를 보냄으로써 응답을 함. (조회)
- HEAD : 상태 정보를 요청. GET 과 동일한 형태로 응답을 하지만, 문서를 복제하지는 않는다.
- POST : 데이터를 서버로 송신. 서버는 해당 데이터를 특정 아이템에 덧붙인다. (생성)
- PUT : 데이터를 서버로 송신. 서버가 특정 아이템을 완전히 대체한다. (수정)

## FTP (File Transfer Protocol)
```markdown
파일이 문서, 이미지, 프로그램 등 다양한 형태의 데이터를 갖고 있을 수 있기 때문에 
컴퓨터 간의 파일 교환시에 호환성을 보장하는 프로토콜이 필요하다. 
컴퓨터 간의 호환성이라는 것은 예를 들어, 한 컴퓨터에서는 JPEG 이미지가 .jpg 로 저장되지만 
다른 컴퓨터에서는 .jpeg 로 저장될 수 있다. 
또한 어떤 컴퓨터는 파일 경로를 (/) 를 사용하지만 다른 컴퓨터는 () 를 사용할 수도 있다. 
이렇기 때문에 파일 전송에 대한 규약인 프로토콜을 이용하여 상호 컴퓨터 간에 파일 전송이 가능하다. 
FTP 의 특성은 다음과 같다.
```

- FTP의 통신방식
```markdown
HTTP 와는 다르게 FTP 는 클라이언트에서 서버로 한번 연결을 맺어놓은 상태에서 파일을 주고 받는 것이 아니라.
클라이언트에서 서버와의 연결이 맺어지면, 해당 연결은 명령어 입력을 위해 남겨놓고 (Control Connection),
파일을 보낼 때 새로운 연결을 추가하여 파일을 전송한다. (File Connection)
```

## SMTP (Simple Mail Transfer Protocol)
```markdown
메일 전송 프로그램이 서버로 메일을 보낼 때 사용하는 프로토콜이다. 
오직 텍스트만 전송이 가능한 것이 특징이고, 스트림 방식을 이용하여 전송한다. 
SMTP 는 한 개의 메시지를 해당 서버의 여러 수신자에게 보낼 수 있다는 특징이 있다. 
상태 코드는 250 (수신 성공), 550 (수신자 못 찾음)
```

## MIME (Multi-purpose Internet Mail Extensions)
```markdown
MIME-Version : 1.0
Content-Type : Multipart/Mixed; Boundary=Mime_separator
```
```markdown
MIME 은 이메일 메시지 안의 헤더에 추가 정보를 포함하여 
비 텍스트 형의 데이터가 전송될 수 있도록 하는 프로토콜이다. 
그리고 첨부된 데이터는 출력 가능한 형태의 문자열로 인코딩 되어 있고, 
각 첨부 앞에 separator 로 구분되어 있다.
```