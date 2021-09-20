import {  useState } from "react";
import EditProfile from "./EditProfile.js";
import Profile from "./Profile"
import Reviews from "./Notifications"


function UserProfile() {
  const [user, setUser] = useState("")
  const userView = ["profile", "edit", "notifications"];


//   const src = () =>  {
// if (userView === "👀") {
//   <img src="https://img.icons8.com/nolan/2x/edit--v1.png" alt="edit" />
// }else {
// <img src="https://img.icons8.com/nolan/2x/user-male--v1.png" alt="" />
// }
//   }

  return (
    <div id='card'>

      <h2>Jack Green</h2> 
     <img id="prof" src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" style={{width:"200px", height: "180px"}} />
     <br />
     <br />
     <h4>Badges:
       <img src="https://img.icons8.com/nolan/2x/pull-up-bar.png" alt="" style={{ width: "36px", height: "36px" }}/>
       <img src="https://img.icons8.com/nolan/2x/exercise.png" alt="" style={{ width: "36px", height: "36px" }} />
       <img src="https://img.icons8.com/nolan/2x/dumbbell.png" alt="" style={{ width: "36px", height: "36px" }} /></h4>
      <div>
        {userView.map(userV => (
          <button  type="button" key={userV} onClick={() => setUser(userV)}>
            {userV.toLocaleUpperCase()}
          </button>
        )) }
      </div>

      <div >
        <p>{user === "profile" && <Profile/>}</p>
        <p>{user === "edit" && <EditProfile/>}</p>
        <p>{user === "notifications" && <Reviews/>} </p>
      </div>
    </div>
  );
}
export default UserProfile;

