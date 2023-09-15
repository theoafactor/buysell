import Nav from "../../Sections/Nav/Nav"
import Footer from "../../Sections/Footer/Footer"
import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

function Register(){

    const [registerState, setRegisterState] = useState({
        fullname: "",
        email: "",
        username: "",
        password: "",
        password_confirm: "",
        is_loading: false,
        form_errors: []
    })


    const handleFullnameChange = (e) => {
            setRegisterState({
                ...registerState,
                fullname: e.target.value
            })

    }

    const handleEmailChange = (e) => {
        setRegisterState({
            ...registerState,
            email: e.target.value
        })

    }

    const handleUsernameChange = (e) => {
        setRegisterState({
            ...registerState,
            username: e.target.value
        })

    }

    const handlePasswordChange = (e) => {
        setRegisterState({
            ...registerState,
            password: e.target.value
        })

    }

    const handlePasswordConfirmChange = (e) => {
        setRegisterState({
            ...registerState,
            password_confirm: e.target.value
        })

    }


    const createUserAccount = async (event) => {
        event.preventDefault();

        setRegisterState({
            ...registerState,
            form_errors: {}
        })

        //console.log(registerState.form_errors)

        // get the current form errors
        const form_errors = registerState.form_errors;


        let fullname = registerState.fullname.trim();

        if(fullname.length === 0){
            form_errors["fullname"] = "You did not enter fullname"
        }else{
            form_errors["fullname"] = ""
        }

        let email = registerState.email.trim();

        if(email.length === 0){
            form_errors["email"] = "You did not enter email"
        }else{
            form_errors["email"] = ""
        }

        let username = registerState.username.trim();

        if(username.length === 0){
            form_errors["username"] = "You did not enter username"
        }else{
            form_errors["username"] = ""
        }

        let password = registerState.password.trim();

        if(password.length === 0){
            form_errors["password"] = "You did not enter password"
        }else{
            form_errors["password"] = ""
        }

        let password_confirm = registerState.password_confirm.trim();

        if(password_confirm.length === 0){
            form_errors["password_confirm"] = "You did not confirm password"
        }else{
            form_errors["password_confirm"] = ""
        }

        setRegisterState({
            ... registerState,
            form_errors: form_errors
        })

        let does_error_exist = false
        for (const key in form_errors) {
            if(form_errors[key].length !== 0){
                does_error_exist = true
                break
            }
        }

        if(does_error_exist !== true){

            // bring in a loader ...
            setRegisterState({
                ... registerState,
                is_loading: true
            });
            
            const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register-user`, {
                fullname: registerState.fullname,
                email: registerState.email,
                username: registerState.username,
                password: registerState.password
            })


            if(feedback){
                // stop the loader
                setRegisterState({
                    ... registerState,
                    is_loading: false
                })
                console.log(feedback)
            }



        }




        

    


    }



    return (
        <>
        <Nav />
        <div className="row my-5">
                      <div className='col-md-6 m-auto'>

                      <div className='card'>
                            <div className='card-body'>

                            <h4>Create Account</h4>
                            <hr />

                            { registerState.is_loading === true ? <div>Please wait ...</div>: ""}
                
                

                            <form method="POST" onSubmit={createUserAccount}>

                            <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Full name</label>
                          <input type="text" name="fullname" value={registerState.fullname} onChange={handleFullnameChange} className="form-control" id="fullname" aria-describedby="emailHelp" />
                          <div id="emailHelp" className="form-text">
                                { registerState.form_errors.fullname }
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Email address</label>
                          <input type="email" name="email" value={registerState.email} onChange={handleEmailChange} className="form-control" id="email" aria-describedby="emailHelp" />
                          <div id="emailHelp" className="form-text">
                          { registerState.form_errors.email }
                          </div>
                        </div>

                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Username</label>
                          <input type="text" name="uername" value={registerState.username} onChange={handleUsernameChange} className="form-control" id="username" aria-describedby="usernameHelp" />
                          <div id="usernameHelp" className="form-text">
                          { registerState.form_errors.username }
                          </div>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Password</label>
                          <input type="password" name="password" value={registerState.password} onChange={handlePasswordChange} className="form-control" id="exampleInputPassword1" />
                          <div id="passwordHelp" className="form-text">
                            { registerState.form_errors.password }
                          </div>
                        </div>

                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                          <input type="password"  value={registerState.password_confirm} onChange={handlePasswordConfirmChange} className="form-control" id="exampleInputPassword2" />
                            
                          <div id="password_confirmHelp" className="form-text">
                          { registerState.form_errors.password_confirm }
                          </div>
                        
                        </div>
                
                        <button type="submit" className="btn btn-primary">Create Account</button>
                      </form>

                      <h6 className="mt-2"> Or </h6>
                      <div>
                        <button className="btn btn-md btn-primary" > <i className="bi bi-facebook me-1"></i> Sign up with Facebook</button>
                      </div>

                      <div className="mt-4 bg-light p-3">
                        <h6>Already registered?</h6>
                        <Link to="/login" className='mt-3 btn btn-dark'>Sign in</Link>
                      </div>

                            </div>

                          </div>

                      </div>

                   </div>
        <Footer />
        </>
    )


}


export default Register