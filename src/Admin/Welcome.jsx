import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Header, Content } from "rsuite";
const Welcome = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <Header bordered>
        <h4>
          Welcome:
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </h4>
      </Header>
    </div>
  );
};

export default Welcome;
