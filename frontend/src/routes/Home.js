import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {

const [student_id, setstudentId] = useState(""); //student_id = name in the database
const [stname, setName] = useState("");
const [course, setCourse] = useState("");
const [students, setUsers] = useState([]);
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {
    
    const result = await axios.get("https://localhost:7160/api/Student/GetStudent");
    setUsers(result.data);
    console.log(result.data);
  }
 
  async function save(event) {
   
    event.preventDefault();
    try {
      await axios.post("https://localhost:7160/api/Student/AddStudent", {
        
        stname: stname, //Name in the database
        course: course,
       
      });
      alert("Student Registation Successfully");
          setstudentId("");
          setName("");
          setCourse("");
       
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStudent(students) {
    setName(students.stname);
    setCourse(students.course);
   
 
    setstudentId(students.student_id);
  }
 

  async function DeleteStudent(student_id) {
  await axios.delete("https://localhost:7160/api/Student/DeleteStudent/" + student_id);
   alert("Employee deleted Successfully");
   setstudentId("");
   setName("");
   setCourse("");
   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {

  await axios.patch("https://localhost:7160/api/Student/UpdateStudent/"+ students.find((u) => u.student_id === student_id).student_id || student_id,
        {
        student_id: student_id, //Name in the database
        stname: stname,
        course: course,

        }
      );
      alert("Registation Updated");
      setstudentId("");
      setName("");
      setCourse("");
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

    return (
      <div>
        <h1>Student Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              student_id="student_id"
              hidden
              value={student_id}
              onChange={(event) => {
                setstudentId(event.target.value);
              }}
            />

            <label>Student Name</label>
            <input
              type="text"
              class="form-control"
              student_id="stname"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Course</label>
            <input
              type="text"
              class="form-control"
              student_id="course"
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
         
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <th scope="row">{student.student_id} </th>
                <td>{student.stname}</td>
                <td>{student.course}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStudent(student.student_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default Home;