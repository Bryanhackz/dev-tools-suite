from pathlib import Path
import json

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

def render_index() -> tuple[str, str, str]:
    html_path = FRONTEND_DIR / "index.html"
    try:
        html = html_path.read_text(encoding="utf-8")
        # Server-Side Rendering for SEO
        html = html.replace("{{TITLE}}", "Dev Tools Suite | Secure Client-Side Utilities")
        html = html.replace("{{DESCRIPTION}}", "A suite of privacy-first developer tools. Format JSON, generate passwords, and decode JWTs entirely in your browser.")
        return "200 OK", "text/html; charset=utf-8", html
    except FileNotFoundError:
        return "500 Internal Server Error", "text/plain", "Template not found."

def render_legal() -> tuple[str, str, str]:
    html_path = FRONTEND_DIR / "legal.html"
    try:
        html = html_path.read_text(encoding="utf-8")
        html = html.replace("{{TITLE}}", "Legal & Privacy | Dev Tools Suite")
        return "200 OK", "text/html; charset=utf-8", html
    except FileNotFoundError:
        return "500 Internal Server Error", "text/plain", "Template not found."

def health_check() -> tuple[str, str, str]:
    return "200 OK", "application/json; charset=utf-8", json.dumps({"ok": True})

def not_found() -> tuple[str, str, str]:
    return "404 Not Found", "text/plain; charset=utf-8", "404 Not Found"