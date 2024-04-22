function ChildStateComponent({ counter, setCounter }:
    { counter: number;
      setCounter: (counter: number) => void;}) {
      return (
        <div>
          <h3>Counter {counter}</h3>
          <button className="btn btn-primary" onClick={() => setCounter(counter + 1)}>
            Increment</button>
          <button className="btn btn-primary ms-1" onClick={() => setCounter(counter - 1)}>
            Decrement</button>
        </div>
      );
    }
    export default ChildStateComponent;