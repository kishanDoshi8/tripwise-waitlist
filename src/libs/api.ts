import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export type ResponseNames = "email" | "trip_types" | "planning_pain_points" | "current_organization_method" | "desired_solution" | "willingness_to_pay";

export type Responses = {
    question: string;
    name: ResponseNames;
    answer: string | string[];
    otherText: string | undefined;
}[];

export const createSurvey = async (email: string, name: string) => {
    return await api.post<{ _id: string, email: string, name: string }>('/surveys', { email, name });
}

export const updateSurvey = async (responses: Responses, id: string) => {
    return await api.put<{ _id: string, email: string }>('/surveys/' + id, { responses });
}

export const updateName = async (name: string, id: string) => {
    return await api.put<{ _id: string, email: string, name: string }>('/surveys' + id, { name });
}