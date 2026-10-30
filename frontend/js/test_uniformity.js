import { generatePassword } from './modules/password.js';

export function runUniformityTest() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const counts = {};
    for (const c of charset) counts[c] = 0;
    
    const iterations = 10000;
    for (let i = 0; i < iterations; i++) {
        const p = generatePassword(1);
        counts[p]++;
    }
    
    const expected = iterations / charset.length;
    let chiSquared = 0;
    for (const c of charset) {
        chiSquared += Math.pow(counts[c] - expected, 2) / expected;
    }
    
    console.log(`Chi-Squared: ${chiSquared.toFixed(2)}`);
    console.log(`Degrees of freedom: ${charset.length - 1}`);
    console.log(`Result: ${chiSquared < charset.length * 2 ? 'PASS' : 'FAIL'}`);
}
