import React from "react";
import Image from "next/image";
import Link from "next/link";

import { logout } from "../../authentication/utils";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import {
  isLoggedIn,
  toggleLoginState,
  toggleRegisterState,
} from "../../authentication/state";
import Button from "../navbar/Button";
import LFMLink from "../navbar/LFMLink";
import Profile from "../navbar/Profile";

const Navbar = ({ type }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);

  const setToggleLogin = useSetRecoilState(toggleLoginState);
  const setToggleRegister = useSetRecoilState(toggleRegisterState);

  const authLoginClick = () => {
    console.log("Login Clicked");
    setToggleLogin((prevToggle) => !prevToggle);
    setToggleRegister(false);
  };

  const authRegisterClick = () => {
    console.log("Register Clicked");
    setToggleRegister((prevToggle) => !prevToggle);
    setToggleLogin(false);
  };

  const logoutClick = () => {
    logout();
    router.push("/");
  };

  return (
    <div
      className={
        "flex items-center justify-between px-10 py-4 " +
        (type == "home" ? "bg-white" : "bg-nav")
      }
    >
      <div className="w-1/6">
        <Link href="/">
          <a>
            <Image src="/img/logo.png" width={200} height={70} alt="Logo" />
          </a>
        </Link>
      </div>

      <div
        className={
          "flex flex-row items-center justify-end w-5/6 " +
          (type == "home" ? "text-black" : "text-white")
        }
      >
        <div className="flex flex-row justify-start">
          <LFMLink type={type} url="/" text="HOME" />
          <LFMLink type={type} url="/submission" text="SUBMISSION" />
          <LFMLink type={type} url="/archives" text="ARCHIVE" />
          <LFMLink type={type} url="/about" text="ABOUT" />
        </div>
        <div className="flex flex-row items-center justify-end w-3/12">
          {!loggedIn ? (
            <div className="flex flex-row items-center justify-center w-5/6">
              <Button text="Sign Up" url="#" onClick={authRegisterClick} />
              <div
                className={
                  "w-0 h-8 mx-4 border-l-2 " +
                  (type === "home" ? "border-black" : "border-white")
                }
              ></div>
              <Button text="Log In" url="#" onClick={authLoginClick} />
            </div>
          ) : (
            <>
              <Profile
                logout={() => {
                  logoutClick;
                }}
                setLoggedIn={setLoggedIn}
              />
              {/* <div
                className="p-2"
                onClick={() => {
                  logout();
                  setLoggedIn(false);
                  console.log("Logout");
                }}
              >
                <Link href="/">
                  <a className="hover:text-hover">LOGOUT</a>
                </Link>
              </div>
              <div className="mr-4">
                <p>Hi, {localStorage.getItem("nama")}</p>
              </div>
              <div>
                <Link href="#">
                  <a>
                    <Image
                      src="/img/man.svg"
                      width={40}
                      height={40}
                      alt="profile icon"
                    />
                  </a>
                </Link>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
