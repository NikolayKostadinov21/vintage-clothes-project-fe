import { useState } from "react";

import {
    emailValidator,
    passwordValidator,
    confirmPasswordValidator
} from '../../core/constants';


const touchErrors = (errors) => {
    return Object.entries(errors).reduce(
        (accumulator, [field, fieldError]) => {
            accumulator[field] = {
                ...fieldError,
                dirty: true
            };

            return accumulator;
        },
    );
}

export const SignupFormValidator = (form) => {
    const [errors, setErrors] = useState({
        firstName: {
            dirty: false,
            error: false,
            message: ""
        },
        lastName: {
            dirty: false,
            error: false,
            message: ""
        },
        email: {
            dirty: false,
            error: false,
            message: ""
        },
        password: {
            dirty: false,
            error: false,
            message: ""
        },
        confirmPassword: {
            dirty: false,
            error: false,
            message: ""
        }
    });

    const validateForm = ({form, field, errors, forceTouchErrors = false}) => {
        let isValid = true;

        let nextErrors = JSON.parse(JSON.stringify(errors));

        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { firstName, lastName, email, password, confirmPassword } = form;

        if (nextErrors.email.dirty && (field ? field === "email" : true)) {
            const emailMessage = emailValidator(email, form);
            nextErrors.email.error = !!emailMessage;
            nextErrors.email.message = emailMessage;
            if (!!emailMessage) {
                isValid = false;
            }
        }

        if (nextErrors.password.dirty && (field ? field === "password" : true)) {
            const passwordMessage = passwordValidator(password, form);
            nextErrors.password.error = !!passwordMessage;
            nextErrors.password.message = passwordMessage;
            if (!!passwordMessage) {
                isValid = false;
            }
        }

        if (nextErrors.confirmPassword.dirty && (field ? field === "confirmPassword" : true)) {
            const confirmPasswordMessage = confirmPasswordValidator(confirmPassword, form);
            nextErrors.confirmPassword.error = !!confirmPasswordMessage;
            nextErrors.confirmPassword.message = confirmPasswordMessage;
            if (!!confirmPasswordMessage) isValid = false;
        }

        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors
        };
    };

    const onBlurField = (event) => {
        const field = event.target.name;
        const fieldError = errors[field];

        if (fieldError.dirty) return;

        const updatedErrors = {
            ...errors,
            [field]: {
                ...errors[field],
                dirty: true
            }
        };

        validateForm({ form, field, errors: updatedErrors });
    };

    return {
        validateForm,
        onBlurField,
        errors
    }
}