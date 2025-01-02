import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const CardMenu = () => {
  const [Food, setFood] = useState([]);
  let params = useParams();

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4434646&lng=78.3771953&collection=${params.id}&tags=layout_CCS_${params.title}&sortBy=&filters=&type=rcv2&offset=0&page_type=null&isSearch=false`
      )
      .then((res) => {
        console.log(res?.data?.data?.cards?.slice(3));
        setFood(res?.data?.data?.cards?.slice(3));
      });
  }, [params.id, params.title]);

  return (
    <div>
      {Food?.map((item) => {
        return (
          <div key={item?.card?.card?.info?.id}>
            <h1>{item?.card?.card?.info?.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default CardMenu;
