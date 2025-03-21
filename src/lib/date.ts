// Return a formatted date
export function getFormattedDate(date: Date, format: string): string {
    // Return a formatted date in the format "18th March 2025"
    if (format === "display") {
        const day = date.getDate();
        const month = date.toLocaleString('en-GB', { month: 'long' });
        const year = date.getFullYear();

        return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    }
    // Return a formatted date in the format "YYYY-MM-DD"
    else if (format === "HTML") {
        return date.toISOString().split("T")[0];
    }
    else {
        return date.toString();
    }
}

// Return ordinal suffix for a given day (st, nd, rd, th)
export function getOrdinalSuffix(day: number): string {
    // Special cases for 11th, 12th, 13th
    if (day >= 11 && day <= 13) {
        return 'th'; 
    }
    // Switch extracts the last digit of the number
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};