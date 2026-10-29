

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

      form.innerHTML = `
        <div role="status" aria-live="polite" style="padding:24px 0;line-height:1.7;">
          <h3 style="margin-bottom:12px;">Thank You</h3>
          <p>Thank you, your message has been received. I'll contact you as soon as possible.</p>
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
