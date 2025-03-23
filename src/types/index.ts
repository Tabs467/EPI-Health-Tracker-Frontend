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

export interface Form {
}

export interface FoodForm extends Form {
    date: string;
    timeOfDay: TimeOfDay;
    foodTitle: string;
    size: Size;
    spiceLevel: SpiceLevel;
    fatContent: FatContent;
    gluten: boolean;
    dairy: boolean;
}

export interface SymptomForm extends Form {
    date: string;
    timeOfDay: TimeOfDay;
    type: string;
}

export type ValidationRule = "mandatory" | `max:${number}`;

export interface Validations {
  [key: string]: ValidationRule[];
}

export interface FormErrors {
    // Ensures all properties must be strings
    [key: string]: string;
    api: string;
}

export interface FoodFormErrors extends FormErrors {
    date: string;
    timeOfDay: string;
    foodTitle: string;
    size: string;
    spiceLevel: string;
    fatContent: string;
    gluten: string;
    dairy: string;
}

export interface SymptomFormErrors extends FormErrors {
    date: string;
    timeOfDay: string;
    type: string;
}