import type { Form, FormErrors, Validations } from "@/types";
import { camelCaseToTitleCase } from "./string";

/**
 * Return whether a form's data is valid according to provided validation rules, along with validation messages
 * 
 * Note: The use of "as any" is because we can guarantee all child classes of FormErrors will only store string values
 *       For further info, see Interface definition FormErrors
 * 
 * @param form Input form data
 * @param formErrors Output validation messages, modified by reference
 * @param validations A list of validations to check on specific fields
 * @returns boolean
 */
export function validateForm<TForm extends Form, TFormErrors extends FormErrors>(
    form: TForm,
    formErrors: TFormErrors,
    validations: Validations
) {
    let isValid = true;

    // Reset all validation message outputs
    Object.keys(formErrors).forEach((key) => {
        formErrors[key as keyof TFormErrors] = "" as any;
    });

    // For each field listed in the ValidationRule array
    for (const field_title in validations) {
        // Retrieve the value of the field
        const field_value = form[field_title as keyof TForm];
        // Retrieve the ValidationRules that should be applied to field
        const validation_rules = validations[field_title as keyof Validations];

        // For each validation rule applied to the field
        for (const validation_rule of Object.values(validation_rules)) {
            /**
             * ValidationRule cases
             * "true" to Evaluate conditions dynamically (needed for regex)
             */
            switch(true) {
                // Mandatory
                case validation_rule === 'mandatory':
                    if (field_value === "" || field_value === null || field_value === undefined) {
                        formErrors[field_title as keyof TFormErrors] = `${camelCaseToTitleCase(field_title)} is required.` as any;
                        isValid = false;
                      }
                    break;
                // Max character length
                case typeof field_value === 'string' && /^max:\d+$/.test(validation_rule):
                    const maxLength = parseInt(validation_rule.split(':')[1], 10);
                    if (field_value.length > maxLength) {
                        formErrors[field_title as keyof TFormErrors] = `${camelCaseToTitleCase(field_title)} must be ${maxLength} characters or lower.` as any;
                        isValid = false;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return isValid;
}