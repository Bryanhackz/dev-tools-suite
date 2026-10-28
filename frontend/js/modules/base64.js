export function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

export function decodeBase64(str) {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        throw new Error("Invalid Base64 string");
    }
}