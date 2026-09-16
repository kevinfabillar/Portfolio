import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'

// Custom preset: circuit-board palette derived from copper/PCB-green tokens
const CircuitPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fdf3ea',
      100: '#f7dfc4',
      200: '#f0c99c',
      300: '#e8b271',
      400: '#e0a04f',
      500: '#c97c3d',
      600: '#b06a32',
      700: '#8f5527',
      800: '#6f421e',
      900: '#4f2f16',
      950: '#331e0e'
    }
  }
})

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: CircuitPreset,
    options: {
      darkModeSelector: '.app-dark',
      cssLayer: false
    }
  }
})
app.mount('#app')
