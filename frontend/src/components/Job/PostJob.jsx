import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
let API = import.meta.env.VITE_BACKEND_BASEURL;

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        `${API}/job/post`,
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
  <section className="job-post page">
    <div className="container">
      <h3>Post New Job</h3>
      <form onSubmit={handleJobPost}>
        {/* Job Title & Category */}
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {[
              "Graphics & Design", "Mobile App Development", "Frontend Web Development",
              "MERN Stack Development", "Account & Finance", "Artificial Intelligence",
              "Video Animation", "MEAN Stack Development", "MEVN Stack Development",
              "Data Entry Operator"
            ].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location Info */}
        <div className="form-group">
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />

        {/* Salary Info */}
        <div className="salary-section">
          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
          >
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </select>

          {salaryType === "default" ? (
            <p className="error">Please provide Salary Type *</p>
          ) : salaryType === "Fixed Salary" ? (
            <input
              type="number"
              placeholder="Enter Fixed Salary"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
            />
          ) : (
            <div className="ranged-salary">
              <input
                type="number"
                placeholder="Salary From"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
              />
              <input
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
              />
            </div>
          )}
        </div>

        <textarea
          rows="8"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
        />

        <button type="submit">Create Job</button>
      </form>
    </div>
  </section>
);

};

export default PostJob;