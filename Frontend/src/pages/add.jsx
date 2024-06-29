import { useState } from "react"
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {countries} from 'countries-list';


function AddUser(){


    const [password1, setPassword1] = useState("");
    const [type, setType] = useState("password");
    const [type1, setType1] = useState("password");
    const [icon, setIcon] = useState(eyeOff)
    const [icon1, setIcon1] = useState(eyeOff)

    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const {first_name, last_name, email, password, country} = user;
    const countryList = Object.values(countries)
    const validCountry = countryList.some(acountry => acountry.name === user.country)

    const handleEye = () => {
        if (type === 'password'){
            setIcon(eye);
            setType('text')
        }
        else{
            setIcon(eyeOff)
            setType('password')
        }
    }

    const handleEye1 = () => {
        if (type1 === 'password'){
            setIcon1(eye);
            setType1('text')
        }
        else{
            setIcon1(eyeOff)
            setType1('password')
        }
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    //on error 

    const handleError = (err) => {
        toast.error(err, {
            position: 'top-right'
        })
        setTimeout(() => {
        window.location.reload()
    }, 5000)
    }

    //on success

    const handleSuccess = async (msg) => {
        toast.success(msg, {
            position: 'top-right'
        })
       
        setTimeout(() => {
            navigate("/home");
          }, 2000)
       
    }

     //on submit

     const handleSubmit = (e) => {
        e.preventDefault()
        if (!validCountry){
            toast.error("Please type in a valid country", {
                position: 'top-right'
            })
        }
        else{
        axios.post('http://localhost:4000/users/add-user', {
            ...user,
            confirmPassword: password1
            
        },
        {withCredentials: true}
        )
       
        .then((res) => handleSuccess(res.data.message))

        .then(() => setUser({name: "", email: "", password: "", country: ""}))
        .then(() => setPassword1({password1: ""}))
        .catch(err => {
            console.log(err)
          handleError(err.response.data.message)
        })
      }
      
    }

    return (
        <>
        <div className="addPage">
        <div className="registerForm">
            <h3>Sign Up User </h3>
            <ToastContainer className='toasty'/>
        <form method="post" onSubmit={handleSubmit}>
            <label id= "fnme"><b>First Name</b></label>
            <input id="fnme" type="text" value={first_name} onChange={handleOnChange} name = "first_name"></input>
            <label id= "lnme"><b>Last Name</b></label>
            <input id="lnme" type="text" value={last_name} onChange={handleOnChange} name = "last_name"></input>
            <label id= "email"><b>Email</b></label>
            <input id="email" type="email" value={email} onChange={handleOnChange} name = "email"></input>
            <label id= "country"><b>Country</b></label>
            <input id="country" type="text" value={country} onChange={handleOnChange} name = "country"></input>
            <label id = "password"><b>Password</b><span class = "flex justify-around items-center" onClick={handleEye}>
                <Icon class="absolute mr-10" icon={icon} size={25}/>
            </span></label>
            <input type={type} id="pass1"name="password" value={password}
            onChange={handleOnChange}></input>
            <label id = "password"><b>Confirm Password</b><span class = "flex justify-around items-center" onClick={handleEye1}>
                <Icon class="absolute mr-10" icon={icon1} size={25}/>
            </span></label>
            <input type={type1} id="pass2" name="confirmPassword" value={password1}
            onChange={(e) => setPassword1(e.target.value)}></input>
            <button type="submit" id="signup">Register User</button>
    
        </form>
        
        </div>
        </div>
        </>
    )
}

export default AddUser