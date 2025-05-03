import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export type ResponseNames = "email" | "trip_types" | "planning_pain_points" | "current_organization_method" | "desired_solution" | "willingness_to_pay";

export type Responses = {
    question: string;
    questionId: ResponseNames;
    answerText?: string;
    answerOptions?: string[];
}[];

export const createSurvey = async (email: string, name: string) => {
    return await api.post<{ id: string, email: string, name: string }>('/surveys', { email, name });
}

export const updateSurvey = async (surveyResponses: Responses, id: string) => {
    return await api.put<{ id: string, email: string }>('/surveys/' + id, { surveyResponses });
}