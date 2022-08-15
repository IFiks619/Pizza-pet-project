import React from 'react'
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, onChangePage }) => {
    return (
        <>
            <ReactPaginate
                className={styles.pagination}
                breakLabel='...'
                nextLabel='>'
                previousLabel='<'
                renderOnZeroPageCount={null}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
                onPageChange={e => onChangePage(e.selected + 1)}
            />
        </>
    )
}

export default Pagination