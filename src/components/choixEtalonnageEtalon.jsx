import React from "react";
export const ChoixEtalonnageEtalon = ({ choix, etalons }) => {
	const [indexChoisi, setIndex] = React.useState(0);
	const [dateChoisie, setDate] = React.useState("");
	console.log(etalons);
	console.log(indexChoisi);
	const setDateWithSlider = (index) => {
		console.log("index", index);
		setIndex(index)
		choix(etalons[index].dateEtalonnage);
		setDate(etalons[index].dateEtalonnage);
		// setDate(etalons[index]);
	};
	return (
		<div>
			{etalons.map((e, index) => (
				<button
					key={index}
					onClick={() => {
						setDate(e.dateEtalonnage)
						choix(e.dateEtalonnage);
						console.log(index);
						setIndex(index);
					}}
					className={indexChoisi == index ? "clicked" : null}
				>
					{e.dateEtalonnage}
					
				</button>
			))}
			{/* <button onClick={lecture}>animation!</button> */}
			<input
				type="range"
				onChange={(e) => setDateWithSlider(e.target.value)}
				className="custom-slider"
				min="0"
				max={etalons.length - 1}
				value={indexChoisi}
				id="customrange1"
			></input>
			<h3>{dateChoisie}</h3>
			{/* <h1>{this.state.dateSelectionne}</h1> */}
		</div>
	);
};
