<script setup lang="ts">
  import { reactive } from "vue";
  import axiosInstance from "@/lib/axios";
  import { type Symptom, type SymptomErrors, TimeOfDay, type Validations} from "@/types";
  import router from "@/router";
  import { AxiosError } from "axios";
  import { getFormattedDate } from "@/lib/date";
  import { validateTrackableItemForm } from "@/lib/validation_handler";
  import {useToast} from 'vue-toast-notification';

  const form = reactive<Symptom>({
    date: getFormattedDate(new Date(), "HTML"),
    timeOfDay: TimeOfDay.Morning,
    type: "",
  });

  const errors = reactive<SymptomErrors>({
    api: "",
    date: "",
    timeOfDay: "",
    type: "",
  });

  const handleSubmit = async () => {
    const validations: Validations = {
      date: ['mandatory'],
      timeOfDay: ['mandatory'],
      type: ['mandatory'],
    };
    if (validateTrackableItemForm(form, errors, validations)) {
      errors.api = await createSymptom(form);
    }
  };

  const createSymptom = async (data: Symptom) => {
    try {
        await axiosInstance.post('/symptom', data);
        const toast = useToast();
        toast.success('Symptom Logged!', {position: 'top'});
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

</script>
<template>
  <main class="main-container">
      <div class="main-card-extra-wide">
          <h1 class="main-title">Log Symptom</h1>
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

            <!-- Symptom Type, hardcoded types for now -->
            <div class="form-group">
              <label class="form-label">Symptom Type</label>
              <select class="form-select" v-model="form.type">
                <option value="stomachPain">Stomach Pain</option>
                <option value="nausea">Nausea</option>
                <option value="headache">Headache</option>
              </select>
              <span v-if="errors.type" class="form-error">{{ errors.type }}</span>
            </div>

            <button type="submit" class="button cursor-pointer">Log</button>
            <span v-if="errors.api" class="form-error api-error">{{ errors.api }}</span>
        </form>
      </div>
  </main>
</template>