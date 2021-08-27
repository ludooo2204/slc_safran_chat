import React from "react";

import { ajaxPost } from "../helpers/ajax";
import regression from "../helpers/regression";
import Chart from "chart.js";
import { interpoler,regressionExponential } from "../helpers/functionUtilitaire";

console.log(regression);
export class LineChartEcart extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.state = { coefModelisation: null };
	}

	componentDidUpdate() {
		console.log("update");
		// console.log("this.regression()");
		// console.log(this.regression());
		this.regression();
		if (this.props.data.domaine == "VIDE") {
			console.log(this.myChart.options);
			this.myChart.options.scales.yAxes[0].ticks.min = -70;
			this.myChart.options.scales.yAxes[0].ticks.max = 70;
		}
		if (this.props.data.domaine == "TEMPERATURE") {
			this.myChart.options.scales.yAxes[0].ticks.min = -0.6;
			this.myChart.options.scales.yAxes[0].ticks.max = 0.6;
		}
		this.myChart.data.labels = this.props.data.appareil;
		this.myChart.data.datasets[0].data = this.props.data.ecart;
		this.myChart.data.datasets[1].data = this.props.data.incertitudePlus;
		this.myChart.data.datasets[2].data = this.props.data.incertitudeMoins;
		this.myChart.data.datasets[3].data = this.regression()[0];
		this.myChart.update();
	}

	regression() {
		let dataRegression = [];
		let dataAppareil = [...this.props.data.appareil];
		let dataReference = [...this.props.data.reference];

		if (this.props.data.domaine == "VIDE") {
			for (let i = 0; i < dataAppareil.length; i++) {
				dataRegression.push([Math.log10(dataAppareil[i]), Math.log10(dataReference[i])]);
			}

			const result = regression.polynomial(dataRegression, { order: this.props.degreRegression, precision: 12 });
			let ecartPredit = [];

			for (const iterator of dataRegression) {
				let appareilValue = Math.pow(10, iterator[1]);
				let referenceValue = Math.pow(10, iterator[0]);
				let modelisationValue = Math.pow(10, result.predict(iterator[0])[1]);
				let ecart = referenceValue - modelisationValue;
				ecart = (100 * ecart) / appareilValue;
				ecartPredit.push(ecart);
			}

			console.log("result");
			console.log(result);
			// this.setState({coefModelisation:result.equation})
			this.props.remonterCoef(result.equation);
			return [
				ecartPredit,
				{
					nom: this.props.data.nom,
					dateEtalonnage: this.props.data.dateEtalonnage,
					coefs: result.equation,
					degre: this.props.degreRegression,
				},
			];
		} else if (this.props.data.domaine == "TEMPERATURE") {
			for (let i = 0; i < dataAppareil.length; i++) {
				dataRegression.push([dataAppareil[i], dataReference[i]]);
			}
			let ecartPredit = [];

			for (const iterator of dataRegression) {
				let appareilValue = iterator[0];
				let referenceValue = iterator[1];
				let modelisationValue = interpoler(iterator[0], dataRegression);
				let ecart = appareilValue - modelisationValue;
				ecartPredit.push(ecart);
			}

			return [ecartPredit, { nom: this.props.data.nom, dateEtalonnage: this.props.data.dateEtalonnage }];
		}
	}

	componentDidMount() {
	
		let data = this.props.data;
	
		// this.regression();
		if (data.domaine == "VIDE") {

			this.myChart = new Chart(this.canvasRef.current, {
				type: "line",
				options: {
					responsive: true,
					scales: {
						xAxes: [
							{
								display: true,
							},
						],
						yAxes: [
							{
								display: true,
								ticks: { min: -70, max: 70 },
							},
						],
					},
				},
				data: {
					labels: data.appareil,

					datasets: [
						{
							label: this.props.title,
							data: data.ecart,
							backgroundColor: this.props.color,
							borderColor: "rgb(255, 99, 132)",
							fill: false,
							pointRadius: 1,
						},
						{
							label: "incertitude +",
							backgroundColor: "rgb(165,165,165,0.5)",
							borderColor: "transparent",
							data: data.incertitudePlus,
							fill: 0,
							tension: 0.2,
							pointRadius: 1,
						},
						{
							label: "incertitude -",
							backgroundColor: "rgb(165,165,165,0.5)",
							borderColor: "transparent",
							data: data.incertitudeMoins,
							fill: 0,
							tension: 0.2,
							pointRadius: 1,
						},
						{
							label: "regression",
							data: this.regression()[0],
							backgroundColor: this.props.color,
							borderDash: [10, 5],
							borderWidth: 1,
							borderColor: "rgb(1,1,1)",
							fill: false,
							pointRadius: 1,
						},
					],
				},
			});


		} else {
			this.myChart = new Chart(this.canvasRef.current, {
				type: "line",
				options: {
					responsive: true,
					scales: {
						xAxes: [
							{
								display: true,
							},
						],
						yAxes: [
							{
								display: true,
								ticks: { min: -0.6, max: 0.6 },
							},
						],
					},
				},
				data: {
					labels: data.appareil,

					datasets: [
						{
							label: this.props.title,
							data: data.ecart,
							backgroundColor: this.props.color,
							borderColor: "rgb(255, 99, 132)",
							fill: false,
							pointRadius: 1,
						},
						{
							label: "incertitude +",
							backgroundColor: "rgb(165,165,165,0.5)",
							borderColor: "transparent",
							data: data.incertitudePlus,
							fill: 0,
							tension: 0.2,
							pointRadius: 1,
						},
						{
							label: "incertitude -",
							backgroundColor: "rgb(165,165,165,0.5)",
							borderColor: "transparent",
							data: data.incertitudeMoins,
							fill: 0,
							tension: 0.2,
							pointRadius: 1,
						},
						{
							label: "regression",
							data: this.regression()[0],
							backgroundColor: this.props.color,
							borderDash: [10, 5],
							borderWidth: 1,
							borderColor: "rgb(1,1,1)",
							fill: false,
							pointRadius: 1,
						},
					],
				},
			});
		}
	}
	render() {

		return (
				<canvas ref={this.canvasRef} />
			
				
		);
	}
}


