import React, {useState, useEffect} from 'react';
import Products from './Products';
import Loading from '../shared/Loading';

const ProductsParent = () => {
    const [productData, setProductData] = useState(null);

    const fetchConfig = async () => {
        const response = await fetch('product-config.json');
        const jsonData = await response.json();

        setProductData(jsonData.products);
    }

    useEffect(() => {
        fetchConfig();
    }, []);
    
    return (
        productData ? <Products parentData = { productData } /> : <Loading />
    );
};

export default ProductsParent;