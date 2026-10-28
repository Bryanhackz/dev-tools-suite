# Dev Tools Suite

## Problem
Developers frequently use multiple third-party websites for simple, daily tasks like formatting JSON, generating passwords, or decoding JWTs. These sites are often bloated with ads, require internet connectivity, and pose a privacy risk by transmitting potentially sensitive data to unknown servers.

## Solution
A privacy-first suite of developer tools that runs 100% in the client's browser. The backend is a minimalist Python WSGI server that only serves the static assets and HTML. No user input is ever transmitted over the network.

## Impact
- Zero data leakage: all processing (password generation, JSON formatting) happens locally via Vanilla JavaScript.
- Eliminates dependence on ad-heavy third-party utilities.
- Uses `crypto.getRandomValues` for cryptographically secure password generation.

## Stack
- Backend: Python 3.11+ (`wsgiref`, `pathlib`) for serving static files with strict security headers.
- Frontend: Vanilla HTML5, CSS3, and ES Modules.
- No external dependencies.

## Setup
```bash
python server.py
```
Open `http://localhost:8000`.

## Architectural decisions
- **No backend logic:** Processing data in the browser guarantees privacy. Sending a JWT to a Python backend just to decode it introduces unnecessary risk.
- **Strict CSP:** The `router.py` injects a strict Content-Security-Policy. Because we use Vanilla JS with ES Modules and no inline scripts, the application works perfectly without weakening the CSP.
- **Cookie Banner:** Implements a blocking RGPD/LSSI compliant modal. Consent is stored in `localStorage`.