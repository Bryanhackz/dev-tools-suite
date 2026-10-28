export function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error("Invalid JWT structure");
    }
    try {
        const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(decodeURIComponent(escape(atob(payload))));
    } catch (e) {
        throw new Error("Failed to decode JWT payload");
    }
}