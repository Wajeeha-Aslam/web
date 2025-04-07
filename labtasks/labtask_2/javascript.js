const form = document.getElementById('checkoutForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  successMessage.textContent = "";

  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    const errorSpan = input.nextElementSibling;
    input.classList.remove('invalid');
    errorSpan.style.display = 'none';

    if (!input.checkValidity()) {
      input.classList.add('invalid');
      errorSpan.style.display = 'block';
      valid = false;
    }

    // Additional expiry date future check
    if (input.id === 'expiryDate') {
      const selectedDate = new Date(input.value + '-01');
      const today = new Date();
      today.setDate(1);
      if (selectedDate <= today) {
        input.classList.add('invalid');
        errorSpan.style.display = 'block';
        valid = false;
      }
    }
  });

  if (valid) {
    successMessage.textContent = "Form submitted successfully!";
    form.reset();
    form.querySelectorAll('input').forEach(i => i.classList.remove('invalid'));
  }
});