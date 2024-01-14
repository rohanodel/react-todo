import './App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

const App = () => {
  const [changeCall, setChangeCall] = useState(true);
  const [getCall, setGetCall] = useState([]);
  const [updateInfo, setUpdateInfo] = useState({
    id: "",
    name: "",
    mobile: "",
  });
  useEffect(() => {
    userAllData();
  }, [changeCall]);
  // const [inputeData, setInputData] = useState({
  //   name: "",
  //   mobile: "",
  // });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const form = useForm({
    defaultValues: {
      name: "",
      mobile: "",
    },
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

  const userAllData = () => {
    axios.get("http://localhost:3004/user").then((data) => {
      setGetCall(data.data);
    });
  };

  const deleteData = (data) => {
    axios.delete(`http://localhost:3004/user/${data}`).then(() => {
      setChangeCall(!changeCall);
    });
  };

  const updateData = () => {
    console.log(updateInfo);
    axios
      .put(`http://localhost:3004/user/${updateInfo.id}`, updateInfo)
      .then(() => {
        setChangeCall(!changeCall);
      });
    handleCloseUpdate();
  };

  const onSubmit = (data) => {
    axios.post("http://localhost:3004/user", data).then(() => {
      setChangeCall(!changeCall);
      handleClose();
    });
    // console.log('form submitted ====>', data);
    // console.log('isSubmitSuccessful ===>', isSubmitSuccessful);
  };
  // const submitData = () => {
  //   axios.post("http://localhost:3004/user", inputeData).then(() => {
  //     setChangeCall(!changeCall);
  //   });
  // };

  return (
    <div>
      <table style={{ width: "100%" }}>
        <tr style={{ border: "1px solid black" }}>
          <th style={{ border: "1px solid black" }}>id</th>
          <th style={{ border: "1px solid black" }}>name</th>
          <th style={{ border: "1px solid black" }}>mobile</th>
          <th style={{ border: "1px solid black" }}>delete</th>
          <th style={{ border: "1px solid black" }}>update</th>
        </tr>
        {getCall.map((data) => (
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }}>{data.id}</td>
            <td style={{ border: "1px solid black" }}>{data.name}</td>
            <td style={{ border: "1px solid black" }}>{data.mobile}</td>
            <td style={{ border: "1px solid black" }}>
              <button
                style={{ backgroundColor: "pink" }}
                onClick={() => deleteData(data.id)}
              >
                delete
              </button>
            </td>
            <td style={{ border: "1px solid black" }}>
              <button
                onClick={() => {
                  handleShowUpdate();
                  setUpdateInfo({
                    id: data.id,
                    name: data.name,
                    mobile: data.mobile,
                  });
                }}
                style={{ backgroundColor: "greenyellow" }}
              >
                updata
              </button>
            </td>
          </tr>
        ))}
      </table>

      <Button variant="primary" onClick={handleShow}>
        Add user
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "2rem",
              height: "12rem",
              justifyContent: "space-evenly",
            }}
          >
            <input
              type="text"
              // onChange={(e) => {
              //   setInputData({ ...inputeData, name: e.target.value });
              // }}
              placeholder="enter name"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "name is required",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.name?.message}</p>
            <input
              type="text"
              // onChange={(e) => {
              //   setInputData({ ...inputeData, mobile: e.target.value });
              // }}
              placeholder="enter mobile number"
              id="mobile"
              {...register("mobile", {
                required: {
                  value: true,
                  message: "mobile number is required",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.mobile?.message}</p>
            <Button type="submits">submit</Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "2rem",
              height: "12rem",
              justifyContent: "space-evenly",
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                setUpdateInfo({ ...updateInfo, name: e.target.value });
              }}
              placeholder="enter name"
              value={updateInfo.name}
            />
            <input
              type="text"
              onChange={(e) => {
                setUpdateInfo({ ...updateInfo, mobile: e.target.value });
              }}
              placeholder="enter mobile number"
              value={updateInfo.mobile}
            />
            <Button onClick={updateData}>Updata</Button>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default App;
