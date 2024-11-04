import React from "react";
import "./Loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;