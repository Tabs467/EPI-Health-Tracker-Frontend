<script setup lang="ts">
  import { computed } from 'vue';

  interface Props {
    code: string;
  };

  const props = defineProps<Props>();

  const code = computed(() => props.code || 'No Error Code');
</script>

<template>
  <div>
    <h1>Error: {{ code }}</h1>
  </div>
</template>