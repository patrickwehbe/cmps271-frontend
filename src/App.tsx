import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/home.view";
import Value from "./views/value.view";
import JobsList from "./views/jobs.view";
import Header from "./components/Header";
import JobsPage from "./views/JobsPage";
import Register from "./views/session/register.view";

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/value" element={<Value />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/jobs"
						element={
							<>
								<Header />
								<JobsPage />
							</>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
