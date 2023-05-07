import axios from 'axios';
import React, {
    useEffect,
    useState
} from 'react'

const Recommended = (props) => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const[products, setProducts] = useState([]);

    const getAllCategory = async () => {
        try {
            const {
                data
            } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            if (data.success) {
                setCategories(data.getAllCategory);
            }
        } catch (error) {
            console.log(error)
        }

    }

    const getRecommendend = async () => {
        try {
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/similar-products/${JSON.parse(props.productCat) }`);
            setProducts(data.fetchData);
            console.log(products)
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        getAllCategory();
        getRecommendend();

    }, []);
    return (
        <div> {
            props.slug
        }
            <br/>
            <div className=""></div>

            {
            props.productCat
        } </div>
    )
}

export default Recommended
