import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import axios from "axios";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";


function AttendanceHistoryPage() {

  const [attendance, setAttendance] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("");

  const [dateFilter, setDateFilter] =
    useState("");

  const token = localStorage.getItem(
    "token"
  );

  // ==========================================
  // FETCH ATTENDANCE
  // ==========================================

  const fetchAttendance = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/attendance/history",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAttendance(
        response.data.attendance
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchAttendance();

  }, []);

  // ==========================================
  // FILTERED DATA
  // ==========================================

  const filteredAttendance =
    attendance.filter((item) => {

      const matchesSearch =
        item.student_name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesDepartment =
        departmentFilter === "" ||
        item.department === departmentFilter;

      const matchesDate =
        dateFilter === "" ||
        item.date === dateFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesDate
      );
    });

  // ==========================================
  // EXPORT EXCEL
  // ==========================================

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        filteredAttendance
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });

    const data = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    );

    saveAs(
      data,
      "attendance_report.xlsx"
    );
  };

  // ==========================================
  // EXPORT PDF
  // ==========================================

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Attendance Report",
      14,
      15
    );

    autoTable(doc, {

      head: [[
        "Student",
        "Roll No",
        "Department",
        "Date",
        "Time",
        "Status"
      ]],

      body: filteredAttendance.map(
        (item) => [

          item.student_name,

          item.roll_no,

          item.department,

          item.date,

          item.time,

          item.status
        ]
      )
    });

    doc.save(
      "attendance_report.pdf"
    );
  };

  // ==========================================
  // UNIQUE DEPARTMENTS
  // ==========================================

  const departments = [
    ...new Set(
      attendance.map(
        (item) => item.department
      )
    )
  ];

  return (

    <DashboardLayout
      title="Attendance History"
      subtitle="View and export attendance reports"
    >

      {/* =================================== */}
      {/* ACTION BUTTONS */}
      {/* =================================== */}

      <div className="flex justify-end gap-4 mb-8">

        <button
          onClick={exportExcel}
          className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
        >
          Export Excel
        </button>

        <button
          onClick={exportPDF}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl"
        >
          Export PDF
        </button>

      </div>

      {/* =================================== */}
      {/* FILTERS */}
      {/* =================================== */}

      <div className="grid grid-cols-3 gap-4 mb-8">

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 p-4 rounded-xl outline-none"
        />

        {/* DEPARTMENT */}

        <select
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(
              e.target.value
            )
          }
          className="bg-slate-900 border border-slate-700 p-4 rounded-xl outline-none"
        >

          <option value="">
            All Departments
          </option>

          {
            departments.map((dept) => (

              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))
          }

        </select>

        {/* DATE */}

        <input
          type="date"
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(
              e.target.value
            )
          }
          className="bg-slate-900 border border-slate-700 p-4 rounded-xl outline-none"
        />

      </div>

      {/* =================================== */}
      {/* TABLE */}
      {/* =================================== */}

      <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Roll No
              </th>

              <th className="p-4 text-left">
                Department
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Time
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredAttendance.map(
                (item) => (

                <tr
                  key={item.attendance_id}
                  className="border-b border-slate-800"
                >

                  <td className="p-4">
                    {item.student_name}
                  </td>

                  <td className="p-4">
                    {item.roll_no}
                  </td>

                  <td className="p-4">
                    {item.department}
                  </td>

                  <td className="p-4">
                    {item.date}
                  </td>

                  <td className="p-4">
                    {item.time}
                  </td>

                  <td className="p-4 text-green-400">
                    {item.status}
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

export default AttendanceHistoryPage;