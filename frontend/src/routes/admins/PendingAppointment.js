import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; //Code for base url

function PendingAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    (async () => {
      await loadServices();
      await loadSchedules();
      await loadAppointments();
    })();
  }, []);

  async function loadServices() {
    try {
      const token = getToken();
      const response = await axiosInstance.get(
        "/api/Service/GetService",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setServices(response.data.services);
    } catch (error) {
      console.error("There was an error loading the services!", error);
    }
  }

  async function loadSchedules() {
    try {
      const token = getToken();
      const response = await axiosInstance.get(
        "/api/Schedule/GetSchedule",
        {
          //The url is the only thing i changed here
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSchedules(response.data.schedules);
    } catch (error) {
      console.error("There was an error loading the schedules!", error);
    }
  }

  async function loadAppointments() {
    try {
      const token = getToken();
      const response = await axiosInstance.get(
        "/api/Appointment/GetPendingAppointment",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("There was an error loading the appointments!", error);
    }
  }

  async function CompleteAppointment(appointment) {
    try {
      const token = getToken();
      await axiosInstance.put(
        `/api/Appointment/CompleteStatus/${appointment.appointment_id}`, {}, // Empty object for request body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Appointment Complete Successfully");
      await loadAppointments();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  const getToken = () => sessionStorage.getItem("jwttoken");

  return (
    <div>
      <h1>Pending Appointment</h1>

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Appointment ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Service Name</th>
            <th scope="col">Date Appointment</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const service = services.find(
              (service) => service.service_id === appointment.service_id
            );
            // const schedule = schedules.find(
            //   (schedule) => schedule.schedule_id === appointment.schedule_id
            // );

            return (
              <tr key={appointment.appointment_id}>
                <td>{appointment.appointment_id}</td>
                {/* Galing sa backend ung "user_fullname" in appointmentDTO/Controller parang cinall lng dito. */}
                <td>{appointment.user_fullname}</td> 
                <td>{service.service_name}</td>
                {/* <td>{schedule.date}</td> */}
                <td>{appointment.date_appointment}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => CompleteAppointment(appointment)}
                  >
                    Complete
                  </button>
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PendingAppointment;
