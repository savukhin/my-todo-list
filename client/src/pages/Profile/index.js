import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import Profile from "../../components/Profile/Profile";

const ProfilePage = ({ user, projects, getProjects }) => {
    const navigator = useNavigate();
    const { profileId } = useParams();
    const [ mount, _ ] = useState(0);
    const [ profileUser, setProfileUser ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        getProjects();
        getUser(profileId);
        setIsLoading(true);
    }, [mount]);

    const getUser = (user_id) => {
        const req = {
            user_id
        }
        fetch('/api/auth/get-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              return res;
            } else {
              let error = new Error(res.statusText);
              error.response = res;
              throw error
            }
          })
          .then (res => res.json())
          .then(res => {
              setIsLoading(false); 
              setProfileUser(res.user);
          }).catch(error => {
            setIsLoading(false); 
            setProfileUser(false);
            navigator('/404');
            navigator(0);
          });
      }

    return (
        <div className="wrapper">
            <Navbar user={user}/>
            <Menu projects={projects} getProjects={getProjects} />
            { isLoading
                ? <span>LOADING</span>
                : <Profile profileUser={profileUser} user={user}/>
            }
      </div>
    )
}

export default ProfilePage;