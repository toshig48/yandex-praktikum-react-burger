import { useState, useCallback } from 'react';

export function useFormAndValidation() {
    const [values, setValues] = useState({});
    const [isChange, setIsChange] = useState(false);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest('form').checkValidity());
        setIsChange(true);
    };

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
        setIsChange(false);
    }, [setValues, setErrors, setIsValid]);

    return { values, isChange, setIsChange, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}