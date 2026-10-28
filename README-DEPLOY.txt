AMES EXECUTIVE ADVISORY — CLOUDFLARE PAGES DEPLOYMENT

1. Create a Cloudflare Pages project and upload this website using a Git repository (recommended) or Wrangler CLI. IMPORTANT: the contact form uses a Pages Function under functions/api/contact.js. For reliable deployment of Pages Functions, use a Git-connected Pages project or deploy with Wrangler CLI (wrangler pages deploy . --project-name YOUR_PROJECT). Dashboard drag-and-drop of static files may not deploy Functions.
2. Set production custom domain amesexecutiveadvisory.com under Pages > Custom domains and follow Cloudflare DNS instructions. Enable HTTPS.
3. Create a Resend account (resend.com). Verify a sending domain you own, e.g. mail.amesexecutiveadvisory.com, using the DNS records Resend supplies. Do not use an unverified Gmail address as the From address.
4. Create a Resend API key. In Cloudflare Pages > Settings > Variables and Secrets, set:
   RESEND_API_KEY = your Resend API key (encrypted secret)
   CONTACT_FROM_EMAIL = Ames Executive Advisory <contact@mail.amesexecutiveadvisory.com> (use a verified domain and valid sender)
   The form sends TO michael18136@gmail.com and sets Reply-To to the visitor's email.
5. Redeploy after adding the secrets, then test a real contact submission and confirm receipt (including spam folder). Until steps 3–5 are completed, the form displays a clear error and will NOT send messages.
6. Site pages: /, /services/, /experience/, /insights/, six individual article URLs, /contact/, /privacy/.
7. The six articles are sourced from the final DOCX files provided. The site uses the supplied approved logo and actual portrait. Other illustrations are photographic crops from the previously approved design mockups; replace with original high-resolution licensed photos if desired.
8. No analytics or third-party tracking scripts are included. Privacy text should be reviewed for your actual operating practices before launch.
9. Optional: add Cloudflare Turnstile and rate limiting if spam becomes an issue. The current form has a hidden honeypot but no robust bot protection.
10. Note: homepage copy is intentionally kept close to the original approved mockup, without the subsequently rejected broad visual redesign.
