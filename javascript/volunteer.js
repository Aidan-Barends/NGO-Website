// Array to store volunteer information
    let volunteers = [];

    // Function to handle form submission and store new volunteer data
    document.getElementById('volunteerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Clear previous error messages
        document.getElementById('name-error').style.display = 'none';
        document.getElementById('contact-error').style.display = 'none';
        document.getElementById('skills-error').style.display = 'none';
        document.getElementById('availability-error').style.display = 'none';

        // Get form data
        let volunteerName = document.getElementById('name').value.trim();
        let email = document.getElementById('contact').value.trim();
        let skills = document.getElementById('interest').value.split(',').map(skill => skill.trim());
        let availability = document.getElementById('availability').value.trim();

        // Validate inputs
        let isValid = true;

        if (volunteerName === '') {
            document.getElementById('name-error').textContent = 'Please enter your name.';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }

        if (email === '') {
            document.getElementById('contact-error').textContent = 'Please enter your email address.';
            document.getElementById('contact-error').style.display = 'block';
            isValid = false;
        } else if (!validateEmail(email)) {
            document.getElementById('contact-error').textContent = 'Please enter a valid email address.';
            document.getElementById('contact-error').style.display = 'block';
            isValid = false;
        }

        if (skills.length === 0 || skills[0] === '') {
            document.getElementById('skills-error').textContent = 'Please enter at least one skill.';
            document.getElementById('skills-error').style.display = 'block';
            isValid = false;
        }

        if (availability === '') {
            document.getElementById('availability-error').textContent = 'Please specify your availability.';
            document.getElementById('availability-error').style.display = 'block';
            isValid = false;
        }

        // If the form is valid, proceed with storing the volunteer data
        if (isValid) {
            // Create a new volunteer object
            let volunteerObject = {
                name: volunteerName,
                email: email,
                skills: skills,
                availability: availability
            };

            // Add the new volunteer to the array
            volunteers.push(volunteerObject);
            document.getElementById('volunteerForm').reset(); // Reset the form
        }
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return re.test(String(email).toLowerCase());
    }

    // Function to create a text file and trigger download
    function downloadVolunteerList() {
        let volunteerListContent = volunteers.map(v => `Name: ${v.name}, Email: ${v.email}, Skills: ${v.skills.join(', ')}, Availability: ${v.availability}`).join('\n');
        let blob = new Blob([volunteerListContent], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);

        // Create a temporary link element for download
        let a = document.createElement('a');
        a.href = url;
        a.download = 'volunteer_list.txt'; // File name for the downloaded file
        document.body.appendChild(a);
        a.click(); // Programmatically click the link to trigger download
        document.body.removeChild(a); // Clean up by removing the link

        // Release the URL object
        URL.revokeObjectURL(url);
    }

    // Function to display the volunteer list on the page
    function displayVolunteerList() {
        const volunteerDisplay = document.getElementById('volunteerDisplay');
        volunteerDisplay.innerHTML = ''; // Clear previous display

        if (volunteers.length === 0) {
            volunteerDisplay.innerHTML = '<p>No volunteers have signed up yet.</p>';
        } else {
            volunteers.forEach((volunteer, index) => {
                const volunteerDiv = document.createElement('div');
                volunteerDiv.classList.add('volunteer-item'); // Optional class for additional styling
                volunteerDiv.innerHTML = `
                    Volunteer #${index + 1}<br>
                    Name: ${volunteer.name}<br>
                    Email: ${volunteer.email}<br>
                    Skills: ${volunteer.skills.join(', ')}<br>
                    Availability: ${volunteer.availability}<br>
                `;
                volunteerDisplay.appendChild(volunteerDiv);
            });
        }
    }

    // Event listener for the download button
    document.getElementById('downloadListButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission
        downloadVolunteerList();
    });

    // Event listener for the display button
    document.getElementById('displayListButton').addEventListener('click', function() {
        displayVolunteerList();
    });