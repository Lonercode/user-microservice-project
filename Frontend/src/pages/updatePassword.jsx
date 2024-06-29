import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import { useParams } from 'react-router-dom'

function UpdatePassword(){

    const data = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff)

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



    const handleOnChange = (e) => {
        setPassword(e.target.value)
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

    const handleSubmit = event => {
        event.preventDefault()

        axios.put(`http://localhost:4000/users/modify-user-password/${data._id}`, {
            password: password
        }
            )
            .then((res) => handleSuccess(res.data.message))
            .then(() => setPassword(""))
            .catch(err => {
                console.log(err)
              handleError(err.response.data.message)
            })
          }



    return (
        <>
        <div className="updatePassPage">
         <div className="registerForm">
            <h3>Type in the new password</h3>
            <ToastContainer className='toasty'/>
        <form method="post" onSubmit={handleSubmit}>
            <label id= "resetPassword"><b>Password</b><span class = "flex justify-around items-center" onClick={handleEye}>
                <Icon class="absolute mr-10" icon={icon} size={25}/>
            </span></label>
            <input type={type} id="resetPassword" name="password" value={password}
            onChange={handleOnChange}></input>
            
            <button type="submit" id="Loginbut1">Reset Password</button>
        
        </form>
        </div>
        </div>
        </>
    )
}

export default UpdatePassword