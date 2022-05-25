import React, { useContext, useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import UserBadgeIcon from "@rsuite/icons/UserBadge";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggeduser, setLoggedUser] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  /* CUSTOM LOGIN  */
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        const user = userCredential.user;
        setLoggedUser(user.displayName);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/admin");
      })
      .catch((error) => {
        setError(true);
      });
  };
  /* LOGIN WITH GOOGLE */
  // const signInWithGoogle = (e) => {
  //   e.preventDefault();
  //   const googleProvider = new GoogleAuthProvider();
  //   signInWithPopup(auth, googleProvider)
  //     .then((res) => {
  //       console.log(res.user);
  //       const user = res.user;

  //       dispatch({ type: "LOGIN", payload: user });
  //       navigate("/admin");
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setError(true);
  //     });
  // };
  return (
    <>
      <div className="lgcontainer">
        <div className="surround">
          <div>
            {/* <i class="bx bx-user-circle log-icon"></i> */}
            {/* <i class="bx bxs-user-circle log-icon"></i> */}
            {/* <UserBadgeIcon className="log-icon" /> */}
            <img src="./RSVglobal.png" alt="" style={{ width: "100px" }} />
          </div>
          RSV Global Admin
          <hr style={{ color: "purple" }} />
          <div>
            <form className="logform" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">
                <i class="bx bx-log-in"></i>Login
              </button>
              {error && <span>Wrong email or password!</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
