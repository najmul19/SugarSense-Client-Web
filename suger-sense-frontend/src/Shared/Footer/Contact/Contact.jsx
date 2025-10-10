import React, { useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelopeOpenText } from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qufjnuu",
        "template_4a9en8b",
        form.current,
        "brrIbRsRndpKsNtDN"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          toast.error("Failed to send message.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="max-w-2xl mx-auto card-bg-n shadow p-6" data-aos="zoom-in">
      <h2
        className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
        data-aos="fade-down"
      >
        <FaEnvelopeOpenText className=" text-2xl text-blue-600"></FaEnvelopeOpenText>
        Contact Developer
      </h2>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="space-y-4"
        data-aos="fade-up"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-md"
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          className="w-full p-3 border rounded-md"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-gradient-to-b from-[#3b5998] via-[#3b5998] to-[#192f6a] 
               hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6]
               text-white hover:text-blue-600 font-semibold px-6 py-3 rounded-md transition w-full cursor-pointer"
          data-aos="fade-up"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
