
import { Mic, MicOff } from "lucide-react";

interface VoiceButtonProps {
  fieldName: string;
  isRecording: boolean;
  currentField: string | null;
  onStartRecording: (fieldName: string) => void;
  onStopRecording: () => void;
}

export const VoiceButton = ({
  fieldName,
  isRecording,
  currentField,
  onStartRecording,
  onStopRecording,
}: VoiceButtonProps) => {
  const isCurrentlyRecording = isRecording && currentField === fieldName;

  return (
    <button
      type="button"
      onClick={() => isCurrentlyRecording ? onStopRecording() : onStartRecording(fieldName)}
      className={`p-2 rounded-full transition-colors ${
        isCurrentlyRecording
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {isCurrentlyRecording ? (
        <MicOff className="w-4 h-4 text-white" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
};
