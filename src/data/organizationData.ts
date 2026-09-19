import { ProgramItem, ImpactStat, StoryItem, GalleryItem, FAQItem } from '../types';

export const ORG_INFO = {
  name: "Hands of Mercy Nepal",
  tagline: "Free Tuition & Educational Support for Children in Nepal",
  shortDescription: "A compassionate community initiative supporting children with free tuition, academic care, and character development in Bungamati.",
  fellowship: "Jyoti Great Commission Fellowship, Bungamati Church, Nepal",
  location: {
    town: "Bungamati",
    district: "Lalitpur",
    country: "Nepal",
    fullAddress: "Bungamati, Lalitpur, Bagmati Province, Nepal",
    addressPlaceholder: "[Official Physical Office / Classroom Address in Bungamati]",
  },
  contact: {
    email: "info@handsofmercynepal.org.np",
    emailPlaceholder: "[Official Email: info@handsofmercynepal.org.np]",
    phone: "+977 (Official Contact Number to be announced)",
    phonePlaceholder: "[Official Phone: +977-XX-XXXXXXX]",
    fellowshipLeader: "[Fellowship Coordinator / Pastor]",
  },
  established: "[Community Initiative]",
  missionStatement: "To provide free, high-quality tuition and holistic educational encouragement to children in Nepal who lack access to adequate learning assistance, fostering confidence, character, and lifelong hope.",
  visionStatement: "A community where every child, regardless of economic background, has the guidance, books, and loving mentorship needed to learn and thrive.",
  coreValues: [
    {
      title: "Compassion & Care",
      desc: "Serving children with genuine warmth and unconditional encouragement in every classroom session."
    },
    {
      title: "Educational Access",
      desc: "Removing financial and social barriers by offering tuition and study support 100% free of charge."
    },
    {
      title: "Community & Fellowship",
      desc: "Rooted in the local church community of Bungamati, walking alongside families and neighborhood schools."
    },
    {
      title: "Character & Growth",
      desc: "Nurturing not just academic competence in mathematics, science, and languages, but integrity and mutual respect."
    }
  ]
};

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'free-tuition',
    title: 'Free Daily Tuition & Homework Support',
    shortDesc: 'After-school coaching in core subjects (Math, Science, English, Nepali) taught by patient volunteer educators.',
    fullDesc: 'Many children in the community lack quiet study environments or family members with the educational background to assist with school homework. Our daily tuition sessions bridge this gap through structured subject coaching, homework review, and individualized attention.',
    iconName: 'BookOpen',
    highlights: [
      'Comprehensive coverage of Nepali curriculum',
      'Small group learning and peer discussion',
      'Dedicated guidance for school exams & SEE preparation',
      'Safe, well-lit study environment'
    ],
    badgeText: 'Core Program',
    audience: 'Primary to Secondary Students'
  },
  {
    id: 'learning-materials',
    title: 'Books, Stationery & Study Kits',
    shortDesc: 'Equipping students with essential notebooks, pens, geometric instruments, and curriculum textbooks.',
    fullDesc: 'A lack of basic school stationery can hinder a child\'s daily participation in school. We provide essential stationery kits, reading storybooks, and curriculum materials so no child is held back from their studies.',
    iconName: 'PenTool',
    highlights: [
      'Seasonal distribution of notebooks and pens',
      'Reference dictionary & storybook mini-library',
      'Essential geometry and science drawing sets',
      'School bag and basic study aid distribution'
    ],
    badgeText: 'Material Support',
    audience: 'All Enrolled Children'
  },
  {
    id: 'holistic-mentorship',
    title: 'Mentorship & Moral Character Care',
    shortDesc: 'Building confidence, emotional well-being, creative expression, and strong moral values.',
    fullDesc: 'Education extends beyond textbook memorization. Through story circles, creative arts, music, and character discussions, our mentors help children build resilience, empathy, and dreams for the future.',
    iconName: 'HeartHandshake',
    highlights: [
      'Positive life skills & moral story sessions',
      'Creative art, singing, and public speaking games',
      'Health, hygiene, and wellness guidance',
      'Individual encouragement and emotional support'
    ],
    badgeText: 'Holistic Development',
    audience: 'Children & Adolescents'
  },
  {
    id: 'parent-community-dialogue',
    title: 'Family & School Collaboration',
    shortDesc: 'Engaging parents, guardians, and local Bungamati community leaders in the child\'s educational journey.',
    fullDesc: 'We maintain close relationships with local government schools and families in Bungamati to ensure consistent attendance, understand home challenges, and celebrate student milestones together.',
    iconName: 'Users',
    highlights: [
      'Regular parent-tutor check-ins',
      'Coordination with local school teachers',
      'Encouraging girls\' retention in schooling',
      'Community awareness on education importance'
    ],
    badgeText: 'Community Partnership',
    audience: 'Parents & Local Educators'
  }
];

export const IMPACT_STATS: ImpactStat[] = [
  {
    id: 'children',
    label: 'Children in Tuition Care',
    value: '[XX+ Children]',
    numericTarget: 65,
    suffix: '+',
    description: 'Receiving free after-school academic tuition and mentorship',
    isPlaceholder: true
  },
  {
    id: 'subjects',
    label: 'Core Subjects Covered',
    value: '4 Subjects',
    numericTarget: 4,
    suffix: '',
    description: 'English, Mathematics, Science & Nepali language support',
    isPlaceholder: false
  },
  {
    id: 'volunteers',
    label: 'Volunteer Educators',
    value: '[XX+ Volunteers]',
    numericTarget: 8,
    suffix: '+',
    description: 'Local youth, university students & church mentors giving their time',
    isPlaceholder: true
  },
  {
    id: 'community',
    label: 'Community Focus',
    value: 'Bungamati & Surrounds',
    description: 'Rooted in historical Bungamati and neighboring Lalitpur communities',
    isPlaceholder: false
  }
];

export const STORIES_DATA: StoryItem[] = [
  {
    id: 'story-1',
    category: 'Student Journey',
    title: 'Finding Joy and Confidence in Mathematics',
    excerpt: 'Before joining the free tuition program, mathematics felt intimidating. With patient guidance, numbers turned into opportunities.',
    content: '[Verified Student Story Placeholder: An authentic narrative from a student in Bungamati describing how the daily after-school study group helped improve exam performance, build classroom confidence, and foster close peer friendships will be documented here once verified by leadership.]',
    author: '[Verified Student in Class 7]',
    role: 'Bungamati Tuition Student',
    location: 'Bungamati, Nepal',
    isPlaceholder: true
  },
  {
    id: 'story-2',
    category: 'Parent Perspective',
    title: 'A Safe, Encouraging Space for Our Children',
    excerpt: 'Having a supportive place where children can study after school gives working parents immense peace of mind.',
    content: '[Verified Parent Perspective Placeholder: Remarks from a local parent expressing gratitude for the free tuition, moral support, and safe environment provided by Hands of Mercy Nepal and the Bungamati fellowship will be added upon official collection.]',
    author: '[Community Parent / Guardian]',
    role: 'Parent in Bungamati',
    location: 'Bungamati, Lalitpur',
    isPlaceholder: true
  },
  {
    id: 'story-3',
    category: 'Volunteer Reflection',
    title: 'The Privilege of Teaching with Compassion',
    excerpt: 'Witnessing the light in a child’s eyes when they grasp a difficult concept makes every hour spent tutoring worthwhile.',
    content: '[Verified Volunteer Reflection Placeholder: Thoughts from a volunteer educator on the spiritual and community fulfillment of serving young learners in Bungamati without any commercial expectation.]',
    author: '[Volunteer Educator]',
    role: 'Volunteer Tutor',
    location: 'Lalitpur, Nepal',
    isPlaceholder: true
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Evening Study & Tuition Gathering',
    category: 'Classes & Learning',
    imageUrl: '/image.jpg',
    caption: 'Quiet hours of dedicated study, problem solving, and fellowship in Bungamati.',
    date: 'Bungamati Community'
  },
  {
    id: 'gal-2',
    title: 'Peaceful Nature & Sunrise Hope',
    category: 'Community & Fellowship',
    imageUrl: '/image (1).jpg',
    caption: 'Inspiring young minds with the beauty of nature and hope for a bright tomorrow.',
    date: 'Nepal Valley'
  },
  {
    id: 'gal-3',
    title: 'Fellowship & Moral Guidance',
    category: 'Community & Fellowship',
    imageUrl: '/image (2).jpg',
    caption: 'Rooted in the teachings of compassion, love, and service to our neighbors.',
    date: 'Bungamati Church Gathering'
  },
  {
    id: 'gal-4',
    title: 'The Journey of Guided Learning',
    category: 'Children & Activities',
    imageUrl: '/image (3).jpg',
    caption: 'Walking together step-by-step toward academic growth and personal integrity.',
    date: 'Mentorship Program'
  },
  {
    id: 'gal-5',
    title: 'Faith, Compassion & Resurrection Hope',
    category: 'Community & Fellowship',
    imageUrl: '/cd189cab1fe65afe0c2d359b87e9b31d.jpg',
    caption: 'Celebrating life, redemption, and unconditional love through service.',
    date: 'Jyoti Great Commission Fellowship'
  },
  {
    id: 'gal-6',
    title: 'Walking in the Footsteps of Compassion',
    category: 'Children & Activities',
    imageUrl: '/df64315db73f2f728ea72c680153618b.jpg',
    caption: 'Guidance and loving discipleship for the next generation.',
    date: 'Youth Ministry'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: "Is the tuition program truly 100% free of cost?",
    answer: "Yes, absolutely. Hands of Mercy Nepal was founded with the conviction that financial constraints should never stand in the way of a child's education. No tuition fees, registration charges, or exam material fees are ever collected from participating families.",
    category: "Program Details"
  },
  {
    question: "Which grades and subjects are currently supported?",
    answer: "Our focus is primarily on primary and lower-secondary school students (Grades 1 through 10), assisting with high-demand subjects including Mathematics, General Science, English Grammar & Reading, and Nepali Language.",
    category: "Program Details"
  },
  {
    question: "How is Hands of Mercy Nepal associated with Bungamati Church?",
    answer: "Hands of Mercy Nepal operates as an outreach and community service initiative in partnership with Jyoti Great Commission Fellowship, Bungamati Church. Our volunteer team and facilities are supported by members who are committed to serving the neighborhood and uplifting local children.",
    category: "Organization & Partnership"
  },
  {
    question: "How can I get involved as a volunteer tutor or supporter?",
    answer: "We warmly welcome individuals with a heart for teaching, story-telling, arts, or sports. You can submit an inquiry through our Contact section or visit during fellowship hours in Bungamati to meet our coordinators.",
    category: "Get Involved"
  },
  {
    question: "How do you handle donations or educational supplies?",
    answer: "We operate with strict integrity and transparency. Because we do not run automated online credit-card billing, we encourage interested partners to connect with us directly so gifts of stationery, books, or educational funding can be accounted for and applied directly to classroom resources.",
    category: "Support & Transparency"
  }
];
