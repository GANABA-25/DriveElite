import {
  Shield,
  Users,
  Award,
  Globe,
  ArrowRight,
  Trophy,
  Clock,
  Phone,
  Mail,
  CircleCheckBig,
} from "lucide-react";

import Team from "./team";
import Button from "@/components/button";
import Step from "@/components/step";

const timeline = [
  {
    year: "2010",
    title: "Founded in Miami",
    description: "Started with a fleet of 10 luxury vehicles",
  },
  {
    year: "2013",
    title: "National Expansion",
    description: "Opened locations in 15 major US cities",
  },
  {
    year: "2016",
    title: "International Growth",
    description: "Expanded to Europe and Middle East",
  },
  {
    year: "2019",
    title: "Electric Revolution",
    description: "Launched our premium EV fleet",
  },
  {
    year: "2022",
    title: "Digital Innovation",
    description: "Introduced our AI-powered booking platform",
  },
  {
    year: "2024",
    title: "Global Leader",
    description: "Reached 50+ locations worldwide",
  },
];

export default function AboutPage() {
  return (
    <div>
      <header className="text-center flex flex-col gap-4 bg-[#eceef1] py-8 px-4">
        <p className="text-base uppercase">About Drive Elite</p>
        <h1 className="text-4xl md:text-5xl font-black">
          Redefining <span className="text-primary">Premium</span> Car <br />
          Rentals
        </h1>
        <p className="text-gray-500 text-base">
          Since 2010, we've been providing exceptional car rental experiences,
          combining luxury vehicles <br className="hidden md:block" /> with
          outstanding service to create unforgettable journeys.
        </p>
      </header>

      <section className="max-w-360 mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 py-30">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-primary">15+</h1>
          <p className="text-gray-400 text-base">Years Experience</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-primary">500+</h1>
          <p className="text-gray-400 text-base">Premium Vehicles</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-primary">25K+</h1>
          <p className="text-gray-400 text-base">Happy Customers</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-primary">50+</h1>
          <p className="text-gray-400 text-base">Global Locations</p>
        </div>
      </section>

      <section className="border-t border-gray-200 py-30 px-4">
        <div className="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <p className="uppercase tracking-widest text-base text-gray-500">
                Our Story
              </p>

              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Built on Passion for
                <span className="text-primary"> Excellence</span>
              </h1>

              <p className="text-base text-gray-500">
                DriveElite was founded with a simple mission: to provide car
                enthusiasts and travelers with access to the world's finest
                vehicles. What started as a small fleet of luxury cars has grown
                into a global network of premium rental services.
              </p>

              <p className="text-base text-gray-500">
                Our commitment to quality extends beyond just our vehicles. We
                believe in creating memorable experiences, from the moment you
                browse our fleet to the second you return the keys.
              </p>

              <p className="text-base text-gray-500">
                Today, we're proud to serve thousands of customers worldwide,
                maintaining our reputation for exceptional service and
                uncompromising quality.
              </p>
            </div>

            <Button className="mt-6 w-fit bg-primary rounded-md flex items-center gap-2 text-base font-bold py-4 px-8 transition-all duration-300 lg:hover:cursor-pointer hover:bg-yellow-500 hover:scale-105">
              Join Our Journey <ArrowRight size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-gradient-card border border-border flex items-center justify-center shadow-sm min-h-40 md:md:min-h-55">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  15+
                </span>
              </div>

              <div className="rounded-2xl bg-[#eceef1] shadow-sm min-h-40 md:md:min-h-55" />
            </div>

            <div className="flex flex-col gap-6 md:pt-12">
              <div className="rounded-2xl bg-[#eceef1] shadow-sm min-h-40 md:md:min-h-55" />

              <div className="rounded-2xl bg-gradient-card border border-border flex items-center justify-center shadow-sm min-h-40 md:md:min-h-55">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  Since 2010
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-14 bg-[#eceef1] py-30">
        <div className="text-center flex flex-col gap-4">
          <p className="text-gray-500 uppercase text-base">Our Values</p>
          <h1 className="text-4xl md:text-5xl font-black">
            What <span className="text-primary">Drives</span> Us
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Step
            icon={<Shield size={36} className="text-primary" />}
            number="1"
            title="Safety First"
            text={
              <>
                Every vehicle undergoes rigorous safety <br /> checks before
                rental.
              </>
            }
          />
          <Step
            icon={<Users size={36} className="text-primary" />}
            number="2"
            title="Customer Focus"
            text={
              <>
                Your satisfaction is our priority. We go above <br />
                and beyond.
              </>
            }
          />
          <Step
            icon={<Award size={36} className="text-primary" />}
            number="3"
            title="Excellence"
            text={
              <>
                Only the finest vehicles make it to our <br /> premium fleet.
              </>
            }
          />
          <Step
            icon={<Globe size={36} className="text-primary" />}
            number="4"
            title="Accessibility"
            text={
              <>
                50+ locations worldwide for your <br /> convenience.
              </>
            }
          />
        </div>
      </section>

      <section className="py-30">
        <div className="mx-auto px-4 flex flex-col gap-14">
          <div className="text-center flex flex-col gap-4">
            <p className="text-gray-500 uppercase text-base">Our Journey</p>
            <h1 className="text-4xl md:text-5xl font-black">
              Milestones That <span className="text-primary">Define</span> Us
            </h1>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gray-300 hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <div className="inline-block border border-gray-300 rounded-2xl p-6 ">
                      <span className="text-xl font-bold">{item.year}</span>
                      <h3 className="text-xl my-2">{item.title}</h3>
                      <p className="text-gray-500 text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-accent relative z-10 shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-360 mx-auto flex flex-col gap-14 py-30 px-4 lg:px-0">
        <div className="text-center flex flex-col gap-4">
          <p className="text-gray-500 text-base uppercase">Leadership Team</p>
          <h1 className="text-4xl md:text-5xl font-black">
            Meet the <span className="text-primary">Experts</span>
          </h1>
          <p className="text-gray-500 text-base">
            Our leadership team brings decades of combined experience in
            automotive, hospitality, and customer service.
          </p>
        </div>

        <Team />
      </section>

      <section className="max-w-360 mx-auto flex flex-col gap-8 px-4 lg:px-0">
        <div className="flex flex-col gap-4">
          <p className="text-gray-500 text-base uppercase">
            Awards & Recognition
          </p>
          <h1 className="text-4xl md:text-5xl font-black">
            Industry <span className="text-primary">Recognition</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 border border-gray-200 p-4 rounded-md shadow-xs">
              <div className="bg-accent p-3 rounded-md">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Best Luxury Car Rental</h1>
                <p className="text-gray-500 text-base">
                  Travel & Leisure Awards 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-gray-200 p-4 rounded-md shadow-xs">
              <div className="bg-accent p-3 rounded-md">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  Excellence in Customer Service
                </h1>
                <p className="text-gray-500 text-base">JD Power 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-gray-200 p-4 rounded-md shadow-xs">
              <div className="bg-accent p-3 rounded-md">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Top 10 Rental Companies</h1>
                <p className="text-gray-500 text-base">Forbes Travel Guide</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-gray-200 p-4 rounded-md shadow-xs">
              <div className="bg-accent p-3 rounded-md">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Sustainability Leader</h1>
                <p className="text-gray-500 text-base">
                  Green Business Awards 2024
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-base">Certifications</p>
              <h1 className="text-4xl md:text-5xl font-black">
                Trusted <span className="text-primary">Standards</span>
              </h1>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
              <li className="bg-gray-50 flex items-center gap-4 p-2 rounded-md">
                <CircleCheckBig size={20} /> ISO 9001:2015 Certified
              </li>
              <li className="bg-gray-50 flex items-center gap-4 p-2 rounded-md">
                <CircleCheckBig size={20} /> AAA Approved Auto Rental
              </li>
              <li className="bg-gray-50 flex items-center gap-4 p-2 rounded-md">
                <CircleCheckBig size={20} /> Better Business Bureau A+ Rating
              </li>
              <li className="bg-gray-50 flex items-center gap-4 p-2 rounded-md">
                <CircleCheckBig size={20} /> Carbon Neutral Certified
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-360 mx-auto border border-gray-200 rounded-md py-16 my-30 flex justify-center items-center text-center px-4 lg:px-0">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-black">
            Ready to Experience{" "}
            <span className="text-primary">Excellence?</span>
          </h1>

          <p className="text-base">
            Join thousands of satisfied customers who trust DriveElite for their
            premium car rental needs. Book your dream car today.
          </p>

          <div className="flex max-[767px]:flex-col justify-center items-center gap-8">
            <Button className="bg-primary rounded-md flex items-center gap-2 text-base font-bold py-2 px-8 transition-transform duration-200 ease-in-out hover:bg-yellow-500 hover:scale-105">
              Browse Our Fleet <ArrowRight size={15} />
            </Button>

            <Button className="border border-black rounded-md flex items-center gap-2 text-base py-2 px-8 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:bg-[#0F172A] hover:text-primary hover:shadow-lg">
              Contact Us
            </Button>
          </div>

          <ul className="flex flex-wrap justify-center items-center text-base gap-6 text-gray-500">
            <li className="flex items-center gap-2">
              <Phone size={20} />
              +233 596498006
            </li>
            <li className="flex items-center gap-2">
              <Mail size={20} />
              nathanielOwusu01@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Clock size={20} />
              24/7 Support
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
