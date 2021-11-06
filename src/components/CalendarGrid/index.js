import React from 'react';
import styled from "styled-components";
import moment from 'moment';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
	grid-gap: 1px;
	background: ${props => props.isHeader ? '#1E1F21' : '#404040'};
	${props => props.isHeader && 'border-bottom: 1px solid #404040'}
`;

const CellWrapper = styled.div`
	min-width: 140px;
	min-height: ${props => props.isHeader ? 24 : 80}px;
	background: ${props => props.isWeekend ? '#272829' : '#1E1F21'};
	color: ${props => props.isSelectedMonth ? '#DDDCDD': '#555759'};
`;

const RowInCell = styled.div`
	display: flex;
	justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
	${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;

const DayWrapper = styled.div`
	display: flex;
	width: 27px;
	height: 27px;
	align-items: center;
	justify-content: center;
	margin: 5px;
`;

const CurrentDayWrapper = styled.div`
	height: 100%;
	width: 100%;
	background: #f00;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CalendarGrid = ({ startDay, today }) => {
	const totalDays = 42;
	const day = startDay.clone().subtract(1, 'day');

	const days = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
	
	const isCurrentDay = (day) => moment().isSame(day, 'day');
	const isSelectedMonth = (day) => today.isSame(day, 'month');
	
	return (
			<>
				<GridWrapper isHeader>
					{[...Array(7)].map((_, index) => (
							<CellWrapper isHeader isSelectedMonth>
								<RowInCell justifyContent={'flex-end'} pr={1}>
									{moment().day(index + 1).format('ddd')}
								</RowInCell>
							</CellWrapper>
					))}
				</GridWrapper>
				<GridWrapper>
					{
						days.map((day) => (
								<CellWrapper
									key={day.unix()}
									isWeekend={day.day() === 6 || day.day() === 0}
									isSelectedMonth={isSelectedMonth(day)}
								>
									<RowInCell justifyContent={'flex-end'}>
										<DayWrapper>
											{!isCurrentDay(day) && day.format('D')}
											{isCurrentDay(day) && <CurrentDayWrapper>{day.format('D')}</CurrentDayWrapper>}
										</DayWrapper>  
									</RowInCell>
								</CellWrapper>
						))
					}
				</GridWrapper>
			</>
	)
}

export default CalendarGrid;
