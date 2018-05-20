import React, { Component } from 'react';

export default class FlightList extends Component {

    render() {
        const { flights, onReset } = this.props;

        return (
            <div>
                <ul>
                    {flights.map((flight) => {
                        const { price } = flight;

                        return (
                            <li key={flight.id}>
                                <div>Id: {flight.id}</div>
                                <div>Price: {flight.price}$</div>
                            </li>
                        )
                    })}
                </ul>
                <button type="button" onClick={onReset}>Back to search</button>
            </div>
        );
    }
}