import React, { Fragment, useState } from "react";
import Sales from "./database/sales.json";
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

export function App(){
    const [catValue, setCatValue] = useState(Sales.categories[0].name);

    const [prodValue, setProdValue] = useState(Sales.categories.find((category) => category.name === catValue).products[0].name);

    const [brandValue, setBrandValue] = useState(Sales.categories.find((category) => category.name === catValue).products.find((product) => product.name === prodValue).brands[0].name);

    const handleChangeCat = (event) => {
        setCatValue(event.target.value);
        setProdValue(Sales.categories.find((category) => category.name === event.target.value).products[0].name);
        setBrandValue(Sales.categories.find((category) => category.name === event.target.value).products[0].brands[0].name);
    };

    const handleChangeProd = (event) => {
        setProdValue(event.target.value);
        setBrandValue(Sales.categories.find((category) => category.name === catValue).products.find((product) => product.name === event.target.value).brands[0].name);
    };

    const handleChangeBrand = (event) => {
        setBrandValue(event.target.value);
    }

    // ---------------------------------------------------------------------------------------------------
    // BAR CHART
    const data = {
        labels: Sales.categories.find((category) => category.name === catValue).products.find((product) => product.name === prodValue).brands.find((brand) => brand.name === brandValue).sales.months,
        datasets:[{
            label: "Units Sold",
            backgroundColor: "rgba(48, 221, 235, 1)",
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: "rgba(13, 167, 179, 1)",
            hoverBorderColor: 'black',
            data: Sales.categories.find((category) => category.name === catValue).products.find((product) => product.name === prodValue).brands.find((brand) => brand.name === brandValue).sales.amount
        }]
    };

    const options = {
        maintainAspectRatio: true,
        responsive: true,
        aspectRatio: 3|1,
        scales:{
            yAxes:{
                title: {
                    display: true,
                    text: "Sales"
                } 
            },
            xAxes:{
                title:{
                    display: true,
                    text: "Months"
                }
            }
        }
    };

    // ---------------------------------------------------------------------------------------------------

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}>
                <h1>Sales by month for:</h1>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
                <label>Category:&nbsp;
                    <select value={catValue} onChange={handleChangeCat}>
                        {Sales.categories.map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </label>

                <label>Product:&nbsp;
                    <select value={prodValue} onChange={handleChangeProd}>
                        {Sales.categories.find((category) => category.name === catValue).products.map((product) => (
                            <option key={product.name} value={product.name}>{product.name}</option>
                        ))}
                    </select>
                </label>

                <label>Brand:&nbsp;
                    <select value={brandValue} onChange={handleChangeBrand}>
                        {Sales.categories.find((category) => category.name === catValue).products.find((product) => product.name === prodValue).brands.map((brand) => (
                            <option key={brand.name} value={brand.name}>{brand.name}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <Bar data={data} options={options}/>   
            </div>
        </div>
        
    );
}