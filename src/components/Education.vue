<template>
  <div id="education" class="edu-block">
    <div class="block-header">
      <span class="block-label"><i class="pi pi-graduation-cap"></i> Education</span>
    </div>

    <div class="card edu-card">
      <div class="edu-row">
        <span class="edu-bar" aria-hidden="true"></span>
        <div class="edu-content">
          <div class="edu-top">
            <h3>Bachelor of Science in Electronics Engineering</h3>
            <span class="edu-dates">2019 – 2023</span>
          </div>
          <p class="edu-school">Polytechnic University of the Philippines — Sta. Mesa, Manila</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edu-row {
  display: flex;
  gap: 16px;
}
.edu-bar {
  flex: none;
  width: 3px;
  border-radius: 2px;
  background: var(--copper);
}
.edu-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
}
.edu-content h3 {
  font-family: var(--font-display);
  font-size: 16.5px;
  margin: 0;
  color: var(--text);
  line-height: 1.3;
}
.edu-dates {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  white-space: nowrap;
}
.edu-school {
  margin: 6px 0 12px;
  color: var(--text-dim);
  font-style: italic;
  font-size: 13.5px;
}
</style>
