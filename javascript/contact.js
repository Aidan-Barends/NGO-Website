  // Array to store contact messages
        let contactMessages = [];

        // Function to handle form submission and store new contact data
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            
            // Clear previous error messages
            document.getElementById('name-error').style.display = 'none';
            document.getElementById('email-error').style.display = 'none';
            document.getElementById('message-error').style.display = 'none';

            // Get form data
            let contactName = document.getElementById('contactName').value.trim();
            let email = document.getElementById('email').value.trim();
            let subject = document.getElementById('subject').value.trim();
            let message = document.getElementById('message').value.trim();

            // Validate inputs
            let isValid = true;

            if (contactName === '') {
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }

            if (email === '') {
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            } else if (!validateEmail(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }

            if (message === '') {
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }

            // If the form is valid, proceed with storing the message
            if (isValid) {
                // Create a message object
                let messageObject = {
                    name: contactName,
                    email: email,
                    subject: subject,
                    message: message
                };

                // Add the message to the array
                contactMessages.push(messageObject);

                // Clear the form fields
                document.getElementById('contactForm').reset();
            }
        });

        // Function to validate email format
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
            return re.test(String(email).toLowerCase());
        }

        // Function to create a text file and trigger download
        function downloadContactMessages() {
            // Create text content for the file
            let content = "Contact Messages:\n\n";
            contactMessages.forEach(msg => {
                content += `Name: ${msg.name}, Email: ${msg.email}, Subject: ${msg.subject}, Message: ${msg.message}\n\n`;
            });

            // Create a Blob from the content
            let blob = new Blob([content], { type: 'text/plain' });
            let url = URL.createObjectURL(blob);

            // Create a temporary link element
            let a = document.createElement('a');
            a.href = url;
            a.download = 'contact_messages.txt'; // File name for the downloaded file
            document.body.appendChild(a);
            a.click(); // Programmatically click the link to trigger download
            document.body.removeChild(a); // Clean up by removing the link

            // Release the URL object
            URL.revokeObjectURL(url);
        }

        // Function to display contact messages on the page
        function displayContactMessages() {
            // Get the display container
            const messageDisplay = document.getElementById('messageDisplay');

            // Clear the container before displaying new content
            messageDisplay.innerHTML = '';

            // Check if there are any messages to display
            if (contactMessages.length === 0) {
                messageDisplay.innerHTML = '<p>No messages to display.</p>';
                return;
            }

            // Loop through the contactMessages array and display each message
            contactMessages.forEach((msg, index) => {
                // Create a div for each message
                const messageItem = document.createElement('div');
                messageItem.classList.add('message-item');

                // Format the message content
                messageItem.innerHTML = `
                    Message #${index + 1}<br>
                    Name: ${msg.name}<br>
                    Email: ${msg.email}<br>
                    Subject: ${msg.subject}<br>
                    Message: ${msg.message}<br>
                `;

                // Append the message div to the display container
                messageDisplay.appendChild(messageItem);
            });
        }

        // Event listener for the download button
        document.getElementById('downloadMessagesButton').addEventListener('click', downloadContactMessages);

        // Event listener for the display messages button
        document.getElementById('displayMessagesButton').addEventListener('click', displayContactMessages);