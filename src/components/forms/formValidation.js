import * as Yup from "yup";

export const validationSchema = Yup.object({
    transactionLimitAmount: Yup.number().required('customerAccountNumber is required'),
    selectedPeriod: Yup.string().required('selectedPeriod is required'),
});

export const cardAccountvalidationSchema = Yup.object({
    transactionLimitAmount: Yup.number().required('Customer account number is required'),
    selectedPeriod: Yup.string().required('Selected period is required'),
    enabledCountries: Yup.string().required('Enabled country is required'),
    enabledCountries: Yup.string().required('Enabled channel is required'),
});

export const countValidationSchema = Yup.object({
    countLimit: Yup.number().required('Customer account number is required'),
    selectedPeriod: Yup.string().required('Selected period is required'),
    enabledCountries: Yup.string().required('Enabled country is required'),
    enabledCountries: Yup.string().required('Enabled channel is required'),
});