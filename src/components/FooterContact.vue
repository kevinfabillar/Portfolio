<template>
  <section id="contact" class="contact-section block-row">
    <CircuitBg position="top" />
    <div class="container contact-grid">
      <div class="contact-info">
        <p class="eyebrow">Let's Talk</p>
        <h2 class="section-title">Let's build something <span class="accent">great together.</span></h2>
        <p class="contact-sub">
          Have a project in mind or just want to say hi? I'll get back to you
          as soon as possible.
        </p>

        <div class="contact-detail" v-for="d in details" :key="d.label">
          <span class="detail-icon"><i :class="'pi ' + d.icon"></i></span>
          <div>
            <span class="detail-label">{{ d.label }}</span>
            <span class="detail-value">{{ d.value }}</span>
          </div>
        </div>
      </div>

      <div class="card form-card">
        <div class="form-head">
          <span class="form-icon"><i class="pi pi-send"></i></span>
          <div>
            <h3>Send me a message</h3>
            <p>Fill out the form and I'll get back to you soon.</p>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="sendEmail">
          <label class="field">
            <i class="pi pi-envelope"></i>
            <input v-model="email" type="email" required placeholder="Your email address" aria-label="Your email address" />
          </label>
          <label class="field field-textarea">
            <i class="pi pi-pencil"></i>
            <textarea v-model="message" required placeholder="Your message" rows="5" aria-label="Your message"></textarea>
          </label>
          <button type="submit" class="contact-submit">
            Send Message <i class="pi pi-send"></i>
          </button>
        </form>

        <p class="privacy-note"><i class="pi pi-lock"></i> Your information is safe and will never be shared.</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="#top" class="nav-mark">KF<span>.</span></a>
          <p class="brand-role">Software Developer · Electronics Engineer</p>
          <p class="brand-desc">Building reliable systems and clean solutions that make an impact.</p>
          <div class="footer-links">
            <a href="#" aria-label="GitHub"><i class="pi pi-github"></i></a>
            <a href="https://www.linkedin.com/in/kevin-fabillar-820444241/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="pi pi-linkedin"></i></a>
            <a href="mailto:kevinfabillar01@gmail.com" aria-label="Email"><i class="pi pi-envelope"></i></a>
            <a href="#projects" aria-label="Projects"><i class="pi pi-code"></i></a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Navigation</h4>
          <div class="footer-nav-cols">
            <div>
              <a href="#about">About</a>
              <a href="#education">Education</a>
              <a href="#stack">Tech Stack</a>
            </div>
            <div>
              <a href="#licenses">Licenses</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <a href="#" class="quick-link" @click.prevent="downloadVCard">
            <i class="pi pi-user"></i> Download VCard
          </a>
          <a href="#" class="quick-link">
            <i class="pi pi-github"></i> View on GitHub
          </a>
        </div>

        <div class="card opportunities-card">
          <span class="form-icon"><i class="pi pi-send"></i></span>
          <h4>Open to opportunities</h4>
          <p>Currently available for full-time roles and exciting projects.</p>
          <a href="#contact" class="work-link">Let's work together <i class="pi pi-arrow-right"></i></a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-note">© 2026 Kevin A. Fabillar. All rights reserved.</p>
        <p class="footer-tagline">Built with passion. Deployed with precision.</p>
        <a href="#top" class="footer-top" aria-label="Back to top"><i class="pi pi-arrow-up"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import CircuitBg from './CircuitBg.vue'

const email = ref('')
const message = ref('')

const details = [
  { icon: 'pi-envelope', label: 'Email', value: 'kevinfabillar01@gmail.com' },
  { icon: 'pi-phone', label: 'Phone', value: '0949 617 4746' },
  { icon: 'pi-map-marker', label: 'Location', value: 'Marikina City, Philippines' },
]

function sendEmail() {
  const subject = encodeURIComponent('Portfolio contact from ' + email.value)
  const body = encodeURIComponent(message.value + '\n\n— ' + email.value)
  window.location.href = `mailto:kevinfabillar01@gmail.com?subject=${subject}&body=${body}`
}

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Kevin A. Fabillar',
    'TITLE:Software Developer',
    'TEL;TYPE=CELL:+639496174746',
    'EMAIL:kevinfabillar01@gmail.com',
    'ADR:;;Marikina City;;;Philippines',
    'URL:https://www.linkedin.com/in/kevin-fabillar-820444241/',
    'END:VCARD',
  ].join('\n')
  const blob = new Blob([vcard], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'kevin-fabillar.vcf'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.contact-section {
  overflow: hidden;
  padding: 40px 0 60px;
}
.contact-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 48px;
  align-items: start;
}
.contact-sub {
  color: var(--text-dim);
  font-size: 15px;
  line-height: 1.65;
  max-width: 46ch;
  margin: 0 0 30px;
}
.contact-detail {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}
.detail-icon {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-card);
  border: 1px solid var(--line-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--copper-bright);
  font-size: 16px;
}
.detail-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-faint);
}
.detail-value {
  display: block;
  color: var(--text);
  font-size: 14.5px;
  margin-top: 2px;
}

.form-card {
  padding: 36px;
}
.form-head {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 26px;
}
.form-icon {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-raised);
  border: 1px solid var(--line-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--copper-bright);
  font-size: 16px;
}
.form-head h3 {
  font-family: var(--font-display);
  font-size: 16.5px;
  margin: 0 0 4px;
  color: var(--text);
}
.form-head p {
  margin: 0;
  font-size: 13px;
  color: var(--text-faint);
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.field {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--bg-raised);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 15px 16px;
  transition: border-color 0.15s ease;
}
.field:focus-within {
  border-color: var(--copper);
}
.field i {
  color: var(--text-faint);
  font-size: 14px;
  margin-top: 2px;
}
.field input,
.field textarea {
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  outline: none;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14.5px;
  resize: vertical;
}
.field input::placeholder,
.field textarea::placeholder {
  color: var(--text-faint);
}
.contact-submit {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 15px;
  padding: 15px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: var(--copper);
  color: #17110a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
  transition: background 0.15s ease, transform 0.15s ease;
}
.contact-submit:hover {
  background: var(--copper-bright);
  transform: translateY(-1px);
}
.privacy-note {
  display: flex;
  align-items: center;
  gap: 7px;
  justify-content: center;
  margin: 16px 0 0;
  font-size: 12px;
  color: var(--text-faint);
}
.privacy-note i {
  color: var(--copper);
  font-size: 11px;
}

.footer {
  padding: 40px 0 30px;
  border-top: 1px solid var(--line);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 36px;
}
.footer-brand .nav-mark {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 17px;
  color: var(--text);
  text-decoration: none;
}
.footer-brand .nav-mark span {
  color: var(--copper-bright);
}
.brand-role {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--copper-bright);
  margin: 10px 0 8px;
}
.brand-desc {
  color: var(--text-faint);
  font-size: 13.5px;
  line-height: 1.6;
  margin: 0 0 18px;
  max-width: 30ch;
}
.footer-links {
  display: flex;
  gap: 10px;
}
.footer-links a {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dim);
  text-decoration: none;
  font-size: 13px;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.footer-links a:hover {
  border-color: var(--copper);
  color: var(--copper-bright);
}

.footer-col h4 {
  font-family: var(--font-display);
  font-size: 14.5px;
  color: var(--text);
  margin: 0 0 16px;
}
.footer-nav-cols {
  display: flex;
  gap: 20px;
}
.footer-nav-cols div,
.footer-col {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.footer-col a,
.footer-nav-cols a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 13.5px;
  transition: color 0.15s ease;
}
.footer-col a:hover,
.footer-nav-cols a:hover {
  color: var(--copper-bright);
}
.quick-link {
  display: flex;
  align-items: center;
  gap: 8px;
}
.quick-link i {
  font-size: 13px;
  color: var(--copper);
}

.opportunities-card {
  padding: 20px;
}
.opportunities-card .form-icon {
  margin-bottom: 12px;
}
.opportunities-card h4 {
  font-family: var(--font-display);
  font-size: 14.5px;
  color: var(--text);
  margin: 0 0 8px;
}
.opportunities-card p {
  color: var(--text-faint);
  font-size: 13px;
  line-height: 1.6;
  margin: 0 0 14px;
}
.work-link {
  color: var(--copper-bright);
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.work-link:hover {
  color: var(--copper);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}
.footer-note,
.footer-tagline {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  margin: 0;
}
.footer-top {
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dim);
  text-decoration: none;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.footer-top:hover {
  border-color: var(--copper);
  color: var(--copper-bright);
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-nav-cols {
    gap: 32px;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
