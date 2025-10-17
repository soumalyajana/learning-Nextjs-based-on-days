"use client";

import { useEffect, useState } from "react";
import { fetchListOfProducts } from "@/actions";

export default function ClientPageExample() {

    const [ products , setProducts]= useState();
    const [loading , setLoading]= useState(true);

  async function getListofProducts() {
    const data = await fetchListOfProducts();
    console.log(data);
    if(data){
        setProducts(data);
        setLoading(false);
    }
  }

  useEffect(() => {
    getListofProducts();
  }, []);

  if(loading){
    return <h1>Loading data......</h1>
  }

  return (
    <div>
      <h1>Client page server action Example</h1>
      <ul>
        {
            products && products.length > 0 ? (products.map((item)=> <li key={item.id}>{item.title}</li>)) : (
                <h2>No products found</h2>
            )
        }
      </ul>
    </div>
  );
}
