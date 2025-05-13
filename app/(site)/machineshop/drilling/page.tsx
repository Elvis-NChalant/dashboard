"use client";

import { useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { IconHome2 } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";

// Define the form input type
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

const navItems = [
  { name: "Lathe", link: "/machineshop/lathe" },
  { name: "Milling", link: "/machineshop/milling" },
  { name: "Drilling", link: "/machineshop/drilling" },
  { name: "Surface Grinding", link: "/machineshop/surface" },
  { name: "Jig Boring", link: "/machineshop/jig" },
  { name: "Cylindrical Grinding", link: "/machineshop/cylindrical" },
];

export default function JobTablePage() {
  const [formInput, setFormInput] = useState<JobFormInput>({
    jobId: "",
    component: "",
    assignedWorker: "",
    operation: "",
    startTime: "",
    jobsAssigned: 0,
    endTime: "",
    jobsCompleted: 0,
  });

  const [entries, setEntries] = useState<JobFormInput[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Fetch data from backend on page load
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch("http://65.1.112.100:8080/get-table?table=B");
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        setError("Failed to fetch entries.");
      }
    };
    fetchEntries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormInput({
      ...formInput,
      [name]:
        type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    if (!formInput.jobId || !formInput.component || !formInput.assignedWorker || !formInput.operation) {
      setError("Please fill out all text fields.");
      return;
    }
    
    setError("");

    const requestData = {
      Table: "B",  // Specify the table (e.g., "B")
      entry: formInput,  // The form input data
    };

    // If editing, update the existing entry
    if (editIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = formInput;
      setEntries(updatedEntries);
      setEditIndex(null);
    } else {
      // Send the new entry to the backend
      const response = await fetch  ("http://65.1.112.100:8080/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries([...entries, newEntry]);
      } else {
        setError("Failed to add entry.");
      }
    }

    setFormInput({
      jobId: "",
      component: "",
      assignedWorker: "",
      operation: "",
      startTime: "",
      jobsAssigned: 0,
      endTime: "",
      jobsCompleted: 0,
    });
  };

  const handleEdit = (index: number) => {
    setFormInput(entries[index]);
    setEditIndex(null);
    handleSubmit();
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar className="fixed top-0 left-0 w-full z-50 bg-blue-950 shadow-md">
        <NavBody className="flex items-center justify-between">
          <NavbarLogo title="Drilling" />
          <div className="flex-1 flex justify-center">
            <NavItems
              items={navItems.filter((item) => item.name !== "Cylindrical Grinding")}
              className="ml-50"
            />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="min-h-screen bg-gray-100 pt-50 pb-24 px-4">
        {error && <p className="text-red-500 mb-2">{error}</p>}

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

        <table className="w-full bg-white shadow rounded overflow-hidden mb-6">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {[
                "Job ID",
                "Component",
                "Assigned Worker",
                "Operation",
                "Start Time",
                "End Time",
                "Jobs Assigned",
                "Jobs Completed",
                "Actions",
              ].map((head) => (
                <th key={head} className="p-2 border">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className="text-center">
                {Object.values(entry).map((value, i) => (
                  <td key={i} className="p-2 border">
                    {value}
                  </td>
                ))}
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleSubmit}
          className="fixed bottom-30 right-5 bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition"
        >
          {editIndex !== null ? "Update Entry" : "Add Entry"}
        </button>
      </div>
    </>
  );
}
