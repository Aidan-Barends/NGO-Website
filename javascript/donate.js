  // Array to store donation data
let donations = [];

// Event listener for form submission
document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous error messages
    document.getElementById('name-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('amount-error').style.display = 'none';
    document.getElementById('frequency-error').style.display = 'none';

    // Get form data
    let donorName = document.getElementById('donorName').value.trim();
    let email = document.getElementById('email').value.trim();
    let donationAmount = parseFloat(document.getElementById('donationAmount').value);
    let donationFrequency = document.getElementById('donationFrequency').value;

    // Validate inputs
    let isValid = true;

    // Custom validation logic
    if (donorName === '') {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    }

    if (email === '' || !validateEmail(email)) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }

    if (isNaN(donationAmount) || donationAmount <= 0) {
        document.getElementById('amount-error').style.display = 'block';
        isValid = false;
    }

    if (donationFrequency === '') {
        document.getElementById('frequency-error').style.display = 'block';
        isValid = false;
    }

    // If the form is valid, proceed with the submission
    if (isValid) {
        // Create a donation object
        let donation = {
            name: donorName,
            email: email,
            amount: donationAmount.toFixed(2), // Keep two decimal places
            frequency: donationFrequency
        };

        // Add the donation to the array
        donations.push(donation);

        // Clear the form fields
        document.getElementById('donationForm').reset();
    }
});

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return re.test(String(email).toLowerCase());
}

// Function to create a text file and trigger download
function downloadDonationList() {
    // Create text content for the file
    let content = "Donation List:\n\n";
    donations.forEach(donation => {
        content += `Donor: ${donation.name}, Email: ${donation.email}, Amount: R${donation.amount}, Frequency: ${donation.frequency}\n`;
    });

    // Create a Blob from the content
    let blob = new Blob([content], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);

    // Create a temporary link element
    let a = document.createElement('a');
    a.href = url;
    a.download = 'donation_list.txt'; // File name for the downloaded file
    document.body.appendChild(a);
    a.click(); // Programmatically click the link to trigger download
    document.body.removeChild(a); // Clean up by removing the link

    // Release the URL object
    URL.revokeObjectURL(url);
}

// Function to display donations
function displayDonations() {
    const donationListDisplay = document.getElementById('donationListDisplay');
    if (donations.length === 0) {
        donationListDisplay.textContent = "No donations yet.";
        return;
    }

    // Clear previous display
    donationListDisplay.textContent = "Donation List:\n\n";
    donations.forEach(donation => {
        donationListDisplay.textContent += `Donor: ${donation.name}, Email: ${donation.email}, Amount: R${donation.amount}, Frequency: ${donation.frequency}\n`;
    });
}

// Event listener for the download button
document.getElementById('downloadListButton').addEventListener('click', downloadDonationList);

// Event listener for the display donations button
document.getElementById('displayDonationsButton').addEventListener('click', displayDonations);