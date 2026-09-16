<template>
  <div id="licenses" class="lic-block">
    <div class="block-header">
      <span class="block-label"><i class="pi pi-verified"></i> Licenses &amp; Certifications</span>
    </div>

    <div class="card lic-card">
      <div class="lic-row" v-for="l in licenses" :key="l.title">
        <span class="lic-bar" aria-hidden="true"></span>
        <div class="lic-text">
          <strong>{{ l.title }}</strong>
          <span class="lic-issuer"> — {{ l.issuer }}</span>
        </div>
        <span class="lic-date">{{ l.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const licenses = [
  {
    title: 'Licensed Electronics Engineer',
    issuer: 'Professional Regulation Commission',
    date: 'April 2024',
  },
  {
    title: 'Licensed Electronics Technician',
    issuer: 'Professional Regulation Commission',
    date: 'April 2024',
  },
  {
    title: 'Excellence Award for Thesis Paper',
    issuer: 'Thesis: "AIOWS — Artificial Intelligence-Based Autonomous Oil and Water Separator Using YOLOv8 for Object Detection," PUP',
    date: '2023',
  },
]
</script>

<style scoped>
.lic-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.lic-row {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
}
.lic-bar {
  flex: none;
  align-self: stretch;
  width: 3px;
  border-radius: 2px;
  background: var(--copper);
}
.lic-text {
  flex: 1;
  min-width: 0;
  font-size: 14px;
}
.lic-text strong {
  color: var(--text);
  font-weight: 600;
}
.lic-issuer {
  color: var(--text-dim);
}
.lic-date {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  white-space: nowrap;
}

@media (max-width: 560px) {
  .lic-row {
    flex-direction: column;
    gap: 6px;
  }
  .lic-bar {
    width: 100%;
    height: 3px;
  }
}
</style>
