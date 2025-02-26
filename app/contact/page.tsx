import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <section className="section bg-gray-900">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Contact Us
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#b7922c]">
                Get in Touch
              </h2>
              <p className="mb-6 text-gray-300">
                Have questions or need more information? We're here to help.
                Reach out to us using the contact information below or fill out
                the form, and we'll get back to you as soon as possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-[#b7922c] mr-2" size={20} />
                  <span>
                    #58 Marilaque Highway Sitio, Cabading Brgy San Jose,
                    Antipolo City, Rizal 1870, Philippines
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-[#b7922c] mr-2" size={20} />
                  <span>09958494580 / 09778053754</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-[#b7922c] mr-2" size={20} />
                  <span>placeholder@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-[#b7922c] mr-2" size={20} />
                  <span>Monday - Friday: 7:00AM to 4:00PM</span>
                </div>
              </div>
            </div>
            <div>
              <form
                action="https://formsubmit.co/ritchtopia@gmail.com"
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7922c]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7922c]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7922c]"
                    required
                  ></textarea>
                </div>
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Form Submission"
                />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded font-bold text-[rgb(15,15,25)] bg-[#b7922c] hover:bg-[#d8a933] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#0f0f19]">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d626.5199946978695!2d121.2330981781308!3d14.62843986578862!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397bf006a13fe29%3A0xb4527beea12ced74!2sPowder%20Coating%20Rizal%20-%20Marilaque!5e1!3m2!1sen!2sph!4v1716448462687!5m2!1sen!2sph"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
