const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR = 20;

// Function to validate employee details using Regex
const validateEmployee = (empId, salary, gender, joiningDate) => {
    try {
        // Regex patterns
        const idPattern = /^[1-9]\d*$/; 
        const salaryPattern = /^[1-9]\d*$/; 
        const genderPattern = /^[MF]$/; 
        const datePattern = /^\d{4}-\d{2}-\d{2}$/; 

        // Validate Employee ID
        if (!idPattern.test(empId)) {
            throw new Error("Invalid Employee ID. Must be a non-zero positive number.");
        }

        // Validate Salary
        if (!salaryPattern.test(salary)) {
            throw new Error("Invalid Salary. Must be a non-zero positive number.");
        }

        // Validate Gender
        if (!genderPattern.test(gender)) {
            throw new Error("Invalid Gender. Must be 'M' or 'F'.");
        }

        // Validate Date Format
        if (!datePattern.test(joiningDate)) {
            throw new Error("Invalid Date Format. Use YYYY-MM-DD.");
        }

        // Validate that date is not in the future
        const today = new Date().toISOString().split("T")[0]; 
        if (joiningDate > today) {
            throw new Error("Invalid Joining Date. Cannot be a future date.");
        }

        return "Employee details are valid!";
    } catch (error) {
        return `Error: ${error.message}`;
    }
};

// Function to calculate daily wage
const calcDailyWage = (hoursWorked) => hoursWorked * WAGE_PER_HOUR;

// Function to generate employee wage data
const generateEmployeeWageData = () => {
    let empDailyHours = [8, 4, 8, 0, 8, 4, 8, 8, 4, 0]; // Hours worked per day
    let empDailyWage = empDailyHours.map(hours => calcDailyWage(hours));

    return empDailyWage.map((wage, index) => ({
        day: index + 1,
        hoursWorked: empDailyHours[index],
        dailyWage: wage
    }));
};

const calcTotalWage = (wageData) => wageData.reduce((total, day) => total + day.dailyWage, 0);
const getDayWithWage = (wageData) => wageData.map(day => `Day ${day.day}: Wage ${day.dailyWage}`);
const getFullTimeDays = (wageData) => wageData.filter(day => day.dailyWage === 160).map(day => `Day ${day.day}`);
const findFirstFullTimeDay = (wageData) => wageData.find(day => day.dailyWage === 160);
const isAllFullTimeWageCorrect = (wageData) => wageData.every(day => day.hoursWorked === FULL_TIME_HOURS || day.hoursWorked === 0);
const hasPartTimeWage = (wageData) => wageData.some(day => day.dailyWage === (PART_TIME_HOURS * WAGE_PER_HOUR));
const countDaysWorked = (wageData) => wageData.filter(day => day.hoursWorked > 0).length;

// Call functions and display output
const empId = 101;
const salary = 20000;
const gender = "M";
const joiningDate = "2024-03-10";

console.log(validateEmployee(empId, salary, gender, joiningDate));

const wageData = generateEmployeeWageData();
console.log("Total Wage:", calcTotalWage(wageData));
console.log("Daily Wage Map:", getDayWithWage(wageData));
console.log("Days with Full Time Wage:", getFullTimeDays(wageData));
console.log("First Occurrence of Full Time Wage:", findFirstFullTimeDay(wageData));
console.log("Every Element Full Time Wage:", isAllFullTimeWageCorrect(wageData));
console.log("Has Part Time Wage:", hasPartTimeWage(wageData));
console.log("Number of Days Worked:", countDaysWorked(wageData));
