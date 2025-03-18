<script setup lang="ts">
  import { computed } from 'vue';

  interface Props {
    code: string;
  };

  const props = defineProps<Props>();

  const code = computed(() => props.code || 'No Error Code');
</script>
<template>
  <main class="main-container">
      <div class="main-card">
          <h1 class="main-title">Error {{ code }}</h1>
      </div>
  </main>
</template>  