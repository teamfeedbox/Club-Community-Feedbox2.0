import React from "react";
import "./Faq.css";
import Navbar from "./Navbar";
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";

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
      <Navbar />
      <div className="faq-overall">
        <div className="faq-top">
          <img src="Images/faq.jpg" alt="" />
          <h1>FAQ</h1>
        </div>

        <div className="faq-bottom">
          <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
            <MDBAccordion alwaysOpen>
              {faqs.map((faq) => (
                <MDBAccordionItem collapseId={1} headerTitle={faq.question}>
                  {faq.answer}
                </MDBAccordionItem>
              ))}
            </MDBAccordion>
          </MDBContainer>
        </div>
      </div>
    </>
  );
};

export default Faq;
