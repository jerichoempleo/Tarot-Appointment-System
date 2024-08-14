import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; //Code for base url

const localizer = momentLocalizer(moment);

const App = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);

    //Code for displaying the selected date
    const formattedDate = moment(slotInfo.start).format("YYYY-MM-DD"); //There will be error if change because of the in backend doesnt accept except for this format.
    setAppointmentDate(formattedDate);

  };
  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  //Backend API's
  const [serviceID, setServiceID] = useState("");
  const [scheduleID, setScheduleID] = useState("");
  const [date_appointment, setAppointmentDate] = useState("");
  const [time_slot, setTimeSlot] = useState("");

  const [services, setServices] = useState([]);
  // const [schedules, setSchedules] = useState([]);

  // Helper function to get JWT token
  const getToken = () => sessionStorage.getItem("jwttoken"); //jwttoken = variable in backend

  useEffect(() => {
    (async () => {
      await loadServices();
      // await loadSchedules();
    })();
  }, []);

  async function loadServices() {
    try {
      const token = getToken();
      const response = await axiosInstance.get("/api/Service/GetService", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data.services); //kulang ng .services kaya ayaw lumabas
    } catch (error) {
      console.error("There was an error loading the services!", error);
    }
  }

  // async function loadSchedules() {
  //   try {
  //     const token = getToken();
  //     const response = await axiosInstance.get("/api/Schedule/GetSchedule", {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setSchedules(response.data.schedules); //kulang ng .services kaya ayaw lumabas
  //   } catch (error) {
  //     console.error("There was an error loading the schedules!", error);
  //   }
  // }

  async function save(event) {
    event.preventDefault();

    try {
      const token = getToken();
      await axiosInstance.post(
        "/api/Appointment/AddAppointment",
        {
          service_id: serviceID, //With Foreign Key to save in the DB
          //   schedule_id: scheduleID, //With Foreign Key to save in the DB
          date_appointment,
          time_slot,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Appointment Added Successfully");
      // setAppointmentId("");
      setServiceID("");
      // setScheduleID("");
      setAppointmentDate("");
      setTimeSlot("");
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
        views={["month"]} //To remove the views tab week, day, agenda
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

export default App;
