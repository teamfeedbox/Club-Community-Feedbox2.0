import React from "react";
import "./Faq.css";
import NavbarRes from "./navbar/NavbarRes";

const faqs = [
  {
    id: "Q1",
    question: "What are the services do you offer ?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corporis vitae tempora quod provident tenetur culpa dolore facere? Earum, dolor?",
  },
  {
    id: "Q2",
    question: "what are our preferred method of payment ?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto iusto veniam eveniet labore impedit nam",
  },
  {
    id: "Q3",
    question: "Are your services beginners friendly ?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores,",
  },
  {
    id: "Q4",
    question: "what how does it take to upgrade a package ?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.",
  },
  {
    id: "Q5",
    question: "Where are your offices located around the world ?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sed. Dolores, sequi.",
  },
];

const Faq = () => {
  return (
    <>
    <NavbarRes />
      <div className="faq-overall ">
        {/* <div className="faq-top">
          <img src="Images/faq.jpg" alt="" />
          <h1>FAQ</h1>
        </div>  */}
        <div className="bg-white faq-bottom flex rounded-xl shadow-xl w-[1200px] h-[600px] justify-around">
          <div className=" w-[45%] ">
            <img className="absolute w-[500px] h-[550px]" src="Images/faqDesktop (1).svg" alt="" />
          </div>
          <div class="grid divide-y divide-neutral-200 w-[55%] mr-4">
          <h2>FAQ</h2>

            {faqs.map((faq) => (
              <div class="py-4">
              <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span> {faq.question}</span>
                  <span class="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                {faq.answer}
                </p>
              </details>
            </div>))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
