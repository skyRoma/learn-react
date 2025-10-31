import { useState, useEffect, useRef } from 'react';

export function useThrottle(value, interval = 500) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        const now = Date.now();

        if (now >= lastExecuted.current + interval) {
            lastExecuted.current = now;
            setThrottledValue(value);
        } else {
            const timeoutId = setTimeout(() => {
                lastExecuted.current = now;
                setThrottledValue(value);
            }, interval - (now - lastExecuted.current));

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [value, interval]);

    return throttledValue;
}
