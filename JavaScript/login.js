// Login functionality
console.log("Login page loaded");

// Example login functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Here you would typically send these credentials to a server
            console.log(`Login attempt: ${username}`);
            
            // For demo purposes, just redirect to homepage
            window.location.href = '../index.html';
        });
    }
});
