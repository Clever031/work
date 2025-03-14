import React, { useEffect, useState } from "react";

const StatisticsTable1 = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/students") // เรียก API FastAPI
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="mt-1">
      <h3 className="text-center text-primary">ระดับชั้น ปวส</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>สาขาวิชา</th>
              <th>แผนรับ</th>
              <th>ยอดรับ</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) => student.level === "ปวส") // กรองเฉพาะ ปวส
              .map((student, index) => (
                <tr key={index}>
                  <td>{student.department}</td>
                  <td>{student.plan}</td>
                  <td>{student.apply}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsTable1;
