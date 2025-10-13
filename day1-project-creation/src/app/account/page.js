import {redirect} from "next/navigation";

export default function Account(){
    const userProfieInfo = null ;
    if(userProfieInfo === null){
        redirect('profile');
    }
    return <h1>Account page</h1>
}