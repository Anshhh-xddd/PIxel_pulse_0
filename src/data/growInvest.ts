import { type LucideIcon, BarChart3, Leaf, ShieldCheck, Users2, Coins, PieChart, Wallet2, Target, Trophy, LineChart, Briefcase, Sparkles, CheckCircle2, Building2, Globe2 } from 'lucide-react';

export interface GrowInvestStat {
  label: string;
  value: string;
  description: string;
}

export interface GrowInvestFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface GrowInvestService {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}

export interface GrowInvestProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface GrowInvestTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface GrowInvestAdvantage {
  title: string;
  description: string;
}

export interface GrowInvestFAQ {
  question: string;
  answer: string;
}

export const heroStats: GrowInvestStat[] = [
  {
    label: 'Client Retention',
    value: '97%',
    description: 'Long-term partnerships built on trust and results'
  },
  {
    label: 'Assets Managed',
    value: '$2.1B',
    description: 'Diverse portfolios spanning global markets'
  },
  {
    label: 'Average ROI',
    value: '14%',
    description: 'Year-over-year growth across client portfolios'
  }
];

export const features: GrowInvestFeature[] = [
  {
    title: 'Tailored Growth Strategies',
    description: 'Dynamic portfolios designed around your goals, risk tolerance, and time horizon.',
    icon: LineChart
  },
  {
    title: 'Sustainable Investing',
    description: 'ESG-focused opportunities that align wealth creation with meaningful impact.',
    icon: Leaf
  },
  {
    title: 'Expert Advisory Team',
    description: 'Seasoned analysts and advisors monitoring market shifts in real time.',
    icon: Users2
  }
];

export const services: GrowInvestService[] = [
  {
    title: 'Wealth Management',
    description: 'Comprehensive asset management with quarterly strategy reviews and transparent performance reporting.',
    icon: Wallet2,
    points: [
      'Portfolio diversification across asset classes',
      'Active risk monitoring and rebalancing',
      'Tax-efficient investment planning'
    ]
  },
  {
    title: 'Retirement Planning',
    description: 'Future-proof your lifestyle with strategies that balance safety, liquidity, and growth.',
    icon: ShieldCheck,
    points: [
      'Cash flow modelling and milestone planning',
      'Income strategies for pre and post retirement',
      'Protection against inflation and market swings'
    ]
  },
  {
    title: 'Corporate Advisory',
    description: 'Guidance for founders and CFOs managing treasury operations, fundraising, and expansion.',
    icon: Briefcase,
    points: [
      'Capital allocation and growth planning',
      'ESOP and incentive structuring',
      'Cross-border investment opportunities'
    ]
  }
];

export const processSteps: GrowInvestProcessStep[] = [
  {
    title: 'Discovery & Insight',
    description: 'We start with deep discovery to understand your aspirations, obligations, and current financial landscape.',
    icon: Sparkles
  },
  {
    title: 'Strategy Blueprint',
    description: 'Our advisory team crafts a bespoke investment roadmap supported by data-led market research.',
    icon: Target
  },
  {
    title: 'Execution & Optimization',
    description: 'Portfolios are actively managed with scenario planning, hedging, and tactical adjustments.',
    icon: BarChart3
  },
  {
    title: 'Review & Elevate',
    description: 'Quarterly performance sessions to recalibrate goals and capture new opportunities.',
    icon: Trophy
  }
];

export const advantages: GrowInvestAdvantage[] = [
  {
    title: 'Global Perspective',
    description: 'Access to emerging and developed markets through our global research network.'
  },
  {
    title: 'Quant-Driven Decisions',
    description: 'Advanced analytics and predictive modelling inform every investment recommendation.'
  },
  {
    title: 'Dedicated Support',
    description: 'A single point of contact backed by a multidisciplinary team for seamless communication.'
  }
];

export const marketHighlights: GrowInvestFeature[] = [
  {
    title: 'Real-time Market Monitoring',
    description: '24/7 portfolio oversight with proactive alerts and scenario planning.',
    icon: PieChart
  },
  {
    title: 'Alternative Investments',
    description: 'Access private equity, venture debt, and structured products vetted by our committee.',
    icon: Coins
  },
  {
    title: 'Institutional Partnerships',
    description: 'Collaborations with leading custodians and research houses for robust execution.',
    icon: Building2
  }
];

export const testimonials: GrowInvestTestimonial[] = [
  {
    quote: 'Grow Invest transformed our treasury approach. Their proactive insights helped us capture growth opportunities even in volatile markets.',
    author: 'Amelia Chen',
    role: 'CFO, Lumen Labs'
  },
  {
    quote: 'Their advisory team blends empathy with precision. We finally have clarity and confidence in our long-term wealth plan.',
    author: 'Rahul Desai',
    role: 'Founder, Desai Ventures'
  }
];

export const faqs: GrowInvestFAQ[] = [
  {
    question: 'How do you tailor portfolios for different risk profiles?',
    answer: 'We combine qualitative conversations with quantitative risk assessments to build a portfolio mix that evolves with your life stage and market conditions.'
  },
  {
    question: 'What is the minimum investment to work with Grow Invest?',
    answer: 'Individual wealth mandates begin at $500K AUM, while corporate advisory engagements are scoped based on treasury size and strategic objectives.'
  },
  {
    question: 'How often will I hear from my advisory team?',
    answer: 'You receive monthly performance dashboards and quarterly strategic reviews, with your advisor available on-demand for timely updates.'
  }
];

export const partnershipHighlights: GrowInvestFeature[] = [
  {
    title: 'Integrated Reporting',
    description: 'Consolidated dashboards across brokerage accounts, private investments, and real estate holdings.',
    icon: Globe2
  },
  {
    title: 'Compliance & Governance',
    description: 'Robust frameworks that keep your portfolio aligned with regulatory requirements.',
    icon: ShieldCheck
  },
  {
    title: 'Impact Measurement',
    description: 'Track the social and environmental performance of every ESG investment.',
    icon: CheckCircle2
  }
];

export const closingCTA = {
  heading: 'Let’s shape your next decade of growth',
  subheading: 'Partner with a team that treats your ambitions like our own. Schedule a discovery session with Grow Invest today.',
  primaryLabel: 'Book a Consultation',
  secondaryLabel: 'Download Firm Overview'
};
