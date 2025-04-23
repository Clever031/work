import React, { useEffect, useState } from "react";

const Sta = () => {
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

  const filteredStudents = students.filter((student) => student.level === "ปวช");

  // คำนวณผลรวม
  const totalPlan = filteredStudents.reduce((sum, s) => sum + parseInt(s.plan), 0);
  const totalApply = filteredStudents.reduce((sum, s) => sum + parseInt(s.apply), 0);

  return (
    <div className="mt-1">
      <h3 className="text-center text-primary">ระดับชั้น ปวช</h3>
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
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.department}</td>
                <td>{student.plan}</td>
                <td>{student.apply}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-secondary">
            <tr>
              <td><strong>รวม</strong></td>
              <td><strong>{totalPlan}</strong></td>
              <td><strong>{totalApply}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Sta;
