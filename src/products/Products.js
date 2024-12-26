import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import '../styles/shared/displayUtils.css';

const Products = (productData) => {
    console.log('child', productData.parentData);

    const products = productData.parentData.map(product => 
        <div key={ product.id } className="margin-top-bottom-2">
            { product.imnage }
            <Card sx={{  maxWidth: 500, backgroundColor: "#F1FAEE" }} className="product-card">
                <CardMedia
                    sx={{ height: 185 }}
                    alt={ `display image ${ product.id }` }
                    image={product.image}
                />
                <CardContent>
                    <h2>{ product.name }</h2>
                    <div className="margin-top-bottom-2">
                        <p>{ product.description }</p>
                    </div>
                    <div>
                        {
                            product.metadata_tags.map((tag, index) =>
                                <Chip 
                                    key={ index } 
                                    className="product-chip" 
                                    sx={{ backgroundColor: "#D8F1D0", fontWeight: 600, color: "#346E21", maxWidth: 120, marginRight: 1 }}
                                    label={ tag } 
                                />
                            )
                        }
                    </div>
                </CardContent>
                <CardActions className="margin-top-2-bottom-half">
                    <Button sx={{ color: "#346E21", fontWeight: 600, marginRight: 1, '&:hover': { backgroundColor: "#E5F6DF"} }} 
                            href={ product.learn_more } 
                            target="_blank">
                                Learn More
                    </Button>
                    <Button sx={{ color: "#346E21", fontWeight: 600, marginRight: 1, '&:hover': { backgroundColor: "#E5F6DF"} }} 
                            href={ product.go } 
                            target="_blank">
                                View
                    </Button>
                </CardActions>
            </Card>   
        </div>
    );

    return (
        <div className="margin-top-2 center-vert-list">
            { products }
        </div>
    )
}

export default Products;