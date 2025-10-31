
import { useState } from 'react'
import classes from './Tasks.module.css'
import { useDebounce } from '../../components/hooks/useDebounce';
import { useThrottle } from '../../components/hooks/useThrottle';

export function Tasks() {
  const [enteredValue, setEnteredValue] = useState('');
  const debouncedValue = useDebounce(enteredValue, 500);
  const throttledValue = useThrottle(enteredValue, 500);

  function handleChange(event) {
    setEnteredValue(event.target.value)
  }

  return (
    <>
      <input type="text" value={enteredValue} className={classes.input} onChange={handleChange} />
      <p>
        **Мгновенный ввод:** {enteredValue}
      </p>
      <p>
        **Отложенный ввод debouncedValue:** {debouncedValue}
      </p>
      <p>
        **Отложенный ввод throttledValue:** {throttledValue}
      </p>
    </>
  )
}
