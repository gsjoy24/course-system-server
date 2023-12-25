const dateToWeeks = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const weeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  return weeks;
};

export default dateToWeeks;
