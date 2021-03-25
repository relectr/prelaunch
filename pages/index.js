// Necessary packages
import Image from "next/image";
import Button from "../components/Button";
import Social from "../components/Social";
import React, { useState } from "react";

// To validate email input
import validator from "validator";
// To do POST request to SendInBlue API
import fetch from "node-fetch";
import Modal from "../components/Modal";

// SendInBlue API endpoint
const url = "https://api.sendinblue.com/v3/contacts";

export default function Home() {
  // Email input state. 'email' is the variable where the user's email input stored.
  // 'setEmail' is to change 'email' dynamically while typing.
  const [email, setEmail] = useState("");

  // Input field's background color state. The dafault value is 'bg-relectr-grey' (see: tailwind.config.js)
  // When error happens (see: validateData()), the background change to 'bg-relectr-secondary-red'
  const [background, setBackground] = useState("bg-relectr-grey");

  // 'errorVisibility' is to control error message visibility, whether to be visible (the value is '')
  // or tobe invisible (the value is 'invisible')
  const [errorVisibility, setErrorVisibility] = useState("invisible");

  // 'modalVisibility' is to control modal visibility, whether to be visible (the value is '')
  // or tobe invisible (the value is 'hidden')
  const [modalVisibility, setModalVisibility] = useState("hidden");

  // Control error messages:
  // Error when the input is empty (default) = "Please fill out this field!"
  // Error when the input is not valid email address = "Please input a valid email address!"
  const [errorText, setErrorText] = useState("Please fill out this field!");
  
  // Control type of modal that appear after submit form
  // 'success' for res.ok status code
  // 'error' for error status code
  const [modalType, setModalType] = useState('success')

  function resetField() {
    document.getElementById("email").reset();
  }

  // getData is called while typing by text field
  function getData(value) {
    // Called to change 'email' valu dynamically
    setEmail(value.target.value);

    // Called to change text field's background color to default (grey) while typing
    setBackground("bg-relectr-grey");

    // Called to hide the error message while typing
    setErrorVisibility("invisible");

    //Called to restore error message to default value
    setErrorText("Please fill out this field!");
  }

  // Function to check wether the value that user inputted is valid or not
  // This function is trigerred when user click the "Get my Invitation" button
  function validateData() {
    // If the input value is empty or just white space
    if (validator.isEmpty(email, { ignore_whitespace: true })) {
      // Change text field's background color to error red
      setBackground("bg-relectr-secondary-red");
      // Show error message (to hide = "invisible")
      setErrorVisibility("");
      // Set the error text to the following
      setErrorText("Please fill out this field!");

      // If the input value is not empty
    } else {
      // If the input value is a valid email address
      if (validator.isEmail(email)) {
        // Store input value to the 'body' JSON
        // Any additional input in the future can be add here
        // See https://developers.sendinblue.com/reference#createcontact
        const body = {
          email: email,
        };

        // Header of the POST request
        const options = {
          // POST method
          method: "POST",
          // request header
          headers: {
            Accept: "application/json",
            // Type of the body input
            "Content-Type": "application/json",
            // The SendInBlue API v3 key.
            // Stored in the .env file
            // Always make sure that the ENV variable starts with NEXT_SOMETHING
            "api-key": process.env.NEXT_PUBLIC_SENDINBLUE_API.toString(),
          },

          // Request body
          body: JSON.stringify(body),
        };

        // Run the POST request
        fetch(url, options)
          .then((res) => {
            // If the response is OK (res.status >= 200 or <= 300)
            if (res.ok) {
              // Show success popups
              setModalType('success')
              setModalVisibility("")
              // If the response is not OK (res.status >= 200 or <= 300)
            } else {
              // Show failed popoups
              setModalType('error')
              setModalVisibility("")
            }
          })
          // Catch and log the error
          .catch((err) => err);

        // If the input is not aempty but not a valid email address
      } else {
        // Change text field's background color to error red
        setBackground("bg-relectr-secondary-red");
        // Set the error text to the following
        setErrorText("Please input a valid email address!");
        // Show error message (to hide = "invisible")
        setErrorVisibility("");
      }
    }
  }
  // Below is the comopnenets
  return (
    <>
      { modalType == 'success' ? (
        <Modal
          modalVisibility={ modalVisibility }
          title="Email Added!"
          text="Thank you! You will be noticed via email for any updates in the future."
          buttonText="OK"
          buttonColor="bg-relectr-secondary-blue"
          onClick={() => {
            resetField();
            setModalVisibility("hidden");
          }}
        />
       ) : (
        <Modal
          modalVisibility={ modalVisibility }
          title="Oops!c Something's Wrong!"
          text="There are some problems while adding your email. Please try again."
          buttonText="Try Again"
          buttonColor="bg-relectr-red"
          onClick={() => {
            resetField();
            setModalVisibility("hidden");
          }}
        />
      )}  
      
      {/* Logo on Navigation bar */}
      <div className="text-center pt-8 mb-24">
        <a href="/">
          <Image src="/logo.svg" alt="relectr logo" width="115.6" height="24" />
        </a>
      </div>

      {/* Text stuff */}
      <div className="mb-16 text-center">
        <div>
          <h3 className="font-bold text-xl text-relectr-normal-text mb-2.5">
            WE'RE STILL
          </h3>
        </div>
        <div>
          <h1 className="font-bold text-6xl md:text-7xl text-relectr-primary-blue mb-8">
            Cooking Our Website!
          </h1>
        </div>
        <div>
          <p className="font-normal text-l text-relectr-normal-text">
            Our mission is to help teachers and lecturers all around the world
            to teach better.
            <br className="hidden md:block" />
            We’ll be launching our website very very soon. Stay tuned!!!
          </p>
        </div>
      </div>

      {/* Field form stuff */}
      <div className="mx-auto w-max mb-24">
        <div>
          <form id="email">
            <input
              type="text"
              name="email"
              placeholder="Your email"
              autoComplete="off"
              required
              className={`${background} px-4 pt-3 pb-2.5 mr-2 lg:w-80 xl:w-80 2xl:w-80 md:w-64 rounded outline-none text-relectr-normal-text`}
              onChange={getData}
            />
            <Button
              type="button"
              text="Get My Invitation"
              color="bg-relectr-secondary-blue"
              // When this button is clicked, it triggers the validateData() function
              onClick={() => {
                validateData();
              }}
            />
          </form>
        </div>
        <div className="mt-1">
          <p className={`${errorVisibility} text-relectr-red text-sm`}>
            {/* The error text */}
            {errorText}
          </p>
        </div>
      </div>

      {/* Footer stuff */}
      <div className="text-center pb-12">
        <Social
          src="/instagram.svg"
          alt="Instagram"
          link="https://instagram.com/relectrapp"
        />
        <Social
          src="/twitter.svg"
          alt="Twitter"
          link="https://twitter.com/relectrapp"
        />
        <Social
          src="/linkedin.svg"
          alt="LinkedIn"
          link="https://linkedin.com/company/relectr"
        />
        <Social
          src="/github.svg"
          alt="Github"
          link="https://github.com/relectr"
        />
        <Social
          src="/email.svg"
          alt="Email"
          link="mailto:contact@relectr.com"
        />
      </div>
    </>
  );
}
