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
        <h1>My Profile</h1>
        <br></br>
        ID: {user.id}
        <br />
        Username: {user.firstname}
        <br />
        Email: {user.email}
      </div>

      <br></br>
      <hr></hr>
      <div className="row mb-4">
        <div className="col my-2">
          <div class="card">
            <img
              src="https://vasquiat.com/modules/custombanners/views/img/uploads/33872afe81bc746b2bc9c03009e9d1c7ac7cbc69.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Personal Info</h5>
              <p class="card-text"></p>
              <a
                href="http://localhost:3000/LeveledMoves"
                class="btn btn-outline-primary"
              >
                Click here!
              </a>
            </div>
          </div>
        </div>
        <div className="col my-2">
          <div class="card">
            <img
              src="https://vasquiat.com/modules/custombanners/views/img/uploads/52e4699008ef1ff219945f94d18497ec4c3f2f88.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Your Vouchers</h5>
              <p class="card-text"></p>
              <a
                href="http://localhost:3000/TurnView"
                class="btn btn-outline-primary"
                role="button"
              >
                Click here!
              </a>
            </div>
          </div>
        </div>
        <div className="col my-2">
          <div class="card">
            <img
              src="https://vasquiat.com/modules/custombanners/views/img/uploads/6fd2c5df25a1fc6d10ef1e176bf23b2139189050.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Credit Cards</h5>
              <p class="card-text"></p>
              <a
                href="http://localhost:3000/LeveledMoves"
                class="btn btn-outline-primary"
              >
                Click here!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileView;
