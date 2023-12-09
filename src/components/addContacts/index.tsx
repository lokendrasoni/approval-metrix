import { Close } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
} from "@mui/material";

const AddContacts = ({
    showAddContactsModal,
    setShowAddContactsModal,
    fields,
    handleChange,
    handleAdd,
    addContacts,
}) => {
    return (
        <Dialog
            sx={{
                ".MuiPaper-root": {
                    width: "500px !important",
                    minHeight: "320px !important",
                    background: "white",
                    boxShadow: "2px 20px 48px rgba(37, 39, 79, 0.12);",
                    borderRadius: "8px",
                },
            }}
            open={showAddContactsModal}
            onClose={() => setShowAddContactsModal(false)}
        >
            <DialogTitle>Add Contacts</DialogTitle>
            <IconButton
                onClick={() => setShowAddContactsModal(false)}
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
                {fields.map((field, idx) => (
                    <div key={idx}>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    id={idx.toString()}
                                    key={idx.toString()}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: "20px", narginRight: "10px" }}
                                    defaultValue={field.name}
                                    onKeyUp={e => handleChange(idx, e, "name")}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id={idx.toString() + "email"}
                                    key={idx.toString() + "email"}
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: "20px", marginLeft: "10px" }}
                                    defaultValue={field.email}
                                    onKeyUp={e => handleChange(idx, e, "email")}
                                />
                            </Grid>
                        </Grid>
                    </div>
                ))}
                <Button variant="contained" onClick={handleAdd}>
                    Add More
                </Button>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={addContacts}>
                    Add Contacts
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddContacts;
