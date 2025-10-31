# Security Policy

## 🔒 Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🚨 Reporting a Vulnerability

We take the security of Student Activity Hub seriously. If you have discovered a security vulnerability, please report it to us as described below.

### Where to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisories**: Use the [Security tab](https://github.com/Team-Minus-One/frontend/security/advisories) to privately report a vulnerability
2. **Email**: Contact the maintainers at [security@team-minus-one.com] (if available)

### What to Include

When reporting a vulnerability, please include:

- Type of vulnerability (e.g., XSS, CSRF, authentication bypass)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability
- Any suggested fixes or mitigations

### Response Timeline

- **Initial Response**: Within 48 hours of report submission
- **Status Update**: Within 7 days with assessment and planned actions
- **Resolution**: We aim to release a fix within 30 days for critical issues

### Disclosure Policy

- We will acknowledge receipt of your vulnerability report
- We will send you regular updates about our progress
- We will notify you when the vulnerability is fixed
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## 🛡️ Security Best Practices

### For Users

1. **Keep Dependencies Updated**
   ```bash
   npm update
   npm audit fix
   ```

2. **Use HTTPS**: Always use HTTPS in production environments

3. **Secure Environment Variables**: Never commit `.env` files with credentials

4. **Regular Security Audits**
   ```bash
   npm audit
   ```

### For Developers

1. **Authentication & Authorization**
   - Use JWT tokens for authentication
   - Implement token expiration and refresh
   - Validate all user inputs
   - Use role-based access control (RBAC)

2. **Data Protection**
   - Sanitize user inputs to prevent XSS
   - Use parameterized queries to prevent SQL injection (backend)
   - Implement CORS properly
   - Use Content Security Policy (CSP) headers

3. **Token Management**
   ```javascript
   // Always clear tokens on logout
   localStorage.removeItem('token');
   localStorage.removeItem('userData');
   
   // Handle expired tokens
   api.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         // Clear credentials and redirect to login
         localStorage.clear();
         window.location.href = '/login';
       }
       return Promise.reject(error);
     }
   );
   ```

4. **Dependency Management**
   - Regularly update dependencies
   - Review dependency security advisories
   - Remove unused dependencies
   - Use `npm audit` to check for vulnerabilities

5. **Code Review**
   - All code changes require review
   - Security-sensitive changes require extra scrutiny
   - Use static analysis tools (ESLint)

## 🔍 Known Security Considerations

### Current Implementation

1. **Token Storage**: Tokens are currently stored in `localStorage`
   - **Risk**: Vulnerable to XSS attacks
   - **Mitigation**: Consider using httpOnly cookies for production
   
2. **CORS**: Backend must be configured to allow frontend origin
   - **Risk**: Misconfiguration can expose API to unauthorized access
   - **Mitigation**: Properly configure CORS in backend

3. **File Uploads**: Files are uploaded to Azure Blob Storage
   - **Risk**: Malicious file uploads
   - **Mitigation**: Backend should validate file types and sizes

### Recommendations for Production

1. **Use httpOnly Cookies**
   ```javascript
   // Backend should set httpOnly cookie
   // Frontend should not store JWT in localStorage
   ```

2. **Implement CSRF Protection**
   ```javascript
   // Add CSRF token to all state-changing requests
   api.defaults.headers.common['X-CSRF-Token'] = csrfToken;
   ```

3. **Content Security Policy**
   ```html
   <!-- Add to index.html -->
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; 
                  script-src 'self' 'unsafe-inline'; 
                  style-src 'self' 'unsafe-inline';">
   ```

4. **Rate Limiting**
   - Implement rate limiting on API endpoints (backend)
   - Prevent brute force attacks on login

5. **Input Validation**
   - Validate all user inputs on both frontend and backend
   - Sanitize data before rendering
   - Use parameterized queries in backend

## 📋 Security Checklist

Before deploying to production, ensure:

- [ ] All dependencies are up to date
- [ ] No known security vulnerabilities (`npm audit` passes)
- [ ] HTTPS is enabled
- [ ] Environment variables are properly configured
- [ ] CORS is correctly configured in backend
- [ ] Authentication tokens expire appropriately
- [ ] Error messages don't leak sensitive information
- [ ] File upload restrictions are in place
- [ ] Rate limiting is implemented
- [ ] Security headers are configured
- [ ] Logging is implemented for security events

## 🔐 Responsible Disclosure

We follow the principle of responsible disclosure:

1. Report vulnerabilities privately to maintainers
2. Allow time for a fix to be developed and deployed
3. Coordinate public disclosure timing
4. Credit researchers who report vulnerabilities (if desired)

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)
- [Web Security Guidelines](https://developer.mozilla.org/en-US/docs/Web/Security)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

## 📞 Contact

For security-related questions or concerns:

- **Security Issues**: Use GitHub Security Advisories
- **General Questions**: Open a GitHub Discussion
- **Maintainers**: Team Minus One

---

Thank you for helping keep Student Activity Hub and its users safe! 🔒
