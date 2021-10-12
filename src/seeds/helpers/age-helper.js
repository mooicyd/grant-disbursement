exports.generateDobForAge = age => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - age)
  date.setUTCHours(0, 0, 0, 0)
  return date
}
