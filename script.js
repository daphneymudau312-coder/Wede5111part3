// Set the current year in the footer for all pages.
document.addEventListener('DOMContentLoaded', function () {
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Toggle the mobile navigation menu.
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open');
    });
  }

  // Search/filter for services/products listings.
  const searchInput = document.querySelector('[data-search]');
  if (searchInput) {
    const cards = document.querySelectorAll('[data-filter-item]');
    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // FAQ accordion behavior.
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = this.getAttribute('aria-expanded') === 'true';

      faqButtons.forEach(function (item) {
        item.setAttribute('aria-expanded', 'false');
        const sibling = item.nextElementSibling;
        if (sibling) sibling.hidden = true;
      });

      this.setAttribute('aria-expanded', String(!isOpen));
      if (answer) answer.hidden = isOpen;
    });
  });

  // Map toggling/focus for contact page.
  const locationMap = document.querySelector('.map-placeholder');
  if (locationMap) {
    locationMap.addEventListener('click', function () {
      const label = this.querySelector('p');
      if (label) {
        label.textContent = 'Lux Crown Hair Studio • 123 Crown Avenue, Johannesburg';
      }
    });
  }

  // Generic form validation and success messaging.
  const forms = document.querySelectorAll('form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let valid = true;
      const fields = form.querySelectorAll('input, select, textarea');

      fields.forEach(function (field) {
        const value = field.value.trim();
        field.setAttribute('aria-invalid', 'false');

        if (field.required && value === '') {
          field.setAttribute('aria-invalid', 'true');
          valid = false;
        }

        if (field.type === 'email' && value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            field.setAttribute('aria-invalid', 'true');
            valid = false;
          }
        }

        if (field.type === 'tel' && value) {
          const telPattern = /^[0-9+()\s-]{7,}$/;
          if (!telPattern.test(value)) {
            field.setAttribute('aria-invalid', 'true');
            valid = false;
          }
        }
      });

      const status = form.querySelector('.status-message');
      if (!valid) {
        if (status) {
          status.textContent = 'Please complete all required fields correctly before submitting.';
          status.classList.add('error');
        }
        return;
      }

      const button = form.querySelector('button[type="submit"]');
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Request sent';
        button.disabled = true;

        if (status) {
          status.textContent = 'Thank you! Your request has been received and our team will be in touch soon.';
          status.classList.remove('error');
        }

        if (form.dataset.mailto === 'true') {
          const subjectField = form.querySelector('[name="subject"]');
          const nameField = form.querySelector('[name="name"]');
          const emailField = form.querySelector('[name="email"]');
          const phoneField = form.querySelector('[name="phone"]');
          const messageField = form.querySelector('[name="message"]');

          const subject = encodeURIComponent(subjectField && subjectField.value ? subjectField.value : 'Salon enquiry');
          const message = [
            nameField ? `Name: ${nameField.value}` : '',
            emailField ? `Email: ${emailField.value}` : '',
            phoneField ? `Phone: ${phoneField.value}` : '',
            messageField ? `Message: ${messageField.value}` : ''
          ].filter(Boolean).join('\n');

          window.location.href = `mailto:hello@luxcrownstudio.co.za?subject=${subject}&body=${encodeURIComponent(message)}`;
          if (status) {
            status.textContent = 'Your email app is opening so you can send your message.';
          }
        }

        setTimeout(function () {
          button.textContent = originalText;
          button.disabled = false;
          form.reset();
        }, 2200);
      }
    });
  });
});
