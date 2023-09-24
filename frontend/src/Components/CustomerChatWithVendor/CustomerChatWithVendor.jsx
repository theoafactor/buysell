import { useSearchParams } from "react-router-dom"

function CustomerChatWithVendor(){

    const [ searchParams, setSearchParams ] = useSearchParams();


    const chat_token = searchParams.get("ctk");

    console.log("Chat token: ", chat_token)



    return <div>Chatting with Vendor</div>

}


export default CustomerChatWithVendor;