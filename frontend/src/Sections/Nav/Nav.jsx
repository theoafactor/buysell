import { Link } from "react-router-dom"

function Nav(props){

    console.log("Props", props)



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container px-4 px-lg-5">
    <a className="navbar-brand" href="#!">{import.meta.env.VITE_APP_NAME}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
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
            <span className="mt-2">Hello James</span>

            <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{ typeof props.currentCart === "undefined" ? "0": props.currentCart.length }</span>
            </button>

            <Link to="/login" className="btn btn-md btn-dark">Post Add</Link>
        </form>
    </div>
</div>
</nav>
        </>
    )


}

export default Nav