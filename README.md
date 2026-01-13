# Friends of Children Ministries Website

A modern, responsive website for Friends of Children Ministries featuring interactive lessons, admin management, and media resources for children's ministry programs.

## 🌟 Features

### Frontend
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Interactive Lessons**: 6 comprehensive Bible lessons with detailed content
- **Admin Dashboard**: Content management system for lessons and media
- **Media Library**: Organized storage for images, videos, and audio files
- **Contact System**: Easy communication with ministry leaders

### Backend
- **Node.js Server**: RESTful API for data management
- **File Upload System**: Secure media file handling
- **JSON Database**: Lightweight data storage for lessons and media
- **Admin Authentication**: Secure access to management features

## 🚀 Live Demo

Visit the live website: [Friends of Children Ministries](https://github.com/scar001-tech/friends-of-children-ministries)

## 📁 Project Structure

```
├── index.html              # Homepage
├── lessons.html            # Lessons overview page
├── lesson1-6.html          # Individual lesson pages
├── admin.html              # Admin dashboard
├── admin-*.html            # Admin management pages
├── about.html              # About page
├── contact.html            # Contact page
├── index.css               # Main stylesheet
├── lesson-detail.css       # Lesson-specific styles
├── sidebar-styles.css      # Navigation styles
├── app.js                  # Main JavaScript functionality
├── api.js                  # API communication
├── lesson-loader.js        # Dynamic lesson loading
├── lesson-resources.js     # Media resources handler
├── server/                 # Backend server
│   ├── server.js           # Express server
│   ├── routes/             # API routes
│   ├── database/           # JSON data files
│   └── uploads/            # Media storage
└── assets/                 # Images and media files
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/scar001-tech/friends-of-children-ministries.git
   cd friends-of-children-ministries
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   ```

3. **Start the development server**
   ```bash
   # Start backend server (from server directory)
   npm start
   
   # Serve frontend (from root directory)
   # Use any local server like Live Server, http-server, or Python's SimpleHTTPServer
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000` (or your local server port)
   - Backend API: `http://localhost:5000`

## 🎯 Usage

### For Visitors
- Browse available lessons on the lessons page
- View detailed lesson content with objectives, materials, and activities
- Access media resources including videos, audio, and blog posts
- Contact the ministry through the contact form

### For Administrators
- Access admin dashboard at `/admin.html`
- Manage lessons: add, edit, or delete lesson content
- Upload and organize media files
- View and manage contact submissions

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
```

### Database Setup
The application uses JSON files for data storage:
- `server/database/lessons.json` - Lesson content
- `server/database/media.json` - Media file metadata

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper contrast and navigation
- **Performance**: Optimized images and efficient CSS/JS
- **Cross-browser**: Compatible with all modern browsers

## 🔒 Security Features

- Input validation and sanitization
- Secure file upload handling
- Admin authentication system
- XSS protection

## 🚀 Deployment

### Vercel (Recommended)
The project includes `vercel.json` configuration for easy deployment:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### Other Platforms
- **Netlify**: Deploy frontend, use serverless functions for backend
- **Heroku**: Full-stack deployment with Node.js buildpack
- **GitHub Pages**: Frontend only (static hosting)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Friends of Children Ministries**
- Website: [Your Website URL]
- Email: [Your Email]
- Phone: [Your Phone]

## 🙏 Acknowledgments

- Built with love for children's ministry
- Designed to make Bible lessons engaging and accessible
- Community-driven development

---

*Made with ❤️ for Friends of Children Ministries*