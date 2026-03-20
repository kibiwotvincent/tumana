export const applyFormErrors = (error, setErrors) => {
    setErrors({
        apiError: error.message || 'Something went wrong',
        ...Object.fromEntries(
            Object.entries(error.errors || {}).map(
                ([field, msgs]) => [field, msgs[0]]
            )
        )
    });
};