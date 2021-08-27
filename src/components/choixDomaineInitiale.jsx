import React, { useEffect, useState } from "react";
import { ajaxGet, ajaxPost } from "../helpers/ajax";
import etalons from "../dataArchive/etalons.txt";

export const ChoixDomaineInitiale = (props) => {
	const [selected, setSelected] = useState(null);
	const [domainePossible, setDomainePossible] = useState("");

	useEffect(() => {
		ajaxGet(etalons, (rep) => {
			let dataGet = rep.split("\n");
			dataGet.pop();
			// console.log(dataGet);
			const unique = [...new Set(dataGet.map((item) => JSON.parse(item).domaine))];
			setDomainePossible(unique);
		});
	}, []);

	return (
		<div>
			TODO nouvelle props domainechoisi pour la selection CSS
			{domainePossible
				? domainePossible.map((item, index) => (
						<button
							key={index}
							onClick={() => {
								props.choixDomaine(item);
								setSelected(index);
							}}
							className={selected == index || true ? "clicked" : null}
						>
							{item}
						</button>
				  ))
				: null}
		</div>
	);
};
