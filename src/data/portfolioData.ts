import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    fullName: 'Dibika P',
    brandName: 'DIBIKA P',
    tagline: 'Engineering Ideas. Building Solutions. Growing Every Day.',
    supportingTagline: 'Curious by nature. An engineer in progress. A builder by choice.',
    professionalHeadline:
      'Electronics & Communication Engineering Student | Software Development | AI/ML | Embedded Systems | Technology Community Leadership',
    rotatingHeadlines: [
      'Engineering student.',
      'Software developer in progress.',
      'Exploring AI and machine learning.',
      'Building across software and hardware.',
      'Technology community leader.',
    ],
    bioParagraphs: [
      "I'm an Electronics and Communication Engineering student who enjoys exploring the intersection of software, electronics, and emerging technologies. My interests include Java programming, problem solving, AI/ML, embedded systems, and semiconductor technologies.",
      "Beyond academics, I've explored internships, sustainability projects, open-source contribution, student leadership, and technology community initiatives. These experiences have helped me develop communication, collaboration, presentation, and organizational skills alongside my technical learning.",
      "I'm continuously working to strengthen my fundamentals, build meaningful projects, and prepare for internship and placement opportunities. My goal is to turn what I learn into practical solutions while remaining open to opportunities across software and hardware-oriented engineering.",
    ],
    location: 'Chennai, Tamil Nadu, India',
    education: {
      degree: 'Bachelor of Engineering in Electronics and Communication Engineering',
      institution: 'Panimalar Engineering College',
      location: 'Chennai, Tamil Nadu, India',
      expectedGraduation: '2028',
      academicStage: 'Pre-final-year engineering student',
      cgpa: '8.35/10',
      academicStatus: 'Currently pursuing',
      academicInterests: [
        'Programming and software engineering',
        'Digital electronics',
        'Communication systems',
        'Embedded systems',
        'VLSI and semiconductor technology',
        'Artificial intelligence and machine learning',
      ],
    },
    linkedinUrl: 'https://www.linkedin.com/in/dibika-p-7aaa32323/',
    githubUrl: 'https://github.com/Dibika007',
    currentlyExploring: [
      'Core Java and object-oriented programming',
      'Data structures and algorithms',
      'Web application development',
      'AI/ML applications',
      'Embedded systems and VLSI',
    ],
    interestPillars: [
      {
        number: '01',
        title: 'Software & Problem Solving',
        subtitle: 'Foundational Computation',
        description:
          'Java, programming fundamentals, web development, and algorithmic thinking applied to robust application architectures.',
      },
      {
        number: '02',
        title: 'AI & Intelligent Systems',
        subtitle: 'Applied Machine Learning',
        description:
          'Machine learning exposure, empirical model evaluation, data analysis, and exploring intelligent systems.',
      },
      {
        number: '03',
        title: 'Electronics & Embedded Innovation',
        subtitle: 'Hardware-Software Nexus',
        description:
          'Embedded systems, IoT, communication systems, schematic layout, and VLSI semiconductor technology exploration.',
      },
    ],
  },
  skills: [
    // Programming
    { id: 'sk-1', name: 'Java', category: 'Programming', level: 'Intermediate', notes: 'Core OOP, problem solving' },
    { id: 'sk-2', name: 'Python', category: 'Programming', level: 'Intermediate', notes: 'Data processing, ML exploration' },
    { id: 'sk-3', name: 'C++', category: 'Programming', level: 'Beginner', notes: 'Algorithmic fundamentals' },
    // Web Development
    { id: 'sk-4', name: 'HTML', category: 'Web Development', level: 'Intermediate', notes: 'Semantic markup structure' },
    { id: 'sk-5', name: 'CSS', category: 'Web Development', level: 'Intermediate', notes: 'Modern layout & responsive design' },
    { id: 'sk-6', name: 'Basic Web Development', category: 'Web Development', level: 'Intermediate', notes: 'Client-side web interfaces' },
    // Data & Productivity
    { id: 'sk-7', name: 'Tableau', category: 'Data and Productivity', level: 'Intermediate', notes: 'Data visualization dashboards' },
    { id: 'sk-8', name: 'Microsoft Excel', category: 'Data and Productivity', level: 'Intermediate', notes: 'Data organization, modeling' },
    // Development Tools
    { id: 'sk-9', name: 'GitHub', category: 'Development Tools', level: 'Intermediate', notes: 'Repository collaboration, pull requests' },
    { id: 'sk-10', name: 'Git & Version Control', category: 'Development Tools', level: 'Beginner', notes: 'Branching & version management' },
    // Emerging Technical Interests
    { id: 'sk-11', name: 'Artificial Intelligence & ML', category: 'Emerging Technical Interests', level: 'Learning', notes: 'Classifier models, empirical evaluation' },
    { id: 'sk-12', name: 'Embedded Systems', category: 'Emerging Technical Interests', level: 'Learning', notes: 'Microcontrollers, sensor interfacing' },
    { id: 'sk-13', name: 'Internet of Things (IoT)', category: 'Emerging Technical Interests', level: 'Learning', notes: 'Connected device concepts' },
    { id: 'sk-14', name: 'VLSI & Semiconductor Tech', category: 'Emerging Technical Interests', level: 'Learning', notes: 'Circuit layout, silicon fundamentals' },
  ],
  currentlyLearning: [
    'Core Java & Object-Oriented System Design',
    'Data Structures & Algorithmic Problem Solving',
    'Modern Web Technologies & Full-Stack Interfaces',
    'Machine Learning Pipelines & Evaluation Metrics',
    'KiCad Schematic & Multi-Layer PCB Layout',
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Google Student Ambassador | Gemini Campus Ambassador 2026',
      organization: 'Google / Google Student Ambassador Program',
      dates: 'May 2026 – Present',
      status: 'Active',
      type: 'experience',
      description:
        'Participating in a student ambassador initiative focused on technology awareness, student engagement, and the Google ecosystem. Interested in helping peers discover useful AI tools and learning opportunities.',
      skills: ['Technology Community Engagement', 'AI Tool Literacy', 'Presentation', 'Peer Collaboration'],
    },
    {
      id: 'exp-2',
      role: 'HR Intern / Team Lead',
      organization: 'Uptoskills',
      dates: 'December 2025 – March 2026',
      status: 'Completed',
      type: 'experience',
      description:
        'Developed professional experience in HR-related activities, team coordination, communication, and collaborative work.',
      skills: ['Team Leadership', 'Professional Communication', 'Coordination', 'Workflow Management'],
    },
    {
      id: 'exp-3',
      role: 'Green Sustainability Intern',
      organization: '1M1B (One Million for One Billion)',
      dates: 'September 2025 – January 2026',
      status: 'Completed',
      type: 'experience',
      description:
        'Participated in sustainability-related work involving data visualization and digital project activities. Relevant tools included Tableau, Excel, and website development.',
      skills: ['Tableau', 'Microsoft Excel', 'Web Development', 'Sustainability Data Analysis'],
    },
    {
      id: 'exp-4',
      role: 'Open-Source Contributor',
      organization: 'GirlScript Summer of Code (GSSoC)',
      dates: 'July 2025 – August 2025',
      status: 'Completed',
      type: 'experience',
      description:
        'Explored collaborative open-source development and contribution workflows in a developer community setting.',
      skills: ['Git & GitHub', 'Open-Source Collaboration', 'Code Review Workflows'],
    },
    {
      id: 'exp-5',
      role: 'MEP/HVAC Design Trainee',
      organization: 'Comfort Design',
      dates: 'Training Period',
      status: 'Completed Traineeship',
      type: 'experience',
      description:
        'Explored mechanical, electrical, and plumbing design concepts with exposure to HVAC-related engineering work.',
      skills: ['Engineering Layouts', 'Electrical Concepts', 'HVAC Principles'],
    },
    {
      id: 'exp-6',
      role: 'Selected Participant — AI/ML/Data Science',
      organization: 'CBSOT Summer Internship 2026',
      dates: 'Summer 2026 (Selected)',
      status: 'Selected Candidate',
      type: 'experience',
      description:
        'Selected for a summer internship program focused on the AI, machine learning, and data science domain.',
      skills: ['Machine Learning', 'Data Science', 'Analytical Problem Solving'],
    },
    // Campus Leadership & Engagement
    {
      id: 'lead-1',
      role: 'Club Coordinator',
      organization: 'UCI / YUCI ECE Club',
      dates: 'Academic Year 2025 – Present',
      type: 'leadership',
      description:
        'Coordinate technical club events, peer workshops, and student engineering activities across the department.',
      skills: ['Event Organization', 'Student Mentorship', 'Technical Coordination'],
    },
    {
      id: 'lead-2',
      role: 'KiCad PCB Teaching Activity Co-Lead',
      organization: 'ECE Club (in association with AICTE)',
      dates: 'Campus Initiative',
      type: 'leadership',
      description:
        'Helped introduce junior engineering students to schematic capture and printed circuit board layout using open-source KiCad EDA software.',
      skills: ['KiCad EDA', 'Circuit Layout Pedagogy', 'Public Speaking'],
    },
    {
      id: 'lead-3',
      role: 'Class / Block Leader',
      organization: 'Panimalar Engineering College',
      dates: 'Ongoing',
      type: 'leadership',
      description:
        'Acted as an academic liaison representing student cohorts, facilitating communication with faculty, and ensuring smooth block logistics.',
      skills: ['Student Representation', 'Conflict Resolution', 'Logistics'],
    },
    {
      id: 'lead-4',
      role: 'Parade Controller',
      organization: 'Panimalar Engineering College',
      dates: 'Institutional Events',
      type: 'leadership',
      description:
        'Directed ceremonial marching drills and managed student formations during major institutional and national events with precision.',
      skills: ['Discipline Management', 'Field Leadership', 'Coordination'],
    },
    {
      id: 'lead-5',
      role: 'Student Mentor',
      organization: 'Department of Electronics and Communication Engineering',
      dates: 'Ongoing',
      type: 'leadership',
      description:
        'Supported first- and second-year students in adapting to core engineering coursework, programming fundamentals, and project orientation.',
      skills: ['Academic Mentorship', 'Technical Guidance', 'Active Listening'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'NEXORA — Engineering Learning and Career Platform',
      shortDescription:
        'A comprehensive platform concept unifying learning tracks, student progress monitoring, project portfolios, and AI-assisted engineering guidance.',
      fullDescription:
        'NEXORA is an engineering learning and career platform concept designed to bring learning resources, student progress, technical projects, career guidance, and AI-assisted learning into one cohesive experience. Built to solve the fragmentation students face between academic coursework, programming practice, and career preparation.',
      category: 'Software Development',
      status: 'In development',
      techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Java', 'Spring Boot', 'PostgreSQL', 'Firebase Auth'],
      keyAreas: [
        'Interactive Student Dashboard',
        'Structured Engineering Learning Tracks',
        'Progress & Milestone Analytics',
        'Student Profile & Technical Portfolio Showcase',
        'Career Preparation & Resume Readiness',
        'AI-Assisted Learning Modules',
        'Software & Hardware Engineering Resource Hub',
      ],
      challenges:
        'Architecting a multi-tiered curriculum and dashboard schema that seamlessly connects backend Java/Spring services with lightweight client-side state.',
      learningOutcomes: [
        'Component architecture and scalable state management in modern React with TypeScript',
        'RESTful API modeling with Java and relational schemas with PostgreSQL',
        'Authentication lifecycle design using Firebase Auth',
      ],
      githubUrl: '', // Configurable in owner CMS
      demoUrl: '',
      dates: '2026 – In Active Development',
    },
    {
      id: 'proj-2',
      title: 'FLOOD GUARD AI — ML Risk Prediction',
      shortDescription:
        'An experimental machine learning study comparing classifier algorithms and evaluating empirical precision-recall metrics on flood-risk datasets.',
      fullDescription:
        'An AI/ML-oriented flood-risk prediction project exploring various supervised machine learning models and evaluating their empirical classification performance on a flood-related dataset. The project emphasizes that raw classification accuracy must be interpreted alongside the F1 score, particularly when working with imbalanced environmental hazard records.',
      category: 'AI/ML',
      status: 'Research & Experimental Validation',
      techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Data Visualization'],
      metrics: [
        { modelName: 'Random Forest', accuracy: '78.38%', f1Score: '49.15%' },
        { modelName: 'Extra Trees', accuracy: '79.77%', f1Score: '37.24%' },
        { modelName: 'Gradient Boosting', accuracy: '80.77%', f1Score: '41.34%' },
        { modelName: 'Logistic Regression', accuracy: '71.95%', f1Score: '51.55%' },
      ],
      metricsNote:
        'Empirical experimental results recorded during model validation. Accuracy reflects overall correct predictions, while F1 score measures the harmonic balance of precision and recall on positive flood alert instances. Model is an experimental exploration and not deployed for real-world municipal flood warning systems.',
      keyAreas: [
        'Data cleaning and feature normalization',
        'Comparative evaluation of tree-based vs. linear classifiers',
        'Confusion matrix and classification report analysis',
        'Precision vs. recall trade-off assessment for hazard detection',
      ],
      learningOutcomes: [
        'Understanding how class imbalance heavily penalizes F1 score despite high baseline accuracy',
        'Hands-on feature preprocessing and hyperparameter tuning in Scikit-Learn',
        'Practical model validation workflows on environmental datasets',
      ],
      githubUrl: '',
      dates: '2025 – 2026',
    },
    {
      id: 'proj-3',
      title: 'Sustainability Data & Digital Insights Project',
      shortDescription:
        'An internship initiative combining data visualization, Tableau dashboards, and digital web presentation to examine environmental sustainability indicators.',
      fullDescription:
        'A sustainability-related internship project completed in collaboration with 1M1B (One Million for One Billion). The project involved transforming raw sustainability datasets into interactive Tableau visualizations, structured spreadsheets in Microsoft Excel, and presenting findings through responsive digital web modules.',
      category: 'Sustainability',
      status: 'Completed Internship Project',
      organization: '1M1B (One Million for One Billion)',
      techStack: ['Tableau', 'Microsoft Excel', 'Web Development', 'Data Analysis'],
      keyAreas: [
        'Data cleaning and tabular structuring in Excel',
        'Interactive dashboard creation in Tableau',
        'Digital web presentation of sustainability findings',
        'Collaborative presentation with multidisciplinary cohort members',
      ],
      learningOutcomes: [
        'Visual storytelling techniques for environmental metrics',
        'Translating complex tabular data into actionable business and community dashboards',
        'Practical experience working on mission-driven sustainability themes',
      ],
      dates: 'Sep 2025 – Jan 2026',
    },
    {
      id: 'proj-4',
      title: 'KiCad Circuit Design & PCB Learning Activity',
      shortDescription:
        'An engineering initiative introducing printed circuit board layout, schematic capture, and electronics design rules in association with AICTE.',
      fullDescription:
        'An engineering learning and peer-teaching activity centered on KiCad EDA and printed circuit board (PCB) design principles through an ECE club initiative associated with AICTE. Covered the transition from schematic diagrams to component footprints, netlist routing, and board fabrication considerations.',
      category: 'Electronics',
      status: 'Academic & Teaching Activity',
      organization: 'ECE Club (in association with AICTE)',
      techStack: ['KiCad EDA', 'Circuit Design', 'PCB Layout', 'Digital Electronics'],
      keyAreas: [
        'Schematic capture and symbol library management',
        'Footprint assignment and component clearance constraints',
        'Track routing, ground planes, and design rule checking (DRC)',
        'Teaching foundational concepts to junior engineering peers',
      ],
      learningOutcomes: [
        'Practical familiarity with open-source electronic design automation tools',
        'Reinforced theoretical electronics coursework through hands-on board routing',
        'Pedagogical and technical communication skills developed while teaching peers',
      ],
      dates: 'Campus Initiative',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Google Student Ambassador 2026',
      organization: 'Google / Gemini Campus Ambassador Initiative',
      date: 'May 2026 – Present',
      category: 'Ambassador',
      description:
        'Recognized with "Bronze — The Explorer" milestone for active participation in the Gemini Campus Ambassador initiative, driving technology awareness and peer AI education.',
      verificationStatus: 'Program Milestone Verified',
    },
    {
      id: 'ach-2',
      title: 'GeeksforGeeks Campus Mantri — Top Ranker',
      organization: 'GeeksforGeeks',
      date: 'Recorded Program Stats',
      category: 'Competition',
      description:
        'Achieved rank 249 among 1,643 nationwide participants in the Campus Mantri program. Shortlisted for the official Welcome Kit.',
      stats: [
        { label: 'Rank', value: '249 / 1,643' },
        { label: 'Points', value: '1,500' },
        { label: 'Clicks', value: '83' },
        { label: 'Registrations', value: '10' },
      ],
      verificationStatus: 'Program Statistics Recorded',
    },
    {
      id: 'ach-3',
      title: 'ECE Club Technical Coordination',
      organization: 'Panimalar Engineering College',
      category: 'Leadership',
      description:
        'Elected as UCI/YUCI ECE club coordinator, leading student technical activities, peer workshops, and departmental tech fests.',
      verificationStatus: 'Institutional Role',
    },
    {
      id: 'ach-4',
      title: 'KiCad PCB Design Teaching Initiative',
      organization: 'AICTE & ECE Department',
      category: 'Academic',
      description:
        'Successfully co-conducted hands-on technical sessions instructing student peers in schematic capture and PCB layout fundamentals.',
      verificationStatus: 'Activity Completed',
    },
    {
      id: 'ach-5',
      title: 'GirlScript Summer of Code (GSSoC 2025)',
      organization: 'GirlScript Foundation',
      date: 'Jul 2025 – Aug 2025',
      category: 'Open Source',
      description:
        'Selected open-source contributor participating in community development workflows, Git version control, and collaborative coding.',
      verificationStatus: 'Program Participation Confirmed',
    },
    {
      id: 'ach-6',
      title: 'CBSOT Summer Internship 2026 Selection',
      organization: 'CBSOT Program',
      date: 'Summer 2026',
      category: 'Internship',
      description:
        'Selected candidate for the upcoming intensive summer internship program focusing on AI, Machine Learning, and Data Science applications.',
      verificationStatus: 'Selection Confirmed',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'IBM Z Xplore Concepts Badge',
      issuer: 'IBM',
      category: 'Cloud and Developer Tools',
      skillsGained: ['Enterprise Systems', 'Z Architecture Concepts', 'Command Workflows'],
      credentialUrl: '', // Available for owner to link
    },
  ],
};
