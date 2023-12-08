import { Button, List, ListItem, ListItemText } from "@mui/material";
import { google } from "googleapis";
import { useState } from "react";

const GoogleAuth = () => {
  const [userList, setUserList] = useState({});

  const fetchUsersFromGoogle = async () => {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: "./google_auth.json",
        scopes: ["https://www.googleapis.com/auth/admin.directory.user.readonly"],
      });
      const admin = google.admin({ version: "directory_v1", auth });

      const { data } = await admin.users.list({
        customer: "my_customer", // You can replace 'my_customer' with your actual customer ID
        maxResults: 10, // Adjust the number of results as needed
      });
      console.log(data);
    } catch (error) {
      console.error(`Error Fetching Users from Google: ${error.message}`);
    }
  };

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
