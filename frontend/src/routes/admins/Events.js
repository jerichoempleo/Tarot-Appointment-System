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
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);

  // Helper function to get JWT token
  const getToken = () => sessionStorage.getItem('jwttoken');

  useEffect(() => {
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

          return scheduleAppointments.map(appointment => ({
            title: `Appointment ID: ${appointment.appointment_id}`,
            start: new Date(appointment.date_appointment),
            end: new Date(appointment.date_appointment), // Both start and end are the same
            allDay: true, // Make it an all-day event
          }));
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error("There was an error fetching the schedules and appointments!", error);
      }
    };

    fetchSchedulesAndAppointments();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      if (selectEvent) {
        const updatedEvent = { ...selectEvent, title: eventTitle };
        const updatedEvents = events.map((event) =>
          event === selectEvent ? updatedEvent : event
        );
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: selectedDate,
          end: selectedDate,
          allDay: true,
        };
        setEvents([...events, newEvent]);
      }
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }
  };

  const deleteEvents = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle('');
      setSelectEvent(null);
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
                  {selectEvent ? "Edit Event" : "Add Event"}
                </h5>
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
                  Event Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                {selectEvent && (
                  <button 
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={deleteEvents}
                  >
                    Delete Event
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveEvent}
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

export default Events;
