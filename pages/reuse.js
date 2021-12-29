import { useState } from "react";

const useCounter = (initialCount) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return { count, increment, decrement };
};

const Counter1 = () => {
  const { count, increment } = useCounter(0);

  return (
    <>
      <p>count: {count}</p>
      <button onClick={increment}>+</button>
    </>
  );
};

const Counter2 = () => {
  const { count, decrement } = useCounter(10);

  return (
    <>
      <p>count: {count}</p>
      <button onClick={decrement}>-</button>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Counter1 />
      <Counter2 />
    </div>
  );
};

export default App;
export { useCounter, Counter1, Counter2 };
