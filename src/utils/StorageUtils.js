
export function get(item){
    return localStorage.getItem(item);
}
export function set(item,value){
    return localStorage.setItem(item,value);
}

export function getActiveWorkSpace() {
    return get("activeWorkspace")
}

export function setActiveWorkSpace(value) {
    return set("activeWorkspace",value)
}