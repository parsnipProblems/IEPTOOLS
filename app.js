const contactForm = document.querySelector('.contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');


contactForm.addEventListener('submit', async(e) => {
    e.preventDefault();  // Prevent the default form submission


    const formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    };


    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });


        // Wait for JSON response to be parsed
        const result = await response.json();


        if (!response.ok) {
            // If the response is not OK, handle it by showing an alert
            alert(`Failed to send message: ${result.message}`);
            return;  // Exit the function early if there's an error
        }


        // Check application-specific status from JSON when response is OK
        if (result.status === 'success') {
            alert('Email sent');


            // Reset form fields after successful submission
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            // Handle application-level failure not caught by response.ok
            alert('Operation failed: ' + result.message);
        }


    } catch (error) {
        // Handle any exceptions that occur during fetch
        console.error('Error:', error);
        alert('Network error or cannot connect to server');
    }


});