// getResourse('https://swapi.dev/api/people/1/')
// 	.then((body) => {
// 		console.log(body);
// 	})
// 	.catch((err) => {
// 		console.error('Could not fetch', err)
// 	})


export default class SwapiService {

	_apiBase = 'https://swapi.dev/api';

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);
		// res.ok подразумевает что вернули какой-то из 200х кодов
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`)
		}
		return await res.json();
	}

	async getAllPeople() {
		const res = await this.getResource(`/people/`);
		return res.results.map(this._transformPerson);
	}

	async getPerson(id) {
		const person = await this.getResource(`/people/${id}/`)
		return this._transformPerson(person)
	}

	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);
		return res.results.map(this._transformPlanet);
	}

	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}/`)
		return this._transformPlanet(planet)
	}

	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results.map(this._transformStarship);
	}

	async getStarship(id) {
		const starship = await this.getResource(`/starships/${id}/`) 
		return this._transformStarship(starship);
	}

	_extractId(item) {
		const idRegExp = /\/([0-9]*)\/$/;
		return item.url.match(idRegExp)[1];
	}

	_transformPlanet = (planet) => {
		return {
			id: this._extractId(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period, // на сервере иной формат api с нижним подчеркиванием
			diameter: planet.diameter,
		}
	}

	_transformPerson = (person) => {
		return {
			id: this._extractId(person),
			name: person.name,
			gender: person.gender,
			birthYear: person.birth_year,
			eyeColor: person.eye_color,
		}
	}

	_transformStarship = (starship) => {
		return {
			id: this._extractId(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.cost_in_credits,
			length: starship.length,
			crew: starship.crew,
			passengers: starship.passengers,
			carcoCapacity: starship.cargo_capacity,
		}
	}
}
