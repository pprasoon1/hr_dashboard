import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Mail, Phone, MapPin, Award, Briefcase, Calendar, Target, TrendingUp, Users, Star } from 'lucide-react';

const EmployeeDashboard = () => {
  const employees = [
    {
      id: 1,
      name: "Survi krishna", 
      role: "Senior Software Engineer",
      department: "Engineering",
      email: "sarah.j@company.com",
      phone: "+91 9898067587",
      location: "Mumbai, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2020-03-15",
      skills: [
        { subject: "Technical Expertise", A: 90 },
        { subject: "Leadership", A: 85 },
        { subject: "Communication", A: 80 },
        { subject: "Problem Solving", A: 95 },
        { subject: "Team Collaboration", A: 85 },
        { subject: "Innovation", A: 88 }
      ],
      performanceHistory: [
        { month: "Jan", score: 85 },
        { month: "Feb", score: 88 },
        { month: "Mar", score: 92 },
        { month: "Apr", score: 90 },
        { month: "May", score: 94 },
        { month: "Jun", score: 91 }
      ],
      certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
      projects: ["Cloud Migration", "API Infrastructure"],
      expertise: ["React", "Node.js", "AWS", "Python", "System Design"],
      teamContributions: [
        { category: "Code Reviews", value: 45 },
        { category: "Mentoring", value: 30 },
        { category: "Documentation", value: 25 },
        { category: "Architecture", value: 40 }
      ]
    },
    {
      id: 2,
      name: "Aarav Sharma",
      role: "Software Engineer",
      department: "Engineering",
      email: "aarav.s@company.com",
      phone: "+91 987-654-3210",
      location: "Bangalore, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2021-07-10",
      skills: [
        { subject: "Technical Expertise", A: 85 },
        { subject: "Leadership", A: 78 },
        { subject: "Communication", A: 80 },
        { subject: "Problem Solving", A: 88 },
        { subject: "Team Collaboration", A: 90 },
        { subject: "Innovation", A: 84 }
      ],
      performanceHistory: [
        { month: "Jan", score: 80 },
        { month: "Feb", score: 83 },
        { month: "Mar", score: 87 },
        { month: "Apr", score: 90 },
        { month: "May", score: 91 },
        { month: "Jun", score: 93 }
      ],
      certifications: ["Java Developer", "React Specialist"],
      projects: ["Payment Gateway Integration", "API Development"],
      expertise: ["Java", "React", "Spring Boot", "MySQL"],
      teamContributions: [
        { category: "Code Reviews", value: 40 },
        { category: "Documentation", value: 30 },
        { category: "Architecture", value: 35 },
        { category: "Testing", value: 25 }
      ]
    },
    {
      id: 3,
      name: "Priya Singh",
      role: "Product Manager",
      department: "Product",
      email: "priya.s@company.com",
      phone: "+91 998-877-6655",
      location: "Delhi, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2019-11-05",
      skills: [
        { subject: "Product Strategy", A: 94 },
        { subject: "Market Research", A: 87 },
        { subject: "Leadership", A: 85 },
        { subject: "Communication", A: 90 },
        { subject: "Team Collaboration", A: 89 },
        { subject: "Project Management", A: 92 }
      ],
      performanceHistory: [
        { month: "Jan", score: 85 },
        { month: "Feb", score: 87 },
        { month: "Mar", score: 90 },
        { month: "Apr", score: 91 },
        { month: "May", score: 94 },
        { month: "Jun", score: 95 }
      ],
      certifications: ["Certified Scrum Product Owner", "Business Analysis Specialist"],
      projects: ["Mobile App Launch", "Customer Insights Platform"],
      expertise: ["Product Strategy", "Market Research", "Agile", "Data Analysis"],
      teamContributions: [
        { category: "Strategy Planning", value: 45 },
        { category: "Team Leadership", value: 40 },
        { category: "Stakeholder Communication", value: 35 },
        { category: "Customer Research", value: 30 }
      ]
    },
    {
      id: 4,
      name: "Rohit Mehta",
      role: "Business Analyst",
      department: "Business Analysis",
      email: "rohit.m@company.com",
      phone: "+91 910-123-4567",
      location: "Chennai, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2022-02-12",
      skills: [
        { subject: "Data Analysis", A: 93 },
        { subject: "Problem Solving", A: 85 },
        { subject: "Leadership", A: 80 },
        { subject: "Communication", A: 88 },
        { subject: "Market Research", A: 89 },
        { subject: "Strategy", A: 87 }
      ],
      performanceHistory: [
        { month: "Jan", score: 86 },
        { month: "Feb", score: 90 },
        { month: "Mar", score: 91 },
        { month: "Apr", score: 94 },
        { month: "May", score: 93 },
        { month: "Jun", score: 92 }
      ],
      certifications: ["Certified Business Analysis Professional", "Lean Six Sigma Green Belt"],
      projects: ["Data Analytics Project", "Market Assessment"],
      expertise: ["Data Analytics", "Business Strategy", "Market Research", "Financial Analysis"],
      teamContributions: [
        { category: "Data Reporting", value: 50 },
        { category: "Business Strategy", value: 40 },
        { category: "Documentation", value: 30 },
        { category: "Team Collaboration", value: 35 }
      ]
    },
    {
      id: 5,
      name: "Ananya Gupta",
      role: "UX Designer",
      department: "Design",
      email: "ananya.g@company.com",
      phone: "+91 987-555-1234",
      location: "Mumbai, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2021-05-23",
      skills: [
        { subject: "UI Design", A: 90 },
        { subject: "User Research", A: 92 },
        { subject: "Prototyping", A: 88 },
        { subject: "Visual Design", A: 85 },
        { subject: "Communication", A: 80 },
        { subject: "Project Management", A: 84 }
      ],
      performanceHistory: [
        { month: "Jan", score: 90 },
        { month: "Feb", score: 89 },
        { month: "Mar", score: 93 },
        { month: "Apr", score: 91 },
        { month: "May", score: 95 },
        { month: "Jun", score: 93 }
      ],
      certifications: ["Google UX Design", "Figma Advanced"],
      projects: ["Website Redesign", "User Experience Improvement"],
      expertise: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      teamContributions: [
        { category: "Design Reviews", value: 45 },
        { category: "User Testing", value: 35 },
        { category: "Documentation", value: 30 },
        { category: "Team Collaboration", value: 40 }
      ]
    },
    {
      id: 6,
      name: "Sandeep Patel",
      role: "Marketing Manager",
      department: "Marketing",
      email: "sandeep.p@company.com",
      phone: "+91 990-876-5432",
      location: "Ahmedabad, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2020-09-01",
      skills: [
        { subject: "Marketing Strategy", A: 92 },
        { subject: "Content Creation", A: 87 },
        { subject: "Analytics", A: 85 },
        { subject: "Leadership", A: 88 },
        { subject: "Communication", A: 90 },
        { subject: "Project Management", A: 84 }
      ],
      performanceHistory: [
        { month: "Jan", score: 88 },
        { month: "Feb", score: 85 },
        { month: "Mar", score: 89 },
        { month: "Apr", score: 90 },
        { month: "May", score: 92 },
        { month: "Jun", score: 93 }
      ],
      certifications: ["Digital Marketing Specialist", "Google Analytics Certified"],
      projects: ["Brand Awareness Campaign", "SEO Strategy"],
      expertise: ["SEO", "Content Strategy", "Analytics", "Campaign Management"],
      teamContributions: [
        { category: "Campaign Planning", value: 50 },
        { category: "Team Leadership", value: 40 },
        { category: "Client Relations", value: 45 },
        { category: "Content Strategy", value: 35 }
      ]
    },
    {
      id: 7,
      name: "Neha Yadav",
      role: "Content Writer",
      department: "Marketing",
      email: "neha.y@company.com",
      phone: "+91 976-543-2109",
      location: "Pune, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2021-03-17",
      skills: [
        { subject: "Content Writing", A: 94 },
        { subject: "SEO", A: 88 },
        { subject: "Communication", A: 92 },
        { subject: "Creativity", A: 90 },
        { subject: "Team Collaboration", A: 85 },
        { subject: "Research", A: 87 }
      ],
      performanceHistory: [
        { month: "Jan", score: 90 },
        { month: "Feb", score: 92 },
        { month: "Mar", score: 91 },
        { month: "Apr", score: 93 },
        { month: "May", score: 95 },
        { month: "Jun", score: 94 }
      ],
      certifications: ["Content Writing Certification", "SEO Masterclass"],
      projects: ["SEO Blog Strategy", "Content Creation for Website"],
      expertise: ["Content Writing", "SEO", "Creative Writing", "Editing"],
      teamContributions: [
        { category: "Content Creation", value: 60 },
        { category: "SEO Optimization", value: 40 },
        { category: "Research", value: 35 },
        { category: "Collaboration", value: 30 }
      ]
    },

    {
      id: 1,
      name: "Survi krishna", 
      role: "Senior Software Engineer",
      department: "Engineering",
      email: "sarah.j@company.com",
      phone: "+91 9898067587",
      location: "Mumbai, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2020-03-15",
      skills: [
        { subject: "Technical Expertise", A: 90 },
        { subject: "Leadership", A: 85 },
        { subject: "Communication", A: 80 },
        { subject: "Problem Solving", A: 95 },
        { subject: "Team Collaboration", A: 85 },
        { subject: "Innovation", A: 88 }
      ],
      performanceHistory: [
        { month: "Jan", score: 85 },
        { month: "Feb", score: 88 },
        { month: "Mar", score: 92 },
        { month: "Apr", score: 90 },
        { month: "May", score: 94 },
        { month: "Jun", score: 91 }
      ],
      certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
      projects: ["Cloud Migration", "API Infrastructure"],
      expertise: ["React", "Node.js", "AWS", "Python", "System Design"],
      teamContributions: [
        { category: "Code Reviews", value: 45 },
        { category: "Mentoring", value: 30 },
        { category: "Documentation", value: 25 },
        { category: "Architecture", value: 40 }
      ]
    },
    {
      id: 2,
      name: "Aarav Sharma",
      role: "Software Engineer",
      department: "Engineering",
      email: "aarav.s@company.com",
      phone: "+91 987-654-3210",
      location: "Bangalore, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2021-07-10",
      skills: [
        { subject: "Technical Expertise", A: 85 },
        { subject: "Leadership", A: 78 },
        { subject: "Communication", A: 80 },
        { subject: "Problem Solving", A: 88 },
        { subject: "Team Collaboration", A: 90 },
        { subject: "Innovation", A: 84 }
      ],
      performanceHistory: [
        { month: "Jan", score: 80 },
        { month: "Feb", score: 83 },
        { month: "Mar", score: 87 },
        { month: "Apr", score: 90 },
        { month: "May", score: 91 },
        { month: "Jun", score: 93 }
      ],
      certifications: ["Java Developer", "React Specialist"],
      projects: ["Payment Gateway Integration", "API Development"],
      expertise: ["Java", "React", "Spring Boot", "MySQL"],
      teamContributions: [
        { category: "Code Reviews", value: 40 },
        { category: "Documentation", value: 30 },
        { category: "Architecture", value: 35 },
        { category: "Testing", value: 25 }
      ]
    },
    {
      id: 3,
      name: "Priya Singh",
      role: "Product Manager",
      department: "Product",
      email: "priya.s@company.com",
      phone: "+91 998-877-6655",
      location: "Delhi, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2019-11-05",
      skills: [
        { subject: "Product Strategy", A: 94 },
        { subject: "Market Research", A: 87 },
        { subject: "Leadership", A: 85 },
        { subject: "Communication", A: 90 },
        { subject: "Team Collaboration", A: 89 },
        { subject: "Project Management", A: 92 }
      ],
      performanceHistory: [
        { month: "Jan", score: 85 },
        { month: "Feb", score: 87 },
        { month: "Mar", score: 90 },
        { month: "Apr", score: 91 },
        { month: "May", score: 94 },
        { month: "Jun", score: 95 }
      ],
      certifications: ["Certified Scrum Product Owner", "Business Analysis Specialist"],
      projects: ["Mobile App Launch", "Customer Insights Platform"],
      expertise: ["Product Strategy", "Market Research", "Agile", "Data Analysis"],
      teamContributions: [
        { category: "Strategy Planning", value: 45 },
        { category: "Team Leadership", value: 40 },
        { category: "Stakeholder Communication", value: 35 },
        { category: "Customer Research", value: 30 }
      ]
    },
    {
      id: 4,
      name: "Rohit Mehta",
      role: "Business Analyst",
      department: "Business Analysis",
      email: "rohit.m@company.com",
      phone: "+91 910-123-4567",
      location: "Chennai, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2022-02-12",
      skills: [
        { subject: "Data Analysis", A: 93 },
        { subject: "Problem Solving", A: 85 },
        { subject: "Leadership", A: 80 },
        { subject: "Communication", A: 88 },
        { subject: "Market Research", A: 89 },
        { subject: "Strategy", A: 87 }
      ],
      performanceHistory: [
        { month: "Jan", score: 86 },
        { month: "Feb", score: 90 },
        { month: "Mar", score: 91 },
        { month: "Apr", score: 94 },
        { month: "May", score: 93 },
        { month: "Jun", score: 92 }
      ],
      certifications: ["Certified Business Analysis Professional", "Lean Six Sigma Green Belt"],
      projects: ["Data Analytics Project", "Market Assessment"],
      expertise: ["Data Analytics", "Business Strategy", "Market Research", "Financial Analysis"],
      teamContributions: [
        { category: "Data Reporting", value: 50 },
        { category: "Business Strategy", value: 40 },
        { category: "Documentation", value: 30 },
        { category: "Team Collaboration", value: 35 }
      ]
    },
    {
      id: 5,
      name: "Ananya Gupta",
      role: "UX Designer",
      department: "Design",
      email: "ananya.g@company.com",
      phone: "+91 987-555-1234",
      location: "Mumbai, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2021-05-23",
      skills: [
        { subject: "UI Design", A: 90 },
        { subject: "User Research", A: 92 },
        { subject: "Prototyping", A: 88 },
        { subject: "Visual Design", A: 85 },
        { subject: "Communication", A: 80 },
        { subject: "Project Management", A: 84 }
      ],
      performanceHistory: [
        { month: "Jan", score: 90 },
        { month: "Feb", score: 89 },
        { month: "Mar", score: 93 },
        { month: "Apr", score: 91 },
        { month: "May", score: 95 },
        { month: "Jun", score: 93 }
      ],
      certifications: ["Google UX Design", "Figma Advanced"],
      projects: ["Website Redesign", "User Experience Improvement"],
      expertise: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      teamContributions: [
        { category: "Design Reviews", value: 45 },
        { category: "User Testing", value: 35 },
        { category: "Documentation", value: 30 },
        { category: "Team Collaboration", value: 40 }
      ]
    },
    {
      id: 6,
      name: "Sandeep Patel",
      role: "Marketing Manager",
      department: "Marketing",
      email: "sandeep.p@company.com",
      phone: "+91 990-876-5432",
      location: "Ahmedabad, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2020-09-01",
      skills: [
        { subject: "Marketing Strategy", A: 92 },
        { subject: "Content Creation", A: 87 },
        { subject: "Analytics", A: 85 },
        { subject: "Leadership", A: 88 },
        { subject: "Communication", A: 90 },
        { subject: "Project Management", A: 84 }
      ],
      performanceHistory: [
        { month: "Jan", score: 88 },
        { month: "Feb", score: 85 },
        { month: "Mar", score: 89 },
        { month: "Apr", score: 90 },
        { month: "May", score: 92 },
        { month: "Jun", score: 93 }
      ],
      certifications: ["Digital Marketing Specialist", "Google Analytics Certified"],
      projects: ["Brand Awareness Campaign", "SEO Strategy"],
      expertise: ["SEO", "Content Strategy", "Analytics", "Campaign Management"],
      teamContributions: [
        { category: "Campaign Planning", value: 50 },
        { category: "Team Leadership", value: 40 },
        { category: "Client Relations", value: 45 },
        { category: "Content Strategy", value: 35 }
      ]
    },
    {
      id: 7,
      name: "Neha Yadav",
      role: "Content Writer",
      department: "Marketing",
      email: "neha.y@company.com",
      phone: "+91 976-543-2109",
      location: "Pune, India",
      avatar: "/api/placeholder/100/100",
      joinDate: "2021-03-17",
      skills: [
        { subject: "Content Writing", A: 94 },
        { subject: "SEO", A: 88 },
        { subject: "Communication", A: 92 },
        { subject: "Creativity", A: 90 },
        { subject: "Team Collaboration", A: 85 },
        { subject: "Research", A: 87 }
      ],
      performanceHistory: [
        { month: "Jan", score: 90 },
        { month: "Feb", score: 92 },
        { month: "Mar", score: 91 },
        { month: "Apr", score: 93 },
        { month: "May", score: 95 },
        { month: "Jun", score: 94 }
      ],
      certifications: ["Content Writing Certification", "SEO Masterclass"],
      projects: ["SEO Blog Strategy", "Content Creation for Website"],
      expertise: ["Content Writing", "SEO", "Creative Writing", "Editing"],
      teamContributions: [
        { category: "Content Creation", value: 60 },
        { category: "SEO Optimization", value: 40 },
        { category: "Research", value: 35 },
        { category: "Collaboration", value: 30 }
      ]
    },
    // Add 8 more employees with a similar structure...
  ];
  

  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeTab, setActiveTab] = useState('profile');

  const departments = ['All', 'Engineering', 'Marketing', 'Design', 'Finance', 'HR', 'Sales'];

  const filteredEmployees = selectedDepartment === 'All'
    ? employees
    : employees.filter(emp => emp.department === selectedDepartment);

  const calculateEngagementScore = (employee) => {
    const skillsAvg = employee.skills.reduce((acc, curr) => acc + curr.A, 0) / employee.skills.length;
    const performanceAvg = employee.performanceHistory.reduce((acc, curr) => acc + curr.score, 0) / employee.performanceHistory.length;
    const contributionAvg = employee.teamContributions.reduce((acc, curr) => acc + curr.value, 0) / employee.teamContributions.length;
    return Math.round((skillsAvg + performanceAvg + contributionAvg) / 3);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900">Employee Dashboard</h1>
            <p className="text-gray-500">Monitor performance, skills, and contributions</p>
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px] bg-white border border-gray-300 shadow-md rounded-md">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Employee List) */}
          <div className="col-span-1">
            <Card className="bg-white shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Employees</CardTitle>
                <CardDescription>Click on an employee to view their details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEmployees.map(employee => (
                    <div
                      key={employee.id}
                      onClick={() => setSelectedEmployee(employee)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 ${
                        selectedEmployee.id === employee.id ? 'bg-blue-100' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <img src={employee.avatar} alt={employee.name} className="rounded-full" />
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-800">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (Selected Employee Info) */}
          <div className="col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 gap-2">
                <TabsTrigger value="profile" className="px-4 py-2 rounded-md text-gray-800">Profile</TabsTrigger>
                <TabsTrigger value="skills" className="px-4 py-2 rounded-md text-gray-800">Skills</TabsTrigger>
                <TabsTrigger value="performance" className="px-4 py-2 rounded-md text-gray-800">Performance</TabsTrigger>
                <TabsTrigger value="contributions" className="px-4 py-2 rounded-md text-gray-800">Contributions</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-lg rounded-lg">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-6">
                        <Avatar className="w-24 h-24">
                          <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="rounded-full" />
                        </Avatar>
                        <div className="space-y-4 flex-1">
                          <h2 className="text-2xl font-semibold text-gray-900">{selectedEmployee.name}</h2>
                          <p className="text-gray-600">{selectedEmployee.role}</p>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p>{selectedEmployee.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Phone</p>
                              <p>{selectedEmployee.phone}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Location</p>
                              <p>{selectedEmployee.location}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Join Date</p>
                              <p>{selectedEmployee.joinDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="skills">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-lg rounded-lg">
                    <CardHeader>
                      <CardTitle>Skills Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" width={300} height={250} data={selectedEmployee.skills}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Skill Proficiency" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-lg rounded-lg">
                    <CardHeader>
                      <CardTitle>Performance History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LineChart width={400} height={250} data={selectedEmployee.performanceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#4CAF50" />
                      </LineChart>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="contributions">
                <div className="grid gap-6">
                  <Card className="bg-white shadow-lg rounded-lg">
                    <CardHeader>
                      <CardTitle>Team Contributions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BarChart width={400} height={250} data={selectedEmployee.teamContributions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#42A5F5" />
                      </BarChart>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
