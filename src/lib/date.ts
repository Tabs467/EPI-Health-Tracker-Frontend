// Return formatted date in the format "18th March 2025"
export function getFormattedDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
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