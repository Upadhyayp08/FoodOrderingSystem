import React, { useState, useEffect } from "react";
import axios from "axios";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3015/api/v1/workorders/get")
      .then((res) => {
        setMenuItems(res.data.ResponseData[0]);
        console.log(res.data.ResponseData[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="container">
        {/* <div className="section">Hello??</div> */}
        {menuItems.map((item) => (
          <>
            {
              //   <div class="card mb-4 mt-5">
              //     <div class="card-body">
              //       <div className="row">
              //         <div className="col-md-12">
              //           <div className="row">
              //             <div className="col-md-1">
              //               <img
              //                 src={item.ItemImage}
              //                 width="30px"
              //                 height="50px"
              //                 alt="ItemImage"
              //               />
              //             </div>
              //             <div className="col-md-5">{item.ItemDescription} </div>
              //           </div>
              //         </div>
              //         {/* <div className="col-md-6">{item.ItemDescription}</div> */}
              //       </div>
              //     </div>
              //   </div>
              <div className="container">
                <div class="card mb-4 mt-5">
                  <div className="row">
                    <div className="col-sm-1">
                      <img
                        src={item.ItemImage}
                        width="30px"
                        height="50px"
                        alt="ItemImage"
                      />
                    </div>
                    <div className="col-sm-3">
                      <div>{item.ItemName}</div>
                      <div>{item.ItemDescription}</div>
                      <div>${item.ItemPrice}</div>
                    </div>
                    <div className="col-sm-2">
                      <div className="input-group">
                        <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn btn-default btn-number"
                            onClick={handleDecrease}
                          >
                            -
                          </button>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={quantity}
                          readOnly
                        />
                        <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn btn-default btn-number"
                            onClick={handleIncrease}
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </>
        ))}
        {/* Hello World */}
      </div>
    </>
  );
}

export default Menu;
