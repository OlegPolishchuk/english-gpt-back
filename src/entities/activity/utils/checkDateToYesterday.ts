import dayjs from 'dayjs';

export const checkDateToYesterday = (
  previousDate: string | Date,
  currentDate: string | Date,
) => {
  const previousVisitDate = dayjs(previousDate);
  const currentVisitDate = dayjs(currentDate);
  const yesterday = currentVisitDate.subtract(1, 'day');
  const isYesterday = previousVisitDate.isSame(yesterday, 'day');

  return isYesterday;
};
