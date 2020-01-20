import React, {useState, useMemo, useEffect } from 'react';
import { 
    format, 
    subDays, 
    addDays,
    setHours,
    setMinutes,
    setSeconds, 
    isBefore,
    isEqual, //compara se duas datas são iguais
    parseISO
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';

import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState(new Date());

    const dateFormatted  = useMemo(
        () => format(date, "d 'de' MMMM", {locale: pt}),
        [date]
    );

    useEffect(() => {
        async function loadSchedule() {
            
            const response = await api.get('/schedules', {
                params: { date }
            });

            //pegando a timezone do cliente
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = range.map(hour => {
                const checkDate =  setSeconds( setMinutes( setHours(date, hour), 0 ), 0 ); 
                const compareDate = utcToZonedTime(checkDate, timezone);
                const time = format(compareDate, "HH:mm");
                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find(a =>
                        format(parseISO(a.date), "HH:mm") === time, 
                    ), 
                }
                
            });

            setSchedule(data);
        }

        loadSchedule();
    }, [date])

    //reduz a data do estado em 1 dia
    function handlePrevDay() {
        setDate(subDays(date, 1));
    }

     //aumenta a data do estado em 1 dia
    function handleNextDay() {
        setDate(addDays(date, 1));
    }

    return (
        <Container>
           <header>
               <button type="button" onClick={handlePrevDay}>
                    <MdChevronLeft size={36} color="#fff"/> 
                </button>
               <strong>{dateFormatted}</strong>
               <button type="button" onClick={handleNextDay}> 
                    <MdChevronRight size={36} color="#fff"/> 
                </button>
           </header>

           <ul>
               {
                   schedule.map(time => (
                        <Time 
                            key={time.time} 
                            past={time.past}
                            available={!time.appointment}
                        >
                            <strong>{time.time} </strong>
                            <span>
                                {time.appointment ? time.appointment.user.name : 'Em aberto'}
                            </span>
                        </Time>
                   ))
               }            
           </ul>
        </Container>
    );
}