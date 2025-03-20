import React, { useEffect, useState } from "react";

const StatisticsTable1 = () => {
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPlanValue, setEditedPlanValue] = useState("");
  const [editedApplyValue, setEditedApplyValue] = useState("");

  useEffect(() => {
    fetch("https://fastapi-render-2wzq.onrender.com/students") // เรียก API FastAPI
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEditClick = (index, plan, apply) => {
    setEditingIndex(index);
    setEditedPlanValue(plan);
    setEditedApplyValue(apply);
  };

  const handleSaveClick = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].plan = editedPlanValue;
    updatedStudents[index].apply = editedApplyValue;
    setStudents(updatedStudents);
    setEditingIndex(null);
  };

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
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) => student.level === "ปวส") // กรองเฉพาะ ปวส
              .map((student, index) => (
                <tr key={index}>
                  <td>{student.department}</td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editedPlanValue}
                        onChange={(e) => setEditedPlanValue(e.target.value)}
                        className="form-control"
                      />
                    ) : (
                      student.plan
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editedApplyValue}
                        onChange={(e) => setEditedApplyValue(e.target.value)}
                        className="form-control"
                      />
                    ) : (
                      student.apply
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <button className="btn btn-success" onClick={() => handleSaveClick(index)}>
                        บันทึก
                      </button>
                    ) : (
                      <button className="btn btn-warning" onClick={() => handleEditClick(index, student.plan, student.apply)}>
                        แก้ไข
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsTable1;

