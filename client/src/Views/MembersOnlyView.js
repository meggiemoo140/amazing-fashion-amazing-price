import React, { useEffect, useState } from "react";
import Api from "../helpers/Api";
import { v4 as uuidv4 } from "uuid";
import Draggable from "react-draggable";
var randomColor = require("randomcolor");

function MembersOnlyView(props) {
  const [memberMsg, setMemberMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      newitem();
    }
  };

  const newitem = () => {
    if (item.trim() !== "") {
      //if input is not blank, create a new item object
      const newitem = {
        id: uuidv4(),
        item: item,
        color: randomColor({ luminosity: "light" }),
        defaultPos: { x: 100, y: 0 },
      };
      //add this new item object to the items array
      setItems((items) => [...items, newitem]);
      //reset item value to empty string
      setItem("");
    } else {
      alert("Enter a item");
      setItem("");
    }
  };
  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };
  useEffect(() => {
    FetchMemberMsg();
  }, []);

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  async function FetchMemberMsg() {
    // Get "Members Only" message for authenticated users
    let myresponse = await Api.getContent("/members-only");
    if (myresponse.ok) {
      setMemberMsg(myresponse.data.message);
      setErrorMsg("");
    } else {
      setMemberMsg("");
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }

    useEffect(() => {
      localStorage.setItem("items", JSON.stringify(items));
    }, [items]);
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!memberMsg) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="MembersOnlyView">
      <h1>Members Only</h1>
      <hr></hr>
      <p>{memberMsg}</p>
      <div className="scary">
        <img src="https://vasquiat.com/img/cms/PRUEBA.jpg" class="img-fluid" />
      </div>
      <br></br>
      <h2 className="benefits">Benefits</h2>

      <hr></hr>
      <h4 className="bens">
        This VIP area gives you access to a fun, fresh and diverse forum,
        allowing you to discover the latest news, trends snd hot topics in the
        market, making you the fashion experts!
      </h4>
      <br></br>
      <textarea
        className="itemin"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter something..."
        onKeyPress={(e) => keyPress(e)}
      />
      <button onClick={newitem} class="btn btn-light">
        ENTER
      </button>
      <br></br>
      <br></br>
      {items.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(e, data) => {
              updatePos(data, index);
            }}
          >
            <div style={{ backgroundColor: item.color }} className="box">
              {`${item.item}`}
              <button id="delete" onClick={(e) => deleteNote(item.id)}>
                X
              </button>
              <br></br>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default MembersOnlyView;
