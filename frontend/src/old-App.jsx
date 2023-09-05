import { useState } from 'react'
import { Routes, Route } from "react-router-dom"

import './css/styles.css'


function App() {

const getCurrentPage = () => {
    let current_page = localStorage.getItem("current-page");

    if(current_page == null || current_page == undefined){
        return "home"
    }
    return current_page
}



const show_page = (page) => {

    if(page === "login"){
        return <>
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

                        <button className='mt-3 btn btn-dark' onClick={() => createAccountBtn()}>Create Account</button>

                              </div>

                            </div>

                        </div>

                     </div>
            </>
    }


    return <>
                   <div className="row my-5">
                      <div className='col-md-6 m-auto'>

                      <div className='card'>
                            <div className='card-body'>

                            <h4>Create Account</h4>
                            <hr />

                            <form>

                            <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Full name</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        
                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Email address</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Password</label>
                          <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                
                        <button type="submit" className="btn btn-primary">Create Account</button>
                      </form>

                      <button className='mt-3 btn btn-dark' onClick={() => postAddForm()}>Sign in</button>

                            </div>

                          </div>

                      </div>

                   </div>
        
        </>

    

}

  const [currentState, setState] = useState({
      current_opened_age: getCurrentPage(),
      is_post_add_btn_clicked: false,
      main_content: getCurrentPage() == "login" || getCurrentPage() == "register" ? show_page(getCurrentPage()) : <> <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <div className="col mb-5">
                  <div className="card h-100">
                     
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                      
                      <div className="card-body p-4">
                          <div className="text-center">
                              
                              <h5 className="fw-bolder">Fancy Product</h5>
                             
                              $40.00 - $80.00
                          </div>
                      </div>
                      
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                      </div>
                  </div>
              </div>
              <div className="col mb-5">
                  <div className="card h-100">
                     
                      <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                      
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                      
                      <div className="card-body p-4">
                          <div className="text-center">
                              
                              <h5 className="fw-bolder">Special Item</h5>
                             
                              <div className="d-flex justify-content-center small text-warning mb-2">
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                              </div>
                             
                              <span className="text-muted text-decoration-line-through">$20.00</span>
                              $18.00
                          </div>
                      </div>
                     
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                      </div>
                  </div>
              </div>
              <div className="col mb-5">
                  <div className="card h-100">
                     
                      <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                     
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                      
                      <div className="card-body p-4">
                          <div className="text-center">
                             
                              <h5 className="fw-bolder">Sale Item</h5>
                              
                              <span className="text-muted text-decoration-line-through">$50.00</span>
                              $25.00
                          </div>
                      </div>
                     
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                      </div>
                  </div>
              </div>
              <div className="col mb-5">
                  <div className="card h-100">
                      
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                    
                      <div className="card-body p-4">
                          <div className="text-center">
                             
                              <h5 className="fw-bolder">Popular Item</h5>
                             
                              <div className="d-flex justify-content-center small text-warning mb-2">
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                              </div>
                             
                              $40.00
                          </div>
                      </div>
                      
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                      </div>
                  </div>
              </div>
              <div className="col mb-5">
                  <div className="card h-100">
                      
                      <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                    
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                      
                      <div className="card-body p-4">
                          <div className="text-center">
                             
                              <h5 className="fw-bolder">Sale Item</h5>
                             
                              <span className="text-muted text-decoration-line-through">$50.00</span>
                              $25.00
                          </div>
                      </div>
                      
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                      </div>
                  </div>
              </div>
              <div className="col mb-5">
                  <div className="card h-100">
                     
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                     
                      <div className="card-body p-4">
                          <div className="text-center">
                              
                              <h5 className="fw-bolder">Fancy Product</h5>
                             
                              $120.00 - $280.00
                          </div>
                      </div>
                  
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                      </div>
                  </div>
              </div>
              <div className="col mb-5">
                  <div className="card h-100">
                     
                      <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                     
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                     
                      <div className="card-body p-4">
                          <div className="text-center">
                             
                              <h5 className="fw-bolder">Special Item</h5>
                              
                              <div className="d-flex justify-content-center small text-warning mb-2">
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                              </div>
                              
                              <span className="text-muted text-decoration-line-through">$20.00</span>
                              $18.00
                          </div>
                      </div>
                   
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                      </div>
                  </div>
              </div>
              <div className="col mb-5">
                  <div className="card h-100">
                    
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
              
                      <div className="card-body p-4">
                          <div className="text-center">
                              <h5 className="fw-bolder">Popular Item</h5>
  
                              <div className="d-flex justify-content-center small text-warning mb-2">
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                                  <div className="bi-star-fill"></div>
                              </div>
                        
                              $40.00
                          </div>
                      </div>
                     
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section></>
  })


  const createAccountBtn = () => {

    localStorage.setItem("current-page", "register");

    setState({
      current_opened_age: "register",
      is_post_add_btn_clicked: true,
      main_content: show_page("register")
    })

  }

  const postAddForm = () => {
    localStorage.setItem("current-page", "login");
      setState({
        current_opened_age: "login",
        is_post_add_btn_clicked: true,
        main_content: show_page("login")
      })

  }
  

  return (

     <>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="#!">Start Bootstrap</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#!">All Products</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>

                    </ul>
                    <form className="d-flex gap-2">
                        <button className="btn btn-outline-dark" type="submit">
                            <i className="bi-cart-fill me-1"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>

                        <button type="button" className=" btn btn-md btn-dark" onClick={() => postAddForm()}>Post Ad</button>
                    </form>
                </div>
            </div>
        </nav>

        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Shop in style</h1>
                    <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                </div>
            </div>
        </header>

        {currentState.main_content}

        <footer className="py-5 bg-dark">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
        </footer>
     </>
    
  )
}

export default App
