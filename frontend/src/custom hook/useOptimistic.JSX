import { useState } from 'react';

const useOptimistic = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const updateState = (newValue) => {
    setState(newValue);
  };

  return [state, updateState];
};

export default useOptimistic;
