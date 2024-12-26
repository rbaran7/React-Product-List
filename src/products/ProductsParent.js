import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Products from "./Products";
import Loading from "../shared/Loading";

const ProductsParent = () => {    
    const [productData, setProductData] = useState(null);
    const [productFilters, setProductFilters] = useState([]);
    const [activeFilter, setActiveFilter] = useState([]);

    const productConfig = async () => {
        const response = await fetch("product-config.json");
        const jsonData = await response.json();

        generateFilters(jsonData.products);
        setProductData(jsonData.products);
    };

    /**
     * @param { Array } filteredData 
     */
    const generateFilters = (filteredData) => {
        const mergedFilterArray = [];

        for (let i = 0; i < filteredData.length; i++) {
            mergedFilterArray.push(filteredData[i].metadata_tags);
        }

        const uniqueFilterArray = Array.from(new Set(mergedFilterArray.flat()));

        setProductFilters(uniqueFilterArray);
    };

    /**
     * @param { ChangeEvent<T> } event 
     */
    const handleChange = (event) => {
        const { target: { value }, } = event;
        
        setActiveFilter (
          typeof value === 'string' ? value.split(',') : value,
          filterProducts(value)
        );
    };

    /**
     * This client side filter is assuming an OR functionality when multiple filter values are present
     * 
     * @param { Array } filterValue 
     */
    const filterProducts = (filterValue) => {
        const filteredProductData = [];

        for (let i = 0; i < productData.length; i++) {
            for (const value of filterValue) {
                if (productData[i].metadata_tags.includes(value)) {
                    filteredProductData.push(productData[i])
                }
            }
        }
        
        const uniqueProductData = Array.from(new Set(filteredProductData));

        filteredProductData.length ? setProductData(uniqueProductData) : productConfig();
    }

    const clearAllFilters = () => {
        setActiveFilter([]);
        productConfig();
    }

    /**
     * Get products on initilization
     */
    useEffect(() => {
        productConfig();
    }, []);
    
    return (
        productData ? 
        <>
            <div className="center-vert-list margin-top-12">
                <FormControl sx={{ m: 2, width: "50%" }}>
                    <InputLabel id="product-filter-label">Filter Products</InputLabel>
                    <Select
                        labelId="product-filter-label"
                        id="product-multiple-checkbox"
                        multiple
                        value={ activeFilter }
                        onChange={ handleChange }
                        input={ <OutlinedInput label="Filter Products" />}
                        renderValue={ (selected) => selected.join(", ") }
                    >
                    { 
                        productFilters.map((filter, index) => (
                            <MenuItem key={ index } value={ filter }>
                                <Checkbox checked={ activeFilter.includes(filter) } />
                                <ListItemText primary={ filter } />
                            </MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                { 
                    activeFilter.length ? 
                    (
                        <Button 
                            sx={{ color: "#346E21", fontWeight: 600, marginRight: 1, "&:hover": { backgroundColor: "#E5F6DF"} }}
                            variant="text"
                            onClick={ () => clearAllFilters() }>
                                Clear All Filters
                        </Button>
                    )
                    : 
                    <></>
                }
            </div>
            <Products parentData = { productData } />
        </> 
        : 
        <Loading />
    );
};

export default ProductsParent;