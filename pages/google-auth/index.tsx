import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

const GoogleAuth = () => {
  const [userList, setUserList] = useState({});
  // const clientID = "470709605040-evl095kp0mc67bqccblktf54fppbmccj.apps.googleusercontent.com";
  // const clientSecret = "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";
  // const redirect_uri = 'https://localhost:3000';
  // const scopes = ['https://www.googleapis.com/auth/admin.directory.user.readonly'];

  const fetchUsersFromGoogle = async () => {
    try {
      const response = await fetch('api/google_auth_function');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  }

  return (
    <>
      <Button onClick={fetchUsersFromGoogle}>Fetch Users from Google</Button>
      <br />
      <div>
        <List>
          {userList?.length > 0 ? (
            userList?.map((user: any) => {
              <ListItem disablePadding>
                <ListItemText primary={user?.name} />
              </ListItem>;
            })
          ) : (
            <></>
          )}
        </List>
      </div>
    </>
  );
};

export default GoogleAuth;
