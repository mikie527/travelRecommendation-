// URL of the JSON file
const url = 'path/to/travel_recommendation_api.json'; // Replace with the actual path to your JSON file

// Fetch the JSON data
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    console.log(data); // Log the data to the console
    // You can also process the data here if needed
    // For example, you might want to display the names and images
    data.places.forEach(place => {
      console.log('Place Name:', place.name);
      console.log('Image URL:', place.imageUrl); // Ensure you have your own images for these URLs
    });
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });




  // search.js

// Define your keywords and their associated data
const keywords = {
    beach: ["Beautiful beaches to visit", "Top beach resorts", "Best beaches for surfing"],
    temple: ["Famous temples to explore", "Historic temples", "Temple architecture"],
    country: ["Top travel destinations by country", "Cultural experiences in different countries", "Country-specific travel tips"]
};

// Function to perform the search
function performSearch(query) {
    // Convert query to lowercase for case-insensitive matching
    const normalizedQuery = query.toLowerCase();

    // Get results based on the query
    const results = Object.keys(keywords).filter(key => normalizedQuery.includes(key)).map(key => {
        return {
            keyword: key,
            descriptions: keywords[key]
        };
    });

    // Display results
    displayResults(results);
}

// Function to display results on the page
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const keywordSection = document.createElement('div');
        keywordSection.classList.add('result-item');
        
        const keywordTitle = document.createElement('h3');
        keywordTitle.textContent = `Results for "${result.keyword}":`;
        keywordSection.appendChild(keywordTitle);

        const descriptionList = document.createElement('ul');
        result.descriptions.forEach(description => {
            const listItem = document.createElement('li');
            listItem.textContent = description;
            descriptionList.appendChild(listItem);
        });

        keywordSection.appendChild(descriptionList);
        resultsContainer.appendChild(keywordSection);
    });
}

// Add event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    performSearch(query);
