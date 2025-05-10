import { useState } from "react";

export const machineshop = [
    {
      title: "LATHE",
      description: "Product and system design.",
      link: "/machineshop/lathe",
    },
    {
      title: "MILLING",
      description: "Component assembly operations.",
      link: "/machineshop/milling",
    },
    {
      title: "DRILLING",
      description: "Finance, sourcing, and purchases.",
      link: "/machineshop/drilling",
    },
    {
      title: "SURFACE GRINDING",
      description: "Electrical wiring and systems.",
      link: "/machineshop/surface",
    },
    {
      title: "JIG BOARING",
      description: "Quality and compliance checks.",
      link: "/machineshop/jig",
    },
    {
      title: "CYLINDRICAL GRINDING",
      description: "Machining and fabrication.",
      link: "/machineshop/cylindrical"
    }
  ];
  export const Departments = [
    {
      title: "Design Department",
      description: "Product and system design.",
      link: "#",
    },
    {
      title: "Assembly Department",
      description: "Component assembly operations.",
      link: "#",
    },
    {
      title: "Accounts & Procurement Department",
      description: "Finance, sourcing, and purchases.",
      link: "#",
    },
    {
      title: "Electrical Department",
      description: "Electrical wiring and systems.",
      link: "#",
    },
    {
      title: "Inspection Department",
      description: "Quality and compliance checks.",
      link: "#",
    },
    {
      title: "Machine Shop Department",
      description: "Machining and fabrication.",
      link: "/machineshop",
    },
    {
      title: "Transportation Department",
      description: "Logistics and material movement.",
      link: "#",
    },
  ];
  export const navItems = [
    {
      name: "Lathe",
      link: "/machineshop/lathe",
    },
    {
      name: "Milling",
      link: "/machineshop/milling",
    },
    {
      name: "Drilling",
      link: "/machineshop/drilling",
    },
    {
      name: "Surface Grinding",
      link: "/machineshop/surface",
    },
    {
      name: "Jig Boring",
      link: "/machineshop/jig",
    },
    {
      name: "Cylindrical Grinding",
      link: "/machineshop/cylindrical",
    },
  ];

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

  