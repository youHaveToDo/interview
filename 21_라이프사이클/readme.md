[학습자료: 누구든지 하는 리액트 #10 LifeCycle API (i)](https://www.youtube.com/watch?v=Na_kP7X6KGs)

[학습자료: kyun2da.dev](https://kyun2da.dev/react/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%EC%9D%98-%EC%9D%B4%ED%95%B4/)
## 라이프사이클 API
컴포넌트가 나타날때(Mounting), 업데이트 될때(Updating), 사라실때(Unmounting) 의 과정 속에
개발자가 임의의 작업을 하고싶을때 사용하는 기능이다.

라이프사이클(생명주기) 중 업데이트 될때의(리렌더링) 특징으로는

1. props가 바뀔 때
2. state가 바뀔 때
3. 부모 컴포넌트가 리렌더링 될 때
4. this.forceUpdate로 강제로 렌더링을 트리거할 때

일어난다는 것이 특징이다.

라이프사이클 메서드로는

1. constructor
2. getDerivedStateFromProps
3. shouldComponentUpdate
4. render
5. getSnapshotBeforeUpdate
6. componentDidMount
7. ComponentDidUpdate
8. componentWillUnmount
9. componentDidCatch

가 있으며, 각각의 내용을 Hooks와 함께 아래에서 살펴보자.

### constructor
컴포넌트가 처음 만들어 질때 실행되는 코드들로 초기 state를 정의 할 수 있다.

```javascript
// Class
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
}

// Hooks
const Example = () => {
    const [count,setCount] = useState(0);
}
```

### getDerivedStateFromProps
props로 받아 온 값을 state에 동기화시키는 용도로 사용하며, 
컴포넌트가 마운트될 때와 업데이트 될 때 호출된다.

```javascript
// Class
class Example extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value }
    }
    return null
  }
}

// Hooks
function ScrollView({row}) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    // 마지막 렌더링 이후 행이 변경되었습니다. isScrollingDown을 업데이트합니다.
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }

  return `Scrolling down: ${isScrollingDown}`;
}
```

### shouldComponentUpdate
메서드는 props나 state를 변경했을 때, 리렌더링을 할지 말지 결정하는 메서드이다. 
이 메서드에서는 반드시 true나 false를 반환해야한다.
이 메서드는 오직 성능 최적화만을 위한 것이며 렌더링 목적을 방지하는 목적으로 
사용하게된다면 버그로 이어질 수 있다.

```javascript
// Class
class Example extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value
  }
}

// Hooks
const Example = React.memo(() => {
      ...
  },
  (prevProps, nextProps) => {
    return nextProps.value === prevProps.value
  }
)
```

### render
컴포넌트를 렌더링할 때 필요한 메서드로 유일한 필수 메서드
```javascript
// Class
class Example extends React.Component {
  render() {
    return <div>컴포넌트</div>
  }
}

// Hooks
const example = () => {
  return <div>컴포넌트</div>
}
```

### getSnapshotBeforeUpdate
이 메서드는 render에서 만들어진 결과가 브라우저에 실제로 반영되기 직전에 호출된다. 공식문서의 말을 따보자면 이 메서드에 대한 사용 예는 흔하지 않지만, 채팅 화면처럼 스크롤 위치를 따로 처리하는 작업이 필요한 UI 등을 생각해볼 수 있다고한다.
함수형에서는 아직 이 기능을 대체할만한 hook이 없다고 한다

```javascript
class Example extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current
      return list.scrollHeight - list.scrollTop
    }
    return null
  }
}
```

### componentDidMount
메서드는 컴포넌트를 만들고 첫 렌더링을 마친 후 실행한다. 함수형 Hooks 에서는 useEffect를 활용하여 다음의 기능을 구현할 수 있다.
```javascript
// Class
class Example extends React.Component {
    componentDidMount() {
        ...
    }
}

// Hooks
const Example = () => {
    useEffect(() => {
        ...
    }, []);
}
```

### ComponentDidUpdate
```javascript
// Class
class Example extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        ...
    }
}

// Hooks
const Example = () => {
    useEffect(() => {
        ...
    });
}
```

### componentWillUnmount
이 메서드는 컴포넌트를 DOM에서 제거할 때 실행한다. componentDidMount에서 등록한 이벤트가 있다면 여기서 제거 작업을 해야한다. 함수형 컴포넌트에서는 useEffect CleanUp 함수를 통해 해당 메서드를 구현할 수 있다.
```javascript
// Class
class Example extends React.Component {
    coomponentWillUnmount() {
        ...
    }
}

// Hooks
const Example = () => {
    useEffect(() => {
        return () => {
            ...
        }
    }, []);
}
```

### componentDidCatch
```javascript
// Class
class Example extends React.Component {
  componentDidCatch(error, info) {
    console.log('에러가 발생했습니다.')
  }
}
```