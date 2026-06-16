import cv2
import numpy as np

# ==========================================
# FACE CASCADE
# ==========================================

face_detector = cv2.CascadeClassifier(

    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)


# ==========================================
# DETECT FACE
# ==========================================

def detect_face(frame):

    try:

        gray = cv2.cvtColor(
            frame,
            cv2.COLOR_BGR2GRAY
        )

        faces = face_detector.detectMultiScale(

            gray,

            scaleFactor=1.1,

            minNeighbors=5,

            minSize=(80, 80)
        )

        if len(faces) == 0:

            return None

        # ======================================
        # GET LARGEST FACE
        # ======================================

        largest_face = max(
            faces,
            key=lambda rect:
                rect[2] * rect[3]
        )

        x, y, w, h = largest_face

        face = frame[
            y:y+h,
            x:x+w
        ]

        return face

    except Exception as e:

        print(
            "Face Detection Error:",
            e
        )

        return None


# ==========================================
# GENERATE EMBEDDING
# ==========================================

def generate_embedding(image_path):

    try:

        image = cv2.imread(image_path)

        if image is None:

            return None

        return generate_embedding_from_frame(
            image
        )

    except Exception as e:

        print(
            "Image Embedding Error:",
            e
        )

        return None


# ==========================================
# GENERATE EMBEDDING FROM FRAME
# ==========================================

def generate_embedding_from_frame(frame):

    try:

        # ======================================
        # DETECT FACE
        # ======================================

        face = detect_face(frame)

        if face is None:

            print("No face detected")

            return None

        # ======================================
        # RESIZE FACE
        # ======================================

        face = cv2.resize(
            face,
            (160, 160)
        )

        # ======================================
        # CONVERT TO RGB
        # ======================================

        face = cv2.cvtColor(
            face,
            cv2.COLOR_BGR2RGB
        )

        # ======================================
        # NORMALIZE PIXELS
        # ======================================

        face = face.astype(
            "float32"
        ) / 255.0

        # ======================================
        # CREATE EMBEDDING
        # ======================================

        embedding = face.flatten()

        # ======================================
        # NORMALIZE VECTOR
        # ======================================

        norm = np.linalg.norm(
            embedding
        )

        if norm == 0:

            return None

        embedding = embedding / norm

        return embedding.tolist()

    except Exception as e:

        print(
            "Embedding Error:",
            e
        )

        return None


# ==========================================
# COMPARE EMBEDDINGS
# ==========================================

def compare_embeddings(

    embedding1,

    embedding2,

    threshold=0.45
):

    try:

        embedding1 = np.array(
            embedding1,
            dtype=np.float32
        )

        embedding2 = np.array(
            embedding2,
            dtype=np.float32
        )

        # ======================================
        # NORMALIZE AGAIN
        # ======================================

        embedding1 = embedding1 / np.linalg.norm(
            embedding1
        )

        embedding2 = embedding2 / np.linalg.norm(
            embedding2
        )

        # ======================================
        # COSINE SIMILARITY
        # ======================================

        similarity = np.dot(
            embedding1,
            embedding2
        )

        matched = similarity > threshold

        print(
            f"Similarity Score: {similarity}"
        )

        return matched, float(similarity)

    except Exception as e:

        print(
            "Compare Error:",
            e
        )

        return False, 0.0