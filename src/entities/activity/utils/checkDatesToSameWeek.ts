import dayjs from 'dayjs';

export const checkDatesToSameWeek = (
  previousDate: string | Date,
  currentDate: string | Date,
) => {
  const previousVisitDate = dayjs(previousDate);
  const currentVisitDate = dayjs(currentDate);

  const startOfWeekPrevious = previousVisitDate.startOf('week');
  const endOfWeekPrevious = previousVisitDate.endOf('week');

  const isSameWeek =
    currentVisitDate.isAfter(startOfWeekPrevious) &&
    currentVisitDate.isBefore(endOfWeekPrevious);

  return isSameWeek;
};
