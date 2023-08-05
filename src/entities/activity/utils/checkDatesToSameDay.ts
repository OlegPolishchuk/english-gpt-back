import dayjs from 'dayjs';

export const checkDatesToSameDay = (
  previousDate: string | Date,
  currentDate: string | Date = new Date(),
) => {
  const previousVisitDate = dayjs(previousDate);
  const currentVisitDate = dayjs(currentDate);

  return currentVisitDate.isSame(previousVisitDate, 'day');
};
