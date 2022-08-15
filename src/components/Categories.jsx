import React from "react";

function Categories({value, onClickCategory}) {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((categorie, idx) => (
                    <li onClick={()=> onClickCategory(idx)} className={value === idx ? 'active' : ''} key={idx}>
                        {categorie}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories