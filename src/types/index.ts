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

export interface FoodForm {
    date: string;
    timeOfDay: TimeOfDay;
    foodTitle: string;
    size: Size;
    spiceLevel: SpiceLevel;
    fatContent: FatContent;
    gluten: boolean;
    dairy: boolean;
}

interface FormErrors {
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