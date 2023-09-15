import Nav from "../../Sections/Nav/Nav"
import Footer from "../../Sections/Footer/Footer"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Auth/Auth"
import localforage from "localforage"

function Login(){

  const [ loginState, setLoginState ] = useState({
      email: "",
      password: "",
      is_loading: false,
      message: ""
  })

  const use_auth = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);


  const loginUser = async (event) => {
    event.preventDefault();



    const feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      email: loginState.email,
      password: loginState.password
    })

    // we expect token from feedback
    // if we received a token, we'd save the token as cookie
    console.log("Login feedback: ", feedback)

  

    if(feedback.data.code === "not-verified"){
        setLoginState({
          message: <>
                    <div className="alert alert-danger">We could not log you in because you have not verified your email
                      <Link to="/resend_verification_email"> Resend Verification Message</Link>
                    </div>
                </>
        })
    }else if(feedback.data.code === "login-success"){

        const user = feedback.data.data;
        user.token = feedback.data.token;

        //console.log("User: ", user)

        // perform login from client side
        use_auth.loginUser(user);


    }

  }

  const handlePasswordInput = (event) => {
    let password = event.target.value.trim();

    setLoginState({
      ... loginState,
      password: password
    })
  }

  const handleEmailInput = (event) => {
   let email = event.target.value.trim();

   setLoginState({
    ... loginState,
    email: email
  })
   

  }

  const getCurrentCart = async () => {
    let current_cart = await localforage.getItem("buysell_cart");

    if(typeof current_cart === "undefined" || current_cart === null){
        return []
    }else{
        return JSON.parse(current_cart)
    }


}

  


  useEffect(() => {

    if(use_auth.user.is_user_logged === true){
        navigate("/user", {
          replace: true
        })
    }


     // // get the current cart
     getCurrentCart().then((current_cart) => {
      // set the state 
      setCart(current_cart);
  })

  }, [])


    return (
        <>
            <Nav currentCart={cart} />

            <div className="row my-5">
                        <div className='col-md-6 m-auto'>

                        <div className='card'>
                              <div className='card-body'>

                              <h4>Sign in</h4>
                              <hr />
                              {loginState.message}
                              <form method="POST" onSubmit={loginUser}>
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={loginState.email} onChange={handleEmailInput} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                          </div>
                          <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" value={loginState.password} onChange={handlePasswordInput} className="form-control" id="exampleInputPassword1" />
                          </div>
                          <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember me</label>
                          </div>
                          <button type="submit" className="btn btn-primary">Sign in</button>
                        </form>

                        <Link to="/register" className='mt-3 btn btn-dark'>Create Account</Link>

                              </div>

                            </div>

                        </div>

                     </div>

            <Footer />
        </>
    )


}


export default Login