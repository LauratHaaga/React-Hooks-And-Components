import { h } from 'preact';
import useTimer from '../hooks/useTimer';

function TimeStamp({ time, format, style }) {
    const elemClass = format === 'decouple' ? 'timeSingle' : 'timeDouble';

    // const styles = {
    //     box: ['dFlex', ''],
    // };

    return (
        <span className={style[elemClass]}>
            {time}
        </span>
    );
}

function TimeStampWrapper({ 
    children,
    dots, 
    style, 
    text, 
    timeStampStyle,
}) {
    const inlineStyles = {
        box: {},
        circle: {},
        none: {},
    };

    return (
        <div className={style.timeStampWrapper} style={inlineStyles[timeStampStyle]}>
            <div className={style.timeDouble}>
                {children}
                {dots && <span className={style.doubleDots}>:</span>}
            </div>
            <p className={style.timeStampText}>{text}</p>
        </div>
    );
}

export default function Timer({
    timeStampLayoutStyle = 'none', // box styles --> box / circle / none
    timeStampLayoutFormat = 'couple', // couple | decouple
    startDate = null, // Date format
    endDate = null, // Date format
    delay = 1000, // a number for the timer delay
    cssFromStyle = {}, // dynamic styles
    dots = true,
    timeText = {
        days: 'days',
        hours: 'hrs',
        minutes: 'mins',
        seconds: 'secs',
    },
}) {
    const { 
        finished, 
        hasStarted, 
        hours, 
        minutes, 
        days, 
        seconds,
    } = useTimer({ startDate, endDate, delay });

    if (finished || !hasStarted) return '';

    const formatedTime = (val) => (+val < 10 ? `0 ${val}` : `${String(val).charAt(0)} ${String(val).charAt(1)}`);

    const displayFormatedTime = (number) => {
        if (timeStampLayoutFormat === 'decouple') {
            return formatedTime(number)
                .split(' ')
                .map((item) => <TimeStamp style={cssFromStyle} time={item} format={timeStampLayoutFormat} />);
        }

        return (
            <TimeStamp
                time={formatedTime(number).replaceAll(' ', '')}
                format={timeStampLayoutFormat}
                style={cssFromStyle}
            />
        );
    };

    const tuples = [
        [days, timeText.days],
        [hours, timeText.hours],
        [minutes, timeText.minutes],
        [seconds, timeText.seconds],
    ];

    return (
        <div className={cssFromStyle.timerWrapper}>
            {
                tuples.map(([numTime, strTime], index, thisArray) => (
                    <TimeStampWrapper 
                        text={strTime}
                        style={cssFromStyle}
                        dots={dots && (index !== thisArray.length - 1)}
                        timeStampStyle={timeStampLayoutStyle}
                    >
                        {numTime !== undefined && displayFormatedTime(numTime)}
                    </TimeStampWrapper>
                ))
            }
        </div>
    );
}
