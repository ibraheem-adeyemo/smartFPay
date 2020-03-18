
export const validateCardConfiguration = values => {
    const errors = {};
    if (!values.configName) {
        errors.configName = "Please select card configuration";
      }
    return errors
}