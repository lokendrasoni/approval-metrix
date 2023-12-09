import { Close } from "@mui/icons-material";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
} from "@mui/material";

const AddGoogleContacts = ({
    showGoogleModal,
    setShowGoogleModal,
    googleContacts,
    setSelectedContacts,
    selectedContacts,
    addGoogleContacts,
}) => {
    return (
        <Dialog
            sx={{
                ".MuiPaper-root": {
                    width: "600px !important",
                    minHeight: "520px !important",
                    background: "white",
                    boxShadow: "2px 20px 48px rgba(37, 39, 79, 0.12);",
                    borderRadius: "8px",
                },
            }}
            open={showGoogleModal}
            onClose={() => setShowGoogleModal(false)}
        >
            <DialogTitle>Import Contacts</DialogTitle>
            <IconButton
                onClick={() => setShowGoogleModal(false)}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>
            <DialogContent dividers>
                <div>
                    {googleContacts.map(person => {
                        const labelName =
                            person?.names[0]?.displayName +
                                " - " +
                                person?.emailAddresses[0]?.value || "";
                        return (
                            <FormControlLabel
                                label={labelName}
                                key={person?.resourceName}
                                control={
                                    <Checkbox
                                        key={person?.resourceName}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedContacts([
                                                    ...selectedContacts,
                                                    {
                                                        name: person?.names[0]?.displayName,
                                                        email: person?.emailAddresses[0]?.value,
                                                        resourceName: person?.resourceName,
                                                    },
                                                ]);
                                            } else {
                                                setSelectedContacts(
                                                    selectedContacts.filter(
                                                        contact =>
                                                            contact.resourceName !==
                                                            person.resourceName,
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                }
                            />
                        );
                    })}
                </div>
            </DialogContent>

            <DialogActions
                sx={{
                    padding: "20px",
                }}
            >
                <Button variant="contained" onClick={addGoogleContacts}>
                    Import
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddGoogleContacts;
