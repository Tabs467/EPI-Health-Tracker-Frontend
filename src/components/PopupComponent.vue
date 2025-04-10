<script setup lang="ts">
    interface Props {
        header: string;
        body: string;
    };

    const props = defineProps<Props>();
    const emit = defineEmits(['confirm', 'close']);

    const confirm = () => {
      emit('confirm');
    };

    const close = () => {
      emit('close');
    };
</script>
<template>
  <div class="form-popup">
    <div class="main-card">
      <h2 class="main-title">{{ header }}</h2>
      <p class="main-text-large">{{ body }}</p>
      <div class="button-group">
        <button class="button secondary cursor-pointer" @click="close">Cancel</button>
        <button class="button delete cursor-pointer" @click="confirm">Confirm</button>
      </div>
    </div>
  </div>
</template>