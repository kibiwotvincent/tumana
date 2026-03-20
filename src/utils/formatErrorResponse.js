export const formatErrorResponse = (error) => {
    let response = {
        type: 'error',
        message: 'Something went wrong. Try again later.',
        errors: {}
    };

    const { data, status } = error.response;

    // Laravel validation (422)
    if (status === 422) {
        response.message = data.message || 'Validation failed';
        response.errors = data.errors || {};
        return response;
    }

    // Unauthorized (401)
    if (status === 401) {
        response.message = data.message || 'Unauthorized. Please login again.';
        return response;
    }

    // Forbidden (403)
    if (status === 403) {
        response.message = data.message || 'You do not have permission.';
        return response;
    }

    // Server error (500+)
    if (status >= 500) {
        response.message = 'Server error. Please try again later.';
        return response;
    }

    // Default fallback
    if (data?.message) {
        response.message = data.message;
    }

    return response;
};