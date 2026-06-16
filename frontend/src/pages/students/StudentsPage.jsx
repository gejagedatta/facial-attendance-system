import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../services/api";

import DashboardLayout from "../../components/layout/DashboardLayout";


function StudentsPage() {

  const navigate = useNavigate();

  const [students, setStudents] =
    useState([]);

  const [formData, setFormData] =
    useState({

      name: "",

      roll_no: "",

      department: "",

      year: "",

      email: "",

      phone: ""
    });

  const token = localStorage.getItem(
    "token"
  );

  // ======================================
  // HANDLE INPUT
  // ======================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  // ======================================
  // FETCH STUDENTS
  // ======================================

  const fetchStudents = async () => {

    try {

      const response = await API.get(
        "/students/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setStudents(
        response.data.students
      );

    } catch (error) {

      toast.error(
        "Failed to load students"
      );
    }
  };

  // ======================================
  // ADD STUDENT
  // ======================================

  const handleAddStudent =
    async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/students/add",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success(
        "Student added successfully"
      );

      fetchStudents();

      // RESET FORM

      setFormData({

        name: "",

        roll_no: "",

        department: "",

        year: "",

        email: "",

        phone: ""
      });

    } catch (error) {

      toast.error(
        "Failed to add student"
      );
    }
  };

  // ======================================
  // DELETE STUDENT
  // ======================================

  const handleDelete =
    async (student_id) => {

    try {

      await API.delete(
        `/students/delete/${student_id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success(
        "Student deleted"
      );

      fetchStudents();

    } catch (error) {

      toast.error(
        "Delete failed"
      );
    }
  };

  // ======================================
  // GENERATE ENCODING
  // ======================================

  const generateEncoding =
    async (student_id) => {

    try {

      const response =
        await API.post(
          `/face/generate-encoding/${student_id}`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      toast.success(
        response.data.message
      );

    } catch (error) {

      toast.error(
        "Encoding generation failed"
      );
    }
  };

  // ======================================
  // LOAD STUDENTS
  // ======================================

  useEffect(() => {

    fetchStudents();

  }, []);

  return (

    <DashboardLayout
      title="Student Management"
      subtitle="Manage students and AI face encodings"
    >

      {/* ====================================== */}
      {/* HEADER ACTION */}
      {/* ====================================== */}

      <div className="flex justify-end mb-8">

        <button
          onClick={() =>
            navigate("/face-register")
          }
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold"
        >
          Open Face Registration
        </button>

      </div>

      {/* ====================================== */}
      {/* ADD STUDENT FORM */}
      {/* ====================================== */}

      <form
        onSubmit={handleAddStudent}
        className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">

          Add New Student

        </h2>

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Student Name"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
            required
          />

          <input
            type="text"
            name="roll_no"
            value={formData.roll_no}
            placeholder="Roll Number"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
            required
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            placeholder="Department"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
          />

          <input
            type="text"
            name="year"
            value={formData.year}
            placeholder="Year"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
          />

        </div>

        <button
          type="submit"
          className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold"
        >
          Add Student
        </button>

      </form>

      {/* ====================================== */}
      {/* STUDENT TABLE */}
      {/* ====================================== */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Roll No
              </th>

              <th className="p-4 text-left">
                Department
              </th>

              <th className="p-4 text-left">
                Year
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              students.map(
                (student) => (

                <tr
                  key={student.student_id}
                  className="border-t border-slate-800"
                >

                  <td className="p-4">
                    {student.name}
                  </td>

                  <td className="p-4">
                    {student.roll_no}
                  </td>

                  <td className="p-4">
                    {student.department}
                  </td>

                  <td className="p-4">
                    {student.year}
                  </td>

                  <td className="p-4 flex gap-3 flex-wrap">

                    <button
                      onClick={() =>
                        navigate("/face-register")
                      }
                      className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
                    >
                      Register Face
                    </button>

                    <button
                      onClick={() =>
                        generateEncoding(
                          student.student_id
                        )
                      }
                      className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
                    >
                      Generate Encoding
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          student.student_id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default StudentsPage;