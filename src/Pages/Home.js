import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [students, setStudents] = useState([]);
  const [studentId, setstudentId] = useState([]);
  const [singleStudentData, setsingleStudentData] = useState([]);
  const [updatedStudentData, setUpdatedStudentData] = useState({
    name: singleStudentData.name,
    age: singleStudentData.age,
    place: singleStudentData.place,
    mobile: singleStudentData.mobile,
    email: singleStudentData.email,
  });

  const [open, setOpen] = useState();
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    place: "",
    mobile: "",
    email: "",
  });
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyBsuyALkiFj2sf48hvBa0T2pABRGYw9QwA",
    authDomain: "porto-bc83c.firebaseapp.com",
    projectId: "porto-bc83c",
    storageBucket: "porto-bc83c.appspot.com",
    messagingSenderId: "840938555551",
    appId: "1:840938555551:web:6492d6500cdc4d93affaaa",
    measurementId: "G-HZC66R9KMZ",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    setUpdatedStudentData({
      name: singleStudentData.name,
      age: singleStudentData.age,
      place: singleStudentData.place,
      mobile: singleStudentData.mobile,
      email: singleStudentData.email,
    });
  }, [singleStudentData]);

  // Get

  const fetchData = async () => {
    try {
      const firestore = getFirestore();
      const querySnapshot = await getDocs(collection(firestore, "students"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        setsingleStudentData(studentData);
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

  // Add
  const addStudent = async (e) => {
    e?.preventDefault();
    if (newStudent !== "") {
      try {
        const firestore = getFirestore();
        await addDoc(collection(firestore, "students"), newStudent);

        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleNameChange = (e) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      name: e.target.value,
    }));
  };

  const handleAgeChange = (e) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      age: e.target.value,
    }));
  };

  const handlePlaceChange = (e) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      place: e.target.value,
    }));
  };

  const handleMobileChange = (e) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      mobile: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      email: e.target.value,
    }));
  };
  // Delete

  const deleteStudent = async (id) => {
    try {
      const firestore = getFirestore();
      const studentRef = doc(firestore, "students", id);
      console.log("Deleting student with ID:", id);
      await deleteDoc(studentRef);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // Update

  const updateStudent = async (e) => {
    e?.preventDefault();
    try {
      const firestore = getFirestore();
      const studentRef = doc(firestore, "students", studentId);
      await updateDoc(studentRef, updatedStudentData);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameUpdate = (e) => {
    setUpdatedStudentData((prevStudent) => ({
      ...prevStudent,
      name: e.target.value,
    }));
  };

  const handleAgeUpdate = (e) => {
    setUpdatedStudentData((prevStudent) => ({
      ...prevStudent,
      age: e.target.value,
    }));
  };

  const handlePlaceUpdate = (e) => {
    setUpdatedStudentData((prevStudent) => ({
      ...prevStudent,
      place: e.target.value,
    }));
  };

  const handleMobileUpdate = (e) => {
    setUpdatedStudentData((prevStudent) => ({
      ...prevStudent,
      mobile: e.target.value,
    }));
  };

  const handleEmailUpdate = (e) => {
    setUpdatedStudentData((prevStudent) => ({
      ...prevStudent,
      email: e.target.value,
    }));
  };

  function routToDetails(studentId) {
    navigate(`/details/${studentId}`);
  }
  return (
    <div className="home">
      <section className="tableDiv">
        <h1 className="tableName">Students Table</h1>
        <div className="formDiv">
          {!open && (
            <form>
              <input placeholder="Name" onChange={handleNameChange} />
              <input placeholder="Age" onChange={handleAgeChange} />
              <input placeholder="Place" onChange={handlePlaceChange} />
              <br></br>
              <input placeholder="Mobile" onChange={handleMobileChange} />
              <input placeholder="Email" onChange={handleEmailChange} />
              <button onClick={addStudent}>Add</button>
            </form>
          )}
        </div>
        <table>
          <tbody>
            <tr className="tr">
              <th>Name</th>
              <th>Age</th>
              <th>Place</th>
              <th></th>
            </tr>
            {students.map((student) => {
              return (
                <tr key={student.id} style={{ color: "white" }}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.place}</td>
                  <td>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      style={{
                        marginRight: "25px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      Delete
                    </button>
                    <i
                      onClick={() => {
                        setOpen(true);
                        fetchSingleData(student.id);
                        setstudentId(student.id);
                      }}
                      className="bi bi-pencil-square"
                    ></i>
                    <button
                      style={{
                        marginRight: "-70px",
                        marginLeft: "20px",
                        backgroundColor: "green",
                        color: "white",
                      }}
                      onClick={() => {
                        routToDetails(student.id);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {open && (
          <div className="formDiv2">
            <form>
              <input
                value={updatedStudentData.name}
                placeholder="Name"
                onChange={handleNameUpdate}
              />
              <input
                value={updatedStudentData.age}
                placeholder="Age"
                onChange={handleAgeUpdate}
              />
              <input
                value={updatedStudentData.place}
                placeholder="Place"
                onChange={handlePlaceUpdate}
              />
              <i
                style={{ color: "white", position: "relative", left: "10px" }}
                className="bi bi-x-octagon"
                onClick={() => {
                  setOpen(false);
                }}
              ></i>
              <br></br>
              <input
                value={updatedStudentData.mobile}
                placeholder="Mobile"
                onChange={handleMobileUpdate}
              />
              <input
                value={updatedStudentData.email}
                placeholder="Email"
                onChange={handleEmailUpdate}
              />
              <button onClick={updateStudent}>Update</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
