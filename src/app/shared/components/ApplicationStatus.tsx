import React from "react";
import { statusMap } from "../utils/statusMap";

interface ApplicationStatusProps {
  statusId: number;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ statusId }) => {
  const status = statusMap[statusId] || "Unknown status";

  return <span>{status}</span>;
};

export default ApplicationStatus;
