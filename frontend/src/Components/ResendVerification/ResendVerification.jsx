import { Link } from "react-router-dom"
import { useState } from "react"
import Nav from "../../Sections/Nav/Nav"
import Footer from "../../Sections/Footer/Footer"
import axios from "axios"


function ResendVerification(){

    const [resendState, setResendState ] = useState({
        email: "",
        is_loading: false,
        message: ""
    });



    const resendVerification = async (event) => {
        event.preventDefault();

        setResendState({
            ... resendState,
            is_loading: true
        })

        const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/verification/resend_verification`, {
            email: resendState.email
        })
        

        if(feedback){

            console.log(feedback)
            setResendState({
                is_loading: false
            })

            if(feedback.data.code === "success"){
                setResendState({
                    ... resendState,
                    message: <span>Verification link has been resent</span>

                })
            }else{

                setResendState({
                    ... resendState,
                    message: <span>We could not send a verification link</span>

                })


            }

        }



    }


    const handleEmailInput = (event) => {

        let email = event.target.value.trim();

        setResendState({
            email: email
        });


    }




   return (<>
    <Nav />

    <div className="row my-5">
                <div className='col-md-6 m-auto'>

                <div className='card'>
                      <div className='card-body'>

                      <h4>Resend Verification Email</h4>
                      <hr />
                    <div> {resendState.message} </div>
                <form onSubmit={resendVerification}>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" value={resendState.email} onChange={handleEmailInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                
                  <button type="submit" className="btn btn-primary">Resend Verification Email</button>
                </form>
                
                <hr />
                <Link to="/register" className='mt-5 btn btn-dark'>Create Account</Link>

                      </div>

                    </div>

                </div>

             </div>

    <Footer />
</>
   )


}


export default ResendVerification