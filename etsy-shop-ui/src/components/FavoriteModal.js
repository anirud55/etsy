import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { favoritesupdated } from "../actions/favoritesaction";
import { BACKEND } from "../constants/userConstants";


export default function FavoriteModal(props) {
  const [show, setShow] = useState(props.show);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  //Closing the modal
  const handleClose = () => {
    dispatch(favoritesupdated(false));
    setMessage("");
    setShow(false);
  };

  //submit Login handler to send a request to the node backend
  const favoritebuttonclick = (e) => {
    if (localStorage.getItem("email") === null) {
      console.log(localStorage.getItem("email"));
      setMessage("Please login first.");
    } else if (localStorage.getItem("shopname") === props.shopname) {
      setMessage("You cannot add your own item to your favorites");
    } else {
      //prevent page from refresh
      e.preventDefault();
      console.log();
      const data = {
        name: props.name,
        shopname: props.shopname,
        email: localStorage.getItem("email"),
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(BACKEND + "/addtofavorites", data)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("here");
            setMessage("Added to favorites");
          }
        })

        .catch((error) => {
          console.log(error.response.data);
          setMessage(error.response.data);
        });
    }
    dispatch(favoritesupdated(true));
    handleShow();
    setTimeout(() => {
      handleClose();
    }, 500);
  };

  return (
    <>
      <Button
        class="btn bg-transparent"
        onClick={favoritebuttonclick}
        style={{
          position: "relative",
          right: "-250px",
          height: "25px",
          width: "25px",
          border: "none",
          "padding": "15px 20px", 
          "background-color": "teal",
          "color": "white",
          "cursor": "pointer",
          "margin-bottom": "10px"
        }}
      >
        <img
          src="/images/heart.jpg"
          class="rounded-circle"
          style={{
            position: "relative",
            right: "-250px",
            height: "20px",
            width: "20px",
          }}
        />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div class={message ? "visible" : "invisible"}>
            <div>{message}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
