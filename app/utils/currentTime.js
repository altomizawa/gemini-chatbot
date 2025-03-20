export default function currentTime() {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  return currentTime;
}