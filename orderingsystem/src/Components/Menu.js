import React, { useState, useEffect } from "react";
import axios from "axios";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [completeOrder, setCompleteOrder] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3015/api/v1/workorders/get")
      .then((res) => {
        const mappedReceivingItems = res.data.ResponseData[0]?.map((item) => {
          const mappedItem = {
            ItemID: item.ID,
            ItemName: item.ItemName,
            ItemPrice: parseFloat(item.ItemPrice),
            ItemImage: item.ItemImage,
            ItemDescription: item.ItemDescription,
            ItemQuantity: 1,
          };
          return mappedItem;
        });
        setMenuItems(mappedReceivingItems);
        console.log(mappedReceivingItems);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setCompleteOrder(false);
  }, [order]);

  const handleDecrease = (index) => {
    console.log(index);
    // return true;
    if (menuItems[index].ItemQuantity > 1) {
      const updatedState = [...menuItems]; // Create a copy of the state array
      updatedState[index] = {
        ...updatedState[index], // Copy the object at the specified index
        ItemQuantity: updatedState[index].ItemQuantity - 1, // Decrease the quantity by 1
      };
      setMenuItems(updatedState); // Update the state with the updated array
    }
  };

  const handleIncrease = (index) => {
    console.log(index);
    const updatedState = [...menuItems]; // Create a copy of the state array
    updatedState[index] = {
      ...updatedState[index], // Copy the object at the specified index
      ItemQuantity: updatedState[index].ItemQuantity + 1, // Increase the quantity by 1
    };
    setMenuItems(updatedState);
  };

  const handleDelete = (index) => {
    console.log(index);
    const filteredData = order.filter(
      (item, currentIndex) => index != currentIndex
    );
    setOrder(filteredData);
  };

  const handleAddToCart = (Item) => {
    console.log("Itemssss", Item);
    setOrder([...order, Item]);
    axios
      .post("http://localhost:3015/api/v1/workorders/orderinsert", {
        ItemID: Item.ItemID,
        Quantity: Item.ItemQuantity,
      })
      .then((res) => {
        console.log(res.data);
        axios
          .get("http://localhost:3015/api/v1/workorders/orderget")
          .then((res) => {
            // setOrder(res.data.ResponseData[0]);
            console.log(res.data.ResponseData[0]);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log("MenuItems", menuItems);
  console.log("Order", order);
  const total = order.reduce(
    (acc, item) => acc + parseInt(item.ItemQuantity) * parseInt(item.ItemPrice),
    0
  );

  return (
    <>
      <div className="container">
        {menuItems.map((item, index) => (
          <div key={index} className="d-flex justify-content-center mb-3">
            <div className="p-2"></div>
            <div className="p-2">
              <div className="container">
                <div className="card mb-4 mt-5">
                  <div className="row">
                    <div className="col-sm-1">
                      <img
                        src={item.ItemImage}
                        width="30px"
                        height="50px"
                        alt="ItemImage"
                      />
                    </div>
                    <div className="col-sm-6">
                      <div>{item.ItemName}</div>
                      <div>{item.ItemDescription}</div>
                      <div>${item.ItemPrice}</div>
                    </div>
                    <div className="col-sm-5 mt-3">
                      <div className="input-group">
                        <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn btn-default btn-number"
                            onClick={() => handleDecrease(index)}
                          >
                            -
                          </button>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={item.ItemQuantity} // Assuming each item object has a 'quantity' property
                          readOnly
                        />
                        <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn btn-default btn-number"
                            onClick={() => handleIncrease(index)}
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="mt-3">
                <button
                  className="btn btn-primary mt-5"
                  disabled={completeOrder}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {order && {}} */}
      {order?.length > 0 && (
        <>
          <div className="text-center">
            <h1>Order Summary</h1>
          </div>
          <div className="container">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {order?.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.ItemID}</td>
                        <td>{item.ItemImage}</td>
                        <td>{item.ItemName}</td>
                        <td>{item.ItemPrice}</td>
                        <td>{item.ItemQuantity}</td>
                        <td>
                          {parseInt(item.ItemQuantity) *
                            parseInt(item.ItemPrice)}
                        </td>
                        <td>
                          <button
                            disabled={completeOrder}
                            // style={{ border: "none" }}
                            style={{ border: "none" }}
                            className="btn btn-danger"
                          >
                            <img
                              width="25"
                              height="25"
                              onClick={() => handleDelete(index)}
                              src="https://img.icons8.com/external-filled-color-icons-papa-vector/78/external-Delete-Button-interface-filled-color-icons-papa-vector.png"
                              alt="external-Delete-Button-interface-filled-color-icons-papa-vector"
                            />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
              <tfoot>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{total}</td>
              </tfoot>
            </table>
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                setCompleteOrder(!completeOrder);
              }}
            >
              Complete Order
            </button>
          </div>
          {completeOrder && (
            <>
              <div className="text-center mt-5">
                <h3>Your Order has been Successfully Placed</h3>
              </div>
              <div className="text-center">Your Estimated Time is 43 mins</div>
              <div className="text-center">Your Order Total is : {total}</div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Menu;
