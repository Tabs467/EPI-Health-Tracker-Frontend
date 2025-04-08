// Convert camelCase to Title Case
export function camelCaseToTitleCase(input: string) {
    const result = input.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Convert Title Case to camelCase
export function titleCaseToCamelCase(input: string) {
    return input
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase())
        .replace(/\s+/g, '');
}