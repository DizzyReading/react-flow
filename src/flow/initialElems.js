/* eslint-disable no-unused-vars */
import React from "react";

export default [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <>
          <strong>Actions</strong>
        </>
      ),
    },
    position: { x: 600, y: 80 },
  },

  {
    id: "2",
    type: "emailNode",
    data: {
      label: (
        <>
          <strong>Email</strong>
        </>
      ),
    },
    position: { x: 300, y: 250 },
    style: {
      borderRadius: "1rem",
      border: "1px solid #573A1D",
      padding: 20,
    },
  },
  {
    id: "3",
    type: "meetingNode",
    data: {
      label: (
        <>
          <strong>Meeting</strong>
        </>
      ),
    },
    position: { x: 600, y: 500 },
    style: {
      borderRadius: "1rem",
      border: "1px solid #573A1D",
      padding: 20,
    },
  },
  {
    id: "4",
    type: "reminderNode",
    data: {
      label: (
        <>
          <strong>Reminder</strong>
        </>
      ),
    },
    position: { x: 900, y: 750 },
    style: {
      borderRadius: "1rem",
      border: "1px solid #573A1D",
      padding: 20,
    },
  },

  // edges
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#FB3606 " },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "#FB3606 " },
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    animated: true,
    style: { stroke: "#FB3606 " },
  },
];
