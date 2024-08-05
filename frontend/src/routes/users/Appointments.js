import React, { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {
  const [appointmentId, setAppointmentId] = useState("");
  const [serviceID, setServiceID] = useState("");
  const [scheduleID, setScheduleID] = useState("");
  // const [date_appointment, setAppointmentDate] = useState("");
  const [time_slot, setTimeSlot] = useState("");

  const [services, setServices] = useState([]);
  const [schedules, setSchedules] = useState([]);

  // Helper function to get JWT token
  const getToken = () => sessionStorage.getItem('jwttoken');

  useEffect(() => {
    (async () => {
      await loadServices();
      await loadSchedules();
    })();
  }, []);

  async function loadServices() {
    try {
      const token = getToken();
      const response = await axios.get("https://localhost:7160/api/Service/GetService", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data.services); //kulang ng .services kaya ayaw lumabas
    } catch (error) {
      console.error("There was an error loading the services!", error);
    }
  }

  async function loadSchedules() {
    try {
      const token = getToken();
      const response = await axios.get("https://localhost:7160/api/Schedule/GetSchedule", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedules(response.data.schedules); //kulang ng .services kaya ayaw lumabas
    } catch (error) {
      console.error("There was an error loading the schedules!", error);
    }
  }
//Need ata iload kapag didisplay sa dropdown like loadServices

  //Continue Here 1:35 am July 30
  async function save(event) {
    event.preventDefault();
    
    try {
      const token = getToken();
      await axios.post("https://localhost:7160/api/Appointment/AddAppointment", {
        service_id: serviceID, //With Foreign Key to save in the DB
        schedule_id: scheduleID, //With Foreign Key to save in the DB
        // date_appointment,
        time_slot
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Appointment Added Successfully");
      setAppointmentId("");
      setServiceID("");
      setScheduleID("");
      // setAppointmentDate("");
      setTimeSlot("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div>
      <h1>Appointment</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <label>Service Name</label>
            <select
              className="form-control"
              id="service_id"
              value={serviceID}
              onChange={(event) => setServiceID(event.target.value)}
            >
              <option value="">Select a service</option>
              {services.length > 0 && services.map((service) => (
                <option key={service.service_id} value={service.service_id}>
                  {service.service_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date Appointment</label>
            <select
              className="form-control"
              id="schedule_id"
              value={scheduleID}
              onChange={(event) => setScheduleID(event.target.value)}
            >
              <option value="">Select a date</option>
              {schedules.length > 0 && schedules.map((schedule) => (
                <option key={schedule.schedule_id} value={schedule.schedule_id}>
                  {schedule.date}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="form-group">
            <label>Date Appointment</label>
            <input
              type="date"
              className="form-control"
              id="date_appointment"
              value={date_appointment}
              onChange={(event) => setAppointmentDate(event.target.value)}
            />
          </div> */}

          <div className="form-group">
            <label>Time Slot</label>
            <input
              type="time"
              className="form-control"
              id="time_slot"
              value={time_slot}
              onChange={(event) => setTimeSlot(event.target.value)}
            />
          </div>
      
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Add
            </button>
          </div>
        </form>
      </div>
      <br />
    </div>
  );
}

export default Appointments;
