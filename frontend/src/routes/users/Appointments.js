import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // Code for base URL

const localizer = momentLocalizer(moment);

// Custom toolbar component for the buttons
const CustomToolbar = (toolbar) => {
  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToToday}>
          Today
        </button>
        <button type="button" onClick={goToNext}>
          Next
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
    </div>
  );
};
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
  const [scheduleID, setScheduleID] = useState(""); 

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
        schedule_id: schedule.schedule_id, // Include schedule_id for reference
        isClickable: schedule.number_slots > 0, // Add this code to check if theres more slot
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
    const today = moment().startOf('day'); // Get today's date with time set to 00:00:00
    const eventDate = moment(event.start).startOf('day'); // Get the event's date with time set to 00:00:00
  
    if (event.isClickable && eventDate.isSameOrAfter(today)) {
      setShowModal(true);
      setSelectEvent(event);
      setEventTitle(event.title);
  
      // Set the schedule ID and date_appointment from the selected event
      setScheduleID(event.schedule_id);
      setAppointmentDate(moment(event.start).format("YYYY-MM-DD")); //If u change this format the backend will not work so modify the date on the backend
    } else if (eventDate.isBefore(today)) {
      alert("Cannot select a past date.");
    } else {
      alert("This slot is fully booked and cannot be selected.");
    }
  };

  async function save(event) {
    event.preventDefault();

    try {
      const token = getToken();
      await axiosInstance.post(
        "/api/Appointment/AddAppointment",
        {
          service_id: serviceID,
          schedule_id: scheduleID, // Pass schedule_id instead of date_appointment directly
          date_appointment, // This should match the date in the selected schedule
          time_slot,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Appointment Added Successfully");

      // After saving the appointment, it refreshes the slots
      await loadSchedules();

      setServiceID("");
      setAppointmentDate("");
      setTimeSlot("");
      setScheduleID(""); // Clear the schedule ID after saving
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
        components={{ toolbar: CustomToolbar }} // Use custom toolbar
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
                <h5 className="modal-title">Add Appointment</h5>
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
