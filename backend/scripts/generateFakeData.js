import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
import Performance from '../models/Performance.js';
import EmojiResponse from '../models/EmojiResponse.js';
import Leave from '../models/Leave.js';

mongoose.connect('mongodb://localhost:27017/hrdashboard');

const generateEmployees = async (count) => {
  const employees = [];
  for (let i = 0; i < count; i++) {
    const employee = new Employee({
      name: faker.person.fullName(),
      employee_id: faker.string.alphanumeric(8),
      department: faker.helpers.arrayElement(['Sales', 'Engineering', 'HR', 'Finance']),
      role: faker.person.jobTitle(),
      performance_score: faker.number.float({ min: 1, max: 10, precision: 0.1 })
    });
    employees.push(employee);
  }
  await Employee.insertMany(employees);
  return employees;
};

const generateAttendance = async (employees, days) => {
  const attendance = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    for (const employee of employees) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const attendanceRecord = new Attendance({
        employee_id: employee.employee_id,
        date: date,
        attendance_status: faker.helpers.arrayElement(['Present', 'Absent', 'On Leave'])
      });
      attendance.push(attendanceRecord);
    }
  }
  await Attendance.insertMany(attendance);
};

const generatePerformance = async (employees, days) => {
  const performance = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    for (const employee of employees) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const performanceRecord = new Performance({
        employee_id: employee.employee_id,
        task_completion_rate: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        performance_score: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
        workload: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        burnout_level: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
        date: date
      });
      performance.push(performanceRecord);
    }
  }
  await Performance.insertMany(performance);
};

const generateEmojiResponses = async (employees, days) => {
  const emojiResponses = [];
  const today = new Date();
  const emojis = ['😊', '😐', '😟'];
  for (let i = 0; i < days; i++) {
    for (const employee of employees) {
      if (Math.random() < 0.8) { // 80% chance of responding
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const emojiResponse = new EmojiResponse({
          employee_id: employee.employee_id,
          emoji: faker.helpers.arrayElement(emojis),
          timestamp: date,
          type: i % 7 === 0 ? 'weekly' : 'daily' // Weekly on Sundays, daily otherwise
        });
        emojiResponses.push(emojiResponse);
      }
    }
  }
  await EmojiResponse.insertMany(emojiResponses);
};

const generateLeaveData = async (employees, days) => {
  const leaveData = [];
  const today = new Date();
  for (const employee of employees) {
    const leaveDays = faker.number.float({ min: 0, max: 10 });
    for (let i = 0; i < leaveDays; i++) {
      const leaveDate = new Date(today);
      leaveDate.setDate(leaveDate.getDate() - faker.number.float({ min: 0, max: days }));
      const leaveRecord = new Leave({
        employee_id: employee.employee_id,
        leave_date: leaveDate,
        leave_duration: faker.number.float({ min: 1, max: 5 })
      });
      leaveData.push(leaveRecord);
    }
  }
  await Leave.insertMany(leaveData);
};

const generateData = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log('Generating fake data...');
    const employees = await generateEmployees(50);
    await generateAttendance(employees, 30);
    await generatePerformance(employees, 30);
    await generateEmojiResponses(employees, 30);
    await generateLeaveData(employees, 30);
    console.log('Fake data generated successfully!');
  } catch (error) {
    console.error('Error generating fake data:', error);
  } finally {
    mongoose.connection.close();
  }
};

generateData();

