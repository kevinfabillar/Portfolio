<template>
  <svg
    class="circuit-bg"
    :class="position"
    viewBox="0 0 900 500"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <path
      d="M-20 380 C 120 380, 160 300, 260 300 S 380 220, 480 220 S 600 140, 900 140"
      fill="none"
      stroke="var(--line-bright)"
      stroke-width="1.4"
    />
    <path
      d="M-20 440 C 100 440, 140 470, 240 470 S 360 400, 520 400 S 700 460, 900 460"
      fill="none"
      stroke="var(--line-bright)"
      stroke-width="1.4"
    />
    <circle cx="260" cy="300" r="3.5" fill="var(--copper-bright)" />
    <circle cx="480" cy="220" r="3.5" fill="var(--copper)" />
    <circle cx="240" cy="470" r="3" fill="var(--copper-bright)" />
    <circle cx="520" cy="400" r="3" fill="var(--copper)" />
    <circle cx="60" cy="100" r="2.5" fill="var(--line-bright)" />
    <circle cx="820" cy="60" r="2.5" fill="var(--line-bright)" />
  </svg>
</template>

<script setup>
defineProps({
  position: { type: String, default: 'top' },
})
</script>

<style scoped>
.circuit-bg {
  position: absolute;
  left: 0;
  width: 100%;
  height: 320px;
  opacity: 0.22;
  pointer-events: none;
  z-index: 0;
}
.circuit-bg.top {
  top: 0;
}
.circuit-bg.bottom {
  bottom: 0;
  transform: scaleY(-1);
}
@media (max-width: 640px) {
  .circuit-bg {
    display: none;
  }
}
</style>
