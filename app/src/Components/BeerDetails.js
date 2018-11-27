import React, { Component } from 'react';

class BeerDetails extends Component {
	createBottles = () => {
		let bottles = [];
		let url = `./${this.props.imageId}.png`;

		for (let i = 0; i < this.props.quantity; i++) {
			bottles.push(
				<img src={url} height="120px" key={i} alt={this.props.name}/>
			);
		}
		return bottles;
	}

	render() {
		return (
			<div>{ this.createBottles() }</div>
		);
	};
}

export default BeerDetails;
