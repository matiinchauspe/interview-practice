import { useRef, useEffect } from 'react'

export const useInterval = (callback, delay = 1000) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  savedCallback.current = callback

  const tick = () => savedCallback.current();
  
  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval;