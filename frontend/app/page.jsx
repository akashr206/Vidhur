"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Brain,
  Target,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Sparkles,
  Clock,
  Award,
  BarChart3,
  Lightbulb,
  ChevronRight,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Course Generation",
    description:
      "Create personalized learning roadmaps tailored to your knowledge level and exam goals",
    color: "bg-blue-500",
  },
  {
    icon: BookOpen,
    title: "Smart Chapter Creation",
    description:
      "Generate comprehensive chapters with detailed explanations and learning objectives",
    color: "bg-green-500",
  },
  {
    icon: Bot,
    title: "Chat-Box for Doubt Solving",
    description:
      "Ask any doubt you get while studying a chapter in the chatbox which will be limited to answer only the questions related to that specific chapter.",
    color: "bg-purple-500",
  },
];

const benefits = [
  "Personalized learning paths based on your current knowledge",
  "JEE MAINS & ADVANCED focused content",
  "Adaptive difficulty progression",
  "Comprehensive progress tracking",
  "Interactive practice sessions",
  "Expert-curated content quality",
];

const testimonials = [
  {
    name: "Arjun Sharma",
    role: "JEE MAINS Aspirant",
    content:
      "Vidhur helped me create a perfect study plan for Physics. The AI-generated chapters were exactly what I needed!",
    rating: 5,
    avatar: "AS",
  },
  {
    name: "Priya Patel",
    role: "JEE ADVANCED Student",
    content:
      "The MCQ tests are incredibly similar to actual JEE questions. My problem-solving speed improved significantly.",
    rating: 5,
    avatar: "PP",
  },
  {
    name: "Rohit Kumar",
    role: "Engineering Student",
    content:
      "Best platform for structured learning. The progress tracking keeps me motivated every day.",
    rating: 5,
    avatar: "RK",
  },
];

const stats = [
  { number: "10,000+", label: "Students Learning" },
  { number: "50,000+", label: "Chapters Generated" },
  { number: "1M+", label: "Questions Practiced" },
  { number: "95%", label: "Success Rate" },
];

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse duration-[3s]">
                <span className="text-white font-bold text-3xl">
                  <img src="/NewLogo.jpg" alt="" className="rounded-full" />
                </span>
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 animate-ping duration-[2s]"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vidhur
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your intelligent learning platform. Create chapters, generate
              content, and build engaging quizzes to enhance your educational
              experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
              
            </div>

            {/* Stats */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of learning with our intelligent course
              generation and personalized study paths
            </p>
          </div>

          <div className="flex justify-evenly gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-90 border-0 shadow-lg"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with your personalized learning journey in just a few
              clicks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Personalization of your course",
                description:
                  "Select the required elements according to your convinience and current knowledge level",
                icon: Target,
              },
              {
                step: "02",
                title: "AI Generates Your Course",
                description:
                  "Our AI creates a personalized roadmap with chapters tailored to your needs",
                icon: Brain,
              },
              {
                step: "03",
                title: "Learn & Clarify",
                description:
                  "Study chapters and clarify your doubts using the chatbox provided ",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                    <item.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4 md:mb-0 justify-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-gray-900 font-bold text-lg">
                <img src="NewLogo.jpg" alt="" className="rounded-full" />
              </span>
            </div>
            <span className="text-xl font-bold">VIDHUR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
