import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LeaveCalendar = ({ leaveData }) => {
  const leaveDates = leaveData.map(leave => new Date(leave.leave_date));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={leaveDates}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};

export default LeaveCalendar;

