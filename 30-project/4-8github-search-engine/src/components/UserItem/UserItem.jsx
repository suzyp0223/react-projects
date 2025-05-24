import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const UserItem = ({ user: { login, avatar_url } }) => {
  const [searchParams] = useSearchParams({});

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Avatar
            alt={login}
            src={avatar_url}
            sx={{ width: "60px", height: "60px", margin: "auto" }}
          />
          <Typography sx={{ textAlign: "center" }}>{login}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            component={Link}
            endIcon={<InfoIcon />}
            to={`/user/${login}`}
            state={{
              previous: searchParams.get("page"),
              q: searchParams.get("q"),
            }}
            sx={{ margin: "auto" }}
          >
            Info
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UserItem;
