import { useState } from 'react'

import useInterval from './hooks/useInterval';
import useDebounce from './hooks/useDebounce';


export default function HooksSolution() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 500);

  useInterval(() => setCount(count + 1));

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', margin: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>Hooks Solution</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <h3>useInterval</h3>
        <p>seconds: {count}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px'}}>
        <h3>useDebounce</h3>
        <input style={{ padding: '5px'}} type="text" placeholder="Type something" value={value} onChange={handleChange} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <label>Debounced value:</label>
          <span style={{ fontWeight: 'bold'}}>{debouncedValue}</span>
        </div>
      </div>

    </div>
  )
}