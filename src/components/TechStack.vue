<template>
  <div id="stack" class="stack-block block-row">
    <div class="container">
      <div class="block-header">
        <span class="block-label"><i class="pi pi-box"></i> Tech Stack</span>
      </div>

      <div class="chips">
        <span v-for="item in stack" :key="item.name" class="chip">
          <i :class="'pi ' + item.icon"></i>{{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const stack = [
  { name: 'ASP.NET Core', icon: 'pi-server' },
  { name: 'EF Core', icon: 'pi-database' },
  { name: 'SQL Server', icon: 'pi-table' },
  { name: 'Azure', icon: 'pi-cloud' },
  { name: 'Vue 3', icon: 'pi-bolt' },
  { name: '.NET 10', icon: 'pi-box' },
  { name: 'C#', icon: 'pi-hashtag' },
  { name: 'JavaScript', icon: 'pi-code' },
  { name: 'Firebase', icon: 'pi-shield' },
]
</script>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.chip {
  font-family: var(--font-mono);
  font-size: 13.5px;
  color: var(--text);
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.chip i {
  color: var(--copper-bright);
  font-size: 13px;
}
</style>
