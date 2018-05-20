import React, { Component } from 'react';

export default class SearchForm extends Component {

    state = {
        from: this.props.initialValues.from,
        to: this.props.initialValues.to,
        departureDate: this.props.initialValues.departureDate,
        returnDate: this.props.initialValues.returnDate
    }

    handleReset = () => {
        this.setState({
            from: "WAW", to: "ATL", departureDate: "2018-05-20", returnDate: "2018-05-20"
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { onSubmit } = this.props;
        const { from, to, departureDate, returnDate } = this.state;
        onSubmit({ from, to, departureDate, returnDate });
    }

    handleFromChange = (event) => {
        this.setState({ from: event.target.value })
    }

    handleToChange = (event) => {
        this.setState({ to: event.target.value })
    }

    handleReturnDateChange = (event) => {
        this.setState({ returnDate: event.target.value })
    }

    handleDepartureDateChange = (event) => {
        this.setState({ departureDate: event.target.value })
    }

    render() {
        const { airports } = this.props;

        return (
            <form name="search" method="POST" onSubmit={ this.handleSubmit } onReset={ this.handleReset }>
                <label>From:</label>
                <select name="from" form="searchForm" value={this.state.from} onChange={ this.handleFromChange }>
                    { airports.map((airport) => <option value={airport.code} key={airport.code}>{airport.city}</option> )}
                </select>
                
                <label>To:</label>
                <select name="to" form="searchForm" value={this.state.to} onChange={ this.handleToChange }>
                    { airports.map((airport) => <option value={airport.code} key={airport.code}>{airport.city}</option> )}
                </select>

                <label>Departure:</label>
                <input
                    type="date"
                    name="departure"
                    value={ this.state.departureDate }
                    onChange={ this.handleDepartureDateChange }
                />
                <label>Return:</label>
                <input
                    type="date"
                    name="return"
                    value={ this.state.returnDate }
                    onChange={ this.handleReturnDateChange }
                />
                <div>
                    <button type="submit">Search</button>
                    <button type="reset">Reset</button>
                </div>
            </form>
        );
    }
}