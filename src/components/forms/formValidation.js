import * as Yup from "yup";

export const validationSchema = Yup.object({
    transactionLimitAmount: Yup.number().required('customerAccountNumber is required'),
    selectedPeriod: Yup.string().required('selectedPeriod is required'),
});