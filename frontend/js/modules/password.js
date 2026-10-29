export function generatePassword(length = 16) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const maxValid = Math.floor(4294967296 / charset.length) * charset.length;
    let password = "";
    
    while (password.length < length) {
        const values = new Uint32Array(length);
        crypto.getRandomValues(values);
        
        for (let i = 0; i < values.length && password.length < length; i++) {
            // Rejection sampling to eliminate modulo bias
            if (values[i] < maxValid) {
                password += charset[values[i] % charset.length];
            }
        }
    }
    return password;
}
