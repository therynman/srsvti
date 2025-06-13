const testimonialData = [
  {
    quote: "Working with srsVti on Moonport's branding and website was a turning point for us... The result wasn’t just beautiful — it felt right... we’re proud of.",
    name: "Aaditya Krishnamohan",
    title: "Moonport, New York, USA",
    avatar: "/images/avatars/avatar1.png"
  },
  {
    quote: "As a creative studio ourselves, we’re extremely particular about design... The branding they crafted... wasn’t just aesthetic — it told our story with clarity and character. It feels like us, only sharper.",
    name: "13/3 Studios",
    title: "Pritha Mukherjee, UAE",
    avatar: "/images/avatars/avatar1.png"
  },
  {
    quote: "Partnering with srsVti was one of the best decisions we made for our brand... They delivered was not only stunning, but strategic. It gave us a serious edge when presenting to clients.",
    name: "Haidar Yakoob",
    title: "FlexLab, USA",
    avatar: "/images/avatars/avatar1.png"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-bg-['0F2F2]">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl font-primary_font text-[#1A1A1A] mb-16">
          See what <span className="text-primary font-secondary_font italic">others</span> have to say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <p className="text-gray-600 text-lg leading-relaxed mb-8">"{testimonial.quote}"</p>
              <div className="flex items-center mt-auto">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold text-text-[#1A1A1A] text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;