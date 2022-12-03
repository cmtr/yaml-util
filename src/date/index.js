module.exports = {

	addDays: (date, days) => {
	  const result = new Date(date);
	  result.setDate(result.getDate() + days);
	  return result;
	},
	
	addYears: (date, year=1) => {
		const result = new Date(date);
		result.setFullYear(result.getFullYear() + year);
		return result;
	}
}