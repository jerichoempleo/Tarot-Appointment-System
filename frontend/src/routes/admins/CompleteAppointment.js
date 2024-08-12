import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; //Code for base url

function CompleteAppointment() {
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
        "/api/Appointment/GetCompleteAppointment",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("There was an error loading the appointments!", error);
    }
  }

  const getToken = () => sessionStorage.getItem("jwttoken");

  return (
    <div>
      <h1>Complete Appointment</h1>

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Appointment ID</th>
            <th scope="col">Service Name</th>
            <th scope="col">Date Appointment</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const service = services.find(
              (service) => service.service_id === appointment.service_id
            );
            const schedule = schedules.find(
              (schedule) => schedule.schedule_id === appointment.schedule_id
            );

            return (
              <tr key={appointment.appointment_id}>
                <td>{appointment.appointment_id}</td>
                <td>{service.service_name}</td>
                <td>{schedule.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CompleteAppointment;
