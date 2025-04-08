<script setup lang="ts">
  import { useAuthStore } from "@/store/auth";
  import { getFormattedDate } from "@/lib/date";

  const auth = useAuthStore();
  let currentDate = getFormattedDate(new Date(), "display");
</script>
<template>
  <main class="main-container">
      <div class="main-card-extra-wide">
          <h1 class="main-title">Dashboard</h1>
          <p class="main-text-large text-left">
            Welcome back, <span class="text-semi-bold">{{ auth.user?.name }}</span>
          </p>
          <div class="dashboard-grid">
            <div>
              <p class="main-text-large text-left">Today's date is {{ currentDate }}</p>
            </div>
            <div class="grid-row-span-2">
            <p class="main-text-large">Recently logged</p>
            <div class="scroll-box">
              <div class="scrollable-content">
                <div class="scroll-card">
                  <p class="text">Ham and Cheese Sandwich</p>
                  <p class="text text-semi-bold">2 Creon</p>
                </div>
                <div class="scroll-card">
                  <p class="text">Coffee, Toast, Cheese</p>
                  <p class="text text-semi-bold">1 Creon</p>
                </div>
              </div>
            </div>
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