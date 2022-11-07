import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
import Local from "../helpers/Local";

function ProfileView(props) {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    let userId = Local.getUserId();
    let myresponse = await Api.getUser(userId);
    if (myresponse.ok) {
      setUser(myresponse.data);
      setErrorMsg("");
    } else {
      setUser(null);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <p>PROFILE</p>
      <div className="ProfileView">
        <h1>Profile View</h1>
        ID: {user.id}
        <br />
        Username: {user.firstname}
        <br />
        Email: {user.email}
      </div>
    </div>
  );
}
export default ProfileView;
