// Define the data structures directly without TypeScript interfaces

// Employee object structure
const Employee = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  department: '',
  baseSalary: 0,
  joiningDate: ''
};

// PayrollRecord object structure
const PayrollRecord = {
  id: '',
  employeeId: '',
  month: '',
  year: 0,
  baseSalary: 0,
  overtime: 0,
  bonus: 0,
  deductions: 0,
  netSalary: 0,
  status: 'pending' // Can be 'pending', 'processed', or 'paid'
};

// Department object structure
const Department = {
  id: '',
  name: ''
};
