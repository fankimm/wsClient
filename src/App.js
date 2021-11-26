import "./App.css";
import { useState } from "react";
import moment from "moment";
function App() {
  const ws = new WebSocket("ws://localhost:1234/ws");
  // const tmpMsg = [];
  const [tmpMsg, setTmpMsg] = useState([]);
  const sendMessage = async () => {
    const myMsg = document.getElementById("myInput").value;
    const obj = { name: "13학번 김지환", message: myMsg };
    // const blop = new Blob([JSON.stringify({ message: "hello", name: "jh" })], {
    //   type: "application/json",
    // });
    await ws.send(JSON.stringify(obj));
    // ws.send(JSON.stringify({ message: "hello", name: "jh" }));
  };
  ws.onmessage = function (event) {
    const tmp = JSON.parse(event.data);
    console.log(tmp);
    if (tmpMsg) {
      const temp = [...tmpMsg];
      console.log(temp);
      temp.push(tmp);
      console.log(temp);
      setTmpMsg(temp);
    } else {
      setTmpMsg(tmp);
    }

    // if (tmpMsg.length > 0) {
    //   setTmpMsg([...tmpMsg, { name: tmp.name, message: tmp.message }]);
    // } else {
    //   setTmpMsg([tmp]);
    // }
  };

  return (
    <div className="App">
      <div style={{ width: "1000px", color: "black" }}>
        {tmpMsg.map((d) => {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // width: "300px",
                }}
              >
                <div style={{ fontSize: "13px" }}>{`${d.name}`}</div>
                <div style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "gray",
                      fontSize: "8px",
                      alignSelf: "flex-end",
                    }}
                  >{`${moment().format("오후 HH:mm")}`}</span>
                  <div
                    style={{
                      background: "#f9e000",
                      width: "150px",
                      // padding: "5px",
                      height: "30px",
                      borderRadius: "10px",
                      margin: "2px",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >{`${d.message}`}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <input
        id="myInput"
        onKeyPress={(e) => {
          if (e.code === "Enter") {
            sendMessage();
          }
          document.getElementById("myInput").value = "";
        }}
      />
      <button onClick={sendMessage}>send</button>
    </div>
  );
}

export default App;
