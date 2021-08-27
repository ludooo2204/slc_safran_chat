import React, { useState } from "react";

export const ChoixEtalon = ({ etalons, domaine, choix, choixTc }) => {
	const typeTcPossible = ["TYPE K", "TYPE S", "TYPE N"];
	const [selected, setSelected] = useState(null);

	let unique = [];
	if (etalons && domaine) {
		const domaineFiltree = etalons.filter((e) => JSON.parse(e).domaine == domaine);
		unique = [...new Set(domaineFiltree.map((item) => JSON.parse(item).nom))];
	}

	return (
		<div>
			{etalons && domaine
				? unique.map((e, index) => (
						<button
							key={index}
							onClick={() => {
								choix(e);
								setSelected(index);
							}}
							className={selected == index ? "clicked" : null}
						>
							{e}
						</button>
				  ))
				: null}

			{unique.indexOf("2257775−AMS") != -1 || unique.indexOf("412191") != -1 ? (
				<div>
					{typeTcPossible.map((item, index) => (
						<button
							key={index}
							onClick={() => {
								choixTc(item);
								setSelected(index);
							}}
							className={selected == index ? "clicked" : null}
						>
							{item}
						</button>
					))}
				</div>
			) : null}
		</div>
	);
};
