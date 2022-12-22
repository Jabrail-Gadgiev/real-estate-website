import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import propertyData from "./propertyData";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [product, setProduct] = React.useState();

  React.useEffect(() => {
    const prodId = props.match.params.id;

    const theProduct = propertyData.filter((p) => p.id == prodId)[0];

    console.log("theProduct", theProduct);

    setProduct(theProduct);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!product) {
    return <p>Loading....</p>;
  } else {
    return (
      <Grid container justifyContent="center" sx={{ my: 3 }}>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={product.title} subheader={product.price} />
            <CardMedia
              component="img"
              height="500"
              image={product.img}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
