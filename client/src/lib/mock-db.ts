
export const COURSES_DATA: Record<string, any> = {
    'Data Science': {
        title: 'Data Science Career Path',
        description: 'Master the skills to become a data scientist, from Python to Machine Learning.',
        totalCourses: 45,
        completedCourses: 12,
        estimatedTime: '120 hours',
        level: 'Advanced',
        skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
        courses: [
            {
                id: 1,
                title: 'Python for Data Science',
                progress: 100,
                completed: true,
                current: false,
                locked: false,
                duration: '10h',
                difficulty: 'Beginner',
                category: 'Programming'
            },
            {
                id: 2,
                title: 'Machine Learning Basics',
                progress: 45,
                completed: false,
                current: true,
                locked: false,
                duration: '15h',
                difficulty: 'Intermediate',
                category: 'AI'
            },
            {
                id: 3,
                title: 'Deep Learning Fundamentals',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '20h',
                difficulty: 'Advanced',
                category: 'AI'
            },
            {
                id: 4,
                title: 'Big Data Analytics',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '12h',
                difficulty: 'Advanced',
                category: 'Data'
            }
        ]
    },
    'Digital Marketing': {
        title: 'Digital Marketing Specialist',
        description: 'Become a digital marketing expert with skills in SEO, Social Media, and Content Strategy.',
        totalCourses: 30,
        completedCourses: 8,
        estimatedTime: '80 hours',
        level: 'Intermediate',
        skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
        courses: [
            {
                id: 1,
                title: 'SEO Mastery',
                progress: 100,
                completed: true,
                current: false,
                locked: false,
                duration: '8h',
                difficulty: 'Intermediate',
                category: 'Marketing'
            },
            {
                id: 2,
                title: 'Social Media Marketing',
                progress: 60,
                completed: false,
                current: true,
                locked: false,
                duration: '10h',
                difficulty: 'Beginner',
                category: 'Marketing'
            },
            {
                id: 3,
                title: 'Content Strategy',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '12h',
                difficulty: 'Intermediate',
                category: 'Strategy'
            },
            {
                id: 4,
                title: 'Email Marketing',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '6h',
                difficulty: 'Beginner',
                category: 'Marketing'
            }
        ]
    },
    'General Business': {
        title: 'Business Foundations',
        description: 'Essential business skills for the modern professional.',
        totalCourses: 20,
        completedCourses: 5,
        estimatedTime: '50 hours',
        level: 'Beginner',
        skills: ['Communication', 'Management', 'Finance', 'Leadership'],
        courses: [
            {
                id: 1,
                title: 'Business Communication',
                progress: 100,
                completed: true,
                current: false,
                locked: false,
                duration: '5h',
                difficulty: 'Beginner',
                category: 'Soft Skills'
            },
            {
                id: 2,
                title: 'Project Management',
                progress: 30,
                completed: false,
                current: true,
                locked: false,
                duration: '15h',
                difficulty: 'Intermediate',
                category: 'Management'
            },
            {
                id: 3,
                title: 'Financial Literacy',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '8h',
                difficulty: 'Beginner',
                category: 'Finance'
            },
            {
                id: 4,
                title: 'Leadership Essentials',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '10h',
                difficulty: 'Intermediate',
                category: 'Leadership'
            }
        ]
    },
    'Web Development': {
        title: 'Full-Stack Web Development',
        description: 'Build modern web applications from frontend to backend.',
        totalCourses: 40,
        completedCourses: 0,
        estimatedTime: '100 hours',
        level: 'Beginner to Advanced',
        skills: ['React', 'Node.js', 'TypeScript', 'Database Design'],
        courses: [
            {
                id: 1,
                title: 'HTML & CSS Fundamentals',
                progress: 0,
                completed: false,
                current: false,
                locked: false,
                duration: '10h',
                difficulty: 'Beginner',
                category: 'Frontend'
            },
            {
                id: 2,
                title: 'JavaScript Deep Dive',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '15h',
                difficulty: 'Intermediate',
                category: 'Frontend'
            },
            {
                id: 3,
                title: 'React.js Essentials',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '20h',
                difficulty: 'Intermediate',
                category: 'Frontend'
            },
            {
                id: 4,
                title: 'Node.js & Express',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '15h',
                difficulty: 'Advanced',
                category: 'Backend'
            }
        ]
    },
    'Project Management': {
        title: 'Project Management Professional',
        description: 'Lead projects to success with proven methodologies and tools.',
        totalCourses: 25,
        completedCourses: 0,
        estimatedTime: '60 hours',
        level: 'Intermediate',
        skills: ['Agile', 'Scrum', 'Risk Management', 'Stakeholder Communication'],
        courses: [
            {
                id: 1,
                title: 'Project Management Basics',
                progress: 0,
                completed: false,
                current: false,
                locked: false,
                duration: '8h',
                difficulty: 'Beginner',
                category: 'Management'
            },
            {
                id: 2,
                title: 'Agile & Scrum Methodologies',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '12h',
                difficulty: 'Intermediate',
                category: 'Agile'
            },
            {
                id: 3,
                title: 'Risk Management Strategies',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '10h',
                difficulty: 'Advanced',
                category: 'Strategy'
            }
        ]
    },
    'Cloud Computing': {
        title: 'Cloud Computing Architect',
        description: 'Design and deploy scalable cloud solutions on AWS and Azure.',
        totalCourses: 35,
        completedCourses: 0,
        estimatedTime: '90 hours',
        level: 'Advanced',
        skills: ['AWS', 'Azure', 'DevOps', 'Cloud Security'],
        courses: [
            {
                id: 1,
                title: 'Cloud Computing Fundamentals',
                progress: 0,
                completed: false,
                current: false,
                locked: false,
                duration: '10h',
                difficulty: 'Beginner',
                category: 'Cloud'
            },
            {
                id: 2,
                title: 'AWS Essentials',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '20h',
                difficulty: 'Intermediate',
                category: 'AWS'
            },
            {
                id: 3,
                title: 'DevOps Practices',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '15h',
                difficulty: 'Advanced',
                category: 'DevOps'
            }
        ]
    },
    'Business Analytics': {
        title: 'Business Analytics Expert',
        description: 'Transform data into actionable business insights.',
        totalCourses: 28,
        completedCourses: 0,
        estimatedTime: '70 hours',
        level: 'Intermediate',
        skills: ['SQL', 'Tableau', 'Data Visualization', 'Business Intelligence'],
        courses: [
            {
                id: 1,
                title: 'Introduction to Business Analytics',
                progress: 0,
                completed: false,
                current: false,
                locked: false,
                duration: '8h',
                difficulty: 'Beginner',
                category: 'Analytics'
            },
            {
                id: 2,
                title: 'SQL for Data Analysis',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '12h',
                difficulty: 'Intermediate',
                category: 'Database'
            },
            {
                id: 3,
                title: 'Data Visualization with Tableau',
                progress: 0,
                completed: false,
                current: false,
                locked: true,
                duration: '15h',
                difficulty: 'Intermediate',
                category: 'Visualization'
            }
        ]
    }
};

export const MENTORS_DATA = [
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'Senior Data Scientist',
        company: 'TechCorp',
        location: 'San Francisco, USA',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        expertise: ['Data Science', 'Machine Learning', 'Python'],
        bio: '10+ years in AI and Data Science. Passionate about mentoring.'
    },
    {
        id: 2,
        name: 'Michael Ross',
        role: 'Marketing Director',
        company: 'GrowthInc',
        location: 'London, UK',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        expertise: ['Digital Marketing', 'Brand Strategy', 'SEO'],
        bio: 'Helping brands grow through storytelling and data-driven strategies.'
    },
    {
        id: 3,
        name: 'Jessica Wu',
        role: 'Product Manager',
        company: 'Innovate',
        location: 'Singapore',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        expertise: ['Product Management', 'General Business', 'Agile'],
        bio: 'Building products that users love. Expert in agile methodologies.'
    },
    {
        id: 4,
        name: 'David Kim',
        role: 'Chief Strategy Officer',
        company: 'FutureVision',
        location: 'New York, USA',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        expertise: ['General Business', 'Leadership', 'Strategy'],
        bio: 'Strategic thinker with a track record of scaling businesses.'
    }
];

export const ALEX_MASTERCLASSES = [
    {
        id: "mc-1",
        title: "Building a Global Events Empire",
        instructor: "Alex David Pratt",
        role: "Founder, ADP Events",
        category: "Leadership",
        videoId: "E4KgnTG7bLQ",
        thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        description: "Learn the secrets behind scaling a local events company into a global powerhouse. Alex shares his journey, mistakes, and the strategic decisions that led to international success.",
        duration: "1h 15m",
        chapters: [
            { title: "Introduction: The Vision", duration: "10:00", startAt: 0 },
            { title: "Finding Your Niche", duration: "15:30", startAt: 600 },
            { title: "Scaling Operations", duration: "20:15", startAt: 1530 },
            { title: "Going Global", duration: "18:45", startAt: 2745 },
            { title: "Q&A and Closing", duration: "10:30", startAt: 3870 }
        ]
    },
    {
        id: "mc-2",
        title: "From Ambition to Empire",
        instructor: "Alex David Pratt",
        role: "Serial Entrepreneur",
        category: "Entrepreneurship",
        videoId: "4Ff39mAmHGU",
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        description: "The mindset shift required to move from small business owner to empire builder. Discover how to think bigger, act bolder, and build a legacy.",
        duration: "55m",
        chapters: [
            { title: "The Empire Mindset", duration: "08:00", startAt: 0 },
            { title: "Overcoming Limiting Beliefs", duration: "12:00", startAt: 480 },
            { title: "Strategic Risk Taking", duration: "15:00", startAt: 1200 },
            { title: "Building Your Inner Circle", duration: "10:00", startAt: 2100 },
            { title: "Execution is Everything", duration: "10:00", startAt: 2700 }
        ]
    },
    {
        id: "mc-3",
        title: "Authentic Leadership",
        instructor: "Alex David Pratt",
        role: "Leadership Coach",
        category: "Strategy",
        videoId: "2rJrMBMU1wI",
        thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        description: "Why authenticity is your strongest asset in high-stakes negotiations and team management. Learn to lead with empathy and strength.",
        duration: "45m",
        chapters: [
            { title: "Defining Authentic Leadership", duration: "05:00", startAt: 0 },
            { title: "Vulnerability as Strength", duration: "10:00", startAt: 300 },
            { title: "Building Trust with Teams", duration: "12:00", startAt: 900 },
            { title: "Navigating Conflict", duration: "10:00", startAt: 1620 },
            { title: "Leading Through Crisis", duration: "08:00", startAt: 2220 }
        ]
    },
    {
        id: "mc-4",
        title: "Strategic Innovation",
        instructor: "Alex David Pratt",
        role: "Innovation Strategist",
        category: "Strategy",
        videoId: "TIYQgMV0wdg",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        description: "Navigating complex markets with innovative strategies. How to stay ahead of the curve and disrupt your industry before someone else does.",
        duration: "1h 05m",
        chapters: [
            { title: "The Innovation Imperative", duration: "10:00", startAt: 0 },
            { title: "Spotting Market Trends", duration: "15:00", startAt: 600 },
            { title: "Design Thinking for Business", duration: "15:00", startAt: 1500 },
            { title: "Prototyping Ideas", duration: "10:00", startAt: 2400 },
            { title: "Launching New Ventures", duration: "15:00", startAt: 3000 }
        ]
    },
    {
        id: "mc-5",
        title: "Future of Business",
        instructor: "Alex David Pratt",
        role: "Futurist",
        category: "Future Trends",
        videoId: "xQy5UxaIoU4",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        description: "Preparing your business for the next decade of disruption. AI, automation, and the changing landscape of work.",
        duration: "50m",
        chapters: [
            { title: "The Age of AI", duration: "10:00", startAt: 0 },
            { title: "Automation & Workforce", duration: "10:00", startAt: 600 },
            { title: "Sustainable Business Models", duration: "10:00", startAt: 1200 },
            { title: "The Global Economy", duration: "10:00", startAt: 1800 },
            { title: "Preparing for 2030", duration: "10:00", startAt: 2400 }
        ]
    }
];

export const PEERS_DATA = [
    {
        id: 1,
        name: "Kwame Mensah",
        role: "Junior Developer",
        company: "Freelance",
        location: "Kumasi, Ghana",
        interests: ["Web Development", "React", "Node.js"],
        career: "Web Development",
        image: ""
    },
    {
        id: 2,
        name: "Amara Diop",
        role: "Marketing Specialist",
        company: "Digital Agency",
        location: "Dakar, Senegal",
        interests: ["Digital Marketing", "SEO", "Content Strategy"],
        career: "Digital Marketing",
        image: ""
    },
    {
        id: 3,
        name: "Chioma Okeke",
        role: "Data Analyst",
        company: "FinTech Corp",
        location: "Lagos, Nigeria",
        interests: ["Data Science", "Python", "Tableau"],
        career: "Data Science",
        image: ""
    },
    {
        id: 4,
        name: "David Osei",
        role: "Business Student",
        company: "University of Ghana",
        location: "Accra, Ghana",
        interests: ["Business Analytics", "Entrepreneurship"],
        career: "General Business",
        image: ""
    },
    {
        id: 5,
        name: "Zainab Ahmed",
        role: "Product Manager",
        company: "Tech Startups",
        location: "Nairobi, Kenya",
        interests: ["Product Management", "Agile", "UX"],
        career: "General Business",
        image: ""
    }
];

export const MOCK_INSIGHTS = [
    {
        id: "ins-1",
        title: "AI-Driven Market Expansion",
        description: "Leverage AI tools to identify and penetrate new market segments in West Africa.",
        category: "Market Strategy",
        impact: "High",
        date: "Oct 24, 2024",
        metrics: [
            { label: "Revenue Potential", value: "+45%", trend: "up" },
            { label: "Market Reach", value: "2.5M", trend: "up" },
            { label: "Cost Efficiency", value: "30%", trend: "up" }
        ],
        content: `
            <p>The West African market is experiencing a rapid digital transformation, presenting a unique opportunity for businesses to leverage AI for expansion. By utilizing predictive analytics and machine learning algorithms, companies can identify high-potential market segments that were previously inaccessible.</p>
            <p>Our analysis suggests that early adopters of AI-driven market strategies in this region could see a 45% increase in revenue potential over the next 12 months. This growth is driven by a combination of increased internet penetration and a growing middle class with disposable income.</p>
            <p>Key areas for AI application include personalized marketing, supply chain optimization, and customer service automation. Implementing these tools not only improves operational efficiency but also enhances the customer experience, leading to higher retention rates.</p>
        `,
        actionSteps: [
            "Conduct a data audit to ensure readiness for AI integration.",
            "Pilot an AI-powered customer segmentation tool.",
            "Partner with local fintech firms for seamless payment processing."
        ],
        relatedIds: ["ins-3", "ins-5"]
    },
    {
        id: "ins-2",
        title: "Remote Work Optimization",
        description: "Maximize productivity and employee satisfaction with hybrid work models.",
        category: "Operations",
        impact: "Medium",
        date: "Oct 20, 2024",
        metrics: [
            { label: "Productivity", value: "+22%", trend: "up" },
            { label: "Overhead Reduction", value: "15%", trend: "down" },
            { label: "Employee Retention", value: "90%", trend: "up" }
        ],
        content: `
            <p>The shift to remote and hybrid work models is no longer a temporary measure but a permanent fixture of the modern workplace. Companies that optimize their operations for this new reality are seeing significant gains in productivity and employee satisfaction.</p>
            <p>Data indicates that a well-structured hybrid model can increase productivity by up to 22%. This is largely due to reduced commute times and the ability for employees to work in environments that suit their individual working styles.</p>
            <p>However, success requires more than just Zoom calls. It demands a cultural shift towards outcome-based management and investment in digital collaboration tools.</p>
        `,
        actionSteps: [
            "Implement a digital collaboration platform like Slack or Teams.",
            "Train managers on outcome-based performance evaluation.",
            "Establish clear policies for remote work hours and availability."
        ],
        relatedIds: ["ins-4", "ins-6"]
    },
    {
        id: "ins-3",
        title: "Sustainable Supply Chains",
        description: "Transitioning to green logistics to meet global standards and consumer demand.",
        category: "Sustainability",
        impact: "High",
        date: "Oct 18, 2024",
        metrics: [
            { label: "Carbon Footprint", value: "-40%", trend: "down" },
            { label: "Brand Loyalty", value: "+35%", trend: "up" },
            { label: "Compliance Score", value: "98/100", trend: "up" }
        ],
        content: `
            <p>Sustainability is moving from a "nice-to-have" to a business imperative. Consumers, particularly Gen Z and Millennials, are increasingly making purchasing decisions based on a brand's environmental impact.</p>
            <p>Transitioning to a sustainable supply chain can reduce your carbon footprint by up to 40% while simultaneously boosting brand loyalty. This involves sourcing materials responsibly, optimizing logistics to reduce emissions, and minimizing waste.</p>
            <p>Furthermore, global regulations are tightening. Proactively adopting green practices ensures compliance and avoids future penalties.</p>
        `,
        actionSteps: [
            "Audit current suppliers for environmental compliance.",
            "Invest in route optimization software for logistics.",
            "Launch a consumer-facing sustainability campaign."
        ],
        relatedIds: ["ins-1"]
    },
    {
        id: "ins-4",
        title: "Fintech Integration",
        description: "Streamlining payments and financial operations with modern fintech solutions.",
        category: "Finance",
        impact: "High",
        date: "Oct 15, 2024",
        metrics: [
            { label: "Transaction Speed", value: "Instant", trend: "up" },
            { label: "Processing Fees", value: "-12%", trend: "down" },
            { label: "Cash Flow", value: "Optimized", trend: "up" }
        ],
        content: `
            <p>The fintech revolution is transforming how businesses handle money. From instant cross-border payments to automated invoicing, modern financial tools are removing friction from commerce.</p>
            <p>Integrating these solutions can reduce processing fees by an average of 12% and drastically improve cash flow visibility. For businesses operating in multiple currencies, fintech platforms offer competitive exchange rates and lower hedging costs.</p>
            <p>Security is also a major benefit, with advanced fraud detection systems protecting your assets better than traditional banking methods.</p>
        `,
        actionSteps: [
            "Evaluate current payment gateways for cost and speed.",
            "Integrate an automated invoicing system.",
            "Explore blockchain solutions for secure cross-border transactions."
        ],
        relatedIds: ["ins-2", "ins-5"]
    },
    {
        id: "ins-5",
        title: "Data Privacy Compliance",
        description: "Navigating the complex landscape of data protection laws in Africa and beyond.",
        category: "Legal",
        impact: "Critical",
        date: "Oct 10, 2024",
        metrics: [
            { label: "Risk Reduction", value: "85%", trend: "up" },
            { label: "Trust Score", value: "High", trend: "up" },
            { label: "Legal Costs", value: "Minimized", trend: "down" }
        ],
        content: `
            <p>With the introduction of new data protection laws across various African nations, compliance has become a critical operational risk. Failure to comply can result in hefty fines and reputational damage.</p>
            <p>Implementing a robust data privacy framework reduces legal risk by 85%. It also serves as a competitive differentiator, signaling to customers that their data is safe with you.</p>
            <p>Key aspects include obtaining explicit consent for data collection, ensuring secure storage, and providing clear mechanisms for users to request data deletion.</p>
        `,
        actionSteps: [
            "Appoint a Data Protection Officer (DPO).",
            "Update privacy policies to reflect current regulations.",
            "Conduct regular data security training for all employees."
        ],
        relatedIds: ["ins-1", "ins-4"]
    },
    {
        id: "ins-6",
        title: "Talent Acquisition 2.0",
        description: "Using AI and social recruiting to find the best talent in a competitive market.",
        category: "HR",
        impact: "Medium",
        date: "Oct 05, 2024",
        metrics: [
            { label: "Time to Hire", value: "-30%", trend: "down" },
            { label: "Quality of Hire", value: "+25%", trend: "up" },
            { label: "Cost per Hire", value: "-20%", trend: "down" }
        ],
        content: `
            <p>The war for talent is intensifying. Traditional posting on job boards is no longer sufficient to attract top-tier candidates. "Talent Acquisition 2.0" leverages AI and social media to proactively identify and engage potential hires.</p>
            <p>AI tools can screen resumes faster and more accurately, reducing time-to-hire by 30%. Social recruiting allows you to showcase your company culture and reach passive candidates who aren't actively looking but are open to the right opportunity.</p>
            <p>Building a strong employer brand is central to this strategy.</p>
        `,
        actionSteps: [
            "Optimize LinkedIn profiles for key team members.",
            "Implement an Applicant Tracking System (ATS) with AI capabilities.",
            "Create content showcasing company culture and employee stories."
        ],
        relatedIds: ["ins-2"]
    }
];
