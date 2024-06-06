import { useRef, useState, useEffect } from 'react'

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeout.current);

  }, [value, delay])

  return debouncedValue;

};

export default useDebounce;