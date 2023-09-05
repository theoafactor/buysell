import Nav from "../../Sections/Nav/Nav"
import Footer from "../../Sections/Footer/Footer"
import { Link } from "react-router-dom"

function Login(){


    return (
        <>
            <Nav />

            <div className="row my-5">
                        <div className='col-md-6 m-auto'>

                        <div className='card'>
                              <div className='card-body'>

                              <h4>Sign in</h4>
                              <hr />

                              <form>
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                          </div>
                          <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
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