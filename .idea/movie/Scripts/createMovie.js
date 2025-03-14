// API URL configuration
const API_URL = "https://kinofullstack-epcfgehdhse5eufz.northeurope-01.azurewebsites.net";

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const form = document.getElementById('createMovieForm');
    const statusMessage = document.getElementById('statusMessage');

    // Add submit event listener to form
    form.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Get form values
        const title = document.getElementById('title').value.trim();
        const genre = document.getElementById('genre').value;
        const ageLimit = parseInt(document.getElementById('ageLimit').value);
        const duration = parseInt(document.getElementById('duration').value);
        const description = document.getElementById('description').value.trim();
        let imagePath = document.getElementById('imagePath').value.trim();
        let trailerPath = document.getElementById('trailerPath').value.trim();

        // Use default image if none provided
        if (!imagePath) {
            imagePath = '/images/default-movie.png';
        }

        // Create movie object
        const movieData = {
            title: title,
            genre: genre,
            ageLimit: ageLimit,
            duration: duration,
            description: description,
            imagePath: imagePath,
            trailerPath: trailerPath
        };

        // Send data to API
        createMovie(movieData);
    });

    // Function to create a new movie using no-cors mode
    async function createMovie(movieData) {
        try {
            // Show loading message
            showStatus('Adding movie...', 'info');

            // First approach: Using no-cors mode (will not provide response details)
            // This is for demonstration only - the request goes through but you won't be able to read response
            const response = await fetch(`${API_URL}/api/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData),
                mode: 'no-cors' // This bypasses CORS but makes response opaque
            });

            // With no-cors mode, we can't read the response
            // We'll assume success and show a message
            showStatus('Request sent! Check your database to confirm.', 'info');
            form.reset(); // Reset form

            // Alternative approach: Create a simple HTML form and submit it programmatically
            // This displays a clearer alternative way to handle this
            console.log("Note: For a more reliable approach, consider using the HTML form submission method below:");
            console.log(`
            // Create a hidden form and submit it
            const hiddenForm = document.createElement('form');
            hiddenForm.method = 'POST';
            hiddenForm.action = '${API_URL}/api/movies';
            hiddenForm.target = '_blank'; // Open in new tab
            
            // Add form fields
            for (const [key, value] of Object.entries(movieData)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                hiddenForm.appendChild(input);
            }
            
            // Submit form
            document.body.appendChild(hiddenForm);
            hiddenForm.submit();
            document.body.removeChild(hiddenForm);
            `);

        } catch (error) {
            showStatus(`Error: ${error.message || 'Something went wrong'}`, 'error');
            console.error('Error adding movie:', error);
        }
    }

    // Function to show status messages
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.classList.remove('hidden', 'bg-green-700', 'bg-red-700', 'bg-blue-700');

        switch (type) {
            case 'success':
                statusMessage.classList.add('bg-green-700');
                break;
            case 'error':
                statusMessage.classList.add('bg-red-700');
                break;
            case 'info':
                statusMessage.classList.add('bg-blue-700');
                break;
        }

        statusMessage.classList.remove('hidden');
    }
});