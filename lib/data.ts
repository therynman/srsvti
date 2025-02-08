export interface CaseStudy {
    title: string;
    description: string;
    image: string;
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        title: "Fintech Dashboard Reimagined",
        description: "Transforming data into actionable insights",
        image: "/images/fintech.jpg",
    },
    {
        title: "E-commerce Platform",
        description: "Next-gen shopping experience",
        image: "/images/ecommerce.jpg",
    },
];

export const SERVICES = [
    {
        title: "Web Development",
        description: "Modern performant web experiences",
        icon: "💻",
    },
    // Add other services
];
