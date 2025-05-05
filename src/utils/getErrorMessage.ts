export const getApiErrorMessage = (error: Error) => {
    console.error("Signin error:", error);

    let errorMessage = "An unknown error occurred.";

    if (error !== null && "response" in error) {
        const apiError = error as { response?: { data?: { message?: string } } };
        errorMessage = apiError.response?.data?.message ?? error.message;
    }

    return errorMessage;
}