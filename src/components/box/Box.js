import './Box.css'
// import React, { useState } from 'react';

export default function Box({ onFiltersChange, filter_name, data }){
    function handleSelectChange(e){
        onFiltersChange({[filter_name]: e.target.value});
    }
    const set = new Set();
    const filter_arr = data.map((item)=>{
        if(!set.has(item)){
            set.add(item)
            return <option value={item}>{item}</option>
        }
        return null
    })

    return(
            <>
            <div>
            <select class="box dropdown" onChange={handleSelectChange}>
                <option value="" selected>{filter_name}</option>
                {filter_arr}
                </select>

            

            </div>

            </>

            
        
        
    )
}