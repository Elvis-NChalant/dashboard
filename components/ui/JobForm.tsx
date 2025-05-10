// components/JobForm.tsx

import { useState } from "react";

interface JobFormInput {
  jobId: string;
  component: string;
  assignedWorker: string;
  operation: string;
  startTime: string;
  jobsAssigned: number;
  endTime: string;
  jobsCompleted: number;
}

interface JobFormProps {
  onSubmit: (formInput: JobFormInput) => void;
  formInput: JobFormInput;
  setFormInput: React.Dispatch<React.SetStateAction<JobFormInput>>;
  error: string;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, formInput, setFormInput, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let val: string | number = value;
    if (type === "number") val = parseInt(value) || 0;
    setFormInput({ ...formInput, [name]: val });
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Job ID", name: "jobId", type: "text" },
          { label: "Component", name: "component", type: "text" },
          { label: "Assigned Worker", name: "assignedWorker", type: "text" },
          { label: "Operation", name: "operation", type: "text" },
          { label: "Start Time", name: "startTime", type: "time" },
          { label: "Jobs Assigned", name: "jobsAssigned", type: "number" },
          { label: "End Time", name: "endTime", type: "time" },
          { label: "Jobs Completed", name: "jobsCompleted", type: "number" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={(formInput as any)[field.name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={() => onSubmit(formInput)}
        className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition"
      >
        Add Entry
      </button>
    </div>
  );
};

export default JobForm;