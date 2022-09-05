function useTimer({ endDate, startDate, delay }) {
  const targetDate = React.useRef(new Date(endDate).getTime());
  const [countDown, setCountDown] = React.useState({ finished: false });
  const timer = React.useRef();

  React.useEffect(() => {
    if (new Date(startDate).getTime() <= new Date().getTime()) {
      timer.current = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate.current - now;

        if (diff <= 0) {
          setCountDown((prev) => ({ ...prev, finished: true }));
          clearInterval(timer.current);
          return;
        }

        const days = ~~(diff / (1000 * 60 * 60 * 24));
        const hours = ~~((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = ~~((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = ~~((diff % (1000 * 60)) / 1000);

        setCountDown({
          finished: false,
          days,
          hours,
          minutes,
          seconds
        });
      }, delay);
      return () => clearInterval(timer.current);
    }
  }, []);

  return countDown;
}
