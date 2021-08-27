import React from "react";

export class ChoixDomaine extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			videSelected: false,
			debitSelected: false,
			temperatureSelected: false,
			electriqueSelected: false,
			domainePossible: "",
		};
	}

	render() {
		return (
			<div>
				<button
					onClick={() => {
						this.props.choixDomaine("VIDE");
						this.setState({
							videSelected: !this.state.videSelected,
							debitSelected: false,
							temperatureSelected: false,
							electriqueSelected: false,
						});
					}}
					className={this.state.videSelected ? "clicked" : null}
				>
					VIDE
				</button>
				<button
					onClick={() => {
						this.props.choixDomaine("DEBIT");
						this.setState({
							debitSelected: !this.state.debitSelected,
							videSelected: false,
							temperatureSelected: false,
							electriqueSelected: false,
						});
					}}
					className={this.state.debitSelected ? "clicked" : null}
				>
					DEBIT
				</button>
				<button
					onClick={() => {
						this.props.choixDomaine("TEMPERATURE");
						this.setState({
							temperatureSelected: !this.state.temperatureSelected,
							debitSelected: false,
							videSelected: false,
							electriqueSelected: false,
						});
					}}
					className={this.state.temperatureSelected ? "clicked" : null}
				>
					TEMPERATURE
				</button>
				<button
					onClick={() => {
						this.props.choixDomaine("ELECTRIQUE");
						this.setState({
							electriqueSelected: !this.state.electriqueSelected,
							debitSelected: false,
							temperatureSelected: false,
							videSelected: false,
						});
					}}
					className={this.state.electriqueSelected ? "clicked" : null}
				>
					ELECTRIQUE
				</button>

				{this.state.domainePossible}
			</div>
		);
	}
}
