/**
 * Handle mail sending
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} message 
 */
const sendMail = async (name, email, message) => {
  const container = document.querySelector('.contact .status');
  const form = document.getElementById('contact-form');
  const button = document.getElementById('form-trigger');

  button.disabled = true;

  try {
    const response = await fetch('mail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const data = await response.json();

    container.className = 'status';
    container.classList.add(data.status);
    container.textContent = data.message;

    if (data.status === 'success') {
      form.reset();
    }
  } catch (error) {
    container.className = 'status error';
    container.textContent = 'Your message could not be sent. Please try again later.';
  } finally {
    button.disabled = false;
  }
};

/**
 * Bind events listeners when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const logo = document.querySelector('.logo');
  const contactForm = document.getElementById('contact-form');

  const closeMenu = () => {
    navLinks.classList.remove('nav-active');
    burger.classList.remove('toggle');
  };
  const closeMenu = () => {
    navLinks.classList.remove('nav-active');
    burger.classList.remove('toggle');
    
  
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();

      const targetId = e.target.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      targetSection?.scrollIntoView({ behavior: 'smooth' });

      closeMenu();
    }
  });

  // The logo sits outside .nav-links, so it needs its own listener
  logo.addEventListener('click', closeMenu);

  contactForm.addEventListener('submit', (event) => {
    const logo = document.querySelector('.logo');

    logo.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      burger.classList.remove('toggle');
    });
    event.preventDefault();
    sendMail(event.target[0].value, event.target[1].value, event.target[2].value);
  });
});