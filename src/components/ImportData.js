import React from "react";
import { comparer, interpoler } from "../helpers/functionUtilitaire";
import regression from "../helpers/regression";
import { ajaxGet, ajaxPost } from "../helpers/ajax";
import { ChoixDomaine } from "./choixDomaine";
import axios from "axios";

const ImportData = () => {
	const [capteurSelectionne, selectionCapteur] = React.useState("");
	const [areaValue, setareaValue] = React.useState("");
	const [dateValue, setDateValue] = React.useState("");
	const [numCertificat, setNumCertificat] = React.useState("");
	const [domaine, setDomaine] = React.useState("");
	const [typeTc, setTypeTc] = React.useState("");

	// const handleSave = (e) => {
	// 	e.preventDefault();
	// 	let taskObj = {};
	// 	taskObj["nom"] = taskName;
	// 	taskObj["description"] = description;
	// 	taskObj["categorie"] = categorie;
	// 	console.log(taskObj);
	// 	post(taskObj);
	// };

	const post = (_data) => {

		axios
			.post("https://localhost/API_test/post.php", _data)
			.then((response) => {
				console.log(response);
				window.location.reload();
			})
			.catch((error) => {
				console.log(JSON.stringify(error));
			});
	};

	const handleChange = (event) => {
		console.log(event.target.value);
		selectionCapteur(event.target.value);
	};
	const handleChangeTC = (event) => {
		console.log(event.target.value);
		setTypeTc(event.target.value);
	};

	const getValue = () => {
		const handleVideData = (data) => {
			for (const iterator of data) {
				reference.push(iterator[1]);
				appareil.push(iterator[2]);
				// ecart.push(iterator[5]);
				incertitude.push(iterator[7]);
				// incertitudePlus.push(iterator[5] + iterator[7]);
				// incertitudeMoins.push(-iterator[7] + iterator[5]);
				// referenceLog.push(Math.log10(iterator[1]));
				// appareilLog.push(Math.log10(iterator[2]));
			}
			let dataTraitee = [reference, appareil, incertitude];
			let dataToExport = {
				marquage: capteurSelectionne,
				reference: dataTraitee[0],
				appareil: dataTraitee[1],
				incertitude: dataTraitee[2],
				dateEtalonnage: new Date(dateValue).toDateString(),
				numCertificat: numCertificat,
				domaine: domaine,
				ptsEtalonnage:null,
				typeTc:null

			};
			console.log("dataToexport", dataToExport);
			let dataRegression = [];
			for (const row of data) {
				let coupleRefApp = row.slice(1, 3).map((test) => Math.log10(test));
				dataRegression.push(coupleRefApp.reverse());
			}

			console.log(dataRegression);
			const result = regression.polynomial(dataRegression, { order: 6, precision: 12 });
			console.log(result);
			console.log(result.equation);

			for (const iterator of dataRegression) {
				let appareilValue = Math.pow(10, iterator[1]);
				// console.log(appareilValue);
				let referenceValue = Math.pow(10, result.predict(iterator[0])[1]);
				// console.log(referenceValue);
				//   console.log(Math.pow(result.predict()));
				let ecart = appareilValue - referenceValue;
				// console.log(((100 * ecart) / appareilValue).toFixed(2) + "%");
			}
			return dataToExport;
		};
		const handleCalysData = (data) => {
			for (const iterator of data) {
				reference.push(iterator[1]);
				appareil.push(iterator[0]);
				// ecart.push(iterator[0] - iterator[1]);
				incertitude.push(iterator[2]);
				// incertitudePlus.push(iterator[0] - iterator[1] + iterator[2]);
				// incertitudeMoins.push(iterator[0] - iterator[1] - iterator[2]);
			}
			let dataTraitee = [reference, appareil, incertitude];
			let dataToExport = {
				marquage: capteurSelectionne,
				reference: dataTraitee[0],
				appareil: dataTraitee[1],
				incertitude: dataTraitee[2],
				dateEtalonnage: new Date(dateValue).toDateString(),
				numCertificat: numCertificat,
				domaine: domaine,
				typeTc: typeTc,
			};
			console.log("dataToexport", dataToExport);
			let dataRegression = [];
			for (const row of data) {
				let coupleRefApp = row.slice(0, 2);
				dataRegression.push(coupleRefApp);
			}

			console.log(dataRegression);
			console.log(interpoler(950, dataRegression).toFixed(2));

			console.log(dataToExport);
			return dataToExport;
		};
		let dataLigneNumber = [];
		let data = [];
		let reference = [];
		let appareil = [];
		let referenceLog = [];
		let appareilLog = [];
		let ecart = [];
		let incertitudePlus = [];
		let incertitudeMoins = [];
		let incertitude = [];
		let dataToExport;
		if (capteurSelectionne.includes("PRIM")) {
			let rows = areaValue.split("\n");
			console.log(rows);

			for (const row of rows) {
				let dataLigne = row.split(" ");
				dataLigneNumber = [];

				for (let valeur of dataLigne) {
					if (valeur.includes(",")) {
						valeur = valeur.replace(",", ".");
					}

					dataLigneNumber.push(parseFloat(valeur));
				}

				data.push(dataLigneNumber);
			}
			dataToExport = handleVideData(data);
		} else if (capteurSelectionne.includes("SEC02C")) {
			let rows = areaValue.split("\n");

			for (const row of rows) {
				let dataLigne = row.split(" ");
				let dataligneSec02C = [];
				dataligneSec02C[0] = parseFloat((dataLigne[0].slice(0, -3) + "E" + dataLigne[1]).replace(",", "."));
				dataligneSec02C[1] = parseFloat((dataLigne[2].slice(0, -3) + "E" + dataLigne[3]).replace(",", "."));
				dataligneSec02C[2] = parseFloat((dataLigne[4].slice(0, -3) + "E" + dataLigne[5]).replace(",", "."));
				dataligneSec02C[3] = parseFloat((dataLigne[6].slice(0, -3) + "E" + dataLigne[7]).replace(",", "."));
				dataligneSec02C[4] = parseFloat((dataLigne[8].slice(0, -3) + "E" + dataLigne[9]).replace(",", "."));
				dataligneSec02C[5] = parseFloat(dataLigne[10].replace(",", "."));
				dataligneSec02C[6] = parseFloat((dataLigne[11].slice(0, -3) + "E" + dataLigne[12]).replace(",", "."));
				dataligneSec02C[7] = parseFloat(dataLigne[13].replace(",", "."));
				dataLigneNumber = [];
				data.push(dataligneSec02C);
			}
			dataToExport = handleVideData(data);
		} else if (capteurSelectionne.includes("2257775−AMS")) {
			let rows = areaValue.split("\n");
			// console.log(rows);
			for (const row of rows) {
				let dataLigne = row.split(" ");
				for (let i = 0; i < dataLigne.length; i++) {
					if (dataLigne[i].includes(",")) {
						dataLigne[i] = dataLigne[i].replace(",", ".");
					}
				}
				// console.log(dataLigne);
				let dataligneCalys150 = [];
				dataligneCalys150[0] = parseFloat(dataLigne[0]);
				dataligneCalys150[1] = parseFloat(dataLigne[4]);
				dataligneCalys150[2] = parseFloat(dataLigne[9]);
				data.push(dataligneCalys150);
			}
			dataToExport = handleCalysData(data);
		}
		console.log("dataToExport");
		dataToExport.ptsEtalonnage=JSON.stringify({"reference":dataToExport.reference,"appareil":dataToExport.appareil,"incertitude":dataToExport.incertitude})

		console.log(dataToExport);
		// console.log(lolo);
post(dataToExport)
		// MAJdata(JSON.stringify(dataToExport));
		// console.log(dataToExport);
		// ajaxPost(
		// 	"post.php",
		// 	JSON.stringify(dataToExport),
		// 	function (rep) {
		// 		console.log(rep);
		// 	},
		// 	false
		// );
	};

	return (
		<div className="nouvelEtalonnage ">
			<ChoixDomaine choixDomaine={(e)=>setDomaine(e)}/>
			<textarea
				id="textArea"
				autoFocus={true}
				placeholder="placer vos valeurs ici..."
				value={areaValue}
				onChange={(event) => setareaValue(event.target.value)}
				rows="20"
				cols="60"
			></textarea>
			<br />
			<br />
			<label>Date d'etalonnage</label>
			<input
				type="date"
				value={dateValue}
				onChange={(event) => setDateValue(event.target.value)}
				placeholder="date d'etalonnage jj/mm/aaaa"
			></input>
			<br />
			<br />
			<label>Numero de certificat</label>
			<input type="text" value={numCertificat} onChange={(event) => setNumCertificat(event.target.value)} placeholder="N°FR....."></input>
			<br />
			<br />
			domaine choisi{domaine}
			<div>{capteurSelectionne}</div>
			<div className="form-check">
				<form>
					<input
						className="form-check-input"
						type="radio"
						id="1"
						value="SEC02C"
						checked={capteurSelectionne == "SEC02C" ? true : false}
						onChange={handleChange}
					/>
					SEC02C
					<input
						className="form-check-input"
						type="radio"
						id="2"
						value="PRIM02"
						checked={capteurSelectionne == "PRIM02" ? true : false}
						onChange={handleChange}
					/>
					PRIM02
					<input
						className="form-check-input"
						type="radio"
						id="3"
						value="PRIM03"
						checked={capteurSelectionne == "PRIM03" ? true : false}
						onChange={handleChange}
					/>
					PRIM03
					<input
						className="form-check-input"
						type="radio"
						id="4"
						value="2257775−AMS"
						checked={capteurSelectionne == "2257775−AMS" ? true : false}
						onChange={handleChange}
					/>
					2257775−AMS
				</form>
			</div>
			{capteurSelectionne == "2257775−AMS" ? (
				<div className="form-check">
					<form>
						<input
							className="form-check-input"
							type="radio"
							id="1"
							value="K"
							checked={typeTc == "K" ? true : false}
							onChange={handleChangeTC}
						/>
						TYPE K
						<input
							className="form-check-input"
							type="radio"
							id="2"
							value="N"
							checked={typeTc == "N" ? true : false}
							onChange={handleChangeTC}
						/>
						TYPE N
						<input
							className="form-check-input"
							type="radio"
							id="3"
							value="S"
							checked={typeTc == "S" ? true : false}
							onChange={handleChangeTC}
						/>
						TYPE S
					</form>
				</div>
			) : (
				<div></div>
			)}
			<button onClick={getValue}>Valider</button>
		</div>
	);
};

export default ImportData;
