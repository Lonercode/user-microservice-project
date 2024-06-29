import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {countries} from 'countries-list';

function Home() {
  const [entries, setEntries] = useState([]);
  const [url, setUrl] = useState('http://localhost:4000/users/get-users');
  const countryList = Object.values(countries)

  useEffect(() => {
    axios.get(url)
      .then((res) => setEntries(res.data.message))
      .catch((err) => handleError(err)); 
  }, [url]);

  const handleError = (err) => {
    toast.error(err.message || 'Something went wrong', { position: 'top-right' });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, { position: 'top-right' });
    setTimeout(() => {
        window.location.reload()
     }, 2000)
  
  };

  const handleUrl = () => {
    const country = document.getElementById("result").value;
    const validCountry = countryList.some(acountry => acountry.name === country)
    if(validCountry){
    setUrl(`http://localhost:4000/users/get-users/${country}`);
    }
    else{
        toast.error('Please type in a valid country', { position: 'top-right' });
    }
  };

  return (
    <>
      <div className='homePage'>
        <ToastContainer className="toasty" />
        <h2>User Data</h2>
        <input placeholder='Type country' id="result"></input>
        <button onClick={handleUrl} id = "filterButton">Filter via country</button>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item) => (
              <tr key={item._id}>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.country}</td>
                <td>
                  <Link to={`/updateUser/${item._id}/${item.first_name}/${item.last_name}/${item.email}/${item.country}`}>
                    <button type='button' id='entryButton'>Update</button>
                  </Link>
                  <button type='button' id='entryButton' onClick={() => {
                    axios.delete(`http://localhost:4000/users/remove-user/${item._id}`)
                      .then((res) => handleSuccess(res.data.message))
                      .catch((err) => handleError(err));
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;