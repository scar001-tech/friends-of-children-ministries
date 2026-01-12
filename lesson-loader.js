/**
 * lesson-loader.js
 * Handles dynamic content switching for different age groups in lesson pages.
 * 
 * Requirements:
 * 1. Objectives and Overview remain the same for all groups.
 * 2. Lesson Content changes based on the selected Age Group.
 * 3. Age Groups: Class A (3-5), Class B (6-9), Class C (10-12), Teens (13+).
 * 4. Each group has a unique downloadable PDF.
 * 5. Layout: Selector at top of Content section, PDF download at bottom of Content section.
 * 6. Duration display is removed.
 */

const LESSON_CONTENT = {
    "lesson1": {
        "title": "God's Amazing Creation",
        "scripture": "Genesis 1:1-31",
        "overview": "This lesson introduces children to the magnificent story of creation. Through engaging activities, storytelling, and hands-on experiences, students will explore the seven days of creation and understand God's intentional design of the world.",
        "objectives": [
            "Students will understand the sequence of the seven days of creation",
            "Students will recognize that God created everything with purpose and intention",
            "Students will identify ways they can care for God's creation",
            "Students will develop a sense of wonder and gratitude for the world God made"
        ],
        "groups": {
            "class-a": {
                "name": "Class A (Ages 3-5)",
                "content": "### Opening Prayer\nThank God for making the beautiful world and everything in it. Ask specifically for help to see His beauty today.\n\n### Interactive Story\nUse colorful picture cards to show what God made each day. Ask children to make sounds or movements for the animals and waves. Focus on 'Day 1: Light', 'Day 2: Sky', 'Day 3: Land/Plants'.\n\n### Game: I Spy Creation\n'I spy with my little eye, something God made that is Green!' (Points to a leaf). Repeat for other colors found in nature.\n\n### Creative Activity\nColoring page: 'God Made the Sun, Moon, and Stars.' Use glitter for stars to make them sparkle.\n\n### Nature Discovery\nSmall group exploration: Feel the texture of real leaves, stones, and flowers. Discuss how God made different things feel different ways (bumpy, smooth, soft).\n\n### Closing Celebration\nSing 'He's Got the Whole World in His Hands' with simple clapping and jumping for joy.\n\n### Teacher's Tip\nKeep lessons short and fast-paced for this age. Use physical objects they can touch whenever possible to keep them grounded in the story.",
                "pdfUrl": "downloads/lesson1-class-a.pdf"
            },
            "class-b": {
                "name": "Class B (Ages 6-9)",
                "content": "### Bible Reading & Drama\nRead Genesis 1. Choose students to act as 'scenery' for each day (trees, stars, ocean waves). Encourage them to use sound effects.\n\n### Group Discussion\nWhy did God rest on the seventh day? What does it mean for us today? Is resting a way of being thankful?\n\n### Activity: Creation Collage\nIn pairs, create a collage using natural materials (leaves, sand, twigs) to represent Day 3 of creation. Focus on layering different textures.\n\n### Science Spotlight\nLook at how plants need light and water (Day 1 and Day 3) to grow. Discuss the divine design in nature's systems and how everything is connected.\n\n### Stewardship Workshop\nBrainstorm list of ways to save water or keep the park clean. Choose one to do this week and report back next Sunday.\n\n### Memory Verse Challenge\nGenesis 1:1 with hand motions. 'In the beginning (move hands up), God created (molding hands) the heavens and the earth (circular motion).'\n\n### Teacher's Tip\nEngage their sense of logic. Ask 'What would happen if we skip Day 2?' to help them see the order of God's planning.",
                "pdfUrl": "downloads/lesson1-class-b.pdf"
            },
            "class-c": {
                "name": "Class C (10-12)",
                "content": "### Deep Study: Imago Dei\nRead Genesis 1:26-27. What does it mean to be made in God's image? How does this change how we treat others? Does it give us a special responsibility?\n\n### Analysis: Order & Complexity\nLook at the sequence of creation. How does Day 1-3 provide the 'environment' for what is created in Day 4-6? (e.g. Day 1 Light / Day 4 Sun).\n\n### Practical Application\nIdentify one environmental issue in our local community. How can our class help solve it as part of our duty to care for the earth? (e.g. recycling project).\n\n### Reflection Journaling\nWrite about a place in nature where you feel closest to God. Describe the smells, sounds, and feelings you experience there.\n\n### Comparative Study\nHow is God's creation different from anything humans 'make'? Focus on the Hebrew word 'Bara' (to create out of nothing) versus 'Asah' (to make from existing materials).\n\n### Group Project\nStart a small classroom garden or plant seeds in pots. Label them with the day of creation they represent (Day 3).\n\n### Teacher's Tip\nPre-teens appreciate complexity. Don't shy away from the 'whys' of creation. Encourage them to ask tough questions about science and faith.",
                "pdfUrl": "downloads/lesson1-class-c.pdf"
            },
            "teens": {
                "name": "Teens (Ages 13+)",
                "content": "### Theological Reflection: Ex Nihilo\nDiscuss the concept of God creating 'out of nothing.' How does this challenge or complement scientific theories like the Big Bang? Does God exist outside of time?\n\n### Ethical Forum: Stewardship vs. Exploitation\nDebate our responsibility to the planet. Is 'dominion' (Gen 1:28) a license to use resources, or a call to protect them? How does 'greed' affect God's world?\n\n### Personal Mission\nDraft a personal 'Creation Covenant'—three specific habits you will change this week to honor God's handiwork (e.g. reducing waste, nature walks).\n\n### Science and Faith Dialogue\nExplore the harmony between the biblical account and modern astrophysics/biology. Discussion: 'Has science made God obsolete?' or 'Does science reveal God's detail?'\n\n### Apologetics Focus\nHow do we defend the belief in a Creator in a secular school environment? Practice role-playing a conversation with a skeptical friend.\n\n### Leadership Challenge\nPlan a youth-led 'Clean Up Day' for the church grounds or a local park. Coordinate with church elders to make it a community event.\n\n### Teacher's Tip\nTeens need to lead. Give them the platform to moderate the debates. Use modern analogies like 'software code' for DNA to explain complex design concepts.",
                "pdfUrl": "downloads/lesson1-teens.pdf"
            }
        }
    },
    "lesson2": {
        "title": "Jesus Loves the Little Children",
        "scripture": "Mark 10:13-16",
        "overview": "A core lesson on the unconditional love of Jesus and His high regard for children as examples of kingdom faith.",
        "objectives": [
            "Understand Jesus' heart for children",
            "Recognize that we are valued by God",
            "Learn to welcome others like Jesus did"
        ],
        "groups": {
            "class-a": {
                "name": "Class A (Ages 3-5)",
                "content": "### Hugs for Everyone\nTell the story of how the disciples tried to send kids away, but Jesus said 'No! Let them come!' Focus on Jesus' big smile and open arms.\n\n### Song Time\nSing 'Jesus Loves Me' with loud voices and big hand motions. Add a verse about 'Jesus Loves My Friends Too'.\n\n### Activity: Finger Painting Hearts\nUse wash-off paint to make heart shapes on a large paper, remembering that Jesus' love is huge and covers our whole lives.\n\n### Jesus is my Friend\nPass around a 'friendship heart' and say one nice thing about a friend in the room. This builds classroom community.\n\n### Storytime with Puppets\nDisciples trying to block the way (use a grumpy puppet) vs Jesus (use a kind puppet) opening His arms. Let kids interact with the grumpy puppet to tell him 'No!'.\n\n### Closing Prayer\nThank Jesus for being the best friend ever and for loving us even when we are tired or grumpy.\n\n### Teacher's Tip\nPhysical symbols are key. Give them a 'Jesus loves me' sticker to wear so they can share the message with their parents.",
                "pdfUrl": "downloads/lesson2-class-a.pdf"
            },
            "class-b": {
                "name": "Class B (Ages 6-9)",
                "content": "### Role Play\nAct out the scene in Mark 10. Discuss how the children felt when the disciples were grumpy versus when Jesus welcomed them. Re-enact it with different endings.\n\n### Discussion: Why Children?\nWhy did Jesus say we need to be like children to enter the kingdom? What makes a child's trust different from an adult's?\n\n### Craft: Welcome Banner\nCreate a colorful banner for the classroom that says 'Everyone is Welcome Here.' Decorate with cut-out hands of every student.\n\n### Scripture Memory Maze\nFind the words to Mark 10:14 hidden around the room. Piece them together on a board to complete the verse.\n\n### Sharing Circle\nHave you ever felt left out? How does knowing Jesus loves you change that feeling? How can we help someone else feel included?\n\n### Friendship Bracelets\nMake bracelets to give to someone who might be lonely at school this week. Talk about the value of small gifts.\n\n### Teacher's Tip\nEmphasis the 'Disciples' mistake'. Show that even good people can get it wrong, but Jesus is always there to correct us with love.",
                "pdfUrl": "downloads/lesson2-class-b.pdf"
            },
            "class-c": {
                "name": "Class C (Ages 10-12)",
                "content": "### Scripture Analysis\nRead Mark 10:13-16 alongside Matthew 18:1-5. What are the specific traits of a child that Jesus values (trust, humility, dependence)? List them on the board.\n\n### Workshop: Inclusion\nIdentify groups in your school or community that feel 'unwelcome.' How can we actively invite them in? Create a 'Welcome Strategy'.\n\n### Prayer Exercise\nWrite a list of three people who need to feel loved this week and pray for them by name. Ask God for an opportunity to say something kind to them.\n\n### Kingdom Hierarchy\nContrast the 'world's' ladder of success (money, fame) vs Jesus' upside-down kingdom where the humble and the small are the greatest.\n\n### Case Study: Rejection\nHow did Jesus react when people were rejected by society (the lepers, the tax collectors)? Does He still do that today through us?\n\n### Creative Writing\nWrite a letter from the perspective of one of the children Jesus hugged. Describe how it felt to be seen by the King of the world.\n\n### Teacher's Tip\nEncourage vulnerability. Share a time you felt small and how Jesus' love helped you. It makes the lesson relatable.",
                "pdfUrl": "downloads/lesson2-teens.pdf"
            },
            "teens": {
                "name": "Teens (Ages 13+)",
                "content": "### The Radical Kingdom\nIn Jesus' time, children had no legal status. By elevating them, Jesus was overturning social hierarchies. Discuss what 'radicals' are doing today to elevate the marginalized.\n\n### Modern Context\nHow does the message of being 'valuable to God' combat the pressures of social media and performance culture? Does God care about your 'likes'?\n\n### Reflection\nContemplate: If Jesus were to walk into your school today, who would He go to first? How can you emulate that? Is there a 'social leper' in your class?\n\n### Identity in Christ vs Identity in Achievement\nDeep discussion on where we find our worth. Biblical passages: Psalm 139. Are we defined by our grades or our Savior?\n\n### Advocacy Project\nIdentify a local injustice affecting youth (e.g. bullying, lack of resources). Research how to speak up for those who can't speak for themselves.\n\n### Mentorship\nDiscuss the responsibility of older youth to model Jesus' love for the younger kids. Brainstorm one 'Big Brother/Sister' activity for next month.\n\n### Teacher's Tip\nListen more than you speak. Teens have strong opinions on fairness and justice. Let this scripture fuel their passion for social service.",
                "pdfUrl": "downloads/lesson2-teens.pdf"
            }
        }
    },
    "lesson3": {
        "title": "Living with Purpose",
        "scripture": "Jeremiah 29:11",
        "overview": "Discovering God's unique plan and purpose for our lives and moving forward with hope and confidence.",
        "objectives": [
            "Memorize Jeremiah 29:11",
            "Identify personal gifts and talents",
            "Understand that God's plans are intended for our good"
        ],
        "groups": {
            "class-a": {
                "name": "Class A (Ages 3-5)",
                "content": "### God Knows My Name\nPlay a name game and explain that God knew your name before you were even born! Use a mirror to show them how special they are.\n\n### Craft: Dream Clouds\nColor clouds and talk about what you want to be when you grow up for God. Glue cotton balls onto the clouds.\n\n### Growing Up with God\nMeasuring tape activity – just like your body grows, God has a big plan for you to grow in Him. Mark their height on a 'God's Plan' chart.\n\n### Matching Talents\nMatch pictures of people helping (doctor, teacher, helper) with hearts. Discuss how helping is a talent.\n\n### Follow the Leader\nGod is our leader – wherever He goes, we follow His path. Play 'Follow the Leader' with the teacher being God's representative.\n\n### Song: I am a Child of God\nSing with hand motions. Emphasize the word 'Child' and 'God'.\n\n### Teacher's Tip\nReinforce identity. Repeat 'You are special to God' frequently throughout the activities.",
                "pdfUrl": "downloads/lesson3-class-a.pdf"
            },
            "class-b": {
                "name": "Class B (Ages 6-9)",
                "content": "### Talent Show\nShare one thing you are good at (reading, running, being kind). Explain that talents are gifts from God used for His purpose.\n\n### Map of Life\nDraw a map showing where you are now and where you hope God leads you. Include 'Milestones' like school and helping others.\n\n### Bible Story: David the Shepherd Boy\nGod had a plan for David even when he was just a boy. Discussion on small starts and how God watches us in the 'fields'.\n\n### Gift Inventory\nWorksheet to identify what we enjoy doing (drawing, singing, helping, talking). Categorize them into 'Service', 'Art', 'Words'.\n\n### Encouragement Wall\nWrite one gift you see in your classmate on a sticky note and stick it on the wall. Read them aloud at the end.\n\n### Memory Verse Art\nCreating a poster for Jeremiah 29:11 using vibrant colors and 'Hope' as the theme.\n\n### Teacher's Tip\nHelp them see 'hidden' talents. A child who talks a lot might have a talent for 'Exhortation' or 'Leadership'. Reframe their traits positively.",
                "pdfUrl": "downloads/lesson3-class-b.pdf"
            },
            "class-c": {
                "name": "Class C (10-12)",
                "content": "### Biblical Examples\nStudy the lives of Joseph or Esther. How did they find purpose even in hard times? Was it easy to see God's plan in the middle of it?\n\n### Gift Inventory\nTake a simple 'Spiritual Gifts' quiz for pre-teens to identify areas of service. Discuss the results in small groups.\n\n### Purpose Statement\nWrite one sentence about how you want to serve God this school year. Keep it in your Bible as a bookmark.\n\n### Obstacle Identification\nWhat stops us from following God's plan? (Fear, distractions, wanting our own way). How can we overcome these?\n\n### Mentorship Session\nInterview a church member about how they found their 'calling' in life. What steps did they take? What was their biggest challenge?\n\n### Service Action Plan\nHow can we use our gifts to help the church library, the music team, or the children's ministry? Pick one project to start.\n\n### Teacher's Tip\nPre-teens are starting to think about the future. Validate their dreams but ground them in the idea that 'Today' is also part of God's purpose.",
                "pdfUrl": "downloads/lesson3-class-c.pdf"
            },
            "teens": {
                "name": "Teens (Ages 13+)",
                "content": "### Discerning the Will of God\nHow do we know if a plan is from God or just our own desire? Discuss the 'Three Lights': Scripture, Peace of the Spirit, and Circumstances.\n\n### Vocational Theology\nCan you be a doctor, artist, or coder for God? Discuss the idea of 'Secular Calling' versus 'Sacred Calling'. Are they different?\n\n### Personal Roadmap\nSetting spiritual goals for the next year. Where do you want to be in your relationship with Christ by graduation?\n\n### Stewardship of Time\nAnalyzing our weekly schedule. How much time is given to God's purpose vs our own entertainment? Create a 'Kingdom Calendar'.\n\n### Peer Influence\nHow to stay on God's path even when friends go a different way. Discuss the 'Pressure of the Majority'.\n\n### Career Forum\nDiscussing the difference between a job (what you do for money) and a calling (what you do for God). Can a job be a calling?\n\n### Teacher's Tip\nThey face immense pressure about their future. Offer Jeremiah 29:11 not as a magic wand, but as a promise of God's presence in their transition.",
                "pdfUrl": "downloads/lesson3-teens.pdf"
            }
        }
    },
    "lesson4": {
        "title": "The Good Samaritan",
        "scripture": "Luke 10:25-37",
        "overview": "Learning that our 'neighbor' is anyone in need, regardless of background or status, and taking practical action to help.",
        "objectives": [
            "Identify the 'neighbor' in the parable",
            "Practice empathy and practical help",
            "Deconstruct social barriers to kindness"
        ],
        "groups": {
            "class-a": {
                "name": "Class A (Ages 3-5)",
                "content": "### Helping Hands\nRole-play helping a friend who fell down. Use real bandages and lots of kindness! Let kids take turns being the 'helper'.\n\n### Puppet Story\nA simple puppet show of the Good Samaritan story. Use funny voices for the priest and the Levite to show they were 'too busy'.\n\n### The Kind Doctor Game\nTaking care of teddy bears and dolls. Bandage their paws and tell them 'God loves you'.\n\n### Sharing Snack\nPracticing sharing our food with everyone in the circle. Talk about how being a neighbor means sharing what we have.\n\n### Hearts for Others\nStick a heart sticker on anyone you helped today. See how many hearts we can collect as a class.\n\n### Song: Love Your Neighbor\nSimple melody with clapping and pointing to our friends. Focus on the word 'Love'.\n\n### Teacher's Tip\nFocus on the action of *seeing*. Explain that the Samaritan 'saw' the man and didn't look away. Encourage them to 'see' their friends' needs.",
                "pdfUrl": "downloads/lesson4-class-a.pdf"
            },
            "class-b": {
                "name": "Class B (Ages 6-9)",
                "content": "### Who is My Neighbor?\nDiscuss the term 'neighbor.' Is it just the person next door? Show pictures of people from different countries and cultures.\n\n### Samaritan Challenge\nBrainstorm three ways to help someone at school who is lonely or needs help with homework. Write them on 'Kindness Cards'.\n\n### Role Reversal\nImagine you were the injured man. Who would you want to help you? Why was the Samaritan's help so surprising?\n\n### 'Would You Stop?' Scenarios\nDiscussion: If you were late for a party or a game, would you stop to help someone? Role-play some difficult choices.\n\n### Kindness Coupons\nCreate coupons for parents or siblings: 'One free hug', 'Clean my room', 'Help with dishes'.\n\n### Memory Verse Wall\nWriting Luke 10:27 in large letters and decorating it with pictures of helpful acts. Practice reciting it in pairs.\n\n### Teacher's Tip\nKids at this age are very concerned with fairness. Use that to explain why the Samaritan was the real hero—he did more than what was 'fair'.",
                "pdfUrl": "downloads/lesson4-class-b.pdf"
            },
            "class-c": {
                "name": "Class C (10-12)",
                "content": "### Examining Barriers\nWhy didn't the Priest or Levite stop? Discuss fear, busyness, and legalism. List the 'excuses' we use today to avoid helping.\n\n### Service Project Planning\nOutline a class project to support a local shelter or food bank. Contact a local charity for a list of needed items.\n\n### Empathy Training\nPutting ourselves in the shoes of someone from a different culture or background. Discuss common misconceptions and how to break them.\n\n### The Cost of Kindness\nDiscuss how the Samaritan spent his own money (two denarii) and time. Is kindness always free? What are we willing to give up?\n\n### Community Mapping\nIdentify 'vulnerable' spots in our neighborhood where people might need help (the elderly, the poor). Create a 'Mercy Map'.\n\n### Debate: Intent vs Action\nWhat if the Priest *felt* sorry but still didn't stop? Is that enough? Discussion on James 2 (Faith without works).\n\n### Teacher's Tip\nThis group can handle the historical context. Explain the animosity between Jews and Samaritans to show how radical this story really was.",
                "pdfUrl": "downloads/lesson4-class-c.pdf"
            },
            "teens": {
                "name": "Teens (Ages 13+)",
                "content": "### Deconstructing Prejudice\nDiscuss the historical hate between Jews and Samaritans. Who are the 'Samaritans' in our current political/social climate? (Refugees, enemies, etc).\n\n### The Cost of Mercy\nKindness isn't always free. Discuss the Samaritan's sacrifice of time, money, and safety. What are you willing to risk for a stranger?\n\n### Global Neighboring\nHow can we be 'Good Samaritans' to people suffering halfway across the world? Discuss sustainable aid vs 'quick fixes'.\n\n### Bystander Effect\nPsychological discussion on why groups are less likely to help. How does our faith compel us to break the silence and the apathy?\n\n### Interviewing Activists\nLearning from people who have dedicated their lives to helping the 'marginalized'. Search for a 'Samaritan' story in the news today.\n\n### Practical Workshop\nFirst aid basics – being physically ready to help in an emergency. Discuss how being prepared is an act of love.\n\n### Teacher's Tip\nTeens are ready for the 'uncomfortable' parts of the gospel. Don't sanitize the story; emphasize the scandalous nature of the Samaritan being the hero.",
                "pdfUrl": "downloads/lesson4-teens.pdf"
            }
        }
    },
    "lesson5": {
        "title": "Noah's Ark Adventure",
        "scripture": "Genesis 6-9",
        "overview": "A story of judgment and grace, emphasizing God's covenant and the importance of absolute obedience in a challenging world.",
        "objectives": [
            "Analyze the concept of 'Righteousness' in a corrupt world",
            "Discuss the symbolic meaning of the Ark",
            "Explain the details of the Noachic Covenant and the rainbow promise"
        ],
        "groups": {
            "class-a": {
                "name": "Class A (Ages 3-5)",
                "content": "### Safe in the Boat\nBuild a 'boat' out of pillows and blankets. Talk about how God keeps us safe like He kept the animals safe during the big rain.\n\n### Animal Parade\nWalk two-by-two and make animal sounds. Use plush toys to fill our 'pillow ark'. God remembered every single living thing.\n\n### Rainbow Art\nHandprint rainbow – each child adds one color to the big promise rainbow. Use bright colors to show it's a happy promise.\n\n### Rain Sounds\nUsing our fingers on the table to make the sound of rain getting louder and softer. Then make a 'Shhh' sound for when the rain stops.\n\n### Noah Said 'Yes'\nPracticing obey games (like Simon Says, but 'Noah Says'). Emphasize that Noah did exactly what God asked.\n\n### Floating Fun\nWater tub activity – seeing what floats (wood) and what sinks (stones). Explain how God gave Noah the right instructions for building.\n\n### Teacher's Tip\nKeep the focus on *Safety* and *Promises*. Avoid the scary details of the flood; focus on God's care for Noah and the animals.",
                "pdfUrl": "downloads/lesson5-class-a.pdf"
            },
            "class-b": {
                "name": "Class B (6-9)",
                "content": "### Obeying God\nNoah built the ark even when it didn't rain. Discuss how to obey God even when it feels 'silly' or 'weird' to others. Have you ever done the right thing alone?\n\n### Covenant Colors\nDetailed study of the Rainbow and what each color represents in God's promise of grace. Create a 'Covenant Wheel' with the colors.\n\n### Ark Blueprint\nDrawing the dimensions of the ark as described in the Bible (cubits converted to feet). It was as tall as a 3-story building!\n\n### The Waiting Period\nDiscussion: How did Noah feel during the days on the boat with no land in sight? Talking about patience, trust, and the dove/raven search.\n\n### Animal Classification\nGod sent clean and unclean animals. Learning about the different pairs and why God chose them. Discuss how the ark was a mini-world.\n\n### Promise Stones\nPainting stones with rainbows to keep in our pockets or give to a friend who is having a 'stormy' day.\n\n### Teacher's Tip\nUse the 'Building' phase to talk about perseverance. Noah worked for decades! It's a great lesson in not giving up on God's tasks.",
                "pdfUrl": "downloads/lesson5-class-b.pdf"
            },
            "class-c": {
                "name": "Class C (10-12)",
                "content": "### Stewardship & New Beginnings\nAfter the flood, God gave Noah responsibility for the earth again. How do we restart after a failure or a big change? Discuss the 'Altars' Noah built.\n\n### Archaeological Quest\nLook at different 'Ark' searches throughout history and discuss the physical vs. faith aspects of the story. Does 'finding' the ark change our faith?\n\n### Covenant Study\nComparing God's promise to Noah with other covenants (Abraham, Moses). Why is the Noachic covenant unique? (It's for all humanity).\n\n### The Corruption of the World\nWhat did it mean that 'every intent of thoughts was only evil'? (Gen 6:5). Discuss how one person (Noah) can stay different from the crowd.\n\n### Resilience Training\nNoah worked on the ark for a long time amidst mockery. How do we stay committed to God's projects when others laugh at us?\n\n### Creative Writing\nWrite a journal entry for one of Noah's sons during the first week on the ark. Describe the smells, the sounds, and the conversations.\n\n### Teacher's Tip\nPre-teens can discuss 'Justice'. Ask why God didn't just 'delete' the problem. Explain that the Ark is a picture of God's 'Rescue' plan.",
                "pdfUrl": "downloads/lesson5-class-c.pdf"
            },
            "teens": {
                "name": "Teens (Ages 13+)",
                "content": "### Judgment & Grace\nHow do we reconcile a loving God with the global flood? Discuss the necessity of justice in the face of absolute corruption. Is 'Grace' meaningful without 'Judgment'?\n\n### The Remnant\nNoah was one man against the world. Discuss the courage required to be a 'remnant' of faith in a secular society. Are we willing to be 'Noah' in our schools?\n\n### Ecological Stewardship\nThe Noachic covenant includes the whole earth. What is our responsibility today to prevent the destruction of nature? Discuss 'Creation Care' as worship.\n\n### Ancient Flood Myths\nCompare the Genesis account with the Epic of Gilgamesh. Why is the biblical version unique? Focus on the character of God vs. the fickle ancient gods.\n\n### Modern 'Arks'\nHow can the church be a 'boat' of safety for people today in a stormy culture? What does it mean to 'invite' people onto the ark?\n\n### Debate: Faith or Sight\nBuilding for rain that hasn't been seen yet. Living by faith in future promises. How does this apply to our hope for the New Heaven and New Earth?\n\n### Teacher's Tip\nUse the flood as a gateway to talking about 'Final Judgment' and 'Return of Christ'. Jesus mentions Noah in this context in Matthew 24.",
                "pdfUrl": "downloads/lesson5-teens.pdf"
            }
        }
    },
    "lesson6": {
        "title": "Faith in Action",
        "scripture": "James 2:14-26",
        "overview": "Exploring the essential connection between genuine faith and the practical works that evidence it to the world.",
        "objectives": [
            "Distinguish between faith, works, and legalism",
            "List examples of faith in action in daily life",
            "Commit to one practical act of service for the community"
        ],
        "groups": {
            "class-a": {
                "name": "Class A (Ages 3-5)",
                "content": "### Kind Hands\nSing a song about what our hands can do for God: sweeping, hugging, and sharing toys. Use motions for each action.\n\n### The 'Doing' Game\nSimple tasks given by the 'Helper.' When you finish cleaning a block or picking up a paper, you say 'My faith is working!'\n\n### Helping Feet\nMarching to find people who need help (use dolls or teddies placed around the room). Practice being the 'first to help'.\n\n### Action Stories\nActing out helping gestures as the teacher reads a story. When the character is kind, the kids give a 'thumbs up'.\n\n### Helper Stickers\nReward for every helpful act done during class time. Let them choose their favorite sticker to put on their 'Faith Chart'.\n\n### Closing Circle\nShare one thing you will do for mommy or daddy today. 'I will help by...' and let each child finish the sentence.\n\n### Teacher's Tip\nThis is about HABIT. Make 'Helping' the coolest thing to do in the class. Praise the *act* specifically ('I like how you helped Tommy').",
                "pdfUrl": "downloads/lesson6-class-a.pdf"
            },
            "class-b": {
                "name": "Class B (6-9)",
                "content": "### Words vs. Actions\nIf I say I am a swimmer but never get in the water, am I really a swimmer? Discuss the same for faith. Role-play someone who 'talks' but never 'does'.\n\n### Faith Journal\nStart a small notebook to record one good deed you did for someone else this week. Decorate the cover with 'Faith = Action'.\n\n### The Mirror Test\nDoes my life look like a Christian life? What would someone see me DOING that shows I love Jesus? List 5 things on the board.\n\n### Service Scavenger Hunt\nFind 5 jobs around the classroom or church that need doing (tidying, helping a teacher, arranging chairs) and do them as a team!\n\n### Role Play: The Empty Promise\nActing out saying 'I'll help' but then walking away. How does that make others feel? Now re-act it with a 'Faith in Action' ending.\n\n### Practical Prayer\nPraying for strength to *do* what we know is right, even when it's hard or we feel lazy. Focus on the word 'Obedience'.\n\n### Teacher's Tip\nThey understand analogies well. Use the 'Tree' and 'Fruit' analogy. Faith is the root, work is the fruit. No fruit means something is wrong with the root.",
                "pdfUrl": "downloads/lesson6-class-b.pdf"
            },
            "class-c": {
                "name": "Class C (10-12)",
                "content": "### Abraham & Rahab\nStudy these two figures from James 2. How did they 'prove' their faith through difficult actions? (Sacrificing Isaac / Saving the Spies).\n\n### Community Audit\nWalking around the church or neighborhood and identifying one place that needs help. Plan how our class could address it (e.g. a bake sale for a cause).\n\n### Testing our Faith\nDiscussion on the 'fruits' of the Spirit (Galatians 5) as evidence of a living roots of faith. Are we growing 'apples' or 'thorns'?\n\n### Service Coupons\nCreate detailed 'service contracts' for the church or family. 'I commit to doing X for the next 4 weeks.' Get them signed by parents.\n\n### Analyzing James' Tone\nWhy is James so 'tough' in his writing? Introduction to the Wisdom Literature style. Is he angry or just passionate about truth?\n\n### Group Reflection\nCan you have works without faith? (Yes, legalism). Can you have faith without works? (James says no). Which is more common in our world today?\n\n### Teacher's Tip\nChallenge their 'Comfort Zone'. Service isn't always doing what we like. Encourage them to help in areas they might find 'boring' but are necessary.",
                "pdfUrl": "downloads/lesson6-class-c.pdf"
            },
            "teens": {
                "name": "Teens (Ages 13+)",
                "content": "### Faith & Works Debate\n'Saved by Faith alone but not by faith that stands alone.' Unpack this theological tension (Paul vs James). Is there a contradiction? (No, different focus).\n\n### Living Out Loud\nHow is your faith visible at school? Is it just what you *don't* do (moralism), or is it what you *actively* do (radical love)?\n\n### Case Study: Social Justice\nHow has the church historically put faith into action? (Abolition of slavery, civil rights, hospitals). What is our generation's 'Action'?\n\n### Personal Audit\nExamine your budget and your screen time. Where is the 'evidence' of your faith there? Does your spending reflect your Savior?\n\n### Workshop: Authentic Faith\nIdentifying 'religious performance' (doing things to be seen) vs 'spirit-led action' (doing things for God alone).\n\n### Project: Monthly Service Plan\nDesigning a year-long outreach schedule for the youth group. Include budget estimates and resource needs.\n\n### Teacher's Tip\nTeens are allergic to hypocrisy. Use this chapter to show that the Bible is also allergic to hypocrisy! Let James' directness inspire their authenticity.",
                "pdfUrl": "downloads/lesson6-teens.pdf"
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Determine which lesson we are on based on the filename
    const path = window.location.pathname;
    const lessonMatch = path.match(/lesson(\d+)/);
    if (!lessonMatch) return;

    const lessonKey = "lesson" + lessonMatch[1];
    const lessonData = LESSON_CONTENT[lessonKey];
    if (!lessonData) {
        console.warn(`No data found for ${lessonKey}`);
        return;
    }

    const objectivesSection = document.getElementById('objectives');
    const contentSection = document.getElementById('lesson-content');

    // 1. Setup Group Content Switching Function
    const updateGroupContent = (groupId) => {
        const group = lessonData.groups[groupId];
        if (!group || !contentSection) return;

        // Update Meta Group Label (The one in the header)
        const ageGroupMeta = findMetaByLabel('Age Group');
        if (ageGroupMeta) {
            ageGroupMeta.innerHTML = `<strong>Target Class:</strong> ${group.name}`;
        }

        // 1. Create Age Group Selector HTML
        const selectorHTML = `
            <div class="age-group-selector" style="margin: 20px 0 30px 0; max-width: 100%;">
                <span class="age-group-label" style="display: block; width: 100%; text-align: center; margin-bottom: 20px; font-weight: 700; color: var(--primary-color); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">Customize Content for Your Class:</span>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button class="age-group-btn ${groupId === 'class-a' ? 'active' : ''}" data-group="class-a">Class A (3-5)</button>
                    <button class="age-group-btn ${groupId === 'class-b' ? 'active' : ''}" data-group="class-b">Class B (6-9)</button>
                    <button class="age-group-btn ${groupId === 'class-c' ? 'active' : ''}" data-group="class-c">Class C (10-12)</button>
                    <button class="age-group-btn ${groupId === 'teens' ? 'active' : ''}" data-group="teens">Teens (13+)</button>
                </div>
            </div>
        `;

        // Update Lesson Content Section 
        // Placement: Selector -> Narrative -> Download PDF
        contentSection.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="margin:0;">Lesson Teaching Material</h2>
                <span class="badge" style="background: var(--primary-light); color: var(--primary-color); padding: 5px 15px; border-radius: 20px; font-weight: 700; font-size: 0.85rem;">Currently Viewing: ${group.name}</span>
            </div>
            
            ${selectorHTML}

            <!-- Categorized Lesson Content -->
            <div class="lesson-narrative fade-in">
                ${group.content
                .replace(/### (.*)/g, '<h3 style="color: var(--primary-color); margin-top: 2.5rem; margin-bottom: 1rem; border-left: 4px solid var(--secondary-color); padding-left: 15px; font-size: 1.35rem;">$1</h3>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br>')
            }
            </div>

            <!-- Download Section (Moved to bottom) -->
            <div class="pdf-download-container" style="margin-top: 50px; border-top: 2px solid #f0f0f0; padding-top: 40px;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <h3 style="color: var(--text-primary); margin-bottom: 10px;">Ready to Teach?</h3>
                    <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">Download the formatted PDF version of the ${group.name} guide to print or use offline during your session.</p>
                </div>
                <div class="pdf-card">
                    <div class="pdf-info">
                        <span class="pdf-icon" style="background: #fff0f0; padding: 15px; border-radius: 12px;">📄</span>
                        <div class="pdf-details">
                            <h4 style="margin-bottom: 4px;">Full Teaching Guide (${group.name})</h4>
                            <p>Includes all activities, prayers, and teacher notes.</p>
                        </div>
                    </div>
                    <a href="${group.pdfUrl}" class="btn-pdf" download style="box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);">
                        <span>Download Now</span>
                        <span style="font-size: 0.75em; opacity: 0.9;">(PDF)</span>
                    </a>
                </div>
            </div>
        `;

        // Re-attach event listeners to the new buttons
        attachButtonListeners();
    };

    // 2. Attach Event Listeners
    const attachButtonListeners = () => {
        const buttons = document.querySelectorAll('.age-group-btn');
        buttons.forEach(btn => {
            btn.onclick = () => {
                const targetGroup = btn.dataset.group;
                updateGroupContent(targetGroup);

                // Smooth scroll to the top of the content area for better UX
                document.getElementById('lesson-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
            };
        });
    };

    // 3. Initialize Permanent Sections (Objectives & Overview)
    const initPermanentContent = () => {
        if (!objectivesSection) return;

        objectivesSection.innerHTML = `
            <h2>Objectives & Overview</h2>
            <div style="background: #f8fafc; padding: 25px; border-radius: 15px; border-left: 5px solid var(--primary-color);">
                <div style="margin-bottom: var(--spacing-lg);">
                    <h3 style="color: var(--primary-color); font-size: 1.25rem; margin-bottom: var(--spacing-md); display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">📋</span> Lesson Overview
                    </h3>
                    <p style="line-height: 1.7; color: #334155;">${lessonData.overview}</p>
                </div>
                <div>
                    <h3 style="color: var(--primary-color); font-size: 1.25rem; margin-bottom: var(--spacing-md); display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">🎯</span> Learning Objectives
                    </h3>
                    <ul class="objectives-list" style="columns: 1; margin: 0;">
                        ${lessonData.objectives.map(obj => `<li style="margin-bottom: 12px; position: relative; padding-left: 5px;">${obj}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        // Update Page Title and Scripture Meta once
        const titleEl = document.querySelector('.lesson-title');
        if (titleEl) titleEl.textContent = lessonData.title;

        const metaItems = document.querySelectorAll('.meta-item');
        metaItems.forEach(item => {
            if (item.innerHTML.includes('Scripture')) {
                item.innerHTML = `<strong>📖 Scripture:</strong> ${lessonData.scripture}`;
            }
            // Remove duration and hardcoded age groups from header
            if (item.innerHTML.includes('Duration') || item.innerHTML.includes('Class A:') || item.innerHTML.includes('Age Group:')) {
                item.style.display = 'none';
            }
        });
    };

    // Helper for finding elements
    const findMetaByLabel = (label) => {
        const metaItems = document.querySelectorAll('.meta-item');
        for (const item of metaItems) {
            if (item.innerHTML.includes(label)) return item;
        }
        return null;
    };

    // Run Initializations
    initPermanentContent();
    updateGroupContent('class-b'); // Default to Class B on load
});
