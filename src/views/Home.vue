<script setup lang="ts">
</script>
<template>
  <main class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Welcome</h1>
      <p class="main-nav-text">Please log in or register to continue</p>
      <div class="button-group">
        <RouterLink to="/login" class="button">Login</RouterLink>
        <RouterLink to="/register" class="button secondary">Register</RouterLink>
      </div>
    </div>
  </main>
</template>
