export function generatePassword(length = 16) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset[values[i] % charset.length];
    }
    return password;
}