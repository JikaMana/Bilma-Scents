import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  return (
    <section className="h-full flex items-center justify-center px-4 py-16">
      <div className="w-full h-full animate-gradient bg-gradient-to-r from-[#9c6a24] via-[#f1e7dd] to-[#E3BC9A] fixed top-0 left-0 -z-10"></div>

      <div className="w-full max-w-3xl rounded-2xl p-8 md:p-12 md:pt-24">
        <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-800 font-display italic mb-4 text-center">
          Let’s Chat
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Send us a message and we’ll get right back to you,
        </p>

        <div className="space-y-16">
          {/* Contact Form */}
          <form className="w-full flex flex-col items-center">
            <div className="space-y-4 mb-4 w-full">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="backdrop-blur bg-white/50 flex-1/2 w-full border border-[#9c6a24] rounded-lg px-4 py-4 mt-1  focus:outline-none focus:border-2 focus:border-[#9c6a24]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="backdrop-blur bg-white/50 flex-1/2 w-full border border-[#9c6a24] rounded-lg px-4 py-4 mt-1  focus:outline-none focus:border-2 focus:border-[#9c6a24]"
                />
              </div>

              <textarea
                rows="5"
                placeholder="How can we help you?"
                className="backdrop-blur bg-white/50 w-full border border-[#9c6a24] rounded-lg px-4 py-4 mt-1 focus:outline-none  focus:border-2 focus:border-[#9c6a24]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#9c6a24] text-white px-8 py-4 rounded-full hover:bg-[#E3BC9A] transition duration-200"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info / Socials */}
          <div>
            <div className=" text-gray-800 flex flex-col sm:flex-row justify-around gap-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Our Office</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Housing Esate, Oyigbo
                      <br />
                      Rivers, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-primary mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Email</h4>
                    <p className="text-sm text-[#E3BC9A">
                      bilmascents@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-primary mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Phone</h4>
                    <p className="text-sm text-gray-600">+234 8155055996</p>
                    <p className="text-sm text-gray-600">+234 8144554703</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mx-auto">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex flex-col space-y-4">
                  <a
                    href="https://wa.me/2348155085996"
                    className="hover:opacity-50 text-green-800 flex items-center space-x-1"
                  >
                    <MessageCircle size={32} />
                    <span className="text-sm">Whatsapp</span>
                  </a>
                  <a
                    href="https://instagram.com/bilmascents"
                    className="hover:opacity-50 text-pink-500 flex items-center space-x-1"
                  >
                    <Instagram size={32} />
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between gap-2">
              <img
                src="/bilmascents_insta_qr.png"
                alt="INSTAGRAM QR-CODE"
                className="max-w-60 max-h-64 w-full h-full"
              />
              <img
                src="/bilmascents_whatsapp_qr.png"
                alt="WHATSAPP QR-CODE"
                className="max-w-60 max-h-64 w-full h-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
