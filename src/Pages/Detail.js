import React, { useEffect, useState } from "react";
import "./Details.css";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from "react-router-dom";

function Detail() {
  const [students, setStudents] = useState();
  const { studentId } = useParams();

  // Get single data
  const fetchSingleData = async (studentId) => {
    try {
      const firestore = getFirestore();
      const studentRef = doc(firestore, "students", studentId);
      const studentSnapshot = await getDoc(studentRef);
      if (studentSnapshot.exists()) {
        const studentData = {
          id: studentSnapshot.id,
          ...studentSnapshot.data(),
        };
        setStudents(studentData);
        console.log(studentData);
      } else {
        console.log("No student found with ID:", studentId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleData(studentId);
  }, []);
  return (
    <div className="mainDiv">
      <h1 style={{ color: "white" }}>
        <span className="details">Name </span>
        <span style={{ color: "white" }}>{students?.name}</span>
      </h1>
      <h2>
        <span className="details">Age </span>
        <span>{students?.age}</span>
      </h2>
      <h2>
        <span className="details">Place </span>
        <span>{students?.place}</span>
      </h2>
      <h2>
        <span className="details">Mobile </span>
        <span>{students?.mobile}</span>
      </h2>
      <h2>
        <span className="details">Email </span>
        <span>{students?.email}</span>
      </h2>
    </div>
  );
}

export default Detail;
