import React, { useEffect, useState } from "react";

const StatisticsTable1 = () => {
  const [students, setStudents] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [newPlan, setNewPlan] = useState("");
  const [newApply, setNewApply] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState("");
  const [editedApplyValue, setEditedApplyValue] = useState("");
  const [editedPlanValue, setEditedPlanValue] = useState("");

  const fetchStudents = () => {
    fetch("https://fastapi-render-2wzq.onrender.com/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    const newStudent = {
      department: newDepartment,
      plan: parseInt(newPlan, 10),
      apply: parseInt(newApply, 10),
      level: "ปวส",
      save_data: new Date().toISOString(),
    };
    try {
      const response = await fetch("https://fastapi-render-2wzq.onrender.com/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      if (response.ok) {
        fetchStudents();
        setNewDepartment("");
        setNewPlan("");
        setNewApply("");
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleSaveClick = async (id) => {
    const updatedStudent = {
      department: editedDepartment,
      apply: parseInt(editedApplyValue, 10),
      plan: parseInt(editedPlanValue, 10),
      level: "ปวส",
      save_data: new Date().toISOString(),
    };
    try {
      const response = await fetch(`https://fastapi-render-2wzq.onrender.com/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });
      if (response.ok) {
        fetchStudents();
        setEditingIndex(null);
      } else {
        console.error("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://fastapi-render-2wzq.onrender.com/students/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchStudents();
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEditClick = (index, department, apply, plan) => {
    setEditingIndex(index);
    setEditedDepartment(department);
    setEditedApplyValue(apply);
    setEditedPlanValue(plan);
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
                <tr key={student._id}>
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
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleSaveClick(student._id)}
                      >
                        บันทึก
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleEditClick(index, student.department, student.apply, student.plan)}
                        >
                          แก้ไข
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteClick(student._id)}
                        >
                          ลบ
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
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

export default StatisticsTable1;
