const dummy = {
    firstName: "James",
    lastName: "Carter",
    jobTitle: "Full Stack Developer",
    address: "525 N Tryon Street, NC 28117",
    phone: "1234567890",
    email: "example@gmail.com",
    themeColor: "#ff6666",
    summary: "Experienced software developer with a passion for building efficient and user-friendly applications. Skilled in JavaScript, React, and backend development. Adept at problem-solving, collaborating with cross-functional teams, and delivering high-quality code. Enthusiastic about learning new technologies and optimizing performance to enhance user experience and business efficiency.",
  
    // Experience Section
    experience: [
      {
        id: 1,
        title: "Full Stack Developer",
        companyName: "Amazon",
        city: "New York",
        state: "NY",
        startDate: "Jan 2021",
        endDate: "",
        currentlyWorking: true,
        workSummary:
          "Designed, developed, and maintained full-stack applications. Implemented responsive user interfaces with React.js.",
      },
      {
        id: 2,
        title: "Frontend Developer",
        companyName: "Google",
        city: "San Francisco",
        state: "CA",
        startDate: "Feb 2019",
        endDate: "Dec 2020",
        currentlyWorking: false,
        workSummary:
          "Worked on UI/UX improvements, optimized web performance, and collaborated with backend teams for seamless integration.",
      },
    ],
  
    // Education Section
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        university: "Stanford University",
        location: "Stanford, CA",
        startDate: "Aug 2015",
        endDate: "May 2019",
        description: "Studied advanced algorithms, data structures, AI, and software engineering principles."
      },
      {
        id: 2,
        degree: "Master of Science in Software Engineering",
        university: "MIT",
        location: "Cambridge, MA",
        startDate: "Sep 2019",
        endDate: "May 2021",
        description: "Focused on scalable software architecture, cloud computing, and full-stack development."
      },
    ],
    
  
    // Skills Section
    skills: [
      { id: 1, name: "JavaScript", rating: 5 },
      { id: 2, name: "React.js", rating: 4 },
      { id: 3, name: "Node.js", rating: 4 },
      { id: 4, name: "Express.js", rating: 3 },
      { id: 5, name: "MongoDB", rating: 4 },
      { id: 6, name: "TypeScript", rating: 3 },
      { id: 7, name: "GraphQL", rating: 2 },
      { id: 8, name: "Tailwind", rating: 5 },
    ],
  };
  
  export default dummy;