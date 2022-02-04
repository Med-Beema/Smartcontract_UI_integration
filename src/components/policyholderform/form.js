//###############antd design################
// import React, { useState } from "react";
// import "./policyholderform.css";
// import { Container } from "react-bootstrap";
// import axios from "axios";
// import {
//   Form,
//   Input,
//   Select,
//   Checkbox,
//   Button,
//   Upload,
//   DatePicker,
// } from "antd";
// const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

// export default function PolicyHolderForm() {
//   const [values, setValues] = useState({
//     name: "",
//     fatherName: "",
//     dob: "",
//     permanentAddress: "",
//     occupation: "",
//     contactNum: "",
//     photo: "",
//     identificationNum: "",
//     idType: "",
//     issuedDate: "",
//     issuedPlace: "",
//     identificationPhoto: "",
//     signature: "",
//   });
//   const [form] = Form.useForm();

//   // const onFinish = (values) => {
//   //   console.log("Received values of form: ", values);
//   // };

//   function handleChange(e) {
//     const data = e.target.value;
//     setValues({
//       ...values,
//       [e.target.name]: data,
//     });
//   }

//   function handleImageChange(e) {
//     if (e.target.files.length) {
//       let formData = new FormData();
//       formData.set("image", e.target.files[0]);
//       axios
//         .post("http://localhost:3000/api/uploadImage", formData)
//         .then((res) => {
//           console.log(res);
//           if (res.status === 200) {
//             setValues((prevState) => ({
//               ...prevState,
//               [e.target.name]: res.data.image,
//             }));
//           }
//         });
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log(values);
//     axios
//       .post("http://localhost:3000/api/data", values)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   return (
//     <Form
//       {...formItemLayout}
//       form={form}
//       name="register"
//       //onFinish={onFinish}
//       scrollToFirstError
//       onSubmit={handleSubmit}
//       encType="multipart/form-data"
//     >
//       <Form.Item
//         name="name"
//         label="Name"
//         type="text"
//         rules={[
//           {
//             required: true,
//             message: "Please input your name!",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="fatherName"
//         label="Father Name"
//         type="text"
//         rules={[
//           {
//             required: true,
//             message: "Please input your father name!",
//           },
//         ]}
//         type="text"
//         onChange={handleChange}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="dob"
//         label="DOB"
//         type="date"
//         rules={[
//           {
//             required: true,
//             message: "Please enter valid date",
//           },
//         ]}
//         onChange={handleChange}
//       >
//         <DatePicker />
//       </Form.Item>
//       <Form.Item
//         name="permanentAddress"
//         label="Address"
//         type="text"
//         rules={[
//           {
//             required: true,
//             message: "Please input your address!",
//           },
//         ]}
//         type="text"
//         onChange={handleChange}
//       ></Form.Item>

//       <Form.Item
//         name="occupation"
//         label="Occupation"
//         type="text"
//         rules={[
//           {
//             required: true,
//             message: "Please input your ocupation!",
//           },
//         ]}
//         type="text"
//         onChange={handleChange}
//       ></Form.Item>

//       <Form.Item
//         name="contactNum"
//         label="Contact Number"
//         rules={[
//           {
//             required: true,
//             message: "Please input your phone number!",
//           },
//         ]}
//         onChange={handleChange}
//       >
//         <Input type="tel" />
//       </Form.Item>

//       <Form.Item
//         name="photo"
//         label="Photo"
//         valuePropName="fileList"
//         //getValueFromEvent={normFile}
//       >
//         <Upload name="logo" action="/upload.do" listType="picture">
//           <Button>Click to upload</Button>
//         </Upload>
//       </Form.Item>

//       <Form.Item
//         name="identificationNum"
//         label="Identification"
//         rules={[
//           {
//             required: true,
//             message: "Please input your Identification number!",
//           },
//         ]}
//         onChange={handleChange}
//       >
//         <Input type="text" />
//       </Form.Item>
//       <Form.Item
//         name="issuedDate"
//         label="Issued Date"
//         type="date"
//         rules={[
//           {
//             required: true,
//             message: "Please enter valid date",
//           },
//         ]}
//         onChange={handleChange}
//       >
//         <DatePicker />
//       </Form.Item>
//       <Form.Item
//         name="issuePlace"
//         label="Issued Place"
//         type="text"
//         rules={[
//           {
//             required: true,
//             message: "Please input your place!",
//           },
//         ]}
//         type="text"
//         onChange={handleChange}
//       ></Form.Item>
//       <Form.Item
//         name="identificationPhoto"
//         label="Identification Photo"
//         valuePropName="fileList"
//         //getValueFromEvent={normFile}
//       >
//         <Upload
//           name="identificationPhoto"
//           action="/upload.do"
//           listType="picture"
//         >
//           <Button>Click to upload</Button>
//         </Upload>
//       </Form.Item>
//       <Form.Item
//         name="signature"
//         label="Signature"
//         valuePropName="fileList"
//         //getValueFromEvent={normFile}
//       >
//         <Upload name="signature" action="/upload.do" listType="picture">
//           <Button>Click to upload</Button>
//         </Upload>
//       </Form.Item>

//       <Form.Item
//         name="agreement"
//         valuePropName="checked"
//         rules={[
//           {
//             validator: (_, value) =>
//               value
//                 ? Promise.resolve()
//                 : Promise.reject(new Error("Should accept agreement")),
//           },
//         ]}
//         {...tailFormItemLayout}
//       >
//         <Checkbox>
//           I have read the <a href="">agreement</a>
//         </Checkbox>
//       </Form.Item>
//       <Form.Item {...tailFormItemLayout}>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }
