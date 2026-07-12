// Centralized project data. All project links live here.

export const projects = [
  {
    id: 'twitter-clone',
    title: 'Twitter Clone Application',
    status: 'Completed',
    statusTone: 'complete',

    description:
      'A full-stack Twitter-inspired social networking application built using Java, Spring Boot, React, and PostgreSQL. The application demonstrates secure authentication, REST API development, social interactions, personalized feeds, and cloud deployment.',

    stack: {
      backend: [
        'Java 21',
        'Spring Boot',
        'Spring Security',
        'JWT',
        'JPA',
        'Hibernate'
      ],

      frontend: [
        'React',
        'Vite',
        'JavaScript',
        'Axios',
        'React Router'
      ],

      database: [
        'PostgreSQL'
      ],

      tools: [
        'Git',
        'GitHub',
        'Postman',
        'Railway',
        'Vercel'
      ]
    },

    features: [
      'User Registration',
      'User Authentication',
      'JWT Authorization',
      'Create Tweets',
      'Delete Tweets',
      'Like & Unlike Tweets',
      'Retweet Tweets',
      'Follow / Unfollow Users',
      'Personalized Feed',
      'Search Users',
      'User Profile',
      'Profile Image Upload',
      'REST API Integration',
      'Responsive User Interface',
      'Cloud Deployment'
    ],

    concepts: [
      'REST API Development',
      'Layered Architecture',
      'Controller-Service-Repository Pattern',
      'JWT Authentication',
      'Spring Security',
      'Entity Relationships',
      'Database Persistence',
      'Frontend-Backend Integration',
      'Cloud Deployment',
      'Git Version Control'
    ],

    githubUrl: 'https://github.com/Boopathi2025/twitter-clone-backend',

    liveUrl: 'https://twitter-clone-frontend-iota-ten.vercel.app'
  },

  {
    id: 'gameplan-iq',
    title: 'GamePlan IQ',
    status: 'In Development',
    statusTone: 'in-progress',

    description:
      'A web platform that helps students prepare for placements through DSA, aptitude, coding practice, interview preparation, mock tests, and progress tracking.',

    philosophy: [
      'Learn',
      'Practice',
      'Test',
      'Analyze',
      'Improve'
    ],

    modules: [
      'DSA Learning',
      'Coding Practice',
      'Aptitude',
      'Logical Reasoning',
      'Interview Preparation',
      'Mock Tests',
      'Progress Dashboard'
    ],

    plannedFeatures: [
      'Personalized Dashboard',
      'Company-wise Preparation',
      'Coding Challenges',
      'Leaderboard',
      'Daily Practice',
      'Learning Analytics',
      'Achievement System',
      'Progress Tracking'
    ],

    githubUrl: 'https://github.com/Boopathi2025/GamePlan-IQ',

    liveUrl: null
  }
]

export default projects