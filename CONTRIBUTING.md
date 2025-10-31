# Contributing to Student Activity Hub

First off, thank you for considering contributing to Student Activity Hub! It's people like you that make this project better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Questions](#questions)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a friendly, safe, and welcoming environment for all contributors, regardless of experience level, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Our Standards

**Examples of behavior that contributes to a positive environment:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**

- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

Before you begin contributing, ensure you have:

1. **Node.js** (v18+) and **npm** installed
2. **Git** for version control
3. A **GitHub account**
4. Familiarity with **React**, **Vite**, and **Material-UI**

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/frontend.git
   cd frontend
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Team-Minus-One/frontend.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Process

### 1. Keep Your Fork Updated

Before starting new work, sync with upstream:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/descriptive-feature-name
# or
git checkout -b fix/descriptive-bug-fix
```

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-export-button`)
- `fix/` - Bug fixes (e.g., `fix/login-validation`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/api-service`)
- `test/` - Adding tests (e.g., `test/dashboard-component`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### 3. Make Your Changes

- Write clean, readable code
- Follow the [Coding Standards](#coding-standards)
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

```bash
# Lint your code
npm run lint

# Build to ensure no errors
npm run build

# Test the app locally
npm run dev
```

### 5. Commit Your Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git commit -m "feat: add user profile export feature"
git commit -m "fix: resolve login form validation issue"
git commit -m "docs: update API integration guide"
```

**Commit Message Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without functional changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

**Example:**

```
feat(dashboard): add activity summary widget

- Added new ActivitySummary component
- Integrated with activities API
- Added responsive layout for mobile devices

Closes #123
```

## 📏 Coding Standards

### JavaScript/React Guidelines

1. **Component Structure**
   ```javascript
   // Good
   import React, { useState, useEffect } from 'react';
   import PropTypes from 'prop-types';

   const MyComponent = ({ title, onSubmit }) => {
     const [data, setData] = useState(null);

     useEffect(() => {
       // Effect logic
     }, []);

     return (
       <div>
         {/* Component JSX */}
       </div>
     );
   };

   MyComponent.propTypes = {
     title: PropTypes.string.isRequired,
     onSubmit: PropTypes.func,
   };

   export default MyComponent;
   ```

2. **Naming Conventions**
   - **Components**: PascalCase (e.g., `UserProfile.jsx`)
   - **Functions**: camelCase (e.g., `handleSubmit`)
   - **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
   - **Hooks**: Start with "use" (e.g., `useAuth`)

3. **File Organization**
   - One component per file
   - Place related styles in the same directory
   - Group related components in subdirectories

4. **ESLint Rules**
   - Run `npm run lint` before committing
   - Fix auto-fixable issues with `npm run lint -- --fix`
   - No console.logs in production code (use for debugging only)

5. **Code Formatting**
   - Use 2 spaces for indentation
   - Use single quotes for strings
   - Add trailing commas in multi-line objects/arrays
   - Max line length: 100 characters

### React Best Practices

1. **Use Functional Components**: Prefer functional components with hooks
2. **Destructure Props**: Always destructure props in function parameters
3. **Use PropTypes**: Define PropTypes for all components
4. **Avoid Inline Functions**: Define event handlers outside JSX when possible
5. **Use Keys in Lists**: Always provide unique keys when rendering lists
6. **Handle Loading States**: Show loading indicators for async operations
7. **Error Boundaries**: Wrap components with error boundaries where appropriate

### Component Example

```javascript
import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { profileAPI } from '../services/api';

const UserProfile = ({ userId, onUpdate }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileAPI.getUserProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    // Update logic
    if (onUpdate) {
      onUpdate(profile);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box>
      {/* Profile UI */}
      <Button onClick={handleUpdate}>Update Profile</Button>
    </Box>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
};

export default UserProfile;
```

## 📤 Submitting Changes

### Pull Request Process

1. **Update your branch** with latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** on GitHub:
   - Use a clear, descriptive title
   - Reference related issues (e.g., "Closes #123")
   - Provide detailed description of changes
   - Include screenshots for UI changes
   - List any breaking changes

4. **PR Description Template**:
   ```markdown
   ## Description
   Brief description of what this PR does.

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Changes Made
   - Added feature X
   - Fixed issue Y
   - Updated component Z

   ## Testing
   - [ ] Tested locally
   - [ ] Linting passes
   - [ ] Build succeeds

   ## Screenshots (if applicable)
   [Add screenshots here]

   ## Related Issues
   Closes #123

   ## Additional Notes
   Any additional context or notes.
   ```

5. **Address Review Feedback**:
   - Respond to comments promptly
   - Make requested changes
   - Push updates to the same branch

6. **Merge Requirements**:
   - All checks must pass
   - At least one approval from maintainers
   - No merge conflicts
   - All conversations resolved

## 🐛 Reporting Bugs

### Before Submitting a Bug Report

1. **Check existing issues** - The bug may already be reported
2. **Update to latest version** - Bug may be fixed in newer version
3. **Test in multiple browsers** - Ensure it's not browser-specific

### How to Submit a Bug Report

Create an issue with the following information:

**Bug Report Template:**

```markdown
## Bug Description
A clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 98, Firefox 97]
- Node Version: [e.g., 18.12.0]
- App Version: [e.g., 1.0.0]

## Error Messages
```
Paste any error messages here
```

## Additional Context
Any other relevant information.
```

## 💡 Suggesting Enhancements

### Enhancement Request Template

```markdown
## Feature Description
Clear description of the proposed feature.

## Use Case
Explain the problem this feature would solve.

## Proposed Solution
Describe how you envision this feature working.

## Alternatives Considered
Other approaches you've thought about.

## Additional Context
Mockups, examples, or references.
```

## ❓ Questions

If you have questions:

1. **Check the [README](README.md)** - Most common questions are answered
2. **Search [existing issues](https://github.com/Team-Minus-One/frontend/issues)** - Others may have asked
3. **Open a Discussion** - For general questions and ideas
4. **Create an Issue** - For specific technical questions

## 🏆 Recognition

Contributors will be recognized in:
- The project README (Contributors section)
- Release notes for significant contributions
- Special shoutouts for exceptional contributions

## 📞 Contact

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Maintainers**: Team Minus One

---

Thank you for contributing to Student Activity Hub! 🎓✨

Your contributions help make this project better for students and educators everywhere.
