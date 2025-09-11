# Drive Karo Website - Driving School Management System

A modern, professional driving school management system built with React, TypeScript, and Tailwind CSS.

## 🎨 Design System

### Color Palette

Our design system uses a consistent color scheme defined in CSS custom properties:

- **Primary**: `#FFD43B` (Yellow) - Used for main actions and highlights
- **Secondary**: `#8B8E8F` (Gray) - Used for cards and surfaces
- **Background**: `#434546` (Dark Gray) - Main background color
- **Text Colors**: White, light gray, and muted variants for hierarchy
- **Status Colors**: Green (success), Blue (info), Yellow (warning), Red (error)

### Component Classes

We've created reusable CSS classes for consistent styling:

#### Cards

- `.card` - Base card styling with padding and background
- `.card-hover` - Hover effects with shadow and scale
- `.card-interactive` - Interactive cards with hover states

#### Buttons

- `.btn` - Base button styling
- `.btn-primary` - Primary action buttons (yellow)
- `.btn-secondary` - Secondary action buttons (dark)
- `.btn-danger` - Destructive action buttons (red)

#### Text

- `.text-heading` - Main page headings
- `.text-subheading` - Section headings
- `.text-body` - Body text
- `.text-muted` - Muted/secondary text

#### Layout

- `.section-spacing` - Consistent spacing between sections
- `.grid-responsive` - Responsive grid layouts
- `.flex-responsive` - Responsive flexbox layouts

#### Icons

- `.icon-primary` - Primary color icons
- `.icon-secondary` - Secondary color icons
- `.icon-success` - Success state icons
- `.icon-warning` - Warning state icons
- `.icon-error` - Error state icons
- `.icon-info` - Information state icons

## 🏗️ Architecture

### Component Structure

- **App.tsx** - Main application component with routing logic
- **Sidebar.tsx** - Navigation sidebar with responsive design
- **Dashboard.tsx** - Main dashboard with statistics and activity
- **DriversManagement.tsx** - Driver management interface
- **CarsManagement.tsx** - Vehicle management interface
- **FutureBookings.tsx** - Booking management
- **Courses.tsx** - Course management
- **Profile.tsx** - User profile management

### Code Standards

- **TypeScript Interfaces** - All data structures are properly typed
- **Component Functions** - Render functions are separated for maintainability
- **Consistent Naming** - Clear, descriptive function and variable names
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- **Accessibility** - Proper semantic HTML and ARIA labels

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd drive-karo-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
# Run in development mode
npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: Single column layout with collapsible sidebar
- **Tablet**: Two-column grid layouts
- **Desktop**: Full three-column layouts with persistent sidebar

## 🎯 Key Features

- **Dashboard**: Real-time statistics and activity monitoring
- **Driver Management**: Add, remove, and track driver information
- **Vehicle Management**: Fleet management with status tracking
- **Booking System**: Future booking management
- **Course Management**: Driving course administration
- **Responsive Design**: Works seamlessly across all devices

## 🔧 Customization

### Adding New Components

1. Create a new component file in `src/components/`
2. Use the established design system classes
3. Follow the component structure pattern
4. Add proper TypeScript interfaces

### Modifying Colors

Update the CSS custom properties in `src/index.css`:

```css
:root {
  --color-primary: #YOUR_COLOR;
  --color-secondary: #YOUR_COLOR;
  /* ... other colors */
}
```

### Adding New Utility Classes

Extend the `@layer components` section in `src/index.css`:

```css
@layer components {
  .your-new-class {
    @apply your-tailwind-classes;
    /* custom CSS properties */
  }
}
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── Sidebar.tsx
│   ├── DriversManagement.tsx
│   ├── CarsManagement.tsx
│   ├── FutureBookings.tsx
│   ├── Courses.tsx
│   └── Profile.tsx
├── App.tsx             # Main application
├── main.tsx            # Application entry point
├── index.css           # Global styles and design system
└── vite-env.d.ts       # Vite type definitions
```

## 🎨 Styling Guidelines

### Do's

- ✅ Use the established design system classes
- ✅ Follow the component structure pattern
- ✅ Use semantic HTML elements
- ✅ Implement responsive design patterns
- ✅ Use TypeScript interfaces for data

### Don'ts

- ❌ Don't hardcode colors - use CSS custom properties
- ❌ Don't create inline styles
- ❌ Don't skip TypeScript interfaces
- ❌ Don't ignore responsive design
- ❌ Don't mix different styling approaches

## 🚀 Performance

- **Code Splitting**: Components are loaded on demand
- **Optimized Images**: Proper image sizing and formats
- **Efficient Rendering**: React.memo for expensive components
- **CSS Optimization**: Tailwind CSS purging for production

## 🔒 Security

- **Input Validation**: All user inputs are properly validated
- **XSS Prevention**: React's built-in XSS protection
- **Secure Dependencies**: Regular dependency updates

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Integration with external APIs
- [ ] Multi-language support

## 🤝 Contributing

1. Follow the established coding standards
2. Use the design system consistently
3. Write clear commit messages
4. Test your changes thoroughly
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
