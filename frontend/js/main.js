import { generatePassword } from './modules/password.js';
import { formatJSON } from './modules/json.js';
import { encodeBase64, decodeBase64 } from './modules/base64.js';
import { decodeJWT } from './modules/jwt.js';
import { initCookieBanner } from './modules/cookies.js';

document.addEventListener('DOMContentLoaded', () => {
    initCookieBanner();

    // Password
    document.getElementById('btn-gen-pass').addEventListener('click', () => {
        const length = parseInt(document.getElementById('pass-length').value, 10) || 16;
        document.getElementById('pass-result').textContent = generatePassword(length);
    });

    // JSON
    document.getElementById('btn-format-json').addEventListener('click', () => {
        handleJSON(false);
    });
    document.getElementById('btn-minify-json').addEventListener('click', () => {
        handleJSON(true);
    });

    function handleJSON(minify) {
        const input = document.getElementById('json-input').value;
        const errorEl = document.getElementById('json-error');
        try {
            errorEl.textContent = '';
            document.getElementById('json-output').value = formatJSON(input, minify);
        } catch (e) {
            errorEl.textContent = e.message;
        }
    }

    // Base64
    document.getElementById('btn-encode-b64').addEventListener('click', () => {
        const input = document.getElementById('b64-input').value;
        try { document.getElementById('b64-output').textContent = encodeBase64(input); } 
        catch (e) { document.getElementById('b64-output').textContent = "Error"; }
    });
    document.getElementById('btn-decode-b64').addEventListener('click', () => {
        const input = document.getElementById('b64-input').value;
        try { document.getElementById('b64-output').textContent = decodeBase64(input); } 
        catch (e) { document.getElementById('b64-output').textContent = "Invalid Base64"; }
    });

    // JWT
    document.getElementById('btn-decode-jwt').addEventListener('click', () => {
        const input = document.getElementById('jwt-input').value;
        const errorEl = document.getElementById('jwt-error');
        try {
            errorEl.textContent = '';
            const decoded = decodeJWT(input);
            document.getElementById('jwt-output').textContent = JSON.stringify(decoded, null, 2);
        } catch (e) {
            errorEl.textContent = e.message;
            document.getElementById('jwt-output').textContent = '';
        }
    });

    // Copy to Clipboard (Event Delegation)
    document.body.addEventListener('click', async (e) => {
        const btn = e.target.closest('.copy-btn');
        if (!btn) return;
        
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        
        if (targetEl) {
            const textToCopy = targetEl.value || targetEl.textContent;
            try {
                await navigator.clipboard.writeText(textToCopy);
                // Feedback visual temporal
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
            } catch (err) {
                console.error('Failed to copy text', err);
            }
        }
    });
});