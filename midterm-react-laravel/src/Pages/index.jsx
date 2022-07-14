import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [listFood, setListFood] = useState([]);
    const [listFoodSearch, setListFoodSearch] = useState([]);
    const [statistics, setStatistics] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/foods`).then((res) => {// eslint-disable-next-line
            setListFood(res.data)// eslint-disable-next-line
        });// eslint-disable-next-line
        axios.get(`http://localhost:8000/api/statistical`).then(res => {// eslint-disable-next-line
            setStatistics(res.data)// eslint-disable-next-line
        })// eslint-disable-next-line
    }, [])

    const onChangeHandler = (key, value) => {
        const formData = new FormData();
        formData.append(key, value);
        axios.post(`http://localhost:8000/api/foodSearch`, formData).then(res => {
            setListFoodSearch(res.data)
        })
    }


    return (
        <div>
            <div className="d-flex justify-content-around">
                <p className="fs-1">Food Store</p>
                <div className="row g-3 pt-3" >
                    <div className="col-auto ">
                        <input type="text" className="form-control" id="name" placeholder="Name" onChange={e => onChangeHandler('name', e.target.value)} />
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" id="discountPrice" placeholder="Discount Price" onChange={e => onChangeHandler('discountPrice', e.target.value)} />
                    </div>
                    {/* <div className="col-auto">
                        <input type="text" className="form-control" id="category" placeholder="Category" onChange={e => onChangeHandler('category', e.target.value)} />
                    </div> */}
                </div>
                <div className="pt-3 ">
                    <button className="btn btn-primary"><Link className="text-white text-decoration-none" to={'statistical'}>Go to Statistical</Link></button>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Quantity</th>
                        {/* <th scope="col">Handle</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        !!statistics
                            ?
                            statistics.data.map((ele, index) => 
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.quantity}</td>
                                {/* <td>@mdo</td> */}
                            </tr>
                            )
                            
                            :
                            ""
                    }
                </tbody>
            </table>
            <div className="row justify-content-center gap-3" >
                {
                    !!listFoodSearch.data
                        ?
                        (listFoodSearch.data).map((ele, index) =>
                            <div key={index} className="card col-4" style={{ width: '18rem' }}>
                                <img src={`http://localhost:8000/images/${ele.image}`} className="card-img-top" style={{ height: '12rem', width: '100%' }} alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{ele.name}</h5>
                                    <p className="card-text text-truncate" >{ele.description}</p>
                                    <div className="row">
                                        <p className="card-text col-6">{ele.discountPrice}</p>
                                        <p className="card-text col-6 text-decoration-line-through">{ele.price}</p>
                                    </div>
                                    <Link className=" btn btn-primary text-decoration-none" to={`detail/${ele.id}`}>View Detail</Link>
                                </div>
                            </div>)
                        :
                        !!(listFoodSearch.Error)
                            ?
                            <p className="text-center fs-1 text-danger text-uppercase">{listFoodSearch.Error}</p>
                            :
                            !!(listFood.data)
                                ?
                                (listFood.data).map((ele, index) =>
                                    <div key={index} className="card col-4" style={{ width: '18rem' }}>
                                        <img src={`http://localhost:8000/images/${ele.image}`} className="card-img-top" style={{ height: '12rem', width: '100%' }} alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{ele.name}</h5>
                                            <p className="card-text text-truncate" >{ele.description}</p>
                                            <div className="row">
                                                <p className="card-text col-6">{ele.discountPrice}</p>
                                                <p className="card-text col-6 text-decoration-line-through">{ele.price}</p>
                                            </div>
                                            <Link className=" btn btn-primary text-decoration-none" to={`detail/${ele.id}`}>View Detail</Link>
                                        </div>
                                    </div>
                                )
                                :
                                ""
                }
            </div>
        </div>
    )
}

export default HomePage;