import { AbstractControl, ValidatorFn } from '@angular/forms';

export function carPhoneNumberValidator_(phoneNumber: any): boolean {
    console.log(phoneNumber)
    // Extract the country dial code (e.g., "+236" for CAR)
    const dialCode = phoneNumber.dialCode;
    const number = phoneNumber.number;

    // Check if the dial code matches CAR (+236)
    if (dialCode !== '+236') {
        // If the dial code is not CAR, don't apply the CAR-specific validation
        return false;
    }

    // Regular expression for CAR mobile numbers (starting with 7 and 8 digits long)
    const carPhonePattern = /^7[2-4]\d{6}$/;

    // Test the phone number against the CAR pattern
    const isValid = carPhonePattern.test(number);

    return isValid ? true : false;
}



export function carPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const phoneNumber = control.value;
        console.log(phoneNumber)

        // Extract the country dial code (e.g., "+236" for CAR)
        const dialCode = phoneNumber.dialCode;
        const number = phoneNumber.number;

        // Check if the dial code matches CAR (+236)
        if (dialCode !== '+236') {
            // If the dial code is not CAR, don't apply the CAR-specific validation
            return null;
        }

        // Regular expression for CAR mobile numbers (starting with 7 and 8 digits long)
        const carPhonePattern = /^7[2-4]\d{6}$/;

        // Test the national number (without the dial code) against the CAR pattern
        const isValid = carPhonePattern.test(number);
        console.log(isValid)

        return isValid ? null : { 'invalidCarPhoneNumber': { value: control.value } };
    };
}