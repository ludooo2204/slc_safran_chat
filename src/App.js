import logo from "./logo.svg";
import "./App.css";
import { LineChartEcart } from "./components/chartTest";
import ImportData from "./components/ImportData";
import sec02cImg from "./sec02c.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li class="deroulant">
							<a href="#">Etalons &ensp;</a>
							<ul class="sous">
								<li>
									<Link to="/Vide">Vide</Link>
								</li>
								<li>
									<Link to="/users1">Temperature</Link>
								</li>
								<li>
									<Link to="/users2">Debit</Link>
								</li>
							</ul>
						</li>

						<li>
							<Link to="/importData">Nouvel Etalonnage</Link>
						</li>
						<li>
							<Link to="/">Accueil</Link>
						</li>
						<li>
							<a href="http://planningludo.000webhostapp.com/planning" target="_blank">
								Planning
							</a>
						</li>
					</ul>
				</nav>

				<Switch>
					<Route path="/Vide">
						<Vide />
					</Route>
					<Route path="/users1">
						<Users1 />
					</Route>
					<Route path="/importData">
						<ImportData />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

const Home = () => {
	return (
		<div
			style={{
				height: "100vh",
			}}
		>
			<EtalonCard />
		</div>
	);
};
const About = () => {
	return <h2>About</h2>;
};
const EtalonCard = () => {
	return (
		<div
			style={{
				display: "flex",
				width: "25%",
				background: "#ffffef",
				height: "75%",
				borderRadius: 20,
				borderStyle: "solid",
				borderWidth:2,
				borderColor: "black",
				flex: 1,
				justifyContent: "center",
			// padding: "1%",
			margin: "20px",
				flexDirection: "column",
			}}
		>
			<div style={{ flex: 1,
				//  background: "red",
				  display: "flex", justifyContent: "center",background: "#ededed",borderTopRightRadius:20,borderTopLeftRadius:20 }}>
				<img style={{  height: "200px", width: "180px",margin:10, }} src={sec02cImg}></img>
			</div>

			<div style={{ flex: 10, background: "#f7f7f7", display: "flex",flexDirection:"column", justifyContent: "center",alignItems:"center" }}>
				<div >date d'etalonnage : 11/2020</div>
				<div>periodicité : 12 mois</div>
				<div>plage : de 1e-7 mbar à 5e-3 mbar</div>
			</div>
			<div style={{ color:'white',flex: 3, background: "#ffcc54", display: "flex",justifyContent: "center",alignItems:"center",borderBottomRightRadius:20,borderBottomLeftRadius:20, }}>
				3
			</div>
		</div>
	);
};
const Vide = () => {
	return (
		<div>
			<LineChartEcart
			// domaine={this.state.domaine}
			// remonterCoef={(e) => this.getCoef(e)}
			// // remonterCoef={(e) => this.getCoef(e)}
			// data={data}
			// modelisation={this.state.modelisation}
			// degreRegression={this.state.degreRegression}
			// title="Ecart/appareil"
			// color="#70CAD1"
			/>
		</div>
	);
};
const Users1 = () => {
	return <h2>Users11</h2>;
};

export default App;
