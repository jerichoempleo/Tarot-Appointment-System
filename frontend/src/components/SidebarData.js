//This file is kung anong laman ng sidebar (navbar.js ung design i think)
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const getSidebarData = () => {
  const roles = sessionStorage.getItem('roles'); // Check in the Application inspect to get the users role

  const allItems = [
      { title: "Home", path: "/home", icon: <AiIcons.AiFillHome />, cName: "nav-text", roles: ["User", "Admin"] },
      { title: "Appointments", path: "/appointments", icon: <IoIcons.IoMdPeople />, cName: "nav-text", roles: ["User"] },
      { title: "Schedules", path: "/schedules", icon: <FaIcons.FaEnvelopeOpenText />, cName: "nav-text", roles: ["Admin"] },
      { title: "Services", path: "/services", icon: <IoIcons.IoMdHelpCircle />, cName: "nav-text", roles: ["Admin"] },
      { title: "Transaction History", path: "/transactionhistory", icon: <IoIcons.IoMdPeople />, cName: "nav-text", roles: ["User"] },
      { title: "Pending Appointment", path: "/pendingappointment", icon: <IoIcons.IoMdPeople />, cName: "nav-text", roles: ["Admin"] },
      { title: "Complete Appointment", path: "/completeappointment", icon: <IoIcons.IoMdPeople />, cName: "nav-text", roles: ["Admin"] },
      { title: "Events", path: "/events", icon: <IoIcons.IoMdPeople />, cName: "nav-text", roles: ["Admin"] }
  ];

  // Displays the pages based on the users role 
   return allItems.filter(item => item.roles && item.roles.some(role => roles.includes(role)));
};
