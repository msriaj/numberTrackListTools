import { TelegramShareButton } from "react-share";

import "./App.css";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [exportStatus, setExportStatus] = useState(false);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  };

  const handleDataChange = (event) => {
    setData(
      event.target.value.split("\n").map((line) => {
        const [sentPayment, phoneNumber] = line.split(/\s+/);
        return { sentPayment, phoneNumber, trxID: "" };
      })
    );
  };

  const handleCopyToClipboard = (event) => {
    event.target.select();
    document.execCommand("copy");
    event.target.classList.add("copied");
  };

  // sent data to server
  const handleSendData = () => {
    // make all amount number
    const newData = data.map((item) => {
      return { ...item, sentPayment: Number(item.sentPayment) };
    });

    fetch("https://sss-tawny.vercel.app/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);

  return (
    <div className="main">
      <div className="inputArea">
        <h2>Input Area</h2>
        <textarea
          value={data
            .map((item) => `${item.sentPayment} ${item.phoneNumber}`)
            .join("\n")}
          onChange={handleDataChange}
        ></textarea>
      </div>

      {data.length > 0 && (
        <>
          <div className="text-center">
            <button onClick={() => setData([])}>Clear</button>
          </div>
          <div className="singleData heading">
            <label>
              <input
                className="amount"
                type="text"
                name="sentPayment"
                value={"Amount"}
                readOnly
              />
            </label>
            <label>
              <input
                className="phoneNumber"
                type="text"
                name="phoneNumber"
                value={"Phone Number"}
                readOnly
              />
            </label>
            <label>
              <input
                className="transactions"
                type="text"
                name="trxID"
                value={"Transaction Id"}
                readOnly
              />
            </label>
          </div>
          {data.map((item, index) => (
            <div key={index} className="singleData">
              <label>
                <input
                  className="amount"
                  type="text"
                  name="sentPayment"
                  onClick={handleCopyToClipboard}
                  value={item.sentPayment}
                  readOnly
                />
              </label>
              <label>
                <input
                  className="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={item.phoneNumber}
                  onClick={handleCopyToClipboard}
                  readOnly
                />
              </label>
              <label>
                <input
                  className="transactions"
                  type="text"
                  name="trxID"
                  value={item.trxID}
                  onChange={(event) => handleChange(event, index)}
                />
              </label>
            </div>
          ))}
          <button
            onClick={() => {
              setExportStatus(true);
              handleSendData();
            }}
          >
            Export
          </button>
          {exportStatus && (
            <>
              <div className="inputArea">
                <h2>Output Area</h2>
                <textarea
                  value={data
                    .map(
                      (item) =>
                        `${item.sentPayment} ${item.phoneNumber} ${item.trxID}`
                    )
                    .join("\n")}
                  readOnly
                ></textarea>
                <p>
                  Total Ammount:{" "}
                  <b>
                    {" "}
                    {data.reduce(
                      (acc, item) => acc + Number(item.sentPayment),
                      0
                    )}
                  </b>
                </p>
              </div>
              <div className="text-center">
                <TelegramShareButton
                  url={data
                    .map(
                      (item) =>
                        `${item.sentPayment} ${item.phoneNumber} ${item.trxID}`
                    )
                    .join("\n")}
                >
                  <button>Share</button>
                </TelegramShareButton>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
