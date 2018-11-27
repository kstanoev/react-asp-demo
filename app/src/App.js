import React, { Component } from 'react';
import BeerDetails from "./Components/BeerDetails";
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      selectedBeer: { quantity: 0 },
      orderQuantity: 0,
    }
  }

  componentDidMount = () => {
    axios.get("https://localhost:8888/api/bartender/beers")
      .then(response => {
        this.setState({
          beers: response.data,
        })
      })
  }

  sendOrder = (e) => {
    e.preventDefault();

    let order = JSON.stringify(
      {
        id: this.state.selectedBeer.id,
        quantity: this.state.orderQuantity
      });

    axios.post(`https://localhost:8888/api/bartender/order`,
      order,
      {
        headers: { "content-type": "application/json" }
      }
    )
      .then(response => {
        this.setState({
          beers: response.data,
          selectedBeer: { quantity: 0 },
          orderQuantity: 0
        });
        this.refs.mySelect.selectedIndex = 0;
      })
  }

  selectBeer = (event) => {
    this.setState({
      selectedBeer: this.state.beers[event.target.value - 1],
      orderQuantity: 1
    });

  }

  changeQuantity = (event) => {
    this.setState({
      orderQuantity: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendOrder} >
          <select ref="mySelect" onChange={this.selectBeer} defaultValue="Избери бира" style={{ fontSize: "32px" }}>
            <option disabled>Избери бира</option>
            {
              this.state.beers.map(beer => {
                return (
                  <option key={beer.id} value={beer.id} disabled={beer.quantity === 0}>
                    {beer.name}
                  </option>
                )
              })
            }
          </select>
          <input type="number"
            min={this.state.selectedBeer.quantity === 0 ? 0 : 1}
            max={this.state.selectedBeer.quantity}
            value={this.state.orderQuantity}
            onChange={this.changeQuantity}
            disabled={this.state.selectedBeer.quantity === 0}
            step="1"
            style={{ fontSize: "32px" }}
          />
          <button type="submit" disabled={this.state.orderQuantity === 0}>
            <div style={{ fontSize: "32px" }}>Поръчай</div>
          </button>
        </form>
        <div>
          {
            this.state.beers.map(beer => {
              return (
                <BeerDetails
                  key={beer.id}
                  imageId={beer.id}
                  name={beer.name}
                  quantity={beer.quantity} />
              )
            })}
        </div>
            
      </div>
    );
  }


}

export default App;
