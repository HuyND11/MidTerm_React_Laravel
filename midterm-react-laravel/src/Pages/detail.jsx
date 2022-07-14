import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const FoodDetail = () => {
    const parms = useParams();
    const [food, setFood] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/foods/${parms.id}`).then(res => {
            setFood(res.data)
            setIsLoading(true);
        })// eslint-disable-next-line
    }, [])
    // console.log(food.data);
    return (
        <div className="text-align-center">
            {
                isLoading
                ?
                !!food.data
                    ?
                    <>
                        <p className="fs-1 fw-bolder">Detail {food.data[0].name}</p>
                        <div className="row justify-content-center ">
                            <div className="col-6">
                                <img style={{ width: '100%', height: 25 + 'rem' }} className="img-fluid" src={`http://localhost:8000/images/${food.data[0].image}`} alt="" />
                            </div>
                            <div className="col-6">
                                <p className="fs-2 fw-bolder "> {food.data[0].name}</p>
                                <div className="row justify-content-evenly">
                                    <p className="card-text col-6 fs-4 text-warning"><span className="fs-3 fw-bold">Price: </span>{food.data[0].discountPrice} Vnd</p>
                                    <p className="card-text col-6 fs-5 text-decoration-line-through">{food.data[0].price} Vnd</p>
                                </div>
                                <p className="card-text col-6 fs-5"><span className="fs-5 fw-bold">Category: </span>{food.data[0].category_name}</p>
                                <div className="text-wrap"><span className="fs-5 fw-bold">Description: </span>{ food.data[0].description} </div>
                                <button className="btn btn-primary"><Link to={'/'} className = "text-dark text-decoration-none">Back Home Page</Link></button>
                            </div>
                        </div>
                    </>
                    :
                    !!food.Error
                    ?
                    <div>{food.Error}</div>
                    :
                    ""
                :
                <div>Loading</div>
            }

        </div>
    )
}

export default FoodDetail;