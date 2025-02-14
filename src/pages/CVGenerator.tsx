
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CVGenerator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle CV generation
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-display font-bold mb-8 text-center">
              Create Your Professional CV
            </h1>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Full Name
                    </span>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </label>

                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">
                        Email
                      </span>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">
                        Phone
                      </span>
                      <input
                        type="tel"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Professional Summary
                    </span>
                    <textarea
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                      rows={4}
                      value={formData.summary}
                      onChange={(e) =>
                        setFormData({ ...formData, summary: e.target.value })
                      }
                    />
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Generate CV <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CVGenerator;
