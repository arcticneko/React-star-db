import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner';

export default class PersonDetails extends Component {
	
	swapiService = new SwapiService();

	state = {
		person: null,
		loaded: false
	}

	componentDidMount() {
		this.updatePerson(); // если компонент уже был проинициализирован
	}

	componentDidUpdate(prevProps) {
		if (this.props.personId !== prevProps.personId) { // проверить изменение свойства. иначе зациклится обновление компонента как только он обновился
			this.updatePerson();
		}
	}

	updatePerson() {
		const { personId } = this.props;
		if (!personId) {
			return; // ничего не делать в случае null
		}

		this.setState({
			loaded: false
		})

		this.swapiService.getPerson(personId).then((person) => {
			this.setState({
				person,
				loaded: true
			})
		})
	}

  render() {

		if (!this.state.person) {
			return <span>Select a person from the list</span>
		}

		if (!this.state.loaded) {
			return <Spinner />;
		}

		const { id, name, gender, birthYear, eyeColor } = this.state.person;

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{ gender }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{ birthYear }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{ eyeColor }</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
