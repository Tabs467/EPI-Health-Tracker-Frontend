<script setup lang="ts">
  import { useAuthStore } from "@/store/auth";
  import { getFormattedDate } from "@/lib/date";

  const auth = useAuthStore();
  let currentDate = getFormattedDate(new Date());
</script>
<template>
  <main class="main-container">
      <div class="main-card-wide">
          <h1 class="main-title">Dashboard</h1>
          <p class="main-text-large text-left">
            Welcome back, <span class="text-semi-bold">{{ auth.user?.name }}</span>
          </p>
          <div class="dashboard-grid">
            <div>
              <p class="main-text-large text-left">Today's date is {{ currentDate }}</p>
            </div>
            <div class="grid-row-span-2">
              <p>Recently added placeholder</p>
            </div>
            <div>
              <RouterLink to="/log" class="button button-wide">Log Food/Symptom</RouterLink>
            </div>
          </div>
          <div class="dashboard-search-margin">
            <p>Search placeholder</p>
          </div>
      </div>
  </main>
</template>