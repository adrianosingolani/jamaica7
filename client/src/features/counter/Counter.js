import React, { useState } from 'react';
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
// import styles from './Counter.module.css';

import { Button, TextField } from '@material-ui/core';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div>
        <Button
          variant='outlined'
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
        <span>{count}</span>
        <Button
          variant='outlined'
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
      </div>
      <div>
        <TextField
          variant='outlined'
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <Button
          variant='outlined'
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </Button>
        <Button
          variant='outlined'
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </Button>
      </div>
    </div>
  );
}
