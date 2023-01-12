import React from "react";
import ContentInput from "./features/ContentInput";

const Testovaya: React.FC = () => {
  return (
    <div style={{ backgroundColor: "grey", height: "100vh" }}>
      <ContentInput onFormSubmit={() => {}} />
    </div>
  );
};

export default Testovaya;
