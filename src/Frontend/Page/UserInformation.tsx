import React, {useEffect} from "react";

export function UserInformation() {

    const [userInfo, setUserInfo] = React.useState({_id: "", username: "", password: "", mail: "", firstname: "", lastname: ""});

    useEffect(() => {
        fetchUserData();
    }, [""])

    function fetchUserData() {
        var user = localStorage.getItem("username") as string

        const formdata = new FormData();
        formdata.append("user", user);

        fetch("http://localhost:8081/getUser", {
            method: 'POST',
            body: formdata
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then(loggedUser => {
                console.log("hallo User")
                console.log(loggedUser)
                setUserInfo(loggedUser)
            })
            .then(error => {
                console.error(error)
            })
    }

    return (
        <div id="informationAboutUser">
            <div id="picPersonalData"/>
            <>
                <div id="boxInformation">
                    <div id="informationUserName">
                        <h2 id="textUserName">{userInfo.firstname}  {userInfo.lastname}</h2>
                    </div>
                    <div id="informationEmail">
                        <p id="textEmail">{userInfo.mail}</p>
                    </div>
                </div>
            </>
        </div>
    );
}

export default UserInformation;