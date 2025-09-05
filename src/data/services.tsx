import React from 'react';
import { PiBrainDuotone } from "react-icons/pi";
import { MdOutlinePalette } from "react-icons/md";
import { BsVectorPen } from "react-icons/bs";
import { MdOutlineCameraAlt } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { MdSlowMotionVideo } from "react-icons/md";
import { FaMeta } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { FaFigma } from "react-icons/fa6";

export type ServiceItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

export const servicesData: ServiceItem[] = [
  {
    icon: <PiBrainDuotone size={32}/>,
    title: "Brand Strategy & Positioning ",
    description: "We craft brand strategies that go beyond visuals—defining your purpose, voice, and market position. Through deep research and identity mapping, we create brands that resonate, differentiate, and scale..",
    features: ["More than a logo—we build brands with purpose and precision."]
  },
  {
    icon: <MdOutlinePalette size={32} />,
    title: "Visual Identity & Logo Design",
    description: "Your logo is just the beginning. We design timeless visual systems—from icons and color palettes to typography—that tell your brand story across every medium with clarity and confidence.",
    features: ["Designs that don't just look premium—they feel unforgettable."]
  },
  {
    icon: <BsVectorPen  size={32} />,
    title: "Typography & Custom Lettering",
    description: "Our custom typography services bring personality to your brand. From bespoke fonts to expressive type treatments, we make every letter speak your identity.",
    features: [" Where every letter becomes a legacy."]
  },
  {
    icon: <PiBrainDuotone size={32}/>,
    title: "Print & Packaging Design",
    description: "Elevate your physical presence with tactile, tailored design. From high-impact packaging to editorial-quality brochures, we blend craftsmanship with strategy to make you stand out on the shelf and in the hand.",
    features: ["Premium packaging that turns products into experiences."]
  },
  {
    icon: <TbTargetArrow  size={32}/>,
    title: "Rebranding & Brand Refresh",
    description: "Whether you're pivoting or evolving, we guide brands through strategic reimagination. New look, renewed voice—same brand essence, but elevated.",
    features: ["Not just a makeover—a brand renaissance."]
  },
  {
    icon: <MdOutlineCameraAlt  size={32} />,
    title: "Art Direction & Photoshoot Styling",
    description: "From concept to post-production, we curate and direct photo and video content that aligns with your brand identity, ensuring every visual is both aesthetic and strategic.",
    features: ["Elevated content, curated with vision."]
  },
  {
    icon: <MdSlowMotionVideo   size={32} />,
    title: "Motion video",
    description: "We believe motion is more than editing—it's the art of shaping stories, emotions, and impact. Today, we craft seamless, powerful visuals that inspire audiences. Tomorrow, we push boundaries with innovation, immersive technology, and limitless creativity—turning every frame into a future-ready experience that truly moves the world.",
    features: ["AI-Powered Motion. Human-Crafted Emotion."]
  },
  {
    icon: <FaMeta  size={32} />,
    title: "Digital Marketing",
    description: "Our digital marketing services help your brand grow online with smart strategies and creative campaigns. From SEO and social media to paid ads and content marketing, we focus on boosting visibility, driving traffic, and delivering real results tailored to your business.",
    features: ["Shaping the future of brands in the digital world."]
  },
  {
    icon: <CgWebsite   size={32} />,
    title: "Website Development",
    description: "Our website development services are focused on creating fast, responsive, and user-friendly websites that make a strong impression. We design and build custom websites that work seamlessly across devices, combining clean design with the latest technology. Whether you need a business site, portfolio, or e-commerce platform, we deliver solutions that are tailored to your goals and help your brand stand out online.",
    features: ["Building the digital foundations of tomorrow."]
  },
  {
    icon: <FaFigma  size={32} />,
    title: "UI/UX Design",
    description: "Our UI/UX design services focus on creating digital experiences that are not only visually appealing but also intuitive and user-friendly. We design interfaces that combine creativity with functionality, ensuring smooth navigation and meaningful interactions. From wireframes to final designs, our goal is to craft engaging experiences that keep users connected with your brand.",
    features: ["Designing experiences that shape the future."]
  }
];


