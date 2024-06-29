import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate} from "react-router-dom"
import {ToastContainer, toast} from 'react-toastify';
import {countries} from 'countries-list';


function UpdateUser(){

    const data = useParams()
    const navigate = useNavigate()
    const [created, setCreated] = useState({first_name: data.first_name, last_name: data.last_name,
        email: data.email, country: data.country
    });
    const {first_name, last_name, email, country} = created;
    const countryList = Object.values(countries)
    const validCountry = countryList.some(acountry => acountry.name === created.country)

 


    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setCreated({
            ...created,
            [name] : value
        })
    }
    

    const handleError = (err) => {
        toast.error(err, {
            position: 'top-right'
        })
        setTimeout(() => {
        window.location.reload();
    }, 2000)
    }

    

    const handleSuccess = async (msg) => {
        toast.success(msg, {
            position: 'top-right'
        })
        setTimeout(() => {
            navigate("/home");
          }, 2000)
        }

        const handleSubmit = (e) => {
            e.preventDefault()

            if (!validCountry){
                toast.error("Please type in a valid country", {
                    position: 'top-right'
                })
            }
            else{
            axios.put(`http://localhost:4000/users/modify-user/${data._id}`, {
                ...created,
                
            },
            {withCredentials: true}
            )
           
            .then((res) => handleSuccess(res.data.message))
    
            .then(() => setCreated({first_name: "", last_name: "", email: "", password: "", country: ""}))
            .catch(err => {
                console.log(err)
              handleError(err.response.data.message)
            })
        }
    }
          

    return (
        <>
      <div className="updatePage">
        <div className="registerForm">
        <h3>Modify User</h3>
        <ToastContainer className="toasty"/>
        <form method="post" onSubmit={handleSubmit}>

        <label id= "fnme"><b>First Name</b></label>
            <input id="fnme" type="text" value={first_name} onChange={handleOnChange} name = "first_name"></input>
            <label id= "lnme"><b>Last Name</b></label>
            <input id="lnme" type="text" value={last_name} onChange={handleOnChange} name = "last_name"></input>
            <label id= "email"><b>Email</b></label>
            <input id="email" type="email" value={email} onChange={handleOnChange} name = "email"></input>
            <label id= "country"><b>Country</b></label>
            <input id="country" type="text" value={country} onChange={handleOnChange} name = "country"></input>
           
            <button type="submit" id="Loginbut1">Update</button>
    
        </form>
        <Link to= {`/updatePassword/${data._id}`} id = "changePassword">Reset password?</Link>
        </div>
        </div>
        </>
    )
}

export default UpdateUser