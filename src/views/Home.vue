<script setup lang="ts">
</script>
<template>
  <main class="welcome-container">
    <div class="welcome-card">
      <h1 class="welcome-title">Welcome</h1>
      <p class="welcome-text">Please log in or register to continue</p>
      <div class="welcome-buttons">
        <RouterLink to="/login" class="welcome-button">Login</RouterLink>
        <RouterLink to="/register" class="welcome-button secondary">Register</RouterLink>
      </div>
    </div>
  </main>
</template>
