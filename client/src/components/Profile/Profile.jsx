import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = ({ profileUser, user }) => {
    const inputPhotoRef = useRef(0);

    useEffect(() => {
        document.title = "Profile";
    }, []);

    const uploadHandler = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', inputPhotoRef.current.files[0]); 

        fetch('/api/auth/upload-photo', {
            method: 'POST',
            headers: {
                'token' : localStorage.getItem('token')
            },
            body: data
        })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    return res;
                } else {
                    let error = new Error(res.statusText);
                    error.response = res;
                    throw error;
                }
            })
            .then(res => res.json())
            .then(res => {
                window.location.reload();
            })
            .catch(error => {
            });
    }

    return (
        <div>
            <br/>
            <h1>{profileUser.username}</h1>
            <br/>
            <img src={profileUser.avatar
                ? profileUser.avatar
                : require("./../../img/blank-profile-picture-973460_1280.webp")} width={"500px"} style={{}}></img>
            <br/>
            <br/>
            { profileUser.id == user.id && 
                <div>
                    <input type="file" name="file" ref={inputPhotoRef}/> 
                    <button type="submit" onClick={uploadHandler}>Change photo</button>
                </div>
            }
            <br/>
            Count of active tasks: { profileUser.countOfActiveTasks }
            <br/>
            <br/>

            { profileUser.id == user.id && 
                <Link to={{ pathname: "/change-password" }}> <button className="button"> Change Password </button> </Link>
            }
        </div>
    )
}

export default Profile;