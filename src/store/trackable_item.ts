import { defineStore } from "pinia";
import type { TrackableItem } from "@/types";
import { ref } from "vue";

export const useTrackableItemStore = defineStore("trackableItem", () => 
    {
        const trackableItem = ref<TrackableItem | null>(null);

        const setState = (newItem: TrackableItem) => {
            trackableItem.value = newItem;
        };

        const cleanState = () => {
            trackableItem.value = null;
        };

        const stateSet = () => {
            return trackableItem.value !== null;
        };

        return {
            trackableItem,
            setState,
            cleanState,
            stateSet,
        };
    }, 
    {
        persist: {
            storage: sessionStorage,
            pick: ['trackableItem'],
        },
    }
);