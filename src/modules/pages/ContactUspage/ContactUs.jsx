import React, { useEffect, useState } from "react";
import ContactForm from "../../components/contactpagecom/contactfroms/ContactForm";
import Loader from "../../../components/loder/Loder"; 

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div role="main" aria-label="Contact us page">
      <ContactForm />
    </div>
  );
};

export default ContactUs;