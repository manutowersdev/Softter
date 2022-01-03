export function formatDate(milliseconds) {
  const day = new Date(milliseconds).getDate();
  const month = new Date(milliseconds).getMonth();
  const year = new Date(milliseconds).getFullYear();

  const finalDate = `${day}/${month + 1}/${year} ${new Date(milliseconds)
    .toTimeString()
    .slice(0, 8)}`;

  return finalDate;
}
