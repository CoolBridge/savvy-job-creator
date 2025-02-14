
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TemplateSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TemplateSelector = ({ value, onChange }: TemplateSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose Template
      </label>
      <Select value={value} onValueChange={onChange}>
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
  );
};
