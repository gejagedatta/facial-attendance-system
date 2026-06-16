import { useEffect, useRef, useState } from "react";

import axios from "axios";


function AttendancePage() {

  const videoRef = useRef(null);

  const canvasRef = useRef(null);

  const [cameraStarted, setCameraStarted] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [recognizedStudent, setRecognizedStudent] =
    useState(null);

  const token = localStorage.getItem(
    "token"
  );

  // ==========================================
  // START CAMERA
  // ==========================================

  const startCamera = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true
        });

      videoRef.current.srcObject = stream;

      setCameraStarted(true);

    } catch (error) {

      console.log(error);

      alert(
        "Camera access denied"
      );
    }
  };

  // ==========================================
  // MARK ATTENDANCE
  // ==========================================

  const markAttendance = async () => {

    try {

      setLoading(true);

      setMessage("");

      setRecognizedStudent(null);

      const canvas =
        canvasRef.current;

      const video =
        videoRef.current;

      const context =
        canvas.getContext("2d");

      canvas.width = video.videoWidth;

      canvas.height = video.videoHeight;

      context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const image =
        canvas.toDataURL(
          "image/jpeg"
        );

      const response =
        await axios.post(
          "http://127.0.0.1:5000/api/attendance/mark",
          { image },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      if (response.data.success) {

        setMessage(
          response.data.message
        );

        setRecognizedStudent(
          response.data.student
        );

      } else {

        setMessage(
          response.data.message
        );
      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Attendance failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // ==========================================
  // AUTO DETECT LOOP
  // ==========================================

  useEffect(() => {

    let interval;

    if (cameraStarted) {

      interval = setInterval(() => {

        markAttendance();

      }, 5000);
    }

    return () => clearInterval(
      interval
    );

  }, [cameraStarted]);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Live AI Attendance
          </h1>

          <p className="text-slate-400 mt-2">
            Real-time Facial Recognition Attendance System
          </p>

        </div>

        <button
          onClick={startCamera}
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
        >
          Start Camera
        </button>

      </div>

      {/* ================================= */}
      {/* CAMERA SECTION */}
      {/* ================================= */}

      <div className="grid grid-cols-3 gap-8">

        {/* CAMERA */}

        <div className="col-span-2">

          <div className="bg-slate-900 rounded-2xl p-5 relative">

            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-2xl border-4 border-cyan-500"
            />

            {/* AI SCAN OVERLAY */}

            <div className="absolute top-10 left-10 right-10 bottom-10 border-4 border-green-400 rounded-2xl pointer-events-none animate-pulse"></div>

            {/* STATUS */}

            <div className="absolute top-5 left-5 bg-black/70 px-4 py-2 rounded-xl">

              <h1 className="text-green-400 font-bold">
                ● AI Detection Active
              </h1>

            </div>

          </div>

        </div>

        {/* SIDE PANEL */}

        <div className="space-y-6">

          {/* STATUS CARD */}

          <div className="bg-slate-900 p-6 rounded-2xl">

            <h1 className="text-2xl font-bold mb-4">
              Recognition Status
            </h1>

            {
              loading ? (

                <p className="text-yellow-400">
                  Scanning Face...
                </p>

              ) : (

                <p className="text-green-400">
                  Ready
                </p>
              )
            }

          </div>

          {/* MESSAGE */}

          <div className="bg-slate-900 p-6 rounded-2xl">

            <h1 className="text-2xl font-bold mb-4">
              Attendance Result
            </h1>

            <p className="text-cyan-400">
              {message}
            </p>

          </div>

          {/* STUDENT INFO */}

          {
            recognizedStudent && (

              <div className="bg-slate-900 p-6 rounded-2xl">

                <h1 className="text-2xl font-bold mb-4">
                  Recognized Student
                </h1>

                <div className="space-y-3">

                  <p>
                    <span className="text-slate-400">
                      Name:
                    </span>
                    {" "}
                    {recognizedStudent.name}
                  </p>

                  <p>
                    <span className="text-slate-400">
                      Roll No:
                    </span>
                    {" "}
                    {recognizedStudent.roll_no}
                  </p>

                  <p>
                    <span className="text-slate-400">
                      Department:
                    </span>
                    {" "}
                    {recognizedStudent.department}
                  </p>

                </div>

              </div>
            )
          }

        </div>

      </div>

      {/* HIDDEN CANVAS */}

      <canvas
        ref={canvasRef}
        className="hidden"
      />

    </div>
  );
}

export default AttendancePage;