import { useRef, useState } from "react";
import Webcam from "react-webcam";

import toast from "react-hot-toast";

import API from "../../services/api";

function FaceRegisterPage() {

    const webcamRef = useRef(null);

    const [capturing, setCapturing] = useState(false);

    const [images, setImages] = useState([]);

    const [studentId, setStudentId] = useState("");

    const token = localStorage.getItem("token");

    // ======================================
    // START AUTO CAPTURE
    // ======================================

    const startCapture = () => {

        if (!studentId) {
            toast.error("Enter student ID");
            return;
        }

        setCapturing(true);

        const capturedImages = [];

        let count = 0;

        const interval = setInterval(() => {

            const imageSrc = webcamRef.current.getScreenshot();

            if (imageSrc) {

                capturedImages.push(imageSrc);

                count++;

                toast.success(
                    `Captured ${count} image`
                );
            }

            // Stop after 10 images
            if (count >= 10) {

                clearInterval(interval);

                setCapturing(false);

                setImages(capturedImages);

                toast.success(
                    "Face capture completed"
                );
            }

        }, 700);
    };

    // ======================================
    // SAVE FACE DATASET
    // ======================================

    const handleSave = async () => {

        try {

            const response = await API.post(
                "/face/register",
                {
                    student_id: studentId,
                    images: images
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(response.data.message);

        } catch (error) {

            toast.error("Face registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-4xl font-bold mb-10">
                AI Face Registration
            </h1>

            {/* Student ID */}

            <input
                type="text"
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) =>
                    setStudentId(e.target.value)
                }
                className="bg-slate-800 p-3 rounded-lg mb-6 w-[300px]"
            />

            {/* Webcam */}

            <div className="mb-8">

                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="rounded-2xl border border-slate-700"
                />

            </div>

            {/* Buttons */}

            <div className="flex gap-4">

                <button
                    onClick={startCapture}
                    disabled={capturing}
                    className="bg-cyan-500 px-6 py-3 rounded-xl font-semibold"
                >
                    {
                        capturing
                            ? "Capturing..."
                            : "Start AI Capture"
                    }
                </button>

                <button
                    onClick={handleSave}
                    disabled={images.length === 0}
                    className="bg-green-500 px-6 py-3 rounded-xl font-semibold"
                >
                    Save Dataset
                </button>

            </div>

            {/* Preview */}

            <div className="grid grid-cols-5 gap-4 mt-10">

                {
                    images.map((img, index) => (

                        <img
                            key={index}
                            src={img}
                            alt=""
                            className="rounded-xl"
                        />

                    ))
                }

            </div>

        </div>
    );
}

export default FaceRegisterPage;