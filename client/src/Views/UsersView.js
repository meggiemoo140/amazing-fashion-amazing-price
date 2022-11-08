import React, { useEffect, useState } from "react";
import Api from "../helpers/Api";
import "./Users.css";
import { FiUsers } from "react-icons/fi";

function UsersView(props) {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    let myresponse = await Api.getUsers();
    if (myresponse.ok) {
      setUsers(myresponse.data);
      setErrorMsg("");
    } else {
      setUsers([]);
      setErrorMsg(`Error ${myresponse.status}: ${myresponse.statusText}`);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!users) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="UsersView">
      <h1>Users </h1>
      <p>
        Join our ever growing list of high fashion brands and influencers...
      </p>
      <img
        class="img-fluid"
        src="https://vasquiat.com/modules/custombanners/views/img/uploads/648ff9ef433651cb6696815d7f2074862e55c888.jpg"
      />

      <hr></hr>
      <ul>
        {users.map((e) => (
          <h2 className="names">
            {" "}
            <li key={e.id}>{e.firstname}</li>
          </h2>
        ))}
      </ul>
      <hr></hr>
      <div class="box">
        <div class="quotes">
          <h2 class="quotes">VOGUE</h2>
        </div>
        <div>
          <h2 class="quotes">REFINERY29</h2>
        </div>
        <div>
          <h2 class="quotes">WWD</h2>
        </div>
        <div>
          <h2 class="quotes">FASHIONISTA</h2>
        </div>
      </div>
    </div>
  );
}

export default UsersView;
