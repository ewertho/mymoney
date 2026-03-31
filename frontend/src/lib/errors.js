import axios from "axios";
export function getRequestMessage(error, fallback) {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? fallback;
    }
    return fallback;
}
