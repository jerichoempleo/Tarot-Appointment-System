import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // Code for base URL

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);

  // Backend API's
  const [serviceID, setServiceID] = useState("");
  const [date_appointment, setAppointmentDate] = useState("");
  const [time_slot, setTimeSlot] = useState("");

  const [services, setServices] = useState([]);

  // Helper function to get JWT token
  const getToken = () => sessionStorage.getItem("jwttoken"); // jwttoken = variable in backend

  useEffect(() => {
    (async () => {
      await loadServices();
      await loadSchedules(); // Load schedules when the component mounts
    })();
  }, []);

  async function loadServices() {
    try {
      const token = getToken();
      const response = await axiosInstance.get("/api/Service/GetService", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data.services);
    } catch (error) {
      console.error("There was an error loading the services!", error);
    }
  }

  async function loadSchedules() {
    try {
      const token = getToken();
      const response = await axiosInstance.get("/api/Schedule/GetSchedule", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Map schedules data to calendar events
      const mappedEvents = response.data.schedules.map((schedule) => ({
        title: `Slots: ${schedule.number_slots}`, // Display number of slots
        start: new Date(schedule.date),
        end: new Date(schedule.date), // Same start and end date for all-day event
        allDay: true, // Mark as all-day event
      }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error("There was an error loading the schedules!", error);
    }
  }

  const handleSelectSlot = (slotInfo) => {
    // Don't show the modal when clicking on empty slots
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);

    // Set the date and time from the selected event
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    setAppointmentDate(formattedDate);
  };

  async function save(event) {
    event.preventDefault();

    try {
      const token = getToken();
      await axiosInstance.post(
        "/api/Appointment/AddAppointment",
        {
          service_id: serviceID,
          date_appointment,
          time_slot,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Appointment Added Successfully");
      setServiceID("");
      setAppointmentDate("");
      setTimeSlot("");
      setShowModal(false); // Close modal after saving
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
        views={["month"]}
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
                <h5 className="modal-title">Add Appointment </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEventTitle("");
                    setSelectEvent(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="eventTitle" className="form-label">
                  Service Name:
                </label>

                <select
                  className="form-control"
                  id="service_id"
                  value={serviceID}
                  onChange={(event) => setServiceID(event.target.value)}
                >
                  <option value="">Select a service</option>
                  {services.length > 0 &&
                    services.map((service) => (
                      <option
                        key={service.service_id}
                        value={service.service_id}
                      >
                        {service.service_name}
                      </option>
                    ))}
                </select>

                <label htmlFor="eventTitle" className="form-label">
                  Date Appointment:
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="date_appointment"
                  value={date_appointment}
                  onChange={(event) => setAppointmentDate(event.target.value)}
                  readOnly
                />

                <label htmlFor="eventTitle" className="form-label">
                  Time Slot:
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="time_slot"
                  value={time_slot}
                  onChange={(event) => setTimeSlot(event.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={save}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
