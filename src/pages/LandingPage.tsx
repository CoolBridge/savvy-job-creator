
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed w-full backdrop-blur-lg bg-white/80 z-50 border-b">
        <div className="container mx-auto flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl font-semibold">
            MisixAI
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/create"
              className="bg-premium text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-premium-subtle transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="pt-32 pb-20">
          <div className="container">
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-bold text-center leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Craft Your Perfect CV<br />with AI Intelligence
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Create professional, ATS-optimized CVs and cover letters in minutes with our advanced AI technology.
            </motion.p>
            <motion.div 
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/create"
                className="bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
              >
                Create Your CV <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-accent">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Why Choose MisixAI
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="font-display font-semibold text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="container text-center text-sm text-gray-600">
          © 2024 MisixAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "AI-Powered CV Generation",
    description: "Our advanced AI technology creates professional CVs tailored to your experience and industry.",
  },
  {
    title: "ATS-Optimized Templates",
    description: "Ensure your CV passes through Applicant Tracking Systems with our optimized formats.",
  },
  {
    title: "Smart Cover Letters",
    description: "Generate personalized cover letters that highlight your unique qualifications for each job.",
  },
];

export default LandingPage;
