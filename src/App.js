import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {readAirportList, searchFlights} from './api'
import SearchForm from './SearchForm'

class App extends Component {
  state = {
    isLoading: true,
    airports: null,
    searchParams: {from: "WAW", to: "ATL", departureDate: "2018-05-20", returnDate: "2018-05-20"},
    flights: null
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    readAirportList().then(airports => {
      this.setState({ airports, isLoading: false })
    }).catch(error => {
      window.console.warn(error);
      this.setState({ isLoading: false });
    });
  };

  handleSubmit = (searchParams) => {
    this.setState({ isLoading: true })
    searchFlights(searchParams).then((flights) => {
      this.setState({flights, searchParams, isLoading: false})
    }).catch((error) => {
      window.console.warn(error);
      this.setState({ isLoading: false });
    })
  }

  render() {
    const { isLoading, airports, searchParams, flights } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-body">
          { isLoading && (
            <span>Loading ...</span>
          )}
          { !isLoading && !flights && (
            <SearchForm
              airports={airports}
              initialValues={searchParams}
              onSubmit={this.handleSubmit}
            />
          )}
          { !isLoading && flights && (
            <span>
              Flight list
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default App;
