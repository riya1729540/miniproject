 // Mobile menu toggle
 const menuToggle = document.querySelector('.menu-toggle');
 const nav = document.querySelector('header nav');

 menuToggle.addEventListener('click', () => {
     nav.classList.toggle('active');
 });

 // Smooth scroll for navigation links
 document.querySelectorAll('header nav a').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });





const fetchPollutionData = async () => {
 const apiKey = '406150907e5b91a3a22b2e63ea68e585'; // Replace with your OpenWeather API Key

 // Use geolocation to get current latitude and longitude
 if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(async (position) => {
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;

         const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

         try {
             const response = await fetch(url);
             const data = await response.json();

             // Log the full response to inspect its structure
             console.log('API Response:', data);

             // Check if the data contains the necessary properties
             if (data && data.list && data.list.length > 0) {
                 const airQuality = data.list[0].main.aqi;
                 const location = `${latitude}, ${longitude}`; // Use coordinates as the location

                 document.getElementById('location').textContent = location;
                 document.getElementById('aqi').textContent = airQuality;

                 let pollutionLevel = '';
                 if (airQuality === 1) pollutionLevel = 'Good';
                 else if (airQuality === 2) pollutionLevel = 'Fair';
                 else if (airQuality === 3) pollutionLevel = 'Moderate';
                 else if (airQuality === 4) pollutionLevel = 'Poor';
                 else if (airQuality === 5) pollutionLevel = 'Very Poor';

                 document.getElementById('pollution-level').textContent = pollutionLevel;
             } else {
                 console.error('Data is empty or not in the expected format:', data);
                 document.getElementById('pollution-level').textContent = 'Data unavailable';
             }
         } catch (error) {
             console.error('Error fetching pollution data:', error);
             document.getElementById('pollution-level').textContent = 'Error fetching data';
         }
     }, (error) => {
         console.error('Geolocation error:', error);
         document.getElementById('pollution-level').textContent = 'Unable to fetch location';
     });
 } else {
     console.error('Geolocation is not supported by this browser.');
     document.getElementById('pollution-level').textContent = 'Geolocation not supported';
 }
};

// Call the function to fetch pollution data
fetchPollutionData();