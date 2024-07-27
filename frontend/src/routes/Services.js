import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [serviceId, setServiceId] = useState("");
  const [service_name, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  // Helper function to get JWT token
  const getToken = () => sessionStorage.getItem('jwttoken');

  async function Load() {
    try {
      const token = getToken();
      const result = await axios.get("https://localhost:7160/api/Service/GetService", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(result.data.Services);
      console.log(result.data);
      // Extract the services data and making sure that there is always an array even though it is empty
      setServices(result.data.services || []);
    } catch (error) {
      console.error("There was an error loading the data!", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    
    try {
      const token = getToken();
      await axios.post("https://localhost:7160/api/Service/AddService", {
        service_name,
        description,
        price,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Service Added Successfully");
      setServiceId("");
      setServiceName("");
      setDescription("");
      setPrice("");
      Load();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function editService(service) {
    setServiceName(service.service_name);
    setDescription(service.description);
    setPrice(service.price);
    setServiceId(service.service_id);
  }

  async function DeleteService(service_id) {
    try {
      const token = getToken();
      await axios.delete(`https://localhost:7160/api/Service/DeleteService/${service_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Service deleted Successfully");
      setServiceId("");
      setServiceName("");
      setDescription("");
      setPrice("");
      Load();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function update(event) {
    event.preventDefault();

    try {
      const token = getToken();
      await axios.patch(`https://localhost:7160/api/Service/UpdateService/${serviceId}`, {
        service_name,
        description,
        price,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Service Updated Successfully");
      setServiceId("");
      setServiceName("");
      setDescription("");
      setPrice("");
      Load();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div>
      <h1>Services</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="service_id"
              hidden
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
            />
            <label>Service Name</label>
            <input
              type="text"
              className="form-control"
              id="service_name"
              value={service_name}
              onChange={(event) => setServiceName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
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
            <th scope="col">Service Id</th>
            <th scope="col">Service Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {services.map(service => (
          <tbody key={service.service_id}>
            <tr>
              <th scope="row">{service.service_id}</th>
              <td>{service.service_name}</td>
              <td>{service.description}</td>
              <td>{service.price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editService(service)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteService(service.service_id)}
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

export default Services;
