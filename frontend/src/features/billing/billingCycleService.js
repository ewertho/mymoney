import { api } from "../../api";
export async function fetchCycles() {
    const { data } = await api.get("/billing-cycles");
    return data;
}
export async function fetchSummary() {
    const { data } = await api.get("/billing-cycles/summary");
    return data;
}
export async function createCycle(payload) {
    const { data } = await api.post("/billing-cycles", payload);
    return data;
}
export async function deleteCycle(id) {
    await api.delete(`/billing-cycles/${id}`);
}
export async function updateCycle(id, payload) {
    const { data } = await api.put(`/billing-cycles/${id}`, payload);
    return data;
}
