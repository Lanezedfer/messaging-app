const padZero = (number: number) => {
  return number.toString().padStart(2, "0");
};

const extractTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
};

export default extractTime;
