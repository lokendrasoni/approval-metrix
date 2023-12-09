import { Box, Button } from "@mui/material";
import { useContext } from "react";
import ContributorContext from "src/contexts/ContributorContext";
import { ContributorContextTypes } from "src/contexts/types/ContributorContextTypes";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ContributorLogin() {
    const { handleLogin } = useContext(ContributorContext) as ContributorContextTypes;

    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
            width={"100%"}
        >
            <Card sx={{ width: "580px", height: "580px" }}>
                <CardMedia
                    sx={{ height: 390 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                />
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "30px",
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        Buildoors...
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Sign In with Contributor
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
