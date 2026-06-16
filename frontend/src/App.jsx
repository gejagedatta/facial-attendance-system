import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import StudentsPage from "./pages/students/StudentsPage";

import FaceRegisterPage from "./pages/students/FaceRegisterPage";

import AttendancePage from "./pages/attendance/AttendancePage";

import AttendanceHistoryPage from "./pages/attendance/AttendanceHistoryPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/face-register"
          element={
            <ProtectedRoute>
              <FaceRegisterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AttendancePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance-history"
          element={<AttendanceHistoryPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;