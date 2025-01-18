import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopPerformers = ({ employeeData }) => {
  const sortedEmployees = [...employeeData].sort((a, b) => b.performance_score - a.performance_score).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedEmployees.map((employee, index) => (
          <div key={employee.employee_id} className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${employee.name}`} />
              <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium leading-none">{employee.name}</p>
              <p className="text-sm text-muted-foreground">{employee.department}</p>
            </div>
            <div className="font-medium">{employee.performance_score.toFixed(2)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopPerformers;

