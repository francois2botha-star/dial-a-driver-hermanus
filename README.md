# Dial a Driver Hermanus

A professional taxi service website built with React and Vite.

## Features

- **Responsive Design** - Mobile-friendly interface
- **Online Booking** - Easy-to-use booking system
- **Service Information** - Detailed service offerings
- **Contact Form** - Get in touch with our team
- **24/7 Service** - Always available

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deploying to PHP Server

To host this React application on a PHP server:

1. Build the project:
```bash
npm run build
```

2. Copy the contents of the `dist` folder to your PHP server's web root

3. Create a `.htaccess` file in the root directory if using Apache:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── About.jsx
│   ├── Booking.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Technologies Used

- React 18
- Vite
- CSS3
- JavaScript ES6+

## License

This project is licensed under the MIT License.
