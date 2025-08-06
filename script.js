document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');

    mobileMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Dynamic Content Generation (for demonstration)
    const eventsData = [
        {
            id: 'event-1',
            title: 'Code-A-Thon',
            description: 'A 24-hour coding marathon to solve real-world problems. Prizes for the best solutions!',
            image: 'images/event1.jpg'
        },
        {
            id: 'event-2',
            title: 'Robo War',
            description: 'Witness a fierce battle of robots in the ultimate arena. May the best bot win!',
            image: 'images/event2.jpg'
        },
        {
            id: 'event-3',
            title: 'Cultural Extravaganza',
            description: 'A night filled with music, dance, and drama performances from talented students.',
            image: 'images/event3.jpg'
        },
        {
            id: 'event-4',
            title: 'Gaming Tournament',
            description: 'Compete in popular games like Valorant, CS:GO, and FIFA. Win cash prizes!',
            image: 'images/event4.jpg'
        }
    ];

    const scheduleData = [
        { time: '10:00 AM', event: 'Inauguration Ceremony', location: 'Main Auditorium' },
        { time: '11:00 AM', event: 'Code-A-Thon Begins', location: 'IT Lab 101' },
        { time: '01:00 PM', event: 'Robo War Finals', location: 'Sports Arena' },
        { time: '04:00 PM', event: 'Gaming Tournament Finals', location: 'IT Lab 203' },
        { time: '07:00 PM', event: 'Cultural Extravaganza', location: 'Open-Air Theatre' }
    ];

    const eventContainer = document.querySelector('.event-container');
    const scheduleTableBody = document.querySelector('#schedule-table tbody');
    const eventSelect = document.getElementById('event-select');

    // Populate Events
    eventsData.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <button class="register-btn" data-event-id="${event.id}">Register</button>
        `;
        eventContainer.appendChild(eventCard);

        // Add event to the registration form dropdown
        const option = document.createElement('option');
        option.value = event.title;
        option.textContent = event.title;
        eventSelect.appendChild(option);
    });

    // Populate Schedule
    scheduleData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.time}</td>
            <td>${item.event}</td>
            <td>${item.location}</td>
        `;
        scheduleTableBody.appendChild(row);
    });

    // Registration Form Submission
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const selectedEvent = document.getElementById('event-select').value;

        // Simple validation
        if (!name || !email || !selectedEvent) {
            alert('Please fill out all fields.');
            return;
        }

        // You would typically send this data to a backend server here
        // For this example, we'll just log it to the console.
        console.log({
            name,
            email,
            selectedEvent
        });

        alert(`Thank you, ${name}! You have successfully registered for ${selectedEvent}.`);

        // Reset the form
        registrationForm.reset();
    });

    // Handle "Register" button clicks to pre-select the event in the form
    document.querySelectorAll('.register-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const eventCard = e.target.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            
            // Set the value of the dropdown
            eventSelect.value = eventTitle;

            // Scroll to the registration form
            document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
        });
    });

});