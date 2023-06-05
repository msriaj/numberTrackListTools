import { TelegramShareButton } from "react-share";

import "./App.css";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);

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
        const [amount, phoneNumber] = line.split(/\s+/);
        return { amount, phoneNumber, transactionId: "" };
      })
    );
  };

  const handleCopyToClipboard = (event) => {
    event.target.select();
    document.execCommand("copy");
    event.target.classList.add("copied");
  };

  return (
    <div className="main">
      <div className="inputArea">
        <h2>Input Area</h2>
        <textarea
          value={data
            .map((item) => `${item.amount} ${item.phoneNumber}`)
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
                name="amount"
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
                name="transactionId"
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
                  name="amount"
                  onClick={handleCopyToClipboard}
                  value={item.amount}
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
                  name="transactionId"
                  value={item.transactionId}
                  onChange={(event) => handleChange(event, index)}
                />
              </label>
            </div>
          ))}
          <div className="inputArea">
            <h2>Output Area</h2>
            <textarea
              value={data
                .map(
                  (item) =>
                    `${item.amount} ${item.phoneNumber} ${item.transactionId}`
                )
                .join("\n")}
              readOnly
            ></textarea>
            <p>
              Total Ammount:{" "}
              <b> {data.reduce((acc, item) => acc + Number(item.amount), 0)}</b>
            </p>
          </div>
          <div className="text-center">
            <TelegramShareButton
              url={data
                .map(
                  (item) =>
                    `${item.amount} ${item.phoneNumber} ${item.transactionId}`
                )
                .join("\n")}
            >
              <button>Share</button>
            </TelegramShareButton>
          </div>
          <div className="text-center">
            Made with ❤️ by{" "}
            <a href="//riaj.xyz" target="_blank" rel="noreferrer">
              riaj
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
