import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import StatisticsTable from "./StatisticsTable";
import StatisticsTable1 from "./StatisticsTable1";
import Sta from "./Sta";
import Sta1 from "./Sta1";

function App() {
  const [selectedTable, setSelectedTable] = useState("ปวช");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container py-4" style={{ fontFamily: "Mitr, sans-serif", position: "relative" }}>
      {/* ปุ่มแก้ไขข้อมูล / กลับไปดูข้อมูล อยู่เหนือกรอบสีเขียว */}
      <button
        className="btn btn-warning position-absolute"
        style={{ top: "10px", right: "10px", zIndex: 10 }}
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "" : ""}
      </button>

      {/* กรอบสีเขียว */}
      <div className="card bg-success text-light p-3 border border-dark">
        <div className="row align-items-center">
          <div className="col-auto">
            <img src="/ltc.png" alt="logo" className="img-fluid" style={{ height: "80px" }} />
          </div>
          <div className="col text-center">
            <h4 className="mb-0 text-warning">
              สถิติการรับสมัครนักเรียน นักศึกษาใหม่
              <br />
              (ที่ทำสัญญามอบตัวแล้ว) ปีการศึกษา 2568
              <br />
              วิทยาลัยเทคนิคเลย
            </h4>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center my-3">
        <button className={`btn me-2 ${selectedTable === "ปวช" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setSelectedTable("ปวช")}>
          ปวช
        </button>
        <button className={`btn me-2 ${selectedTable === "ปวส" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setSelectedTable("ปวส")}>
          ปวส
        </button>
      </div>

      {!isEditing ? (
        selectedTable === "ปวช" ? <Sta /> : <Sta1 />
      ) : (
        selectedTable === "ปวช" ? <StatisticsTable /> : <StatisticsTable1 />
      )}
    </div>
  );
}

export default App;
