# 📚 BookShop One

> A modern e-commerce bookstore application built with Vue.js 3, featuring a comprehensive book browsing experience, user authentication, and profile management.

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4.21-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🎯 Overview

**BookShop One** is a feature-rich online bookstore platform that provides users with an intuitive interface to browse, search, and explore a diverse collection of books. The application emphasizes user experience with responsive design, seamless navigation, and robust authentication mechanisms.

This project demonstrates modern web development practices using Vue.js 3 with Composition API, Vuex for state management, Vue Router for navigation, and integration with RESTful APIs.

---

## ✨ Features

### 🏠 Core Functionality
- **📚 Book Collection**: Browse an extensive catalog of books with detailed information
- **🔍 Search & Filter**: Quickly find books by title, author, or genre
- **📖 Book Details**: View comprehensive information including descriptions, ratings, and reviews
- **💬 Comments & Reviews**: Read and submit reviews for books
- **👤 User Profiles**: Manage personal information and preferences

### 🔐 Authentication & Security
- **User Registration**: Create new accounts with form validation
- **Secure Login**: JWT-based authentication system
- **Profile Management**: Edit and update user information
- **Session Persistence**: Maintain login state using Vuex store

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progressive Web App (PWA)**: Offline capability and app-like experience
- **Modern UI/UX**: Clean, intuitive interface with smooth transitions
- **Form Validation**: Real-time input validation using Vuelidate

---

## 📸 Screenshots

### Home View
![Home Page](https://github.com/htay-htay-thwe/bookshop_one/assets/130959683/8471b4f5-8687-4327-9cc5-69fcaefa3b38)
*Landing page showcasing featured books and navigation*

### Login Page
![Login](https://github.com/htay-htay-thwe/bookshop_one/assets/130959683/61184269-13cd-4dfb-aed7-d82da0ad1002)
*Secure authentication interface*

### Sign Up Page
![Sign Up](https://github.com/htay-htay-thwe/bookshop_one/assets/130959683/4b57812b-5a30-445d-8c46-1312e00fc7f0)
*User registration with validation*

### Book Collection
![Book Collection](https://github.com/htay-htay-thwe/bookshop_one/assets/130959683/efbb1d81-88e0-4a76-a4a7-85185877db1c)
*Browse comprehensive book catalog*

### Book Detail Page
![Book Detail](https://github.com/htay-htay-thwe/bookshop_one/assets/130959683/d8de9806-cc0d-469a-a45b-150b26a62497)
*Detailed book information with reviews and comments*

---

## 🛠️ Tech Stack

### Frontend
- **[Vue.js 3.4.21](https://vuejs.org/)** - Progressive JavaScript framework
- **[Vue Router 4.0](https://router.vuejs.org/)** - Official routing library
- **[Vuex 4.0](https://vuex.vuejs.org/)** - State management pattern
- **[Vuelidate 2.0](https://vuelidate-next.netlify.app/)** - Model-based validation
- **[Axios 1.6](https://axios-http.com/)** - HTTP client for API requests

### UI & Styling
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Swiper 11.0](https://swiperjs.com/)** - Modern touch slider
- **[jQuery 3.7](https://jquery.com/)** - DOM manipulation library

### Development Tools
- **[Vue CLI 5.0](https://cli.vuejs.org/)** - Standard tooling
- **[Babel](https://babeljs.io/)** - JavaScript compiler
- **[ESLint](https://eslint.org/)** - Code linting
- **[Webpack](https://webpack.js.org/)** - Module bundler

### Additional Libraries
- **[Moment.js](https://momentjs.com/)** - Date manipulation
- **[bcrypt.js](https://github.com/dcodeIO/bcrypt.js)** - Password hashing
- **[VueUse](https://vueuse.org/)** - Collection of Vue Composition utilities

---

## 📂 Project Structure

```
bookshop_one/
├── public/                    # Static assets
│   ├── index.html            # HTML entry point
│   └── book/                 # Book cover images
│
├── src/                      # Application source code
│   ├── assets/               # Images, fonts, and static resources
│   ├── components/           # Reusable Vue components
│   │   └── HelloWorld.vue    # Example component
│   ├── views/                # Page-level components
│   │   ├── HomeView.vue      # Landing page
│   │   ├── LoginView.vue     # Login page
│   │   ├── signUp.vue        # Registration page
│   │   ├── BookCollection.vue # Book catalog
│   │   ├── bookDetail.vue    # Book details page
│   │   └── Edit_profile.vue  # Profile management
│   ├── router/               # Routing configuration
│   │   ├── index.js          # Main router file
│   │   └── home.js           # Home route definitions
│   ├── store/                # Vuex state management
│   │   └── index.js          # Store configuration
│   ├── api/                  # API integration
│   │   └── index.js          # Axios instance & endpoints
│   ├── css/                  # Component-specific styles
│   │   ├── style.css         # Global styles
│   │   └── bookCollection.css # Book collection styles
│   ├── js/                   # JavaScript utilities
│   │   ├── homeView.js       # Home page logic
│   │   ├── login.js          # Login functionality
│   │   ├── signUp.js         # Registration logic
│   │   ├── bookCollection.js # Book browsing logic
│   │   ├── bookDetail.js     # Book details logic
│   │   └── editProfile.js    # Profile edit logic
│   ├── App.vue               # Root component
│   ├── main.js               # Application entry point
│   └── registerServiceWorker.js # PWA service worker
│
├── babel.config.js           # Babel configuration
├── jsconfig.json             # JavaScript configuration
├── vue.config.js             # Vue CLI configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.x or higher) - [Download](https://nodejs.org/)
- **npm** (v6.x or higher) or **yarn** (v1.22.x or higher)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/htay-htay-thwe/bookshop_one.git
   cd bookshop_one
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   *or using yarn:*
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run serve
   ```
   
4. **Open your browser**
   
   Navigate to `http://localhost:8080` to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
|---------|-------------|
| `npm run serve` | Runs the app in development mode at `http://localhost:8080` |
| `npm run build` | Builds the app for production to the `dist` folder |
| `npm run lint` | Lints and fixes code using ESLint |

---

## 🔌 API Integration

The application connects to a backend API hosted at:
```
https://gentle-adventure-production.up.railway.app/api
```

### API Configuration

API integration is configured in `src/api/index.js` using Axios:

```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gentle-adventure-production.up.railway.app/api'
});

export default api;
```

### Key Endpoints

The application interacts with various endpoints for:
- User authentication (login, register)
- Book data retrieval (catalog, details)
- User profile management
- Reviews and comments

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve BookShop One:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📬 Contact

**Htay Htay Thwe**

📧 Email: [htayhtaythwe962@gmail.com](mailto:htayhtaythwe962@gmail.com)  
🔗 GitHub: [@htay-htay-thwe](https://github.com/htay-htay-thwe)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Vue.js community for excellent documentation and resources
- All contributors who have helped shape this project
- Open source libraries that made this project possible

---

<div align="center">

⭐ **If you find this project useful, please consider giving it a star!** ⭐

*Made with ❤️ by Htay Htay Thwe*

</div>
