import React from "react";
import { User } from "./6entities/user";

const Testovaya: React.FC = () => {
  return (
    <div style={{ backgroundColor: "grey", height: "100vh" }}>
      <User link userId={2} />
      <User userId={1} />
    </div>
  );
};

export default Testovaya;
