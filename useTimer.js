import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

export default function useTimer({ endDate, startDate, delay }) {
    const targetDate = new Date(endDate).getTime();
    const [countDown, setCountDown] = useState({ finished: false, hasStarted: false });
    const timer = useRef();

    useEffect(() => {
        if (new Date(startDate).getTime() <= new Date().getTime()) {
            setCountDown((prev) => ({ ...prev, hasStarted: true }));

            timer.current = setInterval(() => {
                const now = new Date().getTime();
                const diff = targetDate - now;
  
                if (diff <= 0) {
                    setCountDown((prev) => ({ ...prev, finished: true, hasStarted: false }));
                    clearInterval(timer.current);
                    return;
                }
  
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
                setCountDown((prev) => ({
                    ...prev,
                    finished: false,
                    days,
                    hours,
                    minutes,
                    seconds,
                }));
            }, delay);
        }
        
        return () => clearInterval(timer.current);
    }, []);
  
    return countDown;
}
