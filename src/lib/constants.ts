// Site configuration
export const SITE_CONFIG = {
    title: "Srsvti - Design Studio",
    description: "We craft digital experiences for forward-thinking brands",
    url: "https://srsvti.com",
    contact: {
        email: "rayan@srsvti.com",
        phone: "+91-8100418016",
        address:
            "For now, we don't have any physical office but we're soon gonna open offices in New York, Dubai & Kolkata",
    },
    social: {
        behance: "https://www.behance.net/therynman",
        linkedin: "https://www.linkedin.com/company/srsvti",
    },
};

// Navigation items
export const NAV_ITEMS = [
    { label: "Home", path: "/" },
    { label: "Work", path: "/work" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
];

// Services offered
export const SERVICES = [
    {
        title: "Brand Strategy",
        description:
            "We create comprehensive brand strategies that align with your business goals and resonate with your target audience.",
        icon: "BrainCircuit",
    },
    {
        title: "UI/UX Design",
        description:
            "User-centered design solutions that balance aesthetics with functionality to create engaging digital experiences.",
        icon: "Layers",
    },
    {
        title: "Web Development",
        description:
            "Custom website and web application development that brings your design vision to life with clean, efficient code.",
        icon: "Code",
    },
    {
        title: "Motion Design",
        description:
            "Dynamic animations and motion graphics that add dimension to your brand and engage your audience.",
        icon: "VideoIcon",
    },
    {
        title: "Digital Marketing",
        description:
            "Strategic digital marketing campaigns that increase visibility and drive conversions for your business.",
        icon: "BarChart",
    },
    {
        title: "Content Creation",
        description:
            "Compelling content that tells your brand story and connects with your audience across all platforms.",
        icon: "FileText",
    },
];

// Projects portfolio
export const PROJECTS = [
    {
        id: "evolve-brand",
        title: "Evolve Fitness",
        category: "Brand Identity",
        description:
            "Complete brand redesign for a fitness company targeting millennials and Gen Z, focusing on digital touchpoints and social media presence.",
        image: "/api/placeholder/1200/800",
        metaImage: "/api/placeholder/1200/630",
        featuredImage: "/api/placeholder/2400/1350",
        client: "Evolve Fitness",
        year: "2024",
        tags: ["Branding", "Logo Design", "Brand Guidelines", "Packaging"],
        url: "/work/evolve-brand",
    },
    {
        id: "blockhouse-app",
        title: "Blockhouse, New York City",
        category: "Brand Design",
        description:
            "Modern interface design for a financial technology application focused on investment and savings with improved conversion rates.",
        image: "/api/placeholder/1200/800",
        metaImage: "/api/placeholder/1200/630",
        featuredImage: "/api/placeholder/2400/1350",
        client: "NextGen Financial",
        year: "2023",
        tags: ["UI/UX", "Mobile App", "Web Application", "User Research"],
        url: "/work/fintech-app",
    },
    {
        id: "organic-food",
        title: "Harvest Market",
        category: "Brand & Packaging",
        description:
            "Sustainable packaging and brand identity for an organic food company, focusing on environmentally friendly materials and authentic storytelling.",
        image: "/api/placeholder/1200/800",
        metaImage: "/api/placeholder/1200/630",
        featuredImage: "/api/placeholder/2400/1350",
        client: "Harvest Organics",
        year: "2024",
        tags: ["Packaging", "Branding", "Illustration", "Sustainable Design"],
        url: "/work/organic-food",
    },
    {
        id: "tech-conference",
        title: "FutureTech Summit",
        category: "Event Branding",
        description:
            "Complete event branding and digital presence for a major technology conference, including website, app, and promotional materials.",
        image: "/api/placeholder/1200/800",
        metaImage: "/api/placeholder/1200/630",
        featuredImage: "/api/placeholder/2400/1350",
        client: "TechVentures Inc.",
        year: "2023",
        tags: ["Event Branding", "Website", "Social Media", "Print Design"],
        url: "/work/tech-conference",
    },
];

// Case studies
export const CASE_STUDIES = [
    {
        id: "wellness-app-redesign",
        title: "Wellness App Redesign",
        subtitle: "Increasing user engagement by 220%",
        description:
            "A comprehensive redesign of a wellness application that significantly improved user retention and engagement metrics.",
        coverImage: "/api/placeholder/1200/800",
        client: "MindfulLife",
        industry: "Health & Wellness",
        services: ["UX Research", "UI Design", "Prototyping", "User Testing"],
        results: [
            "220% increase in user engagement",
            "185% growth in daily active users",
            "35% reduction in user onboarding drop-off",
            "4.8/5 App Store rating (up from 3.2)",
        ],
        url: "/case-studies/wellness-app-redesign",
    },
    {
        id: "ecommerce-conversion",
        title: "E-commerce Conversion Optimization",
        subtitle: "Boosting conversion rate by 76%",
        description:
            "Strategic redesign of the product pages and checkout process for an e-commerce platform specializing in sustainable products.",
        coverImage: "/api/placeholder/1200/800",
        client: "EcoShop",
        industry: "E-commerce",
        services: [
            "Conversion Rate Optimization",
            "UI Design",
            "A/B Testing",
            "Analytics",
        ],
        results: [
            "76% increase in conversion rate",
            "32% increase in average order value",
            "54% reduction in cart abandonment",
            "3.2M in additional annual revenue",
        ],
        url: "/case-studies/ecommerce-conversion",
    },
    {
        id: "fintech-app-launch",
        title: "Fintech App Launch Strategy",
        subtitle: "Acquiring 50,000 users in 30 days",
        description:
            "Comprehensive brand and marketing strategy for the launch of a new financial technology application.",
        coverImage: "/api/placeholder/1200/800",
        client: "SecureSave",
        industry: "Financial Technology",
        services: [
            "Brand Strategy",
            "Marketing Campaign",
            "Content Creation",
            "Social Media",
        ],
        results: [
            "50,000 active users acquired in first month",
            "28% conversion rate from landing page visits",
            "Featured in TechCrunch, Forbes, and The Wall Street Journal",
            "$2.5M in VC funding secured following launch",
        ],
        url: "/case-studies/fintech-app-launch",
    },
];

// Testimonials from clients
export const TESTIMONIALS = [
    {
        quote: "The team at srsvti transformed our brand from outdated to outstanding. The strategic approach they took to understand our business goals resulted in a visual identity that truly represents who we are.",
        author: "Sarah Johnson",
        title: "CEO, Evolve Fitness",
        image: "/api/placeholder/100/100",
    },
    {
        quote: "Working with srsvti on our website redesign was a game-changer. Not only did they create a beautiful interface, but they also focused on user experience which led to a significant increase in our user engagement metrics.",
        author: "Aaditya Krishnamohan",
        title: "CEO, Blockhosue",
        image: "/api/placeholder/100/100",
    },
    {
        quote: "The attention to detail and creative solutions provided by srsvti exceeded our expectations. Their ability to translate our vision into a cohesive brand and website design has been instrumental in our growth.",
        author: "Elena Rodriguez",
        title: "Marketing Director, EcoShop",
        image: "/api/placeholder/100/100",
    },
    {
        quote: "Srsvti's approach to our fintech app design struck the perfect balance between innovation and usability. The final product not only looks amazing but performs exceptionally well with our target audience.",
        author: "Pranav Udeshi",
        title: "COO, Moonport",
        image: "/api/placeholder/100/100",
    },
];

// FAQ content
export const FAQ_ITEMS = [
    {
        question: "What is your design process like?",
        answer: "Our design process typically includes discovery, strategy, conceptualization, design development, implementation, and launch. We begin by understanding your business goals and target audience, then develop a strategic approach to meet those needs through thoughtful design solutions.",
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on scope and complexity. A brand identity project typically takes 4-6 weeks, website design and development can range from 6-12 weeks, and comprehensive brand experiences may take 3-4 months. We'll provide a detailed timeline during our initial consultation.",
    },
    {
        question: "Do you work with clients remotely?",
        answer: "Yes, we work with clients globally and have established efficient remote collaboration processes. We use various tools to ensure clear communication and seamless project management regardless of location.",
    },
    {
        question: "What industries do you specialize in?",
        answer: "We specialize in working with technology startups, fintech companies, health and wellness brands, sustainable/eco-friendly businesses, and professional services. However, our skills and approach translate well across various industries.",
    },
    {
        question: "How do you handle revisions and feedback?",
        answer: "Each project includes a specific number of revision rounds. We have a structured feedback process and provide collaborative tools for you to easily share your thoughts. Additional revision rounds can be arranged at an hourly rate if needed.",
    },
    {
        question: "What happens after the project is complete?",
        answer: "We provide support after project completion, with the duration depending on your package. We also offer maintenance packages for websites and can provide ongoing design support through retainer agreements for evolving brand needs.",
    },
];

// Pricing packages
export const PRICING_PACKAGES = [
    {
        title: "Brand Identity",
        price: "$4,500",
        description:
            "Complete brand identity design package for startups and small businesses.",
        features: [
            "Logo Design (3 concepts)",
            "Brand Guidelines",
            "Business Card Design",
            "Letterhead & Email Signature",
            "Social Media Profile Setup",
            "1 Round of Revisions",
            "All Source Files",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        title: "Website Design",
        price: "$8,750",
        description:
            "Custom responsive website design and development with modern animations.",
        features: [
            "5-7 Page Custom Website",
            "Responsive Design (Mobile-friendly)",
            "Interactive Animations",
            "Contact Form Integration",
            "Basic SEO Setup",
            "CMS Integration (if needed)",
            "2 Rounds of Revisions",
            "30 Days of Support",
        ],
        cta: "Get Started",
        popular: true,
    },
    {
        title: "Full Brand Experience",
        price: "$15,000",
        description:
            "Comprehensive branding and digital presence for businesses ready to make an impact.",
        features: [
            "Complete Brand Identity Package",
            "Custom Website (up to 10 pages)",
            "UI/UX Design for Digital Products",
            "Social Media Strategy",
            "Marketing Materials Design",
            "Photo/Video Art Direction",
            "3 Rounds of Revisions",
            "60 Days of Support",
        ],
        cta: "Get Started",
        popular: false,
    },
];

// Animation settings
export const ANIMATION_CONFIG = {
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    durationShort: 0.4,
    durationMedium: 0.7,
    durationLong: 1.2,
};
