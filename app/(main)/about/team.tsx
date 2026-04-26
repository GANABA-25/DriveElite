const teamMembers = [
  {
    name: "Alexander Mitchell",
    role: "CEO & Founder",
    description: "20+ years in luxury automotive industry",
  },
  {
    name: "Victoria Chen",
    role: "Chief Operations Officer",
    description: "Former Tesla executive with global logistics expertise",
  },
  {
    name: "Marcus Thompson",
    role: "Head of Fleet Management",
    description: "Certified automotive specialist with passion for excellence",
  },
  {
    name: "Isabella Romano",
    role: "Customer Experience Director",
    description: "Hospitality expert dedicated to premium service",
  },
];

export default function Team() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="group bg-white p-8 flex flex-col items-center text-center gap-3 rounded-xl shadow-md transition-all duration-300 ease-out lg:cursor-pointer lg:hover:-translate-y-2 lg:hover:scale-[1.02] lg:hover:shadow-[0_0_40px_rgba(252,244,207,0.9)] lg:hover:ring-1 lg:hover:ring-[#fcf4cf]/60"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary text-xl font-bold transition-transform duration-300 group-hover:scale-110">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          <h1 className="text-xl font-bold">{member.name}</h1>

          <p className="transition-colors duration-300 text-base group-hover:text-bold">
            {member.role}
          </p>

          <p className="text-gray-500 text-base transition-colors duration-300 group-hover:text-gray-600">
            {member.description}
          </p>
        </div>
      ))}
    </div>
  );
}
