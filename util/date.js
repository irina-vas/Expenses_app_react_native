export const getFormattedDate = (date) => {
  let month;
  if (date.getMonth() < 10) {
    month = `0${date.getMonth() + 1}`
  } else {
    month = `${date.getMonth() + 1}`
  }
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}