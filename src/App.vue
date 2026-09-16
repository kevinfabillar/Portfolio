<template>
  <div id="top">
    <NavBar />
    <HeroAbout />

    <section class="block-row">
      <div class="container grid-2col-equal">
        <Education />
        <Licenses />
      </div>
    </section>

    <TechStack />
    <Projects />

    <FooterContact />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroAbout from './components/HeroAbout.vue'
import Education from './components/Education.vue'
import TechStack from './components/TechStack.vue'
import Licenses from './components/Licenses.vue'
import Projects from './components/Projects.vue'
import FooterContact from './components/FooterContact.vue'
</script>
