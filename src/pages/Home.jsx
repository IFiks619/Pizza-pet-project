import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import qs from 'qs';
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories.jsx";
import Sort, { sortList } from "../components/Sort.jsx";
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination/index.jsx";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice.js";
import { fetchPizzas } from "../redux/slices/pizzaSlice.js";
import { useRef } from "react";


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isMounted = useRef(false)

    const { searchValue, categoryId, sort, currentPage } = useSelector(state => state.filter)
    const { items, status } = useSelector(state => state.pizza)

    const [isLoading, setIsLoading] = useState(true)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = num => {
        dispatch(setCurrentPage(num))
    }

    const getPizzas = async () => {
        const sortBy = sort.sortProperty
        const category = categoryId > 0 ? String(categoryId) : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );
    }

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const params = {
                categoryId: categoryId > 0 ? categoryId : null,
                sortProperty: sort.sortProperty,
                currentPage,
            };

            const queryString = qs.stringify(params, { skipNulls: true });

            navigate(`/?${queryString}`);
        }

        const params = qs.parse(window.location.search.substring(1));
        const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy);
        dispatch(
            setFilters({
                searchValue: params.search,
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sortObj || sortList[0],
            }),
        );

        getPizzas();
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    useEffect(() => {
        getPizzas()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    // Парсим параметры при первом рендере
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort || sortList[0],
                }),
            );
            isMounted.current = true;
        }
    }, []);


    const skeleton = [...new Array(4)].map((_, i) => <Skeleton key={i} />)
    const pizzas = items.filter(item => {
        if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }

        return false
    })
        .map(item =>
            <PizzaBlock {...item} key={item.id}
            />
        )


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home

