import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';


function EditExercises() {
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${id}`)
      .then(res => {
        const { username, description, duration, date } = res.data;
        setUsername(username);
        setDescription(description);
        setDuration(duration);
        setDate(new Date(date));
      })
      .catch(error => console.error("Error fetching exercise data:", error));

    // Fetch users
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username));
        }
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  const onChangeUsername = (e) => {
   setUsername(e.target.value);
  }

  const onChangeDescription = (e) => {
   setDescription(e.target.value);
  }

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  }

  const onChangeDate = (date) => {
    setDate(date);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }

    axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then(res => console.log(res.data));
      alert('Exercise updated successfully!');
  }

  return (
    <div>
        <div>
          <h3>Update New Exercise Log</h3>
          <form onSubmit={onSubmit}>
            {/* Rest of your form code */}
            <div className="form-group">
              <label>Username: </label>
              <select
                required
                className="form-control"
                value={username}
                onChange={onChangeUsername}>
                {
                  users.map(function (user) {
                    return <option
                      key={user}
                      value={user}>{user}
                    </option>;
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <label>Description: </label>
              <input type="text"
                required
                className="form-control"
                value={description}
                onChange={onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input
                type="text"
                className="form-control"
                value={duration}
                onChange={onChangeDuration}
              />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={date}
                  onChange={onChangeDate}
                />
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="Update" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
  )
  
}


export default EditExercises;
