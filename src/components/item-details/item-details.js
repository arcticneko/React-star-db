import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner';

const Record = ({ item, field, label }) => {
	return (
		<li className='list-group-item'>
			<span className='term'>{label}</span>
			<span>{item[field]}</span>
		</li>
	)	
}

export {
	Record
}

export default class ItemDetails extends Component {
	
	swapiService = new SwapiService();

	state = {
		item: null,
		loaded: false,
		image: null
	}

	componentDidMount() {
		this.updateItem(); // если компонент уже был проинициализирован
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) { // проверить изменение свойства. иначе зациклится обновление компонента как только он обновился
			this.updateItem();
		}
	}

	updateItem() {
		const { itemId, getData, getImageUrl } = this.props;
		if (!itemId) {
			return; // ничего не делать в случае null
		}

		this.setState({
			loaded: false
		})

		getData(itemId).then((item) => {
			this.setState({
				item,
				loaded: true,
				image: getImageUrl(item),
			})
		})
	}

  render() {

		const { item, image, loaded } = this.state;

		if (!item) {
			return <span>Select an item from the list</span>
		}

		if (!loaded) {
			return <Spinner />;
		}

		const { id, name, gender, birthYear, eyeColor } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image} alt='фото'/>

        <div className="card-body">
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
						{ 
							React.Children.map(this.props.children, (child) => {
								return React.cloneElement(child, { item })
							})
						}
          </ul>
        </div>
      </div>
    )
  }
}
