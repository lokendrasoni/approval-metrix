import { Close } from '@mui/icons-material';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GoogleAuth from 'src/components/GoogleAuth';
import Sidebar from 'src/components/Sidebar';
import { MainContent, StyledContainer } from "./style";

export default function Contributors() {
  const router = useRouter()
  const { status, authCode } = router.query;
  const [googleContacts, setGoogleContacts] = useState([]);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  async function getPeople() {
    const options = {
      method: "POST",
      body: JSON.stringify({
        authCode: authCode
      })
    };
    const peopleData = await fetch('/api/google/google_auth_success', options).then(obj => obj.json());
    if (peopleData.status === 'success') {
      const peopleWithEmail = peopleData.data?.connections.filter((person) => person.emailAddresses && person.emailAddresses[0]);
      setGoogleContacts(peopleWithEmail);
      setSelectedContacts([]);
      setShowGoogleModal(true);
    }
  }

  useEffect(() => {
    if (status === 'success') {
      getPeople();
    }
  }, [authCode, status]);

  useEffect(() => {
    console.log(selectedContacts);
  }, [selectedContacts]);

  const addContacts = async () => { };

  return (
    <StyledContainer>
      <Head>
        <title>Contributors</title>
      </Head>
      <Sidebar />
      <MainContent>
        <Grid container>
          <Grid item xs={8}>
            <h1 style={{ marginTop: '0' }}>Contributors</h1>
          </Grid>
          <Grid item xs={4}>
            <GoogleAuth />
          </Grid>
        </Grid>


        <Dialog sx={{
          ".MuiPaper-root": {
            width: "500px !important",
            minHeight: "320px !important",
            background: "white",
            boxShadow: "2px 20px 48px rgba(37, 39, 79, 0.12);",
            borderRadius: "8px",
          },
        }}
          open={showGoogleModal}
          onClose={() => setShowGoogleModal(false)}
        >
          <DialogTitle>Import Contacts</DialogTitle>
          <IconButton onClick={() => setShowGoogleModal(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <DialogContent dividers>
            <div >
              {googleContacts.map((person) => {
                const labelName = person?.names[0]?.displayName + " - " + person?.emailAddresses[0]?.value || "";
                return (
                  <FormControlLabel
                    label={labelName}
                    key={person?.resourceName}
                    control={
                      <Checkbox
                        key={person?.resourceName}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContacts([...selectedContacts, { name: person?.names[0]?.displayName, email: person?.emailAddresses[0]?.value, resourceName: person?.resourceName }]);
                          } else {
                            setSelectedContacts(selectedContacts.filter((contact) => contact.resourceName !== person.resourceName));
                          }
                        }} />
                    }
                  />
                );
              })}
            </div>
          </DialogContent>

          <DialogActions
            sx={{
              padding: '20px'
            }}
          >
            <Button variant="contained" onClick={addContacts}>Import</Button>
          </DialogActions>
        </Dialog>
      </MainContent>
    </StyledContainer >
  );
}