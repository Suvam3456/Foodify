import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');
  // Here initial value is an array value bcoz we send array from backend to frontend and array me hi .map fn use hota hai, object me nhi ,object me may be we use for-in loop

  const loadData = async () => {
    // bcoz fetch api is an asynchronous operation by
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  // Empty array means first baar jab load/render hoga tab hi bas loadData() fn run hoga

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          // carousel we are using only in Home.js aur carousel ke andar jo search
          // bar hai uska direct relation data ke saath hai jo filter hoga
          id="carouselExampleFade"
          className="carousel slide carousel-fade cara"
          data-bs-ride="carousel" style={{ zIndex: "8" }}
        >
          <div className="carousel-inner" id="cara">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </div>
            </div>

            <div
              className="carousel-item active"
              style={{ objectFit: "contain !important" }}
            >
              <img
                src="https://source.unsplash.com/random/?burger/20x20"
                style={{ filter: "brightness(30%)", width:"100%", overflow: "hidden", height:"100%"}}
                className="d-block w-100 "
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?pizza/20x20"
                className="d-block w-100"
                style={{ filter: "brightness(30%)", width:"100%",height:"100%",overflow:"hidden" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/?noodles/20x20"
                className="d-block w-100"
                style={{ filter: "brightness(30%)", width:"100%",objectFit:"contain" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          ></button>
        </div>
        <div className="container ctt">
          {foodCat == [] ? (
            <div>""""""</div>
          ) : (
            foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3" style={{fontWeight:"bold", fontStyle:"oblique"}}>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem == [] ? (
                    <div> No Such Data Found </div>
                  ) : (
                    foodItem
                      .filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              // foodName={filterItems.name}
                              foodItem = {filterItems}
                              options={filterItems.options[0]}
                              // imgSrc={filterItems.img}
                              
                            >
                              {" "}
                            </Card>
                          </div>
                        );
                      })
                  )}
                </div>
              );

              // Filter is an inbuilt fn just like .map to display all pizza items under pizza category name

              // wrap entire under a parent div in return of .map and filter fn

              // food_items ko filter kiya wrt ki categoryname and creates an  array of objects with only those elements which have same categoryname and then uspe .map chalaya and then us map ne card ko call kiya aur props me data send karenge utni baar card repeate hua card
            })
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
