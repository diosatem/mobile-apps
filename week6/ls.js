export function getTask() {
    return JSON.parse(localStorage.getItem("taskItems"));
}

export function setTask() {
    return localStorage.setItem("taskItems", JSON.stringify(items));
}