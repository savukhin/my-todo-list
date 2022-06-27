import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";

const ProfilePage = ({ user }) => {
    const { profileId } = useParams();
    const [ photos, setPhotos ] = useState(null);

    const uploadHandler = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', event.target.files[0]); 

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
                console.log(res);
            })
            .catch(error => {
            });
    }

    return (
        <div>
            <input type="file" name="file" onChange={uploadHandler}/>
            {user.avatar}
            <img src={user.avatar}></img>
        </div>
    )
}

export default ProfilePage;