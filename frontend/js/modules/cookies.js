export function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
        banner.style.display = 'flex';
    } else {
        banner.style.display = 'none';
    }

    document.getElementById('btn-accept').addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        banner.style.display = 'none';
    });

    document.getElementById('btn-reject').addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'rejected');
        banner.style.display = 'none';
    });
}