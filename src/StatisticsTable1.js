import React, { useEffect, useState } from "react";

const StatisticsTable1 = () => {
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState("");
  const [editedPlan, setEditedPlan] = useState("");
  const [editedApply, setEditedApply] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newPlan, setNewPlan] = useState("");
  const [newApply, setNewApply] = useState("");

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
      level: "ปวส",
    };
    setStudents([...students, newStudent]);
    setNewDepartment("");
    setNewPlan("");
    setNewApply("");
  };

  const handleEditClick = (index, student) => {
    setEditingIndex(index);
    setEditedDepartment(student.department);
    setEditedPlan(student.plan);
    setEditedApply(student.apply);
  };

  const handleSaveClick = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index] = {
      ...updatedStudents[index],
      department: editedDepartment,
      plan: parseInt(editedPlan, 10),
      apply: parseInt(editedApply, 10),
    };
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
              .filter((student) => student.level === "ปวส")
              .map((student, index) => (
                <tr key={index}>
                  {editingIndex === index ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editedDepartment}
                          onChange={(e) => setEditedDepartment(e.target.value)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editedPlan}
                          onChange={(e) => setEditedPlan(e.target.value)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editedApply}
                          onChange={(e) => setEditedApply(e.target.value)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button className="btn btn-success" onClick={() => handleSaveClick(index)}>
                          บันทึก
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{student.department}</td>
                      <td>{student.plan}</td>
                      <td>{student.apply}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEditClick(index, student)}
                        >
                          แก้ไข
                        </button>
                      </td>
                    </>
                  )}
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
                <button className="btn btn-success" onClick={handleAddStudent}>บันทึก</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsTable1;


