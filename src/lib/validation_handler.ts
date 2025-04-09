import type { TrackableItem, TrackableItemErrors, Validations } from "@/types";
import { camelCaseToTitleCase } from "./string";

/**
 * Return whether a TrackableItem's form's data is valid according to provided validation rules, along with validation messages
 * 
 * The form must be for a TrackableItem along with its TrackableItemErrors
 * 
 * Validations checked first take precedence
 * 
 * Note: The use of "as any" is because we can guarantee all child classes of TrackableItemErrors will only store string values
 *       For further info, see Interface definition TrackableItemErrors
 * 
 * @param form Input form data
 * @param formErrors Output validation messages, modified by reference
 * @param validations A list of validations to check on specific fields
 * @returns boolean
 */
export function validateTrackableItemForm<TTrackableItem extends TrackableItem, TTrackableItemErrors extends TrackableItemErrors>(
    form: TTrackableItem,
    formErrors: TTrackableItemErrors,
    validations: Validations
) {
    let isValid = true;

    // Reset all validation message outputs
    Object.keys(formErrors).forEach((key) => {
        formErrors[key as keyof TTrackableItemErrors] = "" as any;
    });

    // For each field listed in the ValidationRule array
    for (const field_title in validations) {
        // Retrieve the value of the field
        const field_value = form[field_title as keyof TTrackableItem];
        // Retrieve the ValidationRules that should be applied to field
        const validation_rules = validations[field_title as keyof Validations];

        // For each validation rule applied to the field
        validation_rules:
        for (const validation_rule of Object.values(validation_rules)) {
            /**
             * ValidationRule cases
             * "true" to Evaluate conditions dynamically (needed for regex)
             * 
             * Validations checked first take precedence
             */
            switch(true) {
                // Mandatory
                case validation_rule === 'mandatory':
                    if (field_value === "" || field_value === null || field_value === undefined) {
                        formErrors[field_title as keyof TTrackableItemErrors] = `${camelCaseToTitleCase(field_title)} is required.` as any;
                        isValid = false;
                        break validation_rules;
                      }
                    break;
                // Max character length
                case typeof field_value === 'string' && /^max:\d+$/.test(validation_rule):
                    const maxLength = parseInt(validation_rule.split(':')[1], 10);
                    if (field_value.length > maxLength) {
                        formErrors[field_title as keyof TTrackableItemErrors] = `${camelCaseToTitleCase(field_title)} must be ${maxLength} characters or lower.` as any;
                        isValid = false;
                        break validation_rules;
                    }
                    break;
                // Integer
                case validation_rule === 'integer':
                    if (!Number.isInteger(Number(field_value))) {
                        formErrors[field_title as keyof TTrackableItemErrors] = `${camelCaseToTitleCase(field_title)} must be a whole number.` as any;
                        isValid = false;
                        break validation_rules;
                    }
                    break;
                // Positive, including 0
                case validation_rule === 'positive':
                    if (Number(field_value) < 0 ) {
                        formErrors[field_title as keyof TTrackableItemErrors] = `${camelCaseToTitleCase(field_title)} must be 0 or more.` as any;
                        isValid = false;
                        break validation_rules;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return isValid;
}