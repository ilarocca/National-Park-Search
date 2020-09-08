const apiKey = 'TGW1lRI5Jga3fBkBQTn8uUQzcB5vwd7I4wBdI3lS'

const baseUrl = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

    return queryItems.join('&'); 
}

function getStateParks(stateName, maxResults) {
    const params = {
        api_key: apiKey,
        stateCode: stateName,
        limit: maxResults
    };

    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString; 

    console.log(url)

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty(); 
    
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].fullName}</h3>
                <p>Address: ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].line1}, ${responseJson.data[i].addresses[0].postalCode}, ${responseJson.data[i].addresses[0].stateCode}</p>
                <p>Description: ${responseJson.data[i].description}</p>
                <a href="${responseJson.data[i].url}">Click here for more info!</a>
            </li>
            `
            // <img id="park-image" src="${responseJson.data[i].images[0].url}" alt="${responseJson.data[i].images[0].altText}"> 
        )
    }
    $('#results').removeClass('hidden');
}

function submitForm() {
    $('form').submit(event => {
        event.preventDefault(); 
        const stateName = $('#js-statename').val(); 
        const maxResults = $('#js-max-results').val();
        getStateParks(stateName, maxResults);
    });
}

$(submitForm);