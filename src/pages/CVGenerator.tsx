
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { VoiceInputField } from "@/components/voice-input/VoiceInputField";
import { TemplateSelector } from "@/components/cv/TemplateSelector";

const CVGenerator = () => {
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
    template: "modern",
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
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                <TemplateSelector
                  value={formData.template}
                  onChange={(value) => updateField("template")(value)}
                />

                <div className="space-y-4">
                  <VoiceInputField
                    label="Full Name"
                    fieldName="fullName"
                    value={formData.fullName}
                    onChange={updateField("fullName")}
                    isRecording={isRecording}
                    currentField={currentField}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <VoiceInputField
                      label="Email"
                      fieldName="email"
                      value={formData.email}
                      onChange={updateField("email")}
                      isRecording={isRecording}
                      currentField={currentField}
                      onStartRecording={startRecording}
                      onStopRecording={stopRecording}
                      type="email"
                      required
                    />

                    <VoiceInputField
                      label="Phone"
                      fieldName="phone"
                      value={formData.phone}
                      onChange={updateField("phone")}
                      isRecording={isRecording}
                      currentField={currentField}
                      onStartRecording={startRecording}
                      onStopRecording={stopRecording}
                      type="tel"
                      required
                    />
                  </div>

                  <VoiceInputField
                    label="Professional Summary"
                    fieldName="summary"
                    value={formData.summary}
                    onChange={updateField("summary")}
                    isRecording={isRecording}
                    currentField={currentField}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    multiline
                    required
                  />

                  <VoiceInputField
                    label="Work Experience"
                    fieldName="experience"
                    value={formData.experience}
                    onChange={updateField("experience")}
                    isRecording={isRecording}
                    currentField={currentField}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    multiline
                    required
                  />

                  <VoiceInputField
                    label="Education"
                    fieldName="education"
                    value={formData.education}
                    onChange={updateField("education")}
                    isRecording={isRecording}
                    currentField={currentField}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    multiline
                    required
                  />

                  <VoiceInputField
                    label="Skills"
                    fieldName="skills"
                    value={formData.skills}
                    onChange={updateField("skills")}
                    isRecording={isRecording}
                    currentField={currentField}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    multiline
                    required
                  />

                  <VoiceInputField
                    label="Cover Letter"
                    fieldName="coverLetter"
                    value={formData.coverLetter}
                    onChange={updateField("coverLetter")}
                    isRecording={isRecording}
                    currentField={currentField}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    multiline
                    rows={6}
                  />
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
