// URL of the JSON file
const url = 'travel_recommendation_api.json'; // Replace with the actual path to your JSON file

    // Fetch the JSON data
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Add event listener for the search button
        document.getElementById('searchButton').addEventListener('click', () => {
          const query = document.getElementById('searchInput').value.toLowerCase();
          const results = data.places.find(place => place.keyword === query);
          displayResults(results);
        });

        // Function to display results on the page
        function displayResults(results) {
          const resultsContainer = document.getElementById('results');
          resultsContainer.innerHTML = ''; // Clear previous results

          if (!results) {
            resultsContainer.innerHTML = '<p>No results found for your search.</p>';
            return;
          }

          results.recommendations.forEach(recommendation => {
            const recommendationDiv = document.createElement('div');
            recommendationDiv.classList.add('recommendation');

            const title = document.createElement('h3');
            title.textContent = recommendation.name;
            recommendationDiv.appendChild(title);

            const image = document.createElement('img');
            image.src = recommendation.imageUrl;
            recommendationDiv.appendChild(image);

            const description = document.createElement('p');
            description.textContent = recommendation.description;
            recommendationDiv.appendChild(description);

            resultsContainer.appendChild(recommendationDiv);
          });
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
