import type { TimelineEntry, SkillCategory, Project, Education, Certification, Language, Highlight } from '@/types';

export const personalInfo = {
  name: 'Amrit Kumar Paudel',
  title: 'Electronics \u0026 Communication Engineer | Electronics Technician | Networking \u0026 CCTV Specialist',
  location: 'Cambridge, Ontario, Canada',
  phone: '+1 (519) 505-1751',
  email: 'amritpacific2010@gmail.com',
  linkedin: 'Amrit Paudel',
  linkedinUrl: 'https://linkedin.com',
  heroStatement:
    'Experienced Electronics and Communication Engineer with over 10 years of experience in telecommunications, networking, CCTV infrastructure, radio communications, PCB design, and electronic systems. Passionate about solving technical challenges, learning new technologies, and building innovative engineering solutions.',
  aboutSummary:
    'I am a resourceful and adaptable Electronics and Communication Engineer with extensive experience in telecommunications, surveillance systems, networking, radio communications, and technical project management. My career includes serving as a Technical Senior Sub Inspector in Nepal Police, where I successfully led and implemented more than 40 government technology projects. Currently based in Canada, I continue expanding my technical expertise through electronics refurbishment, networking, automation, and embedded systems development.',
  highlights: [
    'Fast learner',
    'Problem solver',
    'Leadership experience',
    'International deployment experience',
    'Strong teamwork and communication skills',
    'Passion for technology and innovation',
  ],
  stats: [
    { value: 10, suffix: '+', label: 'Years of Experience' },
    { value: 40, suffix: '+', label: 'Projects Completed' },
    { value: 3, suffix: '', label: 'Countries Worked' },
  ],
};

export const navLinks = [
  { label: 'Home', target: '#home' },
  { label: 'About', target: '#about' },
  { label: 'Experience', target: '#experience' },
  { label: 'Skills', target: '#skills' },
  { label: 'Projects', target: '#projects' },
  { label: 'Education', target: '#education' },
  { label: 'Contact', target: '#contact' },
];

export const timelineEntries: TimelineEntry[] = [
  {
    company: 'Greentec',
    position: 'Technician / Refurb Processor',
    duration: '2023 – Present',
    location: 'Cambridge, Canada',
    type: 'responsibilities',
    items: [
      'Refurbishment and processing of electronic devices',
      'Desktop, laptop, server, and switch disassembly',
      'PCB analysis and troubleshooting',
      'Electronic component identification',
      'Hardware diagnostics and repair',
    ],
  },
  {
    company: 'Latem Industries',
    position: 'General Laborer / Machine Operator',
    duration: '2023',
    location: 'Cambridge, Canada',
    type: 'responsibilities',
    items: [
      'Industrial machine operation',
      'Metal processing and rust removal',
      'Exposure to industrial automation systems',
      'PLC fundamentals and warehouse control systems',
    ],
  },
  {
    company: 'Nepal Police',
    position: 'Technical Senior Sub Inspector of Police',
    duration: '2014 – 2022',
    location: 'Kathmandu, Nepal',
    type: 'achievements',
    badge: 'Key Achievements',
    items: [
      'Managed and implemented over 40 government CCTV projects',
      'Led technical teams and coordinated project resources',
      'Provided technical consulting and client support',
      'Developed reporting and operational procedures',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    icon: 'Radio',
    title: 'Telecommunications',
    skills: [
      'Motorola VHF/UHF Systems',
      'Digital Trunking Systems',
      'HF Communication Systems',
      'Radio Network Deployment',
      '4G Communication Systems',
    ],
  },
  {
    icon: 'Network',
    title: 'Networking \u0026 Infrastructure',
    skills: [
      'TCP/IP Networking',
      'Cisco Networking',
      'Routers \u0026 Switches',
      'Fiber Optic Networks',
      'Media Converters',
      'SFP Technologies',
    ],
  },
  {
    icon: 'Camera',
    title: 'CCTV \u0026 Surveillance',
    skills: [
      'CCTV Design',
      'Video Management Systems (VMS)',
      'Surveillance Infrastructure',
      'IP Cameras',
      'Network Video Recording Systems',
    ],
  },
  {
    icon: 'Cpu',
    title: 'Embedded Systems',
    skills: ['Arduino', 'ESP32', 'STM32', 'Raspberry Pi', 'Embedded Programming'],
  },
  {
    icon: 'CircuitBoard',
    title: 'Electronics Design',
    skills: [
      'PCB Design',
      'Analog Circuits',
      'Digital Circuits',
      'Hardware Troubleshooting',
      'Electronic System Integration',
    ],
  },
  {
    icon: 'Code2',
    title: 'Programming',
    skills: ['Python', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'Django', 'VHDL', 'Verilog'],
  },
  {
    icon: 'Settings',
    title: 'Automation',
    skills: ['PLC Programming', 'Industrial Control Systems', 'Process Automation'],
  },
];

export const projects: Project[] = [
  {
    id: 'cctv',
    image: '/assets/project-cctv.jpg',
    title: 'Government CCTV Infrastructure',
    description:
      'Led and implemented more than 40 large-scale government CCTV surveillance deployments across Nepal. Designed network infrastructure, coordinated installation teams, and delivered comprehensive video management solutions.',
    tags: ['CCTV', 'Network Design', 'VMS', 'Project Management'],
  },
  {
    id: 'fiber',
    image: '/assets/project-fiber.jpg',
    title: 'Fiber Optic Communication Networks',
    description:
      'Designed and deployed long-distance fiber optic communication systems using single-mode and multi-mode fiber. Implemented media converters, SFP modules, and network termination equipment.',
    tags: ['Fiber Optics', 'SMF/MMF', 'Networking'],
  },
  {
    id: 'radio',
    image: '/assets/project-radio.jpg',
    title: 'Radio Communication Systems',
    description:
      'Installed and maintained VHF/UHF radio systems including Motorola digital trunking systems. Configured base stations, repeaters, and vehicle-mounted communication equipment.',
    tags: ['VHF/UHF', 'Motorola', 'Digital Trunking'],
  },
  {
    id: 'embedded',
    image: '/assets/project-embedded.jpg',
    title: 'Embedded Systems Research',
    description:
      'Developed embedded systems using Raspberry Pi, STM32, and Arduino platforms for automation and IoT applications. Created sensor interfaces, control systems, and data acquisition solutions.',
    tags: ['Raspberry Pi', 'STM32', 'Arduino', 'IoT'],
  },
  {
    id: 'pcb',
    image: '/assets/project-pcb.jpg',
    title: 'PCB Design and Development',
    description:
      'Designed custom printed circuit boards for specialized electronic applications. Created schematics, performed layout routing, and developed prototypes for testing and validation.',
    tags: ['PCB Design', 'Prototyping', 'Circuit Design'],
  },
];

export const internationalExperience = {
  heading: 'International Engineering Deployment',
  subHeading: 'United Nations Mission in Sudan',
  description:
    'Served in Sudan under United Nations deployment, providing telecommunications and radio communication support in challenging environments. Gained invaluable experience in mission-critical communications infrastructure across international boundaries.',
  highlights: [
    {
      icon: 'TowerControl',
      title: 'Tower Installations',
      description: 'Installed and maintained communication towers in remote locations',
    },
    {
      icon: 'Radio',
      title: 'Radio Base Stations',
      description: 'Configured and serviced radio base station equipment',
    },
    {
      icon: 'Truck',
      title: 'Vehicle Communications',
      description: 'Maintained vehicle-mounted communication systems for field operations',
    },
    {
      icon: 'Globe',
      title: 'International Collaboration',
      description: 'Worked alongside international teams from diverse backgrounds',
    },
  ] as Highlight[],
  stats: {
    label: 'UN Deployment',
    location: 'Sudan',
    badge: 'Mission-Critical Communications',
  },
  image: '/assets/project-sudan.jpg',
};

export const educationList: Education[] = [
  {
    icon: 'GraduationCap',
    degree: 'Bachelor of Electronics and Communication Engineering',
    institution: 'Advance College of Engineering \u0026 Management',
    location: 'Lalitpur, Nepal',
    year: 'Graduated: 2019',
    badge: "Bachelor's Degree",
  },
  {
    icon: 'ScrollText',
    degree: 'Technical Diploma in Electronics Engineering',
    institution: 'Pokhara Engineering College',
    location: 'Pokhara, Nepal',
    year: 'Graduated: 2010',
    badge: 'Diploma',
  },
];

export const certifications: Certification[] = [
  { name: 'CCNA', status: 'In Progress', progress: 70 },
  { name: 'CCNP', status: 'In Progress', progress: 40 },
  { name: 'Networking Technologies', status: 'Completed', progress: 100 },
  { name: 'Cybersecurity Fundamentals', status: 'Completed', progress: 100 },
];

export const languages: Language[] = [
  { name: 'Nepali', level: 'Native', percentage: 100 },
  { name: 'English', level: 'Intermediate', percentage: 75 },
  { name: 'Hindi', level: 'Intermediate', percentage: 70 },
  { name: 'French', level: 'Basic', percentage: 30 },
];
