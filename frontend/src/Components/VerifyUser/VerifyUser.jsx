import { useSearchParams, Link } from "react-router-dom"
import { useState, useEffect} from "react";
import axios from "axios";


function VerifyUser(){

    const [searchParams, setSearchParams] = useSearchParams()
    const [verificationStatus, setVerificationStatus] = useState({
        is_verified: false,
        verification_message: ""
    });

    const verificationkey = searchParams.get("verificationkey");

    // make an api request to check the verification key
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/verify-user-token/${verificationkey}`).then(( feedback ) => {
        let reason_message = "";

        console.log(feedback)

        if(feedback.data.reason === "jwt expired"){
            reason_message = "Verification link expired!"
        }

        else if(feedback.data.code === "success"){
            setVerificationStatus({
                is_verified: true,
                verification_message: <>
                                        <span>You email has been verified. You may now <Link to="/login"><strong>log in</strong></Link></span>
                                    </>
            })
        }else{
            setVerificationStatus({
                is_verified: false,
                verification_message: <>
                                <span>We could not verify your email address: {reason_message}</span>
                                <Link to="/resend_verification_email"><strong> Click here to Resend Verification Email</strong></Link>
                                </>
            
            })
        }


    })
    }, [])
    




    return (<>
            <div className={verificationStatus.is_verified === true ? "alert alert-success": "alert alert-danger"}>{verificationStatus.verification_message}</div>
            </>)



}


export default VerifyUser