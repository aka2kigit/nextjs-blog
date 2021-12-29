import { useState } from "react";

import React from "react";

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

const App = () => {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};
export { useCounter };
export default App;
