import React from "react";
export const Tableau = ({ data }) => {
	let dataFour = data;

	if (dataFour) {
		const titre = ["Appareil", "etalon", "ecart", "incertitude"];
		return (
			<div >
				<table>
					<thead>
						<tr>
							{titre.map((row) => (
								<th key={Math.random()}>{row}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{dataFour.appareil.map((pt, index) => (
							<tr key={Math.random()}>
								<th key={Math.random()}>
									{Math.abs(dataFour.appareil[index]) < 0.01
										? dataFour.appareil[index].toExponential()
										: dataFour.appareil[index]}
								</th>
								<th key={Math.random()}>
									{Math.abs(dataFour.reference[index]) < 0.01
										? dataFour.reference[index].toExponential()
										: dataFour.reference[index]}
								</th>
								<th key={Math.random()}>
									{Math.abs(dataFour.ecart[index]) < 0.01
										? dataFour.ecart[index].toExponential()
										: dataFour.ecart[index]}
								</th>
								<th key={Math.random()}>
									{Math.abs(dataFour.incertitude[index]) < 0.01
										? dataFour.incertitude[index].toExponential()
										: dataFour.incertitude[index]}
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	} else return <h1>EN ATTENTE</h1>;
};
