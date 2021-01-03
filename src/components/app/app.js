import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
// import ItemList from '../item-list';
import ErrorBoundry from '../error-boundry';

// import PeoplePage from '../people-page/people-page';
import Row from '../row';
import ItemDetails, { Record } from '../item-details';
import SwapiService from '../../services/swapi-service'

import './app.css';

export default class App extends Component {

	swapiService = new SwapiService();

	state = {
		showRandomPlanet: true,
		hasError: false,
	};

	toggleRandomPlanet = () => {
		this.setState((state) => {
			return {
				showRandomPlanet: !state.showRandomPlanet
			}
		});
	};


	componentDidCatch() {
		this.setState({
			hasError: true
		})
	}

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />
		}

		const planet = this.state.showRandomPlanet ?
			<RandomPlanet /> : null;

		const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

		const personDetails = (
			<ItemDetails itemId={11}
			getData={getPerson}
			getImageUrl={getPersonImage}>
				<Record field='gender' label='Gender'/>
				<Record field='eyeColor' label='Eye Color'/>
			</ItemDetails>
		)

		const starshipDetails = (
			<ItemDetails itemId={5}
			getData={getStarship}
			getImageUrl={getStarshipImage}>
				<Record field='model' label='Model'/>
				<Record field='length' label='Length'/>
				<Record field='costInCredits' label='Cost'/>
			</ItemDetails>
		)

		return (
			<ErrorBoundry>
				<div className="stardb-app">
					 <Header />
					{planet}
					
					<button
						className="toggle-planet btn btn-warning btn-lg"
						onClick={this.toggleRandomPlanet}>
						Toggle Random Planet
        	</button>

					<Row left={personDetails} right={starshipDetails}/>

				</div>
			</ErrorBoundry>
		);
	}
}
