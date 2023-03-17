import React from "react";
import { Username } from "@entities/user";
import { useTypedSelector } from "@shared/hooks";
import { selectById } from "@entities/user/model";

const Testovaya: React.FC = () => {
  const user = useTypedSelector((state) => selectById(state, 2)) as User;
  return (
    <div style={{ backgroundColor: "grey", height: "100vh" }}>
      <Username
        name={user.name}
        surname={user.surname}
        username={user.username}
      />
    </div>
  );
};

export default Testovaya;
