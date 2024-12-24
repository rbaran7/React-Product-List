import React, {useState, useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Products from './Products';
import Loading from '../shared/Loading';

const ProductsParent = () => {    
    const [productData, setProductData] = useState(null);
    const [productFilters, setProductFilters] = useState([]);
    //const [activeFilt]

    const productConfig = async () => {
        const response = await fetch('product-config.json');
        const jsonData = await response.json();

        generateFilters(jsonData.products);
        setProductData(jsonData.products);
    }

    const generateFilters = (filteredData) => {
        const mergedFilterArray = [];

        for (let i = 0; i < filteredData.length; i++) {
            mergedFilterArray.push(filteredData[i].metadata_tags)
        }

        const flattenedFilters = mergedFilterArray.flat();
        const uniqueFilterSet = new Set(flattenedFilters);
        const uniqueFilterArray = Array.from(uniqueFilterSet);

        setProductFilters(uniqueFilterArray)
        console.log(uniqueFilterArray)
    };


    useEffect(() => {
        productConfig();
    }, []);
    
    return (
        productData ? 
        <>
            <div className="center-vert-list margin-top-12">
                <FormControl sx={{ m: 2, width: 500 }}>
                    <InputLabel id="product-filter-label">Filter Products</InputLabel>
                    <Select
                        labelId="product-filter-label"
                        id="product-multiple-checkbox"
                        multiple
                        value={ [] }
                        input={ <OutlinedInput label="Filter" />}
                        renderValue={ (selected) => selected.join(', ') }
                    >
                    { 
                        productFilters.map((filter, index) => (
                            <MenuItem key={ index } value={filter}>
                                <Checkbox checked={false} />
                                <ListItemText primary={ '' } />
                            </MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
            </div>
            <Products parentData = { productData } />
        </> 
        : 
        <Loading />
    );
};

export default ProductsParent;