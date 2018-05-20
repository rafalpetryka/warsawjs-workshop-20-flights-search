const API_URL = 'http://warsawjs-flights-api.herokuapp.com/';

let readAirportList = () => {
    return window.fetch(API_URL + 'airports').then(response =>
        response.json()
    ).catch(error =>
        console.error(error)
    )
}

let searchFlights = (params) => {
    const { from, to, departDate, returnDate } = params
    return window.fetch(`${API_URL}flights/${from}/${to}/${departDate}/${returnDate}`)
        .then(response =>
            response.json()
        ).catch(error =>
            console.error(error)
        )
} 