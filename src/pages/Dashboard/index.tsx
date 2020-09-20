import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {Container, Header, HeaderContent, Profile, 
  Content, Schedule,NextAppointment,Section,Appointment, Calendar } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  
  const [selectedDate, setSelectDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
  const { signOut, user } = useAuth();
  console.log(user);

  const handleDateChange = useCallback( (day: Date, modifiers: DayModifiers) => {
    if(modifiers.available){
      setSelectDate(day);
    }
    console.log(day);
  }, []);

  const handleMonthChange = useCallback( (month: Date) => {
    setCurrentMonth(month);
  },[]);

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      }
    }).then(response => {
      setMonthAvailability(response.data);
    })
  }, [currentMonth, user.id]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability.filter(monthDays => !monthDays.available).map(monthDays => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      return new Date(year,month, monthDays.day);
     
    });
    return dates;
  },[currentMonth, monthAvailability]);


  return(
        <Container>
          <Header>
            <HeaderContent>
              <img src={logoImg} alt="GoBarber" />

              <Profile>
                <img
                src={user.avatar_url}
                alt={user.name}
                />
                <div>
                  <span>Bem-vindo,</span>
                  <strong>{user.name}</strong>
                </div>
              </Profile>

              <button type="button" onClick={signOut}>
                <FiPower />
              </button>
            </HeaderContent>
          </Header>
          <Content>
            <Schedule>
              <h1>Horarios agendados</h1>
              <p>
                <span>Hoje</span>
                <span>Dia 06</span>
                <span>Segunda-feira</span>
              </p>
              <NextAppointment>
                <strong>Atendimento a seguir</strong>
                <div>
                  <img 
                    src="https://xesque.rocketseat.dev/users/avatar/profile-899a2715-66b5-469c-bf09-b50fcfe46338.jpg"
                    alt="Diego Fernandes"
                    />
                    <strong>Diego Fernandes</strong>
                    <span>
                      <FiClock />
                      08:00</span>
                </div>
              </NextAppointment>
              <Section>
                <strong>Manhã</strong>
                <Appointment>
                  <span>
                    <FiClock />
                    08:00
                  </span>
                  <div>
                  <img 
                    src="https://xesque.rocketseat.dev/users/avatar/profile-899a2715-66b5-469c-bf09-b50fcfe46338.jpg"
                    alt="Diego Fernandes"
                    />
                      <strong>Diego Fernandes</strong>
                  </div>
                </Appointment>
                <Appointment>
                  <span>
                    <FiClock />
                    08:00
                  </span>
                  <div>
                  <img 
                    src="https://xesque.rocketseat.dev/users/avatar/profile-899a2715-66b5-469c-bf09-b50fcfe46338.jpg"
                    alt="Diego Fernandes"
                    />
                      <strong>Diego Fernandes</strong>
                  </div>
                </Appointment>
              </Section>
              <Section>
                <strong>Tarde</strong>
                <Appointment>
                  <span>
                    <FiClock />
                    08:00
                  </span>
                  <div>
                  <img 
                    src="https://xesque.rocketseat.dev/users/avatar/profile-899a2715-66b5-469c-bf09-b50fcfe46338.jpg"
                    alt="Diego Fernandes"
                    />
                      <strong>Diego Fernandes</strong>
                  </div>
                </Appointment>
    
              <Appointment>
                  <span>
                    <FiClock />
                    08:00
                  </span>
                  <div>
                  <img 
                    src="https://xesque.rocketseat.dev/users/avatar/profile-899a2715-66b5-469c-bf09-b50fcfe46338.jpg"
                    alt="Diego Fernandes"
                    />
                      <strong>Diego Fernandes</strong>
                  </div>
                </Appointment>
        
              <Appointment>
                  <span>
                    <FiClock />
                    08:00
                  </span>
                  <div>
                  <img 
                    src="https://xesque.rocketseat.dev/users/avatar/profile-899a2715-66b5-469c-bf09-b50fcfe46338.jpg"
                    alt="Diego Fernandes"
                    />
                      <strong>Diego Fernandes</strong>
                  </div>
                </Appointment>
  
              </Section>
            </Schedule>
            <Calendar>
              <DayPicker 
                weekdaysShort={['D', 'S','T','Q', 'Q','S','S']}
                fromMonth={ new Date()}
                disabledDays={[{daysOfWeek: [0,6]},...disableDays]}
                modifiers={{
                  available: { daysOfWeek: [1,2,3,4,5]}
                }}
                selectedDays={selectedDate}
                onDayClick={handleDateChange}
                onMonthChange={handleMonthChange}
                months={[
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro'
                ]}
              />
              </Calendar> 
          </Content>
        </Container>
  );

};


export default Dashboard;