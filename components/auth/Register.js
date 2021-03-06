import React, { useState } from "react";
import { register } from "../../authentication/utils";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import InputField from "../commons/InputFields";
import Button from "../commons/Button";
import FeedBackMsg from "../commons/FeedBackMsg";
import Image from "next/image";

//State imports
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isLoggedIn,
  getToggleRegisterState,
  toggleRegisterState,
} from "../../authentication/state";

const validate = (values) => {
  const errors = {};

  if (
    !values.nama ||
    !values.domisili ||
    !values.email ||
    !values.username ||
    !values.password
  ) {
    errors.all = "All fields is required";

    return errors;
  } else {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.all = "Invalid Email Address";

      return errors;
    }

    if (values.nama.length < 6) {
      errors.all = "Nama minimum 6 character";

      return errors;
    }

    if (values.username.length < 6) {
      errors.all = "Username minimum 6 character";

      return errors;
    }

    if (values.password.length < 8) {
      errors.all = "Password minimum 8 character";

      return errors;
    }
  }
};

const Register = ({ open = false }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);

  const toggleRegister = useRecoilValue(getToggleRegisterState);

  const setToggleRegister = useSetRecoilState(toggleRegisterState);

  const formik = useFormik({
    initialValues: {
      nama: "",
      domisili: "",
      email: "",
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      register(values)
        .then((res) => {
          if (!res.status) {
            setError(true);
            setErrorMsg(res.message);
          } else {
            router.push("/submission");
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div
      className={
        (toggleRegister && !loggedIn ? "block" : "hidden") +
        " absolute z-50  flex-row w-4/12 mt-28 px-8 py-4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl top-1/2 left-1/2"
      }
      style={{ filter: "drop-shadow(5px 5px 2px #000000)" }}
    >
      <div className="flex justify-end mb-2">
        <Image
          src="/img/close_btn.svg"
          width={30}
          height={30}
          alt="Close Button"
          className="cursor-pointer hover:opacity-50"
          onClick={() => {
            setToggleRegister(false);
          }}
        />
      </div>

      <div className="flex flex-row justify-center my-8">
        <Image src="/img/logo.png" width={230} height={70} alt="Logo" />
      </div>
      <div>
        <form onSubmit={formik.handleSubmit} className="w-full ">
          <InputField
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nama}
            name="nama"
            placeholder="Nama"
            width="100%"
            black={true}
          />
          <InputField
            type="text"
            onChange={formik.handleChange}
            value={formik.values.domisili}
            name="domisili"
            placeholder="Domisili"
            width="100%"
            black={true}
          />
          <InputField
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            placeholder="Username"
            width="100%"
            black={true}
          />
          <InputField
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            placeholder="E-mail"
            width="100%"
            black={true}
          />
          <InputField
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            placeholder="Kata Sandi"
            width="100%"
            black={true}
          />
          {formik.errors.all ? (
            <FeedBackMsg text={formik.errors.all} error={true} />
          ) : null}
          {error ? <FeedBackMsg text={errorMsg} error={true} /> : null}
          <Button text="REGISTER" width="100%" />
        </form>
      </div>
    </div>
  );
};

export default Register;
