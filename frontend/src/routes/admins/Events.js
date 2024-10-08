import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axiosInstance from "../../api/axiosInstance"; // Make sure to use the same axiosInstance

const localizer = momentLocalizer(moment);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fullName, setFullName] = useState("");
  const [serviceName, setServiceName] = useState(""); // New state for service name
  const [selectEvent, setSelectEvent] = useState(null);

  const [services, setServices] = useState([]);

  // Helper function to get JWT token
  const getToken = () => sessionStorage.getItem('jwttoken');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = getToken();
        const response = await axiosInstance.get("/api/Service/GetService", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServices(response.data.services);
      } catch (error) {
        console.error("There was an error fetching the services!", error);
      }
    };

    // Fetch schedules and appointments and convert them to events for the calendar
    const fetchSchedulesAndAppointments = async () => {
      try {
        const token = getToken();

        // Fetch schedules
        const scheduleResult = await axiosInstance.get("/api/Schedule/GetSchedule", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const schedules = scheduleResult.data.schedules;

        // Fetch appointments
        const appointmentResult = await axiosInstance.get("/api/Appointment/GetPendingAppointment", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const appointments = appointmentResult.data.appointments;

        // Convert schedules to calendar events
        const calendarEvents = schedules.flatMap(schedule => {
          const scheduleAppointments = appointments.filter(appointment =>
            new Date(appointment.date_appointment).toDateString() === new Date(schedule.date).toDateString()
          );

          return scheduleAppointments.map(appointment => {
            const service = services.find(service => service.service_id === appointment.service_id);

            return {
              title: appointment.user_fullname, // Display full name
              start: new Date(appointment.date_appointment),
              end: new Date(appointment.date_appointment), // Both start and end are the same
              allDay: true, // Make it an all-day event para walang time
              service_name: service.service_name, // Add service name
              appointment_id: appointment.appointment_id // You need to put this to know what appointment ID it is.
            };
          });
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error("There was an error fetching the schedules and appointments!", error);
      }
    };

    fetchServices();
    fetchSchedulesAndAppointments();
  }, [services]); // Add services as a dependency

  const handleSelectSlot = (slotInfo) => {
    const eventsOnSelectedDate = events.filter(event =>
      new Date(event.start).toDateString() === slotInfo.start.toDateString()
    );

    if (eventsOnSelectedDate.length > 0) {
      setShowModal(true);
      setSelectedDate(slotInfo.start);
      setSelectEvent(eventsOnSelectedDate[0]);
      setFullName(eventsOnSelectedDate[0].title);
      setServiceName(eventsOnSelectedDate[0].service_name); // Set service name
    } else {
      setShowModal(false);
    }
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setFullName(event.title);
    setServiceName(event.service_name); // Set service name
  };

  async function CompleteAppointment() {

    try {
      const token = getToken();
      await axiosInstance.put(
        `/api/Appointment/CompleteStatus/${selectEvent.appointment_id}`, {}, // Empty object for request body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Appointment Complete Successfully");

      setShowModal(false); // Close modal after completion
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
      />

      {showModal && (
        <div
          className="modal"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {"Appointment"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setFullName("");
                    setSelectEvent(null);
                    setServiceName(""); // Clear service name
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="fullName" className="form-label">
                  Full Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  readOnly
                />
                <label htmlFor="serviceName" className="form-label mt-3">
                  Service Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceName"
                  value={serviceName} // Display service name
                  readOnly
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                   onClick={CompleteAppointment}
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
