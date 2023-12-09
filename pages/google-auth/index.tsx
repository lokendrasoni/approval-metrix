<<<<<<< HEAD
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GoogleContacts = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [authUrl, setAuthUrl] = useState(null);
  const { status, authCode } = router.query;
=======
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

const GoogleAuth = () => {
  const [userList, setUserList] = useState({});
  // const clientID = "470709605040-evl095kp0mc67bqccblktf54fppbmccj.apps.googleusercontent.com";
  // const clientSecret = "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";
  // const redirect_uri = 'https://localhost:3000';
  // const scopes = ['https://www.googleapis.com/auth/admin.directory.user.readonly'];
>>>>>>> 748f3dc (google-auth trial)

  const fetchData = async () => {
    try {
<<<<<<< HEAD
      const authUrlLocal = await fetch('api/google/google_auth_function').then(obj => obj.json());
      setAuthUrl(authUrlLocal.url);
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
=======
      const response = await fetch('api/google_auth_function');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
>>>>>>> 748f3dc (google-auth trial)
    }
  }

  async function getPeople() {
    console.log(authCode, status)
    const options = {
      method: "POST",
      body: JSON.stringify({
        authCode: authCode
      })
    };
    const peopleData = await fetch('api/google/google_auth_success', options).then(obj => obj.json());
    if (peopleData.status === 'success') {
      const peopleWithEmail = peopleData.data?.connections.filter((person) => person.emailAddresses && person.emailAddresses[0]);
      setContacts(peopleWithEmail);
    }
  }

  useEffect(() => {
    if (status === 'success') {
      getPeople();
    }
  }, [authCode, status])

  useEffect(() => {
    if (authUrl && router) {
      router.push(authUrl);
      setAuthUrl(null);
    }
  }, [router, authUrl]);

  return (
    <div>
      <h1>Google Contacts</h1>
      {authUrl === null && contacts.length == 0 &&
        <button onClick={fetchData}>Fetch Contacts</button>}
      <ul>
        {contacts.map((person) => (
          <li key={person.resourceName}>
            {person.names && person.names[0] && person.names[0].displayName}
            {person.emailAddresses && person.emailAddresses[0] && (
              <span> - {person.emailAddresses[0].value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleContacts;
