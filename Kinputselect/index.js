/**
 * Open sourced React component
 * @name k-input-select
 * @type Component
 * @author Kim Sean Pusod
 * @description a search input with dropdown select
 * @uses React by Facebook
 */

import React, { useState, useEffect } from 'react'
import arrow from './arrow.svg'
import searchIcon from './search.svg'

/**
 * List of usable props
 * @prop containerClass (string)
 * @prop placeholder (string)
 * @prop list (array of objects)
 * @prop value (Initial Value)
 * @prop displayValueKey (Key name in the List array to display in select dropwdown)
 * @prop onSelect (callback returns value of the selected)
 */

const SearchInput = ({
    containerClass,
    placeholder,
    list,
    value,
    displayValueKey,
    onSelect
    }) => {

    const [showList, setShowList] = useState(false)
    const [componentList, setComponentList] = useState(list)
    
    useEffect(() => {
        !showList ? setComponentList(list): null
    })
    
    window.addEventListener('mouseup',function(event){
        try {
            //add an event that will hide the search list upon click to any document
            let containerlist = document.querySelector('.k-search-container')
            if(!containerlist.contains(event.target)) {
                let elem = getElementArrowIcon()
                elem.classList.remove('k-icon-rotate-up')
                setShowList(false)
            }
        } catch (err) {}
    })
    
    const getElementArrowIcon = () => {
        return document.getElementById('k-search-arrow-icon')
    }

    const toggleArrow = () => {
        let elem = getElementArrowIcon()
        !showList ? elem.classList.add('k-icon-rotate-up') : elem.classList.remove('k-icon-rotate-up')
    }

    return (
        <div className={`${containerClass} k-search-container`}>
            <div className="k-search-selected" onClick={(event) => {
                toggleArrow()
                showList ? setShowList(false) : setShowList(true)
                
            }}>
                <div className="k-search-name">{value}</div>
                <div id="k-search-arrow-icon" className="k-search-d-icon k-icon-rotate-down">
                    <img src={arrow} alt=""/>
                </div>
            </div>
            {
                showList ? (
                    <div className="k-search-list-container">
                        <div className="k-search-input-container">
                            <img src={searchIcon} alt=""/>
                            <input type="text" placeholder={placeholder} onChange={(event) => {
                                let input_data = event.target.value
                                let shallowed_list = list
                                let filtered_list = shallowed_list.filter(val => val[displayValueKey].toLocaleLowerCase().includes(input_data.toLocaleLowerCase()) ? val: null)
                                setComponentList(filtered_list)
                            }}/>
                        </div>
                        <div className="k-search-list-group">
                            {
                                componentList.map(item => {
                                    return (
                                        <div key={item.id} className="k-search-list-item" onClick={(event) => {
                                            setShowList(false)
                                            onSelect(item)
                                            toggleArrow()
                                        }}>{item[displayValueKey]}</div>
                                    )
                                }) 
                            }
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default SearchInput