import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BackgroundImage from "../assets/background.jpg"; // Adjust the path as necessary
import Plan from "../assets/plan.jpg"; // Adjust the path as necessary
import logo from "../assets/logo.jpg"; // Adjust the path as necessary
import Form from "./Form";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            src={logo}
            aria-label="recipe"
          ></Avatar>
        }
        titleTypographyProps={{
          sx: {
            color: "#CD5656", // หรือใช้สีตรง ๆ เช่น '#333'
            fontSize: "18px", // หรือ '24px'
            fontWeight: "bold",
          },
        }}
        title="Supamat & Pathompong"
        subheader="July 5, 2025"
      />
      <CardMedia
        component="img"
        height="194"
        image={BackgroundImage}
        alt="Paella dish"
      />
      <CardContent>
        <Form />
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography color="#CD5656" fontFamily={"mali"} fontWeight={"bold"}>ผังงานแต่ง</Typography>
          <CardMedia
            component="img"
            height="194"
            image={Plan}
            alt="Paella dish"
            sx={{
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
