<template>
  <nav class="nav">
    <div class="container nav-inner">
      <a href="#top" class="nav-mark" @click="menuOpen = false">KF<span>.</span></a>

      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#stack">Stack</a>
        <a href="#licenses">Licenses</a>
        <a href="#projects">Projects</a>
      </div>
      <a href="#contact" class="nav-cta">Let's Connect <i class="pi pi-arrow-right"></i></a>

      <button
        type="button"
        class="nav-toggle"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
      >
        <i :class="menuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </div>

    <div class="nav-mobile" v-if="menuOpen">
      <a href="#about" @click="menuOpen = false">About</a>
      <a href="#education" @click="menuOpen = false">Education</a>
      <a href="#stack" @click="menuOpen = false">Stack</a>
      <a href="#licenses" @click="menuOpen = false">Licenses</a>
      <a href="#projects" @click="menuOpen = false">Projects</a>
      <a href="#contact" class="nav-mobile-cta" @click="menuOpen = false">
        Let's Connect <i class="pi pi-arrow-right"></i>
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(15, 26, 22, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  gap: 16px;
}
.nav-mark {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 15px;
  color: var(--text);
  text-decoration: none;
  flex: none;
}
.nav-mark span {
  color: var(--copper-bright);
}
.nav-links {
  display: flex;
  gap: 26px;
  margin-right: auto;
  margin-left: 32px;
}
.nav-links a {
  font-size: 13.5px;
  color: var(--text-dim);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease;
}
.nav-links a:hover {
  color: var(--copper-bright);
}
.nav-cta {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 13.5px;
  color: #17110a;
  background: var(--copper);
  border-radius: 20px;
  padding: 9px 18px;
  text-decoration: none;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s ease, transform 0.15s ease;
}
.nav-cta i {
  font-size: 11px;
}
.nav-cta:hover {
  background: var(--copper-bright);
  transform: translateY(-1px);
}
.nav-toggle {
  display: none;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  flex: none;
}
.nav-toggle:hover {
  border-color: var(--copper);
  color: var(--copper-bright);
}
.nav-mobile {
  display: none;
}

@media (max-width: 760px) {
  .nav-links,
  .nav-cta {
    display: none;
  }
  .nav-toggle {
    display: flex;
  }
  .nav-mobile {
    display: flex;
    flex-direction: column;
    padding: 8px 20px 20px;
    border-top: 1px solid var(--line);
    background: var(--bg);
  }
  .nav-mobile a {
    padding: 13px 0;
    border-bottom: 1px solid var(--line);
    color: var(--text-dim);
    text-decoration: none;
    font-size: 15px;
  }
  .nav-mobile a:hover {
    color: var(--copper-bright);
  }
  .nav-mobile-cta {
    margin-top: 14px;
    border-bottom: none !important;
    color: #17110a !important;
    background: var(--copper);
    border-radius: 10px;
    padding: 12px !important;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 600;
  }
}
</style>
