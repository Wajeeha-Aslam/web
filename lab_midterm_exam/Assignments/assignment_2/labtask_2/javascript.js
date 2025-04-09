const form = document.getElementById("checkoutForm");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // stop form from submitting
      let valid = true;

      // Get all inputs
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const address = document.getElementById("address");
      const card = document.getElementById("card");
      const expiry = document.getElementById("expiry");
      const cvv = document.getElementById("cvv");

      // Name validation
      if (!/^[A-Za-z\s]+$/.test(name.value)) {
        document.getElementById("nameError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("nameError").style.display = "none";
      }

      // Email validation (uses HTML5)
      if (!email.checkValidity()) {
        document.getElementById("emailError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("emailError").style.display = "none";
      }

      // Phone validation
      if (!/^\d{10,15}$/.test(phone.value)) {
        document.getElementById("phoneError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("phoneError").style.display = "none";
      }

      // Address
      if (address.value.trim() === "") {
        document.getElementById("addressError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("addressError").style.display = "none";
      }

      // Card number
      if (!/^\d{16}$/.test(card.value)) {
        document.getElementById("cardError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("cardError").style.display = "none";
      }

      // Expiry date
      let today = new Date();
      let selected = new Date(expiry.value + "-01");
      if (selected <= today) {
        document.getElementById("expiryError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("expiryError").style.display = "none";
      }

      // CVV
      if (!/^\d{3}$/.test(cvv.value)) {
        document.getElementById("cvvError").style.display = "block";
        valid = false;
      } else {
        document.getElementById("cvvError").style.display = "none";
      }

      // Final check
      if (valid) {
        document.getElementById("successMsg").textContent = "Form submitted successfully!";
        form.reset();
      } else {
        document.getElementById("successMsg").textContent = "";
      }
    });