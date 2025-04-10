import router from "@/router";
import { useAuthStore } from "@/store/auth";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    withXSRFToken: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const auth = useAuthStore();
        switch (error.response.status) {
            case 401:
                auth.cleanState();
                router.push({ name: "login" });
                break;
            case 404:
                router.push({ name: "error-code", params: { code: "404" } });
                break;
            case 419:
                auth.cleanState();
                router.push({ name: "login" });
                break;
            case 500:
                router.push({ name: "error-code", params: { code: "500" } });
                break;
        }
        return Promise.reject(error);
    }
);

// Return an error message for any caught API errors
export function handleAPIErrors(e: any): string {
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
};

export default axiosInstance;