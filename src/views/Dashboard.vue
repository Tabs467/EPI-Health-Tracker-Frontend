<script setup lang="ts">
  import { useAuthStore } from "@/store/auth";
  import { getFormattedDate, isLater } from "@/lib/date";
  import { onMounted, ref } from "vue";
  import axiosInstance from "@/lib/axios";
  import { type FoodForm, type ItemHeadline, type SymptomForm } from "@/types";
  import router from "@/router";
  import { camelCaseToTitleCase } from "@/lib/string";
  

  const auth = useAuthStore();
  let currentDate = getFormattedDate(new Date(), "display");

  const recentlyAdded = ref<ItemHeadline[]>([]);

  const getRecentlyAdded = async (page = 1) => {
      const foodResponse = await axiosInstance.get('/food');
      const food: FoodForm[] = foodResponse.data.data;
      const symptomResponse = await axiosInstance.get('/symptom');
      const symptoms: SymptomForm[] = symptomResponse.data.data;

      let updatedRecentlyAdded: ItemHeadline[] = [];

      if (food.length === 0) {
        symptoms.forEach(function(symptomElement, index) {
          updatedRecentlyAdded.push({title: symptomElement.type});
        });
      }
      else if (symptoms.length === 0) {
        food.forEach(function(foodElement, index) {
          updatedRecentlyAdded.push({title: foodElement.foodTitle});
        });
      }
      else {
        // Reverse arrays, since we work through them backwards when populating recentlyAdded
        food.reverse();
        symptoms.reverse();

        let foodIndex = food.length - 1;
        let symptomIndex = symptoms.length - 1;
        for (let headlineIndex = 0; headlineIndex < 10; headlineIndex++) {
          if (foodIndex >= 0 && symptomIndex >= 0) {
            if (
              food[foodIndex].date >= symptoms[symptomIndex].date
              && (
                food[foodIndex].timeOfDay === symptoms[symptomIndex].timeOfDay
                || isLater(food[foodIndex].timeOfDay, symptoms[symptomIndex].timeOfDay)
              )
            ) {
              updatedRecentlyAdded.push({title: food[foodIndex].foodTitle, additional: food[foodIndex].medication.toString()});
              foodIndex--;
            }
            else {
              updatedRecentlyAdded.push({title: camelCaseToTitleCase(symptoms[symptomIndex].type)});
              symptomIndex--;
            }
          }
          else if (foodIndex === -1 && symptomIndex >= 0) {
            updatedRecentlyAdded.push({title: camelCaseToTitleCase(symptoms[symptomIndex].type)});
            symptomIndex--;
          }
          else if (foodIndex >= 0 && symptomIndex === -1) {
            updatedRecentlyAdded.push({title: food[foodIndex].foodTitle, additional: food[foodIndex].medication.toString()});
            foodIndex--;
          }
          else {
            break;
          }
        }
      }

      recentlyAdded.value = updatedRecentlyAdded;
  };

  onMounted(async () => {
      await getRecentlyAdded();
  });

  const scrollCardNavigate = (location: string) => {
    router.push(`/${location}`);
  };
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
                <template v-if="recentlyAdded.length != 0">
                  <div v-for="item in recentlyAdded" class="scroll-card">
                    <p class="text">{{ item.title }}</p>
                    <p v-if="item.additional" class="text text-semi-bold">{{ item.additional }} Creon</p>
                  </div>
                  <div class="scroll-card scroll-card-button" @click="scrollCardNavigate('calendar')">
                    <p class="text text-white">See more</p>
                  </div>
                </template>
                <div v-else class="scroll-card scroll-card-button" @click="scrollCardNavigate('log')">
                  <p class="text text-white">Log to get started!</p>
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