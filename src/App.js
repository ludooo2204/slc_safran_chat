import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li class="deroulant">
							<a href="#">users &ensp;</a>
							<ul class="sous">
								<li>
									<Link to="/users0">Users0</Link>
								</li>
								<li>
									<Link to="/users1">Users1</Link>
								</li>
								<li>
									<Link to="/users2">Users2</Link>
								</li>
							</ul>
						</li>
						<li class="deroulant">
							<a href="#">users &ensp;</a>
							<ul class="sous">
								<li>
									<Link to="/users0">Users0</Link>
								</li>
								<li>
									<Link to="/users1">Users1</Link>
								</li>
								<li>
									<Link to="/users2">Users2</Link>
								</li>
							</ul>
						</li>

						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<a href="http://planningludo.000webhostapp.com/planning" target="_blank">
								Planning
							</a>
						</li>
					</ul>
				</nav>

				{/* <nav>
					<ul>
					
						<li className="deroulant">
							USERS
							<ul className="sousMenu">
								<li>
									<Link to="/users0">Users0</Link>
								</li>
								<li>
									<Link to="/users1">Users1</Link>
								</li>
							</ul>
						</li>
					</ul>
				</nav> */}
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/users0">
						<Users0 />
					</Route>
					<Route path="/users1">
						<Users1 />
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
	return <h2>Home</h2>;
};
const About = () => {
	return <h2>About</h2>;
};
const Users0 = () => {
	return <h2>Users00</h2>;
};
const Users1 = () => {
	return <h2>Users11</h2>;
};

export default App;
