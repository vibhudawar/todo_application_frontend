# Todo Application Frontend

A beautiful, modern todo application built with React, TypeScript, and ShadCN UI components. This frontend provides a complete task management solution with user authentication, responsive design, and an intuitive user experience.

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration with JWT tokens
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🌓 **Dark/Light Mode** - Theme switching with system preference detection
- ✅ **Todo Management** - Create, edit, delete, and toggle todo completion
- 📊 **Statistics** - Track completion rates and productivity insights
- 📅 **Date Grouping** - Organize todos by creation date
- 🎨 **Modern UI** - Built with ShadCN UI components and Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Vite and React 19
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🔄 **Real-time Updates** - Optimistic UI updates with error handling

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with CSS Custom Properties
- **UI Components**: ShadCN UI (Radix UI primitives)
- **State Management**: React Context + useReducer
- **Routing**: React Router v7
- **HTTP Client**: Axios with interceptors
- **Form Handling**: React Hook Form with validation
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Development**: ESLint, TypeScript

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend documentation)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-application/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # ShadCN UI components
│   │   └── auth/          # Authentication forms
│   ├── context/           # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── TodoContext.tsx
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── TodoPage.tsx
│   ├── services/          # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── todoService.ts
│   ├── types/             # TypeScript type definitions
│   └── App.tsx            # Main application component
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔌 API Integration

The frontend is configured to work with the FastAPI backend. Key integration points:

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### Todo Endpoints
- `GET /todos?skip=0&limit=100` - Get user todos with pagination
- `POST /todos` - Create new todo
- `GET /todos/{todo_id}` - Get specific todo
- `PUT /todos/{todo_id}` - Update todo
- `DELETE /todos/{todo_id}` - Delete todo
- `PATCH /todos/{todo_id}/toggle` - Toggle todo completion

### Configuration

The API base URL is configured in:
- `src/services/api.ts` - Axios instance configuration
- Environment variables for different environments

## 🎨 Theming & Styling

### Theme System
- CSS Custom Properties for theme colors
- Automatic dark/light mode detection
- Manual theme switching with persistence
- Tailwind CSS for utility-first styling

### ShadCN UI Components
The project uses ShadCN UI components including:
- Button, Input, Card, Label, Checkbox
- Avatar, Badge, Alert components
- Form components with validation
- Authentication blocks (login-02)

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (320px+), tablet (768px+), desktop (1024px+)
- Touch-friendly interface elements

## 🔒 Authentication Flow

1. **Public Routes**: Landing page, login, signup
2. **Protected Routes**: Todo management pages
3. **Token Management**: JWT tokens stored in localStorage
4. **Auto-redirect**: Unauthenticated users redirected to login
5. **Token Validation**: Automatic token refresh and validation

## 📱 User Experience

### Landing Page
- Hero section with compelling copy
- Feature highlights
- Call-to-action buttons
- Responsive design with animations

### Authentication
- Form validation with real-time feedback
- Password visibility toggle
- Error handling and success messages
- Seamless navigation between login/signup

### Todo Management
- Date-grouped todo lists
- Completion statistics
- Drag-and-drop reordering (planned)
- Optimistic UI updates

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
```

### Environment Variables
Set these in your deployment platform:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

## 🧪 Testing

### Component Testing
```bash
# Run component tests (when implemented)
npm run test
```

### E2E Testing  
```bash
# Run end-to-end tests (when implemented)
npm run test:e2e
```

## 🛠️ Development

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- TypeScript strict mode enabled
- Import organization and path mapping

### Performance Optimizations
- Code splitting with React.lazy
- Memoization with React.memo and useMemo
- Optimistic UI updates
- Efficient re-renders with useCallback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ShadCN UI components when possible
- Maintain responsive design principles
- Write meaningful commit messages
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy coding! 🎉**
