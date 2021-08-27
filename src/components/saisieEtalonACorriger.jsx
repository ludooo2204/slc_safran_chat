import React from "react";
import { interpoler } from "../helpers/functionUtilitaire";

export const SaisieEtalonACorriger = ({ data, coef, nom }) => {
	const [valueSaisie, setValue] = React.useState("");
	// const [coefs, setCoefs] = React.useState(null);

	let valueCorrige, incertitudeInterpolee;

	console.log("coef SaisieEtalonACorriger");
	console.log(coef);
	
	let arrayInterpolationIncertitude = [];
	for (let i = 0; i < data.incertitude.length; i++) {
		arrayInterpolationIncertitude.push([data.appareil[i], data.incertitude[i]]);
	}

	//TODO voir pour s'adapter au nombre de coef

	if (data.domaine == "VIDE" && coef) {
		// console.log("ca marche");
		let valueSaisiePuiss10 = Math.log10(valueSaisie);
		// console.log(valueSaisiePuiss10);
		valueCorrige =
			Math.pow(parseFloat(valueSaisiePuiss10), 6) * coef[0] +
			Math.pow(parseFloat(valueSaisiePuiss10), 5) * coef[1] +
			Math.pow(parseFloat(valueSaisiePuiss10), 4) * coef[2] +
			Math.pow(parseFloat(valueSaisiePuiss10), 3) * coef[3] +
			Math.pow(parseFloat(valueSaisiePuiss10), 2) * coef[4] +
			parseFloat(valueSaisiePuiss10) * coef[5] +
			coef[6];
		// console.log(valueCorrige);
		valueCorrige = Math.pow(10, valueCorrige);
		// console.log(valueCorrige);
		incertitudeInterpolee = interpoler(valueSaisie, arrayInterpolationIncertitude);
		// console.log(valueCorrige);
	} else if (data.domaine == "TEMPERATURE") {
		let dataRegression = [];
		console.log(data.appareil);
		for (let i = 0; i < data.appareil.length; i++) {
			dataRegression.push([data.appareil[i], data.reference[i]]);
		}

		valueCorrige = interpoler(valueSaisie, dataRegression);
		console.log(valueCorrige);
		incertitudeInterpolee = interpoler(valueSaisie, arrayInterpolationIncertitude);
	}
	if (coef) {
		return (
			<div>
				<h1>valeur a saisir pour le {nom}</h1>
				<br />

				<input type="text" value={valueSaisie} onChange={(event) => setValue(event.target.value)} placeholder="valeur....."></input>
				<input
					type="range"
					value={valueSaisie}
					className="inputRange"
					onChange={(event) => setValue(event.target.value)}
					className="custom-slider"
					min={Math.min(...data.appareil)}
					max={Math.max(...data.appareil)}
					step={0.00001}
				></input>
				{data.domaine == "VIDE" ? (
					<h5>
						Valeur {nom} {parseFloat(valueSaisie).toExponential(2)} mbar
					</h5>
				) : (
					<h5>
						Valeur {nom} {parseFloat(valueSaisie).toFixed(2)} °C
					</h5>
				)}
				{data.domaine == "VIDE" ? (
					<h5>
						Valeur corrigé {valueCorrige.toExponential(2)} mbar ± {incertitudeInterpolee.toFixed(1)} %{" "}
					</h5>
				) : (
					<h5>
						Valeur corrigé {valueCorrige.toFixed(2)} °C ± {incertitudeInterpolee.toFixed(2)} °C{" "}
					</h5>
				)}
			</div>
		);
	} else {
		return <div>nada</div>;
	}
};
// export const SaisieEtalonACorriger = ({ data, coef, nom }) => {
// 	let valueCorrige, incertitudeInterpolee;
// 	console.log("coef SaisieEtalonACorriger");
// 	console.log(coef);
// 	let arrayInterpolationIncertitude = [];
// 	for (let i = 0; i < data.incertitude.length; i++) {
// 		arrayInterpolationIncertitude.push([data.appareil[i], data.incertitude[i]]);
// 	}

// 	//TODO voir pour s'adapter au nombre de coef
// 	const [valueSaisie, setValue] = React.useState("");
// 	if (data.domaine == "VIDE" && coef) {
// 		// console.log("ca marche");
// 		let valueSaisiePuiss10 = Math.log10(valueSaisie);
// 		// console.log(valueSaisiePuiss10);
// 		valueCorrige =
// 			Math.pow(parseFloat(valueSaisiePuiss10), 6) * coef[0] +
// 			Math.pow(parseFloat(valueSaisiePuiss10), 5) * coef[1] +
// 			Math.pow(parseFloat(valueSaisiePuiss10), 4) * coef[2] +
// 			Math.pow(parseFloat(valueSaisiePuiss10), 3) * coef[3] +
// 			Math.pow(parseFloat(valueSaisiePuiss10), 2) * coef[4] +
// 			parseFloat(valueSaisiePuiss10) * coef[5] +
// 			coef[6];
// 		// console.log(valueCorrige);
// 		valueCorrige = Math.pow(10, valueCorrige);
// 		// console.log(valueCorrige);
// 		incertitudeInterpolee = interpoler(valueSaisie, arrayInterpolationIncertitude);
// 		// console.log(valueCorrige);
// 	} else if (data.domaine == "TEMPERATURE") {
// 		let dataRegression = [];
// 		console.log(data.appareil);
// 		for (let i = 0; i < data.appareil.length; i++) {
// 			dataRegression.push([data.appareil[i], data.reference[i]]);
// 		}

// 		valueCorrige = interpoler(valueSaisie, dataRegression);
// 		console.log(valueCorrige);
// 		incertitudeInterpolee = interpoler(valueSaisie, arrayInterpolationIncertitude);
// 	}
// 	if (coef) {
// 		return (
// 			<div>
// 				<h1>valeur a saisir pour le {nom}</h1>
// 				<br />

// 				<input type="text" value={valueSaisie} onChange={(event) => setValue(event.target.value)} placeholder="valeur....."></input>
// 				<input
// 					type="range"
// 					value={valueSaisie}
// 					className="inputRange"
// 					onChange={(event) => setValue(event.target.value)}
// 					className="custom-slider"
// 					min={Math.min(...data.appareil)}
// 					max={Math.max(...data.appareil)}
// 					step={0.00001}
// 				></input>
// 				{data.domaine == "VIDE" ? (
// 					<h5>
// 						Valeur {nom} {parseFloat(valueSaisie).toExponential(2)} mbar
// 					</h5>
// 				) : (
// 					<h5>
// 						Valeur {nom} {parseFloat(valueSaisie).toFixed(2)} °C
// 					</h5>
// 				)}
// 				{data.domaine == "VIDE" ? (
// 					<h5>
// 						Valeur corrigé {valueCorrige.toExponential(2)} mbar ± {incertitudeInterpolee.toFixed(1)} %{" "}
// 					</h5>
// 				) : (
// 					<h5>
// 						Valeur corrigé {valueCorrige.toFixed(2)} °C ± {incertitudeInterpolee.toFixed(2)} °C{" "}
// 					</h5>
// 				)}
// 			</div>
// 		);
// 	} else {
// 		return <div>nada</div>;
// 	}
// };
