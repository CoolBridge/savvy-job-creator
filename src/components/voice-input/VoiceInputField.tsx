
import { VoiceButton } from "./VoiceButton";

interface VoiceInputFieldProps {
  label: string;
  fieldName: string;
  value: string;
  onChange: (value: string) => void;
  isRecording: boolean;
  currentField: string | null;
  onStartRecording: (fieldName: string) => void;
  onStopRecording: () => void;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  type?: string;
}

export const VoiceInputField = ({
  label,
  fieldName,
  value,
  onChange,
  isRecording,
  currentField,
  onStartRecording,
  onStopRecording,
  multiline = false,
  rows = 4,
  required = false,
  type = "text",
}: VoiceInputFieldProps) => {
  return (
    <div className="relative">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="mt-1 flex gap-2">
          {multiline ? (
            <textarea
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
              rows={rows}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required={required}
            />
          ) : (
            <input
              type={type}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required={required}
            />
          )}
          <VoiceButton
            fieldName={fieldName}
            isRecording={isRecording}
            currentField={currentField}
            onStartRecording={onStartRecording}
            onStopRecording={onStopRecording}
          />
        </div>
      </label>
    </div>
  );
};
