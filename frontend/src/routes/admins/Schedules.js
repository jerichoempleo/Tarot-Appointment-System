import React, { useEffect, useState } from "react";
import axios from "axios";

function Schedules() {
  const [scheduleId, setScheduleId] = useState("");
  const [number_slots, setNumberSlots] = useState("");
  const [date, setDate] = useState("");

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  // Helper function to get JWT token
  const getToken = () => sessionStorage.getItem('jwttoken');

  async function Load() {
    try {
      const token = getToken();
      const result = await axios.get("https://localhost:7160/api/Schedule/GetSchedule", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedules(result.data.schedules); //Dito lang pala ako nagkamali kaya di nagana .map function dapat small "s"
      console.log(result.data);
    } catch (error) {
      console.error("There was an error loading the data!", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    
    try {
      const token = getToken();
      await axios.post("https://localhost:7160/api/Schedule/AddSchedule", {
        number_slots, //Name in the database
        date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Schedule Added Successfully");
      setScheduleId("");
      setNumberSlots("");
      setDate("");
      Load();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function editSchedule(schedule) {
    setNumberSlots(schedule.number_slots);
    setDate(schedule.date);
    setScheduleId(schedule.schedule_id);
  }

  async function DeleteSchedule(schedule_id) {
    try {
      const token = getToken();
      await axios.delete(`https://localhost:7160/api/Schedule/DeleteSchedule/${schedule_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Schedule deleted Successfully");
      setScheduleId("");
      setNumberSlots("");
      setDate("");
      Load();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function update(event) {
    event.preventDefault();

    try {
      const token = getToken();
      await axios.patch(`https://localhost:7160/api/Schedule/UpdateSchedule/${scheduleId}`, {
        number_slots, //Database name
        date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Schedule Updated Successfully");
      setScheduleId("");
      setNumberSlots("");
      setDate("");
      Load();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div>
      <h1>Schedules</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="schedule_id"
              hidden
              value={scheduleId}
              onChange={(event) => setScheduleId(event.target.value)}
            />
            <label>Number Slots</label>
            <input
              type="text"
              className="form-control"
              id="number_slots"
              value={number_slots}
              onChange={(event) => setNumberSlots(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="Date"
              className="form-control"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
      
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Add
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Schedule Id</th>
            <th scope="col">Number Slots</th>
            <th scope="col">Date</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {schedules.map(schedule => (
          <tbody key={schedule.schedule_id}>
            <tr>
              <th scope="row">{schedule.schedule_id}</th>
              <td>{schedule.number_slots}</td>
              <td>{schedule.date}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editSchedule(schedule)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteSchedule(schedule.schedule_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Schedules;
