import {BASE_URL} from "@/services/constants";

const POINTS_URL = BASE_URL + "/api/v1/points"

export async function getAllPoints() {
    const res = await fetch(POINTS_URL)
    return await res.json()
}