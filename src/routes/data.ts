export const data = {
	labels: ['jan', 'feb', 'mar', 'apr', 'jun'],
	datasets: [
		{
			label: 'Budget prediction',
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			borderColor: '#1ee13f',
			backgroundColor: '#1ee13f57',
			fill: 'origin'
		}
	]
};

export const options = {
	plugins: {
		filler: {
			propagate: false
		}
	},
	interaction: {
		intersect: false
	}
};
