import React from 'react';
import {
    FaSearch
} from 'react-icons/fa';
import {
    useSearch
} from '../Context-State/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SearchBoxNav = () => {
    const [searchValue, setSearchValue] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/search/${
                searchValue.keyword
            }`);
            setSearchValue({
                ...searchValue,
                results: data
            });
            console.log(data)
            navigate("/search");

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form className=' px-2 lg:w-full relative lg:flex items-center'
            onSubmit={handleSubmit}>

            <input type="search" name="navSearch" className='relative outline-0 py-1 px-3 rounded-full flex-1' placeholder='Search....' id=""
                value={
                    searchValue.keyword
                }
                onChange={
                    (e) => {
                        setSearchValue({
                            ...searchValue,
                            keyword: e.target.value
                        })
                    }
                }/>


            <div className=''>
                <button className='bg-[#ffc220] p-1.5 rounded-full absolute bottom-0.5 right-5 ' type="submit" value=""><FaSearch className='text-black'/></button>
            </div>
        </form>
    )
}

export default SearchBoxNav
