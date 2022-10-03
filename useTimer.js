import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

export default function useTimer({ endDate, startDate, delay }) {
    const targetDate = useRef(new Date(endDate).getTime());
    const [countDown, setCountDown] = useState({ finished: false });
    const timer = useRef();
  
    useEffect(() => {
        if (new Date(startDate).getTime() <= new Date().getTime()) {
            timer.current = setInterval(() => {
                const now = new Date().getTime();
                const diff = targetDate.current - now;
  
                if (diff <= 0) {
                    setCountDown((prev) => ({ ...prev, finished: true }));
                    clearInterval(timer.current);
                    return;
                }
  
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
                setCountDown({
                    finished: false,
                    days,
                    hours,
                    minutes,
                    seconds,
                });
            }, delay);
        }
        
        return () => clearInterval(timer.current);
    }, []);
  
    return countDown;
}
