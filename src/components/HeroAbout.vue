<template>
  <header class="hero">
    <CircuitBg position="top" />
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Software Developer</p>
        <h1 class="name">Kevin A. <span class="accent">Fabillar</span></h1>
        <p class="role">
          I build and maintain production web systems — currently
          <span class="hl">ASP.NET Core</span> apps for a live forex trading
          platform on <span class="hl">Azure</span>.
        </p>

        <div class="hero-actions">
          <a class="btn-primary" href="mailto:kevinfabillar01@gmail.com">
            <i class="pi pi-envelope"></i> Email me
          </a>
          <a class="btn-ghost" href="#projects">
            <i class="pi pi-github"></i> See projects
          </a>
        </div>

        <ul class="hero-meta">
          <li><i class="pi pi-map-marker"></i> Marikina City, Philippines</li>
          <li><i class="pi pi-phone"></i> 0949 617 4746</li>
        </ul>
      </div>

      <div class="hero-panel">
        <div class="photo-frame">
          <img src="/images/image.jpg" alt="Kevin A. Fabillar" class="photo" />
          <span class="corner tl"></span>
          <span class="corner tr"></span>
          <span class="corner bl"></span>
          <span class="corner br"></span>
        </div>
      </div>
    </div>
  </header>

  <section id="about" class="about block-row">
    <div class="container about-grid">
      <div class="about-copy">
        <p class="eyebrow">01 — About Me</p>
        <h2 class="section-title">From circuits to <span class="accent">code</span></h2>
        <div class="about-body">
          <p>
            I started out as a licensed Electronics Engineer, building an
            AI-based oil-and-water separator with YOLOv8 for my thesis — work
            that earned an Excellence Award at PUP. That project pulled me
            toward software, and I moved into full-time development soon
            after graduating.
          </p>
          <p>
            Today I'm the sole engineer maintaining three production ASP.NET
            Core applications for a live forex trading platform — diagnosing
            crashes, optimizing SQL Server and Azure infrastructure, and
            leading the migration from legacy server-rendered views to a
            REST-backed Vue 3 frontend.
          </p>
        </div>
      </div>

      <div class="card stats-card">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <div class="stat-icon"><i :class="'pi ' + s.icon"></i></div>
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CircuitBg from './CircuitBg.vue'

const stats = [
  { icon: 'pi-clock', value: '2+', label: 'Years Coding' },
  { icon: 'pi-check-circle', value: '3', label: 'Systems Maintained' },
  { icon: 'pi-cloud', value: 'Azure', label: 'Cloud' },
]
</script>

<style scoped>
.hero {
  padding: 56px 0 40px;
  overflow: hidden;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 48px;
  align-items: center;
}
.name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(32px, 4.6vw, 48px);
  line-height: 1.1;
  margin: 16px 0 16px;
  letter-spacing: -0.02em;
}
.role {
  font-size: 17px;
  line-height: 1.6;
  color: var(--text-dim);
  max-width: 46ch;
  margin: 0 0 26px;
}
.hl {
  color: var(--copper-bright);
  font-family: var(--font-mono);
  font-size: 0.92em;
}
.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}
.btn-primary, .btn-ghost {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  padding: 11px 20px;
  border-radius: 30px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}
.btn-primary {
  background: var(--copper);
  color: #17110a;
}
.btn-primary:hover {
  background: var(--copper-bright);
  transform: translateY(-1px);
}
.btn-ghost {
  color: var(--text);
  border: 1px solid var(--line-bright);
}
.btn-ghost:hover {
  border-color: var(--copper);
  color: var(--copper-bright);
}
.hero-meta {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-faint);
}
.hero-meta li {
  display: flex;
  align-items: center;
  gap: 7px;
}
.hero-panel {
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 420px;
  margin-left: auto;
}
.photo-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: var(--bg-card);
  overflow: hidden;
  box-shadow: 0 0 40px -8px rgba(224, 160, 79, 0.35);
}
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.corner {
  position: absolute;
  width: 26px;
  height: 26px;
  border-color: var(--copper-bright);
  pointer-events: none;
}
.corner.tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; border-top-left-radius: 10px; }
.corner.tr { top: -1px; right: -1px; border-top: 2px solid; border-right: 2px solid; border-top-right-radius: 10px; }
.corner.bl { bottom: -1px; left: -1px; border-bottom: 2px solid; border-left: 2px solid; border-bottom-left-radius: 10px; }
.corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; border-bottom-right-radius: 10px; }

.about-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 40px;
  align-items: center;
}
.about-body p {
  font-size: 15.5px;
  line-height: 1.7;
  color: var(--text-dim);
  max-width: 68ch;
  margin: 0 0 16px;
}
.stats-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0;
}
.stat-item {
  padding: 22px 14px;
  text-align: center;
  border-right: 1px solid var(--line);
}
.stat-item:last-child {
  border-right: none;
}
.stat-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--bg-raised);
  border: 1px solid var(--line-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--copper-bright);
  font-size: 14px;
  margin: 0 auto 10px;
}
.stat-value {
  display: block;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--text);
  margin-bottom: 4px;
}
.stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-faint);
}

@media (max-width: 820px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .hero-panel {
    max-width: 300px;
    margin: 0 auto;
  }
  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-card {
    grid-template-columns: 1fr;
  }
  .stat-item {
    border-right: none;
    border-bottom: 1px solid var(--line);
    padding: 18px;
  }
  .stat-item:last-child {
    border-bottom: none;
  }
}
</style>
