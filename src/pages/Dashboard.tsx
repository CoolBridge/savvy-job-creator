
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Star, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPlan, setCurrentPlan] = useState("free"); // "free", "basic", "premium"

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "1 Basic CV Template",
        "Simple Cover Letter",
        "Export to PDF",
        "Basic ATS Optimization",
      ],
      cta: "Current Plan",
      disabled: currentPlan === "free",
    },
    {
      name: "Basic",
      price: "$9.99/mo",
      features: [
        "5 Premium CV Templates",
        "Customizable Cover Letters",
        "Export to Multiple Formats",
        "Advanced ATS Optimization",
        "Priority Support",
      ],
      cta: "Upgrade Now",
      popular: true,
      disabled: currentPlan === "basic",
    },
    {
      name: "Premium",
      price: "$19.99/mo",
      features: [
        "All Basic Features",
        "AI Job Matching",
        "LinkedIn Integration",
        "Personal Career Coach",
        "Interview Preparation",
        "Unlimited CV Variations",
      ],
      cta: "Upgrade to Premium",
      disabled: currentPlan === "premium",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 space-y-12">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold">Your Documents</h1>
          <Link
            to="/create"
            className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New CV
          </Link>
        </div>

        {/* Documents Section */}
        {documents.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-display font-semibold mb-4">
              No documents yet
            </h2>
            <p className="text-gray-600 mb-8">
              Create your first CV or cover letter to get started
            </p>
            <Link
              to="/create"
              className="bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
            >
              Create Your First CV <Plus className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Document cards will go here */}
          </div>
        )}

        {/* Premium Plans Section */}
        <section className="pt-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold mb-4">
              Upgrade Your Career Journey
            </h2>
            <p className="text-gray-600">
              Choose the plan that best fits your career goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl p-6 ${
                  plan.popular
                    ? "border-2 border-primary relative bg-white"
                    : "border border-gray-200 bg-white"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <Star className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-display font-semibold mb-2">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold mb-6">{plan.price}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    plan.disabled
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : plan.popular
                      ? "bg-primary text-white hover:bg-blue-600"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                  disabled={plan.disabled}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Premium Features Preview */}
        <section className="pt-12 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-display font-bold mb-4">
              Premium Features
            </h2>
            <p className="text-gray-600">
              Unlock advanced tools to supercharge your job search
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="rounded-2xl p-6 bg-white border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const premiumFeatures = [
  {
    title: "AI Job Matching",
    description:
      "Get personalized job recommendations based on your CV and preferences.",
  },
  {
    title: "Advanced Templates",
    description:
      "Access premium, professionally designed CV templates optimized for your industry.",
  },
  {
    title: "Career Coaching",
    description:
      "Receive guidance from experienced career coaches to improve your prospects.",
  },
  {
    title: "Interview Prep",
    description:
      "AI-powered interview preparation with industry-specific questions.",
  },
  {
    title: "LinkedIn Integration",
    description:
      "Sync your CV with LinkedIn and receive profile optimization tips.",
  },
  {
    title: "Analytics & Insights",
    description:
      "Track your CV performance and get insights on how to improve.",
  },
];

export default Dashboard;
