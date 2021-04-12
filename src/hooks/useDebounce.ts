import { useEffect, useState } from 'react'

const useDebounce = (value: string, ms: number = 300) => {
  const [debounceVal, setDebounceVal] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(value)
    }, ms)
    return () => {
      clearTimeout(timer)
    }
  }, [value, ms])
  return debounceVal
}

export default useDebounce