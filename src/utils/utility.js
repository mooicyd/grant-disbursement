exports.isNumberString = value => value && !Number.isNaN(value)

exports.subtractYearsFromToday = value => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - value)
  date.setUTCHours(0, 0, 0, 0)
  return date
}
