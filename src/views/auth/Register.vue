<script setup lang="ts">
    import { reactive } from "vue";
    import type { RegisterForm } from "@/types";
    import { useAuthStore } from "@/store/auth";

    const auth = useAuthStore();

    const form = reactive<RegisterForm>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const errors = reactive({
        api: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const validateForm = () => {
        let isValid = true;

        errors.api = "";
        errors.name = "";
        errors.email = "";
        errors.password = "";
        errors.password_confirmation = "";

        if (!form.name) {
            errors.name = "Name is required.";
            isValid = false;
        }

        if (!form.email) {
            errors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = "Invalid email format.";
            isValid = false;
        }

        if (!form.password) {
            errors.password = "Password is required.";
            isValid = false;
        } else if (form.password.length < 8) {
            errors.password = "Password must be at least 8 characters.";
            isValid = false;
        }

        if (form.password !== form.password_confirmation) {
            errors.password_confirmation = "Passwords do not match.";
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            // If not redirected to dashboard from auth.register success, display the api error message
            errors.api = await auth.register(form);
        }
    };
</script>
<template>
    <div>
        <h1 class="pb-5">Register</h1>
        <form class="max-w-sm mx-auto" novalidate @submit.prevent="handleSubmit()">
            <div class="mb-5 bottom-5 pb-3">
                <label for="name" class="form-field-textbox-label">Name</label>
                <input type="name" id="name" v-model="form.name" class="form-field-textbox" placeholder="John Doe" />
                <template v-if="errors.name">
                    <span class="text-red-500 text-xs italic">
                        {{ errors.name }}
                    </span>
                </template>
            </div>
            <div class="mb-5 bottom-5 pb-3">
                <label for="email" class="form-field-textbox-label">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-field-textbox" placeholder="johndoe@email.com" />
                <template v-if="errors.email">
                    <span class="text-red-500 text-xs italic">
                        {{ errors.email }}
                    </span>
                </template>
            </div>
            <div class="mb-5 bottom-5 pb-3">
                <label for="password" class="form-field-textbox-label">Password</label>
                <input type="password" id="password" v-model="form.password" class="form-field-textbox" />
                <template v-if="errors.password">
                    <span class="text-red-500 text-xs italic">
                        {{ errors.password }}
                    </span>
                </template>
            </div>
            <div class="mb-5 bottom-5 pb-3">
                <label for="password_confirmation" class="form-field-textbox-label">Password confirmation</label>
                <input type="password" id="password_confirmation" v-model="form.password_confirmation" class="form-field-textbox" />
                <template v-if="errors.password_confirmation">
                    <span class="text-red-500 text-xs italic">
                        {{ errors.password_confirmation }}
                    </span>
                </template>
            </div>
            <button type="submit" class="form-field-submit">Register</button>
            <template v-if="errors.api">
                <span class="text-red-500 text-s italic pl-5">
                    {{ errors.api }}
                </span>
            </template>
        </form>
    </div>
</template>