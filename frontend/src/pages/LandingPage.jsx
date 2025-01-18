import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart2, Users, Calendar, Sparkles, ChevronDown } from "lucide-react";

const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const [loopNum, setLoopNum] = useState(0);
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div
        animate={controls}
        className="flex whitespace-nowrap"
      >
        <span className="mr-4">{children}</span>
        <span className="mr-4">{children}</span>
        <span className="mr-4">{children}</span>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useState(true); // Replace with actual useInView if available

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          duration: 1.2,
          delay,
          bounce: 0.3
        }
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.8, rotateX: 45 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
      <Card className="relative p-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-gray-800 h-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, type: "spring" }}
          className="mb-6"
        >
          <Icon className="w-12 h-12 text-indigo-400" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 text-lg">{description}</p>
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-6 h-6 text-indigo-400" />
        </motion.div>
      </Card>
    </motion.div>
  );
};

const ScrollPrompt = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{
      y: [0, 10, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <ChevronDown className="w-8 h-8 text-white/50" />
  </motion.div>
);

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const scale = useTransform(springScroll, [0, 1], [1, 0.8]);
  const y = useTransform(springScroll, [0, 1], [0, -100]);
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Animated background effects */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0) 50%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, Math.random() + 0.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative min-h-screen flex flex-col items-center justify-center px-4"
        style={{ scale, y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-8 flex items-center space-x-2"
        >
          <Sparkles className="w-6 h-6 text-indigo-400" />
          <span className="text-white font-bold text-xl">HRDash</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-7xl md:text-8xl font-bold text-center mb-8"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-400 to-purple-500">
            HR Dashboard
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-2xl text-gray-400 text-center max-w-2xl mb-12"
        >
          Transform your HR operations with next-generation analytics and insights
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="flex space-x-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-6 text-xl rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25"
          >
            Get Started
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </motion.div>

        <ScrollPrompt />
      </motion.div>

      {/* Sliding Text */}
      <div className="relative py-20 bg-gray-900/50">
        <ParallaxText baseVelocity={-5}>
          <span className="text-4xl font-bold text-gray-600/20">Analytics • Dashboard • Reports • Insights • Performance •</span>
        </ParallaxText>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to manage your team effectively
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={BarChart2}
            title="Advanced Analytics"
            description="Real-time performance tracking with AI-powered insights"
            delay={0.2}
          />
          <FeatureCard
            icon={Users}
            title="Team Management"
            description="Streamlined workforce planning and organization tools"
            delay={0.4}
          />
          <FeatureCard
            icon={Calendar}
            title="Smart Scheduling"
            description="Automated attendance tracking and schedule optimization"
            delay={0.6}
          />
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-b from-gray-900/50 to-gray-950 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "99%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
              { value: "15K+", label: "Users" },
              { value: "4.9", label: "Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="p-6"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;