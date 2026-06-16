import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import axios from "axios";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer

} from "recharts";


function DashboardPage() {

  const institute = JSON.parse(
    localStorage.getItem("institute")
  );

  const token = localStorage.getItem(
    "token"
  );

  const [students, setStudents] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  // ==========================================
  // FETCH STUDENTS
  // ==========================================

  const fetchStudents = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/students/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStudents(
        response.data.students
      );

    } catch (error) {

      console.log(error);
    }
  };

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

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    fetchStudents();

    fetchAttendance();

  }, []);

  // ==========================================
  // ANALYTICS
  // ==========================================

  const totalStudents =
    students.length;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const presentToday =
    attendance.filter(
      (item) => item.date === today
    ).length;

  const absentToday =
    totalStudents - presentToday;

  const attendancePercentage =
    totalStudents > 0
      ? (
          (presentToday / totalStudents)
          * 100
        ).toFixed(1)
      : 0;

  // ==========================================
  // PIE CHART DATA
  // ==========================================

  const pieData = [

    {
      name: "Present",
      value: presentToday
    },

    {
      name: "Absent",
      value: absentToday
    }
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  // ==========================================
  // DEPARTMENT ANALYTICS
  // ==========================================

  const departmentStats = {};

  students.forEach((student) => {

    const dept = student.department;

    if (!departmentStats[dept]) {

      departmentStats[dept] = 0;
    }

    departmentStats[dept]++;
  });

  const departmentData =
    Object.keys(departmentStats).map(
      (dept) => ({
        department: dept,
        students: departmentStats[dept]
      })
    );

  return (

    <DashboardLayout
      title={`Welcome, ${institute?.institute_name || "Institute"}`}
      subtitle="Enterprise AI Attendance Analytics"
    >

      {/* ================================= */}
      {/* ANALYTICS CARDS */}
      {/* ================================= */}

      <div className="grid grid-cols-4 gap-6">

        {/* TOTAL STUDENTS */}

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h2 className="text-slate-400">
            Total Students
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-cyan-400">
            {totalStudents}
          </h1>

        </div>

        {/* PRESENT TODAY */}

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h2 className="text-slate-400">
            Present Today
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-green-400">
            {presentToday}
          </h1>

        </div>

        {/* ABSENT TODAY */}

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h2 className="text-slate-400">
            Absent Today
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-400">
            {absentToday}
          </h1>

        </div>

        {/* ATTENDANCE % */}

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h2 className="text-slate-400">
            Attendance %
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-pink-400">
            {attendancePercentage}%
          </h1>

        </div>

      </div>

      {/* ================================= */}
      {/* CHARTS */}
      {/* ================================= */}

      <div className="grid grid-cols-2 gap-8 mt-10">

        {/* PIE CHART */}

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h1 className="text-2xl font-bold mb-6">
            Attendance Overview
          </h1>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {
                  pieData.map(
                    (entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h1 className="text-2xl font-bold mb-6">
            Department Analytics
          </h1>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={departmentData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="department" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="students"
                fill="#06b6d4"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ================================= */}
      {/* RECENT ATTENDANCE */}
      {/* ================================= */}

      <div className="mt-10 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

        <div className="p-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold">
            Recent Attendance
          </h1>

        </div>

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
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {
              attendance
                .slice(0, 5)
                .map((item) => (

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

export default DashboardPage;