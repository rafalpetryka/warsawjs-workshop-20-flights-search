import React, { Component } from 'react';

function aggregate(path) {
    return path.reduce((memo, item, index, arr) => {
      const { airportFrom, airportTo, length } = item;
      memo.duration += length;
      if (index === 0 && arr.length > 1) {
        memo.airports.push(airportFrom);
      }
      memo.airports.push(airportTo);
      return memo;
    }, {
      duration: 0,
      airports: [],
    });
};

export default class FlightList extends Component {

    state = {
        priceFrom: '',
        priceTo: '',
        flights: this.props.flights,
    }

    handleChangePriceTo = (event) => {
        this.setState({ priceTo: event.target.value })
    }

    handleChangePriceFrom = (event) => {
        this.setState({ priceFrom: event.target.value })
    }

    handleFilterFlights = () => {
        this.setState({
            flights: this.filterFlights(this.props.flights)
        })
    }

    filterFlights(flights) {
        let { priceFrom, priceTo } = this.state;
        if(priceFrom !== '' && priceTo !== '') {
            return flights.filter(({ price }) => price >= priceFrom && price <= priceTo);
        }else if(priceFrom === '' && priceTo !== '') {
            return flights.filter(({ price }) => price <= priceTo);
        }else if(priceFrom !== '' && priceTo === '') {
            return flights.filter(({ price }) => price >= priceFrom);
        }else {
            return flights;
        }

    }

    render() {
        const { onReset } = this.props;
        const { flights, priceFrom, priceTo } = this.state;

        return (
            <div>
                <form>
                    <label>
                    Min price:
                    <input
                        type="number"
                        value={priceFrom}
                        onChange={this.handleChangePriceFrom}
                        onBlur={this.handleFilterFlights}
                    />
                    </label>
                    <label>
                    Max price:
                    <input
                        type="number"
                        value={priceTo}
                        onChange={this.handleChangePriceTo}
                        onBlur={this.handleFilterFlights}
                    />
                    </label>
                </form>

                <ul>
                    {flights.map((flight) => {
                        const { price } = flight;
                        const { duration, airports } = aggregate(flight.inboundPath);
                        return (
                            <li key={flight.id}>
                                <div>Id: {flight.id}</div>
                                <div>Price: {flight.price.toFixed(2)}$</div>
                                <div>Duration: {duration.toFixed(1)}h</div>
                                {
                                    airports.length > 1 ? (
                                        <div>Via: {airports.slice(1, -1).join(', ')}</div>
                                    ) : (
                                        <div>Direct</div>
                                    )
                                }
                            </li>
                        )
                    })}
                </ul>
                <button type="button" onClick={onReset}>Back to search</button>
            </div>
        );
    }
}