const db = require('./db');

// Initial lessons data (migrated from app.js)
const lessonsData = [
    {
        title: "God's Amazing Creation",
        scripture: "Genesis 1:1-31",
        category: "creation",
        date: "Dec 1, 2024",
        description: "Explore the wonder of God's creation with hands-on activities and engaging discussions. Students will learn about the seven days of creation and discover their role as caretakers of God's world.",
        link: "lesson1.html",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        status: "published",
        overview: "This lesson introduces children to the magnificent story of creation.",
        objectives: "Students will understand the sequence of the seven days of creation",
        ageGroup: "Elementary (6-11)",
        duration: 45
    },
    {
        title: "Jesus Loves the Little Children",
        scripture: "Mark 10:13-16",
        category: "faith",
        date: "Nov 24, 2024",
        description: "A gentle introduction to Jesus' love for children.",
        link: "lesson2.html",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        status: "published",
        ageGroup: "Elementary (6-11)",
        duration: 45
    },
    {
        title: "Living with Purpose",
        scripture: "Jeremiah 29:11",
        category: "faith",
        date: "Nov 17, 2024",
        description: "Discover God's plan for your life through interactive discussions.",
        link: "lesson3.html",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        status: "published",
        ageGroup: "Elementary (6-11)",
        duration: 45
    },
    {
        title: "The Good Samaritan",
        scripture: "Luke 10:25-37",
        category: "parables",
        date: "Nov 10, 2024",
        description: "Learn about showing kindness to everyone through the parable.",
        link: "lesson4.html",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        status: "published",
        ageGroup: "Elementary (6-11)",
        duration: 45
    },
    {
        title: "Noah's Ark Adventure",
        scripture: "Genesis 6-9",
        category: "creation",
        date: "Nov 3, 2024",
        description: "Join Noah on his amazing adventure with fun activities.",
        link: "lesson5.html",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        status: "published",
        ageGroup: "Elementary (6-11)",
        duration: 45
    },
    {
        title: "Faith in Action",
        scripture: "James 2:14-26",
        category: "faith",
        date: "Oct 27, 2024",
        description: "Put your faith into action with practical service projects.",
        link: "lesson6.html",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        status: "draft",
        ageGroup: "Elementary (6-11)",
        duration: 45
    }
];

// Initial media files data
const mediaData = [
    { name: "creation-banner.jpg", type: "image", size: "2.4 MB", date: "Dec 1, 2024", icon: "IMG", url: "/uploads/creation-banner.jpg" },
    { name: "jesus-loves-children.jpg", type: "image", size: "1.8 MB", date: "Nov 28, 2024", icon: "IMG", url: "/uploads/jesus-loves-children.jpg" },
    { name: "bible-story-intro.mp4", type: "video", size: "45.2 MB", date: "Nov 25, 2024", icon: "VID", url: "/uploads/bible-story-intro.mp4" },
    { name: "worship-song.mp3", type: "audio", size: "5.6 MB", date: "Nov 20, 2024", icon: "AUD", url: "/uploads/worship-song.mp3" },
    { name: "noahs-ark.png", type: "image", size: "3.1 MB", date: "Nov 15, 2024", icon: "IMG", url: "/uploads/noahs-ark.png" },
    { name: "good-samaritan.mp4", type: "video", size: "52.8 MB", date: "Nov 10, 2024", icon: "VID", url: "/uploads/good-samaritan.mp4" },
    { name: "prayer-background.mp3", type: "audio", size: "4.2 MB", date: "Nov 5, 2024", icon: "AUD", url: "/uploads/prayer-background.mp3" },
    { name: "lesson-thumbnail.jpg", type: "image", size: "890 KB", date: "Nov 1, 2024", icon: "IMG", url: "/uploads/lesson-thumbnail.jpg" }
];

function seedDatabase() {
    console.log('Starting database seeding...');

    // Check if lessons already exist
    const existingLessons = db.lessons.getAll();

    if (existingLessons.length === 0) {
        console.log('Seeding lessons...');
        lessonsData.forEach(lesson => {
            db.lessons.create(lesson);
        });
        console.log(`Inserted ${lessonsData.length} lessons`);
    } else {
        console.log(`Lessons already exist (${existingLessons.length} records), skipping seed`);
    }

    // Check if media files already exist
    const existingMedia = db.media.getAll();

    if (existingMedia.length === 0) {
        console.log('Seeding media files...');
        mediaData.forEach(media => {
            db.media.create(media);
        });
        console.log(`Inserted ${mediaData.length} media files`);
    } else {
        console.log(`Media already exists (${existingMedia.length} records), skipping seed`);
    }

    console.log('Database seeding complete!');
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
