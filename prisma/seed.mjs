import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const jobs = [
  {
    title: "Senior Frontend Developer",
    company: "Acme Web Agency",
    location: "London, UK",
    description:
      "We are seeking an experienced frontend developer to join our growing team. You will be responsible for building high-performance, scalable web applications using the latest technologies.",
    salary: 80000,
    creatorId: 1,
  },
  {
    title: "Junior Backend Developer",
    company: "Webcraft Studio",
    location: "Manchester, UK",
    description:
      "Looking for a passionate backend developer to join our dynamic team. You will be working on building RESTful APIs and integrating with various data sources.",
    salary: 40000,
    creatorId: 1,
  },
  {
    title: "UI/UX Designer",
    company: "Digital Innovations",
    location: "Birmingham, UK",
    description:
      "Seeking a talented UI/UX designer to create visually stunning and user-friendly interfaces for our clients. You should have a strong portfolio and experience in design tools and prototyping.",
    salary: 52500,
    creatorId: 1,
  },
  {
    title: "Full-Stack Developer",
    company: "Tech Pixel",
    location: "Glasgow, UK",
    description:
      "We are looking for a full-stack developer to join our team and work on a variety of web projects. You should have experience with both frontend and backend technologies, as well as a good understanding of modern web development practices.",
    salary: 65000,
    creatorId: 1,
  },
  {
    title: "React Developer",
    company: "Coding Collective",
    location: "Newcastle, UK",
    description:
      "Seeking a talented React developer to join our team and help build complex, interactive web applications. You should have a strong understanding of React, Redux, and other modern JavaScript frameworks.",
    salary: 60000,
    creatorId: 1,
  },
  {
    title: "Web Analytics Specialist",
    company: "Tech Pixel",
    location: "Bristol, UK",
    description:
      "Looking for a web analytics specialist to help us track and analyze the performance of our clients' websites. You should have experience with tools like Google Analytics, Mixpanel, and Segment.",
    salary: 45000,
    creatorId: 1,
  },
  {
    title: "JavaScript Developer",
    company: "Digital Forge",
    location: "Edinburgh, UK",
    description:
      "Seeking a skilled JavaScript developer to join our team and help us build dynamic, interactive web applications. You should have a deep understanding of JavaScript, as well as experience with libraries and frameworks like React, Angular, or Vue.js.",
    salary: 55000,
    creatorId: 1,
  },
  {
    title: "Technical Writer",
    company: "Webscape",
    location: "Cardiff, UK",
    description:
      "We are looking for a technical writer to help us create high-quality documentation and user guides for our web development projects. You should have excellent writing and communication skills, as well as a strong understanding of web technologies.",
    salary: 38000,
    creatorId: 1,
  },
  {
    title: "Graphic Designer",
    company: "Pixel Pioneers",
    location: "Leeds, UK",
    description:
      "Seeking a talented graphic designer to create visually stunning designs for our clients' websites, marketing materials, and branding. You should have a strong portfolio and experience with design tools like Adobe Creative Suite.",
    salary: 50000,
    creatorId: 1,
  },
];

async function main() {
  console.log("Seeding database...");

  //   const role = await prisma.role.create({
  //     data: {
  //       name: "hiring_manager",
  //     },
  //   });

  //   // create a new user with the role
  //   await prisma.user.create({
  //     data: {
  //       name: "Oris John-Baptiste",
  //       email: "orisjb@gmail.com",
  //       roleId: role.id,
  //       password: "password123",
  //     },
  //   });

  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }

  console.log("Jobs seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
