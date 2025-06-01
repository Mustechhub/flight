
// Set min date for departure to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('departure').min = today;

// Set min for return to departure date
document.getElementById('departure').addEventListener('change', function() {
    document.getElementById('return').min = this.value;
});

// Form submission handler
document.getElementById('flightForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure = document.getElementById('departure').value;
    const returnDate = document.getElementById('return').value;
    const travelers = document.getElementById('travelers').value;
    const flightClass = document.getElementById('class').value;
    
    if (!from || !to || !departure) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate trip duration if return date is provided
    let duration = '';
    if (returnDate) {
        const departDate = new Date(departure);
        const returnDateObj = new Date(returnDate);
        const diffTime = Math.abs(returnDateObj - departDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        duration = ` for ${diffDays} days`;
    }
    
    // Show flight details
    const message = `Flight booked from ${getCityName(from)} to ${getCityName(to)}!\n
Departure: ${formatDate(departure)}
${returnDate ? Return: ${formatDate(returnDate)}${duration} : 'One-way trip'}
Travelers: ${travelers}
Class: ${flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}`;
    
    alert(message);
});

// Helper function to get full city name
function getCityName(code) {
    const cities = {
        'new-york': 'New York',
        'london': 'London',
        'paris': 'Paris',
        'tokyo': 'Tokyo',
        'dubai': 'Dubai',
        'sydney': 'Sydney'
    };
    return cities[code] || code;
}

// Format date for display
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize departure date to tomorrow by default
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById('departure').valueAsDate = tomorrow;
