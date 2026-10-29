# Security Policy

## Supported Versions
Currently, only the latest `main` branch is supported.

## Scope
This application processes sensitive data entirely client-side (passwords, JWTs). The backend strictly serves static files. The primary security focus is on eliminating cryptographic biases in password generation (using rejection sampling), preventing XSS in DOM manipulation, and enforcing a strict Content Security Policy (CSP).

## Reporting a Vulnerability
Please do not report security vulnerabilities through public GitHub issues. Send an email to **br4yangil006@gmail.com**. You should receive a response within 48 hours.

Please include:
- Type of issue (e.g., XSS, cryptographic weakness in password generation)
- Full paths of source file(s) related to the issue
- Step-by-step instructions to reproduce the issue
- Impact of the issue
