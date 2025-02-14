
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mic, MicOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CVGenerator = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentField, setCurrentField] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    template: "modern", // new field for template selection
    coverLetter: "",
  });

  const startRecording = async (fieldName: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setCurrentField(fieldName);
      setIsRecording(true);

      const audioChunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        // Here you would typically send this to a speech-to-text service
        // For now, we'll simulate the conversion
        await processAudioToText(audioBlob, fieldName);
      };

      mediaRecorder.start();
      
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setCurrentField(null);
    }
  };

  const processAudioToText = async (audioBlob: Blob, fieldName: string) => {
    // Here you would integrate with a speech-to-text service
    // For now, we'll simulate the conversion with a delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulated text result
    const simulatedText = "This is a simulated transcription of your voice recording.";
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName] ? `${prev[fieldName]}\n${simulatedText}` : simulatedText
    }));
    
    setLoading(false);
    toast({
      title: "Voice Captured",
      description: "Your speech has been converted to text",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically make an API call to generate the CV
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "CV Generated Successfully!",
        description: "Your CV has been created and saved to your dashboard.",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const VoiceButton = ({ fieldName }: { fieldName: string }) => (
    <button
      type="button"
      onClick={() => isRecording && currentField === fieldName ? stopRecording() : startRecording(fieldName)}
      className={`p-2 rounded-full transition-colors ${
        isRecording && currentField === fieldName
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {isRecording && currentField === fieldName ? (
        <MicOff className="w-4 h-4 text-white" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );

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
                  {/* Template Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Template
                    </label>
                    <Select
                      value={formData.template}
                      onValueChange={(value) =>
                        setFormData({ ...formData, template: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Personal Information */}
                  <div className="relative">
                    <label className="block mb-4">
                      <span className="text-sm font-medium text-gray-700">
                        Full Name
                      </span>
                      <div className="mt-1 flex gap-2">
                        <input
                          type="text"
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          required
                        />
                        <VoiceButton fieldName="fullName" />
                      </div>
                    </label>
                  </div>

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
                        required
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
                        required
                      />
                    </label>
                  </div>

                  {/* Professional Summary with Voice Input */}
                  <div className="relative">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">
                        Professional Summary
                      </span>
                      <div className="mt-1 flex gap-2">
                        <textarea
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                          rows={4}
                          value={formData.summary}
                          onChange={(e) =>
                            setFormData({ ...formData, summary: e.target.value })
                          }
                          required
                        />
                        <VoiceButton fieldName="summary" />
                      </div>
                    </label>
                  </div>

                  {/* Experience with Voice Input */}
                  <div className="relative">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">
                        Work Experience
                      </span>
                      <div className="mt-1 flex gap-2">
                        <textarea
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                          rows={4}
                          value={formData.experience}
                          onChange={(e) =>
                            setFormData({ ...formData, experience: e.target.value })
                          }
                          required
                        />
                        <VoiceButton fieldName="experience" />
                      </div>
                    </label>
                  </div>

                  {/* Education with Voice Input */}
                  <div className="relative">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">
                        Education
                      </span>
                      <div className="mt-1 flex gap-2">
                        <textarea
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                          rows={4}
                          value={formData.education}
                          onChange={(e) =>
                            setFormData({ ...formData, education: e.target.value })
                          }
                          required
                        />
                        <VoiceButton fieldName="education" />
                      </div>
                    </label>
                  </div>

                  {/* Skills with Voice Input */}
                  <div className="relative">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">
                        Skills
                      </span>
                      <div className="mt-1 flex gap-2">
                        <textarea
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                          rows={4}
                          value={formData.skills}
                          onChange={(e) =>
                            setFormData({ ...formData, skills: e.target.value })
                          }
                          required
                        />
                        <VoiceButton fieldName="skills" />
                      </div>
                    </label>
                  </div>

                  {/* Cover Letter with Voice Input */}
                  <div className="relative">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">
                        Cover Letter
                      </span>
                      <div className="mt-1 flex gap-2">
                        <textarea
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                          rows={6}
                          value={formData.coverLetter}
                          onChange={(e) =>
                            setFormData({ ...formData, coverLetter: e.target.value })
                          }
                        />
                        <VoiceButton fieldName="coverLetter" />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || isRecording}
                    className="w-full bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate CV <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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
