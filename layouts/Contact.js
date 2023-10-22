import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { FaEnvelope, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import ImageFallback from "./components/ImageFallback";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [state, setState] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const sendMessage = () => {
    return emailjs
      .send("service_nv8shbd", "template_rm3ufhg", state, "AQb04YuHgn0C2hI_9")
      .then(
        function (response) {
          setState({
            name: "",
            subject: "",
            email: "",
            message: "",
          });
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    toast.promise(sendMessage(), {
      loading: "Process",
      error: "Something went wrong!",
      success: "The message was sent successfully...",
    });
  };
  return (
    <section className="section lg:mt-16">
      <div className="container">
        <div className="row relative ">
          <ImageFallback
            className="-z-[1] object-cover object-top"
            src={"/images/map.svg"}
            fill="true"
            alt="map bg"
            priority={true}
          />
          <div className="lg:col-6">
            {markdownify(
              "Contact",
              "h1",
              "h1 my-10 lg:my-11 lg:pt-11 text-center lg:text-left lg:text-[64px]"
            )}
          </div>
          <div className=" rounded border border-border p-2 lg:col-6 dark:border-darkmode-border">
            <h2>
              Send A
              <span className="ml-1.5 inline-flex items-center text-primary">
                Message
                <BsArrowRightShort />
              </span>
            </h2>
            <form
              className="contact-form mt-12"
              method="POST"
              onSubmit={handleFormSubmit}
            >
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="name">
                  Full name
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  type="text"
                  placeholder="Thomas Milano"
                  required
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="email">
                  Email Address
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="subject">
                  Subject
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  placeholder="Blog advertisement"
                  required
                  value={state.subject}
                  onChange={(e) =>
                    setState({ ...state, subject: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="message">
                  Your Message Here
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <textarea
                  className="form-textarea w-full"
                  placeholder="Hello I’m Mr ‘x’ from………….."
                  value={state.message}
                  rows="7"
                  onChange={(e) =>
                    setState({ ...state, message: e.target.value })
                  }
                />
              </div>
              <input
                className="btn btn-primary"
                type="submit"
                value="Send Now"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
