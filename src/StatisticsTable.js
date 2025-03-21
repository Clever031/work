import React, { useEffect, useState } from "react";

const StatisticsTable = () => {
  const [students, setStudents] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [newPlan, setNewPlan] = useState("");
  const [newApply, setNewApply] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState("");
  const [editedApplyValue, setEditedApplyValue] = useState("");
  const [editedPlanValue, setEditedPlanValue] = useState("");

  useEffect(() => {
    fetch("https://fastapi-render-2wzq.onrender.com/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddStudent = () => {
    const newStudent = {
      department: newDepartment,
      plan: parseInt(newPlan, 10),
      apply: parseInt(newApply, 10),
      level: "ปวช",
    };
    setStudents([...students, newStudent]);
    setNewDepartment("");
    setNewPlan("");
    setNewApply("");
  };

  const handleEditClick = (index, department, apply, plan) => {
    setEditingIndex(index);
    setEditedDepartment(department);
    setEditedApplyValue(apply);
    setEditedPlanValue(plan);
  };

  const handleSaveClick = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].department = editedDepartment;
    updatedStudents[index].apply = editedApplyValue;
    updatedStudents[index].plan = editedPlanValue;
    setStudents(updatedStudents);
    setEditingIndex(null);
  };

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
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) => student.level === "ปวช")
              .map((student, index) => (
                <tr key={index}>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editedDepartment}
                        onChange={(e) => setEditedDepartment(e.target.value)}
                        className="form-control form-control-sm"
                      />
                    ) : (
                      student.department
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editedPlanValue}
                        onChange={(e) => setEditedPlanValue(e.target.value)}
                        className="form-control form-control-sm"
                        style={{ width: "80px", margin: "0 auto" }}
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
                        className="form-control form-control-sm"
                        style={{ width: "80px", margin: "0 auto" }}
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
                      <button className="btn btn-warning" onClick={() => handleEditClick(index, student.department, student.apply, student.plan)}>
                        แก้ไข
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            {/* Input Row */}
            <tr>
              <td>
                <input
                  type="text"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="form-control"
                  placeholder="สาขาวิชา"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="form-control"
                  placeholder="แผนรับ"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newApply}
                  onChange={(e) => setNewApply(e.target.value)}
                  className="form-control"
                  placeholder="ยอดรับ"
                />
              </td>
              <td>
                <button className="btn btn-success" onClick={handleAddStudent}>
                  บันทึก
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsTable;

