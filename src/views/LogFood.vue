<script setup lang="ts">
  import { onMounted, reactive } from "vue";
  import axiosInstance from "@/lib/axios";
  import { useTrackableItemStore } from "@/store/trackable_item";
  import { type Food, type FoodErrors, TimeOfDay, Size, SpiceLevel, FatContent, type Validations } from "@/types";
  import router from "@/router";
  import { AxiosError } from "axios";
  import { getFormattedDate } from "@/lib/date";
  import { validateTrackableItemForm } from "@/lib/validation_handler";
  import {useToast} from 'vue-toast-notification';

  const foodEdit = useTrackableItemStore();

  const form = reactive<Food>({
    id: 0,
    date: getFormattedDate(new Date(), "HTML"),
    timeOfDay: TimeOfDay.Morning,
    foodTitle: "",
    size: Size.Small,
    spiceLevel: SpiceLevel.None,
    fatContent: FatContent.None,
    gluten: false,
    dairy: false,
    medication: 2,
  });

  const errors = reactive<FoodErrors>({
    api: "",
    date: "",
    timeOfDay: "",
    foodTitle: "",
    size: "",
    spiceLevel: "",
    fatContent: "",
    gluten: "",
    dairy: "",
    medication: "",
  });

  const handleSubmit = async () => {
    const validations: Validations = {
      date: ['mandatory'],
      timeOfDay: ['mandatory'],
      foodTitle: ['mandatory','max:255'],
      size: ['mandatory'],
      spiceLevel: ['mandatory'],
      fatContent: ['mandatory'],
      gluten: ['mandatory'],
      dairy: ['mandatory'],
      medication: ['mandatory', 'integer', 'positive'],
    };
    if (validateTrackableItemForm(form, errors, validations)) {
      errors.api = await createFood(form);
    }
  };

  const createFood = async (data: Food) => {
    try {
        const toast = useToast();
        if (foodEdit.stateSet()) {
          await axiosInstance.patch(`/food/${data.id}`, data);
          toast.success('Food Edited!', {position: 'top'});
        }
        else {
          await axiosInstance.post('/food', data);
          toast.success('Food Logged!', {position: 'top'});
        }

        router.push('/dashboard');
        return "";
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            if (typeof e.response?.data.message === 'string' || e.response?.data.message instanceof String) {
                return e.response?.data.message;
            }
            else {
                return "An unexpected error occurred.";
            }
        }
        else {
            return "An unexpected error occurred.";
        }
    }
  };

  const deleteFood = async () => {
    try {
        const toast = useToast();
        await axiosInstance.delete(`/food/${form.id}`);
        toast.success('Food Deleted!', {position: 'top'});

        router.push('/dashboard');
        return "";
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            if (typeof e.response?.data.message === 'string' || e.response?.data.message instanceof String) {
                return e.response?.data.message;
            }
            else {
                return "An unexpected error occurred.";
            }
        }
        else {
            return "An unexpected error occurred.";
        }
    }
  };

  /**
   * Edit pre-population from pinia store
   */
  onMounted(async () => {
    if (foodEdit.stateSet()) {
      Object.assign(form, foodEdit.trackableItem);
    }
  });
</script>
<template>
  <main class="main-container">
      <div class="main-card-extra-wide">
          <h1 class="main-title">{{ foodEdit.stateSet() ? "Edit Food Log" : "Log Food" }}</h1>
          <form class="auth-form" novalidate @submit.prevent="handleSubmit()">
            <!-- Date -->
            <div class="form-group">
              <label for="date" class="form-label">Date</label>
              <input type="date" id="date" v-model="form.date" class="form-input" />
              <span v-if="errors.date" class="form-error">{{ errors.date }}</span>
            </div>

            <!-- Time of day -->
            <div class="form-group">
              <label class="form-label">Time of Day</label>
              <div class="form-radio-group">
                <label>
                  <input type="radio" value="Morning" v-model="form.timeOfDay" />
                  Morning
                </label>
                <label>
                  <input type="radio" value="Afternoon" v-model="form.timeOfDay" />
                  Afternoon
                </label>
                <label>
                  <input type="radio" value="Evening" v-model="form.timeOfDay" />
                  Evening
                </label>
              </div>
              <span v-if="errors.timeOfDay" class="form-error">{{ errors.timeOfDay }}</span>
            </div>

            <!-- Search pre-population -->
            <p class="main-text">Search placeholder</p>

            <!-- Food Title -->
            <div class="form-group">
                <label for="foodTitle" class="form-label">Food Title</label>
                <input type="text" id="foodTitle" v-model="form.foodTitle" class="form-input" placeholder="Lamb Steak" />
                <span v-if="errors.foodTitle" class="form-error">{{ errors.foodTitle }}</span>
            </div>

            <!-- Medication -->
            <div class="form-group">
                <label for="medication" class="form-label">Medication (tablets)</label>
                <input type="text" id="medication" v-model="form.medication" class="form-input" placeholder="2" />
                <span v-if="errors.medication" class="form-error">{{ errors.medication }}</span>
            </div>

            <!-- Size -->
            <div class="form-group">
              <label class="form-label">Size</label>
              <div class="form-radio-group">
                <label>
                  <input type="radio" value="Small" v-model="form.size" />
                  Small
                </label>
                <label>
                  <input type="radio" value="Medium" v-model="form.size" />
                  Medium
                </label>
                <label>
                  <input type="radio" value="Large" v-model="form.size" />
                  Large
                </label>
                <label>
                  <input type="radio" value="ExtraLarge" v-model="form.size" />
                  Extra Large
                </label>
              </div>
              <span v-if="errors.size" class="form-error">{{ errors.size }}</span>
            </div>

            <!-- Spice -->
            <div class="form-group">
              <label class="form-label">Spice Level</label>
              <div class="form-radio-group">
                <label>
                  <input type="radio" value="None" v-model="form.spiceLevel" />
                  None
                </label>
                <label>
                  <input type="radio" value="Mild" v-model="form.spiceLevel" />
                  Mild
                </label>
                <label>
                  <input type="radio" value="Medium" v-model="form.spiceLevel" />
                  Medium
                </label>
                <label>
                  <input type="radio" value="Spicy" v-model="form.spiceLevel" />
                  Spicy
                </label>
                <label>
                  <input type="radio" value="ExtraSpicy" v-model="form.spiceLevel" />
                  Extra Spicy
                </label>
              </div>
              <span v-if="errors.spiceLevel" class="form-error">{{ errors.spiceLevel }}</span>
            </div>

            <!-- Fat Content -->
            <div class="form-group">
              <label class="form-label">Fat Content</label>
              <div class="form-radio-group">
                <label>
                  <input type="radio" value="None" v-model="form.fatContent" />
                  None
                </label>
                <label>
                  <input type="radio" value="Low" v-model="form.fatContent" />
                  Low
                </label>
                <label>
                  <input type="radio" value="Medium" v-model="form.fatContent" />
                  Medium
                </label>
                <label>
                  <input type="radio" value="High" v-model="form.fatContent" />
                  High
                </label>
                <label>
                  <input type="radio" value="ExtraHigh" v-model="form.fatContent" />
                  Extra High
                </label>
              </div>
              <span v-if="errors.fatContent" class="form-error">{{ errors.fatContent }}</span>
            </div>

            <!-- Gluten and Dairy -->
            <div class="form-checkbox-group">
              <label>
                <input type="checkbox" v-model="form.gluten" />
                Gluten
              </label>
              <label>
                <input type="checkbox" v-model="form.dairy" />
                Dairy
              </label>
              <span v-if="errors.gluten || errors.dairy" class="form-error">
                {{ errors.gluten || errors.dairy }}
              </span>
            </div>

            <button type="submit" class="button cursor-pointer">{{ foodEdit.stateSet() ? "Save Edit" : "Log" }}</button>
            <template v-if="foodEdit.stateSet()">
              <button type="button" class="button delete cursor-pointer" @click="deleteFood()">Delete</button>
              <RouterLink to="/dashboard" class="button secondary">Return</RouterLink>
            </template>
            <span v-if="errors.api" class="form-error api-error">{{ errors.api }}</span>
        </form>
      </div>
  </main>
</template>