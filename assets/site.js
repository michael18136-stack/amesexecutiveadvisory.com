

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const status = document.querySelector('#form-status');
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = 'Sending...';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Unable to send your message.');
      }
document.querySelector('.form-card h2').textContent = 'Your Message is Received!';
      document.querySelector('.form-card > p.lead').style.display = 'none';
      form.innerHTML = `
        <div role="status" aria-live="polite" style="padding:24px 0;line-height:1.7;">
          
          <H2>Thank you, I'll contact you shortly.</H2>
        </div>
      `;
    } catch (error) {
      status.textContent =
        'Your message could not be sent. Please try again.';
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});
