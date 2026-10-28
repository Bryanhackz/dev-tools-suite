export function formatJSON(input, minify = false) {
    if (!input.trim()) return "";
    try {
        const parsed = JSON.parse(input);
        return minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
    } catch (e) {
        throw new Error(`Invalid JSON: ${e.message}`);
    }
}