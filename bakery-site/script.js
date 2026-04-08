const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
  });
}

const forms = document.querySelectorAll('.validate-form');

function showError(field, message) {
  const error = field.parentElement.querySelector('.error-message');
  if (error) {
    error.textContent = message;
  }
  field.classList.add('input-error');
}

function clearError(field) {
  const error = field.parentElement.querySelector('.error-message');
  if (error) {
    error.textContent = '';
  }
  field.classList.remove('input-error');
}

function validateEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

function validatePhone(value) {
  return /^\d{7,15}$/.test(value.replace(/\D/g, ''));
}

function validateForm(event) {
  const form = event.target;
  const fields = form.querySelectorAll('[data-required]');
  let valid = true;

  fields.forEach((field) => {
    const value = field.value.trim();
    clearError(field);

    if (!value) {
      valid = false;
      showError(field, 'This field is required.');
      return;
    }

    if (field.type === 'email' && !validateEmail(value)) {
      valid = false;
      showError(field, 'Please enter a valid email address.');
    }

    if (field.type === 'tel' && !validatePhone(value)) {
      valid = false;
      showError(field, 'Please enter a valid phone number.');
    }
  });

  if (!valid) {
    event.preventDefault();
  } else {
    event.preventDefault();
    form.reset();
    alert('Thank you! Your submission has been received.');
  }
}

forms.forEach((form) => {
  form.addEventListener('submit', validateForm);
});
