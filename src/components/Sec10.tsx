import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, BarChart2 } from 'lucide-react';
import { AnimatedSection } from './ui/animated-section';
import { Link } from 'react-router-dom';

// Logos for review sites
const reviewSites = [
  { name: 'Investing.com', rating: 4.5 },
  { name: 'FX Empire', rating: 4.3 },
  { name: 'DayTrading.com', rating: 4.4 },
  { name: 'BrokerChooser', rating: 4.2 },
  { name: 'ForexBrokers.com', rating: 4.5 },
];

// Featured logos (8 empty placeholders)
const featuredLogos = [
  { name: 'Featured Logo 1', src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/featured-myfxbook.svg' },
  { name: 'Featured Logo 2', src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/featured-benzinga.svg' },
  { name: 'Featured Logo 3', src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/featured-business-insider.svg' },
  { name: 'Featured Logo 4', src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/featured-bloomberg.svg' },
  { name: 'Featured Logo 5', src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/featured-fxstreet.svg' },
  { name: 'Featured Logo 6', src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/featured-forexfactory.svg' },
  { name: 'Featured Logo 7', src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/featured-marketwatch.svg' },
  { name: 'Featured Logo 8', src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/featured-yahoo.svg' },
];

// Awards data
const awards = [
  {
    name: 'Award 1',
    src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/about-us-award-row1-img1.webp',
  },
  {
    name: 'Award 2',
    src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/about-us-award-row1-img2.webp',
  },
  {
    name: 'Award 3',
    src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/about-us-award-row1-img3.webp',
  },
  {
    name: 'Award 4',
    src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/about-us-award-row1-img4.webp',
  },
  {
    name: 'Award 5',
    src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/about-us-award-row1-img5.webp',
  },
  {
    name: 'Award 6',
    src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/about-us-award-row1-img6.webp',
  },
  {
    name: 'Award 7',
    src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/about-us-award-row1-img7.webp',
  },
  {
    name: 'Award 8',
    src: 'https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/about-us-award-row1-img8.webp',
  },
];

// Tab content type
interface TabContent {
  title: string;
  active: boolean;
}

// Tab content type
interface AnimatedCounterProp {
  delay?: number;
  endValue: number;
}

// Star rating component
const StarRating = ({ rating }: any) => {
  return (
    <div className="flex items-center gap-1">
      <span className="font-semibold text-sm">{rating}</span>
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < Math.floor(rating)
              ? '★'
              : i < Math.ceil(rating) && i !== Math.floor(rating)
                ? '★'
                : '☆'}
          </span>
        ))}
      </div>
    </div>
  );
};

// Counter animation component
const AnimatedCounter = ({ endValue, delay = 0 }: AnimatedCounterProp) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startCount = 0;
    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = endValue / totalFrames;

    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        startCount += increment;
        setCount(Math.floor(startCount));

        if (startCount >= endValue) {
          clearInterval(counter);
          setCount(endValue);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [endValue, delay, isVisible]);

  return <span ref={counterRef}>{count}</span>;
};

// Render tab content based on active tab
const renderTabContent = (activeTab: string) => {
  switch (activeTab) {
    case 'Reviewed':
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
          {reviewSites.map((site, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <div className="h-12 flex items-center justify-center">
                <div className="w-32 h-8 bg-gray-800/50 rounded flex items-center justify-center text-sm font-semibold">
                  {site.name}
                </div>
              </div>
              <StarRating rating={site.rating} />
            </div>
          ))}
        </div>
      );

    case 'Featured at':
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-12">
          {featuredLogos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <div className="h-16 w-32 flex items-center justify-center bg-gray-800/50 rounded">
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-sm font-semibold text-white/60">
                    {logo.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    case 'Awards':
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-40">
                <img src={award.src} alt={award.name} className="w-full" />
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

// Main trading hero section component
const Sec10 = () => {
  const [activeTab, setActiveTab] = useState('Reviewed');
  const tabRefs = useRef<any>([]);
  const indicatorRef = useRef<any>(null);

  const tabs: TabContent[] = [
    { title: 'Reviewed', active: activeTab === 'Reviewed' },
    { title: 'Featured at', active: activeTab === 'Featured at' },
    { title: 'Awards', active: activeTab === 'Awards' },
  ];

  // Update indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = tabs.findIndex((tab) => tab.title === activeTab);
      const activeTabRef = tabRefs.current[activeIndex];
      const indicator = indicatorRef.current;

      if (activeTabRef && indicator) {
        const tabRect = activeTabRef.getBoundingClientRect();
        const parentRect =
          activeTabRef.parentElement?.getBoundingClientRect() || { left: 0 };
        const tabLeft = tabRect.left - parentRect.left;

        indicator.style.left = `${tabLeft}px`;
        indicator.style.width = `${tabRect.width}px`;
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab, tabs]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const logoAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 40,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  return (
    <div className="relative bg-[#050a17] text-white overflow-hidden pt-16 pb-32">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-bodydark z-0"></div>
      <div className="absolute top-150 -left-40 w-60 h-60 bg-blue-500/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-500/20 blur-3xl rounded-full" />

      {/* Animated logo */}
      <div className="absolute top-150 -left-20 opacity-20 hidden lg:block">
        <motion.div className="w-60 h-60 relative" animate={logoAnimation}>
          <div className="w-full h-full rounded-full border-2 border-blue-400/30"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-ctn">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
          {/* Left side with glowing thumbs up */}
          <div className="w-full lg:w-1/3">
            <div className="w-100 h-100 rounded-3xl my-auto mx-auto">
              <video
                muted
                loop
                playsInline
                webkit-playsinline="true"
                x5-playsinline="true"
                style={{ mixBlendMode: 'multiply' }}
                className="w-full"
              >
                <source
                  src="https://www.monetamarkets.com/wp-content/themes/Moneta/videos/home_row8_video.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://www.monetamarkets.com/wp-content/themes/Moneta/videos/home_row8_video.webm"
                  type="video/webm"
                />
              </video>
            </div>
          </div>

          {/* Right side with counter and text */}
          <div className="w-full lg:max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.h1
                variants={itemVariants}
                className="text-3xl text-center md:text-5xl font-bold !leading-[60px]"
              >
                Find out why over
                <div className="w-fit inline-flex">
                  <div className="flex justify-center space-x-1">
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={5} />
                      </span>
                    </div>
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={0} delay={100} />
                      </span>
                    </div>
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={4} delay={200} />
                      </span>
                    </div>
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={0} delay={300} />
                      </span>
                    </div>
                    <div className="bg-gray-800 p-2 py-0 rounded">
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        <AnimatedCounter endValue={3} delay={400} />
                      </span>
                    </div>
                    <span className="text-3xl md:text-5xl font-bold">+</span>
                  </div>
                </div>
                <span> traders </span>
                <span className="text-blue-400">are online</span> trading with
                Mirrorcaps
              </motion.h1>
              <motion.div variants={itemVariants} className="mx-auto w-fit">
                <Link to="/register">
                  <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-all">
                    Start Trading Now
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Reviews section */}
        <AnimatedSection delay={0.5}>
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="relative border-b border-white/10 mb-6">
              <div className="flex justify-center">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.title}
                    ref={(el) => (tabRefs.current[index] = el)}
                    className={`pb-4 px-8 text-sm whitespace-nowrap ${
                      tab.active
                        ? 'text-blue-400 font-semibold'
                        : 'text-white/60'
                    }`}
                    onClick={() => setActiveTab(tab.title)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic tab content */}
            {renderTabContent(activeTab)}
          </div>
        </AnimatedSection>

        {/* Stats section */}
        <AnimatedSection delay={0.8}>
          <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-white/5 flex flex-col items-center text-center">
              <BarChart2 className="text-blue-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-white/70 text-sm">
                Track performance metrics with real-time data visualization
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-white/5 flex flex-col items-center text-center">
              <TrendingUp className="text-blue-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">Smart Copy Trading</h3>
              <p className="text-white/70 text-sm">
                Follow top-performing traders with automatic position copying
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-white/5 flex flex-col items-center text-center">
              <Award className="text-blue-400 mb-4" size={36} />
              <h3 className="text-xl font-semibold mb-2">
                Award-Winning Platform
              </h3>
              <p className="text-white/70 text-sm">
                Recognized by industry experts for reliability and performance
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Sec10;
