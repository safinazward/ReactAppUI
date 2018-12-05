import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
	title: {
		text: 'My chart'
	},
	height: '100%',
	width: '100%',
	series: [
		{
			data: [1, 2, 3]
		}
	]
};

class HighChart extends Component {
	render() {
		return (
			<div>
				<HighchartsReact highcharts={Highcharts} options={options} />
			</div>
		);
	}
}

export default HighChart;
