import React, { useEffect, useState } from "react";

const Sta1 = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    fetch("https://fastapi-render-2wzq.onrender.com/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchStudents();
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
              .filter((student) => student.level === "ปวส")
              .map((student) => (
                <tr key={student._id}>
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

export default Sta1;