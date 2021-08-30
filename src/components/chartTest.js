import React from "react";
import Chart from "chart.js/auto";
// import { ajaxPost } from "../helpers/ajax";
// import regression from "../helpers/regression";
import { interpoler, regressionExponential } from "../helpers/functionUtilitaire";

let dataTest = require("../data/dataTest.json");
console.log(dataTest);
// console.log(regression);
export class LineChartEcart extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		// this.state = { coefModelisation: null };
	}

	componentDidUpdate() {
		console.log("update");
		// if (this.props.data.domaine == "VIDE") {
			console.log(this.myChart.options);
		// 	this.myChart.options.scales.yAxes[0].ticks.min = -70;
		// 	this.myChart.options.scales.yAxes[0].ticks.max = 70;
		// }
		// if (this.props.data.domaine == "TEMPERATURE") {
			// this.myChart.options.scales.yAxes[0].ticks.min = 0;
			// this.myChart.options.scales.yAxes[0].ticks.max = 10.6;
		// }
		// this.myChart.data.labels = this.props.data.appareil;
		// this.myChart.data.datasets[0].data = this.props.data.ecart;
		// this.myChart.data.datasets[1].data = this.props.data.incertitudePlus;
		// this.myChart.data.datasets[2].data = this.props.data.incertitudeMoins;
		// this.myChart.data.datasets[3].data = this.regression()[0];
		this.myChart.update();
	}

	// regression() {
	// 	let dataRegression = [];
	// 	let dataAppareil = [...this.props.data.appareil];
	// 	let dataReference = [...this.props.data.reference];

	// 	if (this.props.data.domaine == "VIDE") {
	// 		for (let i = 0; i < dataAppareil.length; i++) {
	// 			dataRegression.push([Math.log10(dataAppareil[i]), Math.log10(dataReference[i])]);
	// 		}

	// 		const result = regression.polynomial(dataRegression, { order: this.props.degreRegression, precision: 12 });
	// 		let ecartPredit = [];

	// 		for (const iterator of dataRegression) {
	// 			let appareilValue = Math.pow(10, iterator[1]);
	// 			let referenceValue = Math.pow(10, iterator[0]);
	// 			let modelisationValue = Math.pow(10, result.predict(iterator[0])[1]);
	// 			let ecart = referenceValue - modelisationValue;
	// 			ecart = (100 * ecart) / appareilValue;
	// 			ecartPredit.push(ecart);
	// 		}

	// 		console.log("result");
	// 		console.log(result);
	// 		// this.setState({coefModelisation:result.equation})
	// 		this.props.remonterCoef(result.equation);
	// 		return [
	// 			ecartPredit,
	// 			{
	// 				nom: this.props.data.nom,
	// 				dateEtalonnage: this.props.data.dateEtalonnage,
	// 				coefs: result.equation,
	// 				degre: this.props.degreRegression,
	// 			},
	// 		];
	// 	} else if (this.props.data.domaine == "TEMPERATURE") {
	// 		for (let i = 0; i < dataAppareil.length; i++) {
	// 			dataRegression.push([dataAppareil[i], dataReference[i]]);
	// 		}
	// 		let ecartPredit = [];

	// 		for (const iterator of dataRegression) {
	// 			let appareilValue = iterator[0];
	// 			let referenceValue = iterator[1];
	// 			let modelisationValue = interpoler(iterator[0], dataRegression);
	// 			let ecart = appareilValue - modelisationValue;
	// 			ecartPredit.push(ecart);
	// 		}

	// 		return [ecartPredit, { nom: this.props.data.nom, dateEtalonnage: this.props.data.dateEtalonnage }];
	// 	}
	// }

	componentDidMount() {
fetch('http://localhost/API_test/get.php')
.then(reponse=>reponse.json())
.then(reponse=>traitementReponseApi(reponse))
.catch(error=>console.error(error))

const traitementReponseApi=(_reponse)=>{
	console.log('_reponse');
	console.log(_reponse);
	_reponse.forEach(etalonnage => {
		console.log(etalonnage)
		console.log(new Date(etalonnage.dateEtalonnage).toLocaleDateString('Fr-fr'))

		// console.log(JSON.parse(etalonnage.ptsEtalonnage))
});
	// console.log(_reponse)
}




		let dataRegression = [];
		let dataAppareil = [...dataTest.appareil];
		let dataReference = [...dataTest.reference];
		let dataEcart = [...dataTest.ecart];
		// let dataReference = [...this.props.data.reference];

		for (let i = 0; i < dataAppareil.length; i++) {
			dataRegression.push([dataAppareil[i], dataReference[i]]);
		}
		let ecartPredit = [];

		for (const iterator of dataRegression) {
			let appareilValue = iterator[0];
			let referenceValue = iterator[1];
			let modelisationValue = interpoler(iterator[0], dataRegression);
			console.log(interpoler(1200, dataRegression));
			let ecart = appareilValue - modelisationValue;
			ecartPredit.push(ecart);
		}
		// console.log(ecartPredit);
		// console.log(
		// 	interpoler(1.5, [
		// 		[1, 1],
		// 		[2, 4],
		// 	])
		// );

		function randNormal(mean = 2, std = 0.2) {
			let u = 0,
				v = 0;
			while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
			while (v === 0) v = Math.random();
			let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

			return num * std + mean;
		}
		let meanCherché = 1;
		let stdCherché = 0.2;
		let sum = 0;
		let sum2 = 0;
		let nbrMesure = 100;
		let arrayY = [];
		let arrayX = [];
		let arrayZ = [];
		let arrayXY = [];
		console.log("mean visé = ", meanCherché);
		console.log("std visé = ", stdCherché);

		for (let index = 0; index < nbrMesure; index++) {
            const valeurAleatDataAppareil=Math.random()*(Math.max(...dataAppareil)-Math.min(...dataAppareil))+Math.min(...dataAppareil)
            // arrayX.push(valeurAleatDataAppareil);
const Ycorrespondant=interpoler(valeurAleatDataAppareil,dataRegression)
			// const valeur = randNormal(meanCherché, stdCherché);
			const Y = randNormal(Ycorrespondant, 0.11)-valeurAleatDataAppareil;
            if (valeurAleatDataAppareil>1290) console.log("x= ",valeurAleatDataAppareil,"y = ",Y)
			// arrayY.push(Y);
            arrayXY.push({x:valeurAleatDataAppareil,y:Y,z:(Ycorrespondant-valeurAleatDataAppareil)})
			// const ecartMoyenne = (valeur - 1) * (valeur - 1);
			// sum += valeur;
			// sum2 += ecartMoyenne;
			// console.log(valeur)
			// console.log(index)
		}
        let tptp = arrayXY.sort((a, b) => {
            if (a.x > b.x) return 1;
            if (a.x < b.x) return -1;
            return 0;
        });
        // console.log(JSON.stringify(tptp))
        for (const iterator of tptp) {
            arrayX.push(iterator.x)
            arrayY.push(iterator.y)
            arrayZ.push(iterator.z)
        }
        // console.log(arrayX)
		// const moyenne = sum / nbrMesure;
		// const moyenne2 = sum2 / (nbrMesure - 1);
		// console.log("moyenne", moyenne);
		// console.log("std", Math.sqrt(moyenne2));
// console.log(JSON.stringify(arrayX))
		this.myChart = new Chart(this.canvasRef.current, {
			type: "scatter",
			options: {
				responsive: true,
				scales:{
					y:{
						min:-1,
						max:1
					}
				}
				
			},
			data: {
				labels: arrayX,
				// labels: [1,3,5,7,9],

				datasets: [
					{
						label: "incertitude +",
						backgroundColor: "rgb(12,12,12)",
						borderColor: "rgb(12,12,12)",
						data: arrayZ,
						fill: false,
                        type:"line",
						tension: 0.2,
						pointRadius: 1,
					},
					{
						label: "essai",
						data: arrayY,
						// data: [1,2,3,4,5],
						backgroundColor: "rgb(255, 255, 199)",
						borderColor: "rgb(255, 99, 132)",
						fill: false,
						pointRadius: 5,
						pointStyle: "crossRot",
					},
					// {
					// 	label: "incertitude +",
					// 	backgroundColor: "rgb(12,12,12)",
					// 	borderColor: "rgb(12,12,12)",
					// 	data: arrayZ,
					// 	fill: false,
                    //     type:"line",
					// 	tension: 0.2,
					// 	pointRadius: 1,
					// },
					// {
					// 	label: "incertitude -",
					// 	backgroundColor: "rgb(165,165,165,0.5)",
					// 	borderColor: "transparent",
					// 	data: data.incertitudeMoins,
					// 	fill: 0,
					// 	tension: 0.2,
					// 	pointRadius: 1,
					// },
					// {
					// 	label: "regression",
					// 	data: this.regression()[0],
					// 	backgroundColor: this.props.color,
					// 	borderDash: [10, 5],
					// 	borderWidth: 1,
					// 	borderColor: "rgb(1,1,1)",
					// 	fill: false,
					// 	pointRadius: 1,
					// },
				],
			},
		});

		// }
		// else {
		// 	this.myChart = new Chart(this.canvasRef.current, {
		// 		type: "line",
		// 		options: {
		// 			responsive: true,
		// 			scales: {
		// 				xAxes: [
		// 					{
		// 						display: true,
		// 					},
		// 				],
		// 				yAxes: [
		// 					{
		// 						display: true,
		// 						ticks: { min: -0.6, max: 0.6 },
		// 					},
		// 				],
		// 			},
		// 		},
		// 		data: {
		// 			labels: data.appareil,

		// 			datasets: [
		// 				{
		// 					label: this.props.title,
		// 					data: data.ecart,
		// 					backgroundColor: this.props.color,
		// 					borderColor: "rgb(255, 99, 132)",
		// 					fill: false,
		// 					pointRadius: 1,
		// 				},
		// 				{
		// 					label: "incertitude +",
		// 					backgroundColor: "rgb(165,165,165,0.5)",
		// 					borderColor: "transparent",
		// 					data: data.incertitudePlus,
		// 					fill: 0,
		// 					tension: 0.2,
		// 					pointRadius: 1,
		// 				},
		// 				{
		// 					label: "incertitude -",
		// 					backgroundColor: "rgb(165,165,165,0.5)",
		// 					borderColor: "transparent",
		// 					data: data.incertitudeMoins,
		// 					fill: 0,
		// 					tension: 0.2,
		// 					pointRadius: 1,
		// 				},
		// 				{
		// 					label: "regression",
		// 					data: this.regression()[0],
		// 					backgroundColor: this.props.color,
		// 					borderDash: [10, 5],
		// 					borderWidth: 1,
		// 					borderColor: "rgb(1,1,1)",
		// 					fill: false,
		// 					pointRadius: 1,
		// 				},
		// 			],
		// 		},
		// 	});
		// }
		// this.myChart.options.scales.yAxes.ticks.min = 0;
		// this.myChart.options.scales.yAxes.ticks.max = 10.6;
	}
	render() {
		return <canvas ref={this.canvasRef} />;
	}
}
