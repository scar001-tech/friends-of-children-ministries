# Friends of Children Ministries

A comprehensive web platform for Sunday school teaching resources — Bible-based lessons, events, blog, and admin tools for children's ministry.

## 🌟 Features

- **Lessons Library** — Bible lessons for all ages and learning styles
- **Bible Study** — Guided group study materials
- **Blog** — Ministry news, tips, and inspiration
- **Events** — Upcoming church and ministry events
- **Admin Panel** — Full content management system with:
  - Manage lessons, blog posts, events, resources
  - User management
  - Telegram integration for content imports
  - Media library
  - Audit logs & system operations

## 📁 Project Structure

```
├── index.html              # Homepage
├── lessons.html            # Lessons library
├── bible-study.html        # Bible study page
├── blog.html               # Blog listing
├── events.html             # Events page
├── about.html              # About the ministry
├── contact.html            # Contact page
├── lesson1-6.html          # Individual lesson pages
├── admin*.html             # Admin panel pages
├── images/                 # Background images (all sections)
├── js/modules/             # JS modules (PDF compiler, social widget)
├── api/                    # API entry point
├── index.css               # Main stylesheet
├── admin-styles.css        # Admin stylesheet
└── app.js                  # Main application logic
```

## 🚀 Getting Started

Simply open `index.html` in a browser, or serve with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

## 🎨 Background Images

Each section has a dedicated, thematically designed background:

| Image | Section |
|---|---|
| `images/hero-background.png` | Homepage hero — sunrise worship scene |
| `images/about-background.png` | About page — community dusk gathering |
| `images/lessons-background.png` | Lessons — pastoral morning fields |
| `images/children-hero-bg.png` | Children's section — afternoon sky |
| `images/lesson-faith.png` | Faith lesson card — stained glass cross |
| `images/lesson-noah.png` | Noah lesson card — rainbow over floodwaters |
| `images/card-lessons.png` | Lessons card — warm amber bookshelf |
| `images/card-about.png` | About card — ministry sunset silhouettes |
| `images/card-contact.png` | Contact card — teal morning, open hands |
| `images/card-admin.png` | Admin card — professional workspace |
| `admin-login-bg.png` | Admin login — church at dawn |
| `admin-dashboard-bg.png` | Admin dashboard — deep navy grid |

## 📜 License

© Friends of Children Ministries. All rights reserved.
