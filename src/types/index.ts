export interface User {
    id: number;
    name: string;
    email: string;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export enum Size {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    ExtraLarge = "ExtraLarge",
}

export enum SpiceLevel {
    None = "None",
    Mild = "Mild",
    Medium = "Medium",
    Spicy = "Spicy",
    ExtraSpicy = "ExtraSpicy",
}

export enum FatContent {
    None = "None",
    Low = "Low",
    Medium = "Medium",
    High = "High",
    ExtraHigh = "ExtraHigh",
}

export enum TimeOfDay {
    Morning = "Morning",
    Afternoon = "Afternoon",
    Evening = "Evening"
}

export interface TrackableItem {
}

export interface Food extends TrackableItem {
    date: string;
    timeOfDay: TimeOfDay;
    foodTitle: string;
    size: Size;
    spiceLevel: SpiceLevel;
    fatContent: FatContent;
    gluten: boolean;
    dairy: boolean;
    medication: number;
}

export interface Symptom extends TrackableItem {
    date: string;
    timeOfDay: TimeOfDay;
    type: string;
}

export type ValidationRule = "mandatory" | `max:${number}` | "integer" | "positive";

export interface Validations {
  [key: string]: ValidationRule[];
}

export interface TrackableItemErrors {
    // Ensures all properties must be strings
    [key: string]: string;
    api: string;
}

export interface FoodErrors extends TrackableItemErrors {
    date: string;
    timeOfDay: string;
    foodTitle: string;
    size: string;
    spiceLevel: string;
    fatContent: string;
    gluten: string;
    dairy: string;
    medication: string;
}

export interface SymptomErrors extends TrackableItemErrors {
    date: string;
    timeOfDay: string;
    type: string;
}

export interface ItemHeadline {
    title: string;
    additional?: string;
    item: TrackableItem;
}