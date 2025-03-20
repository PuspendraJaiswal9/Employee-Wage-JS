const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR = 20;

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

const findFirstFullTimeDay = (wageData) => wageData.find(day => day.dailyWage === 160)?.day || -1;

const isAllFullTimeWageCorrect = (wageData) => wageData.every(day => day.hoursWorked === FULL_TIME_HOURS || day.hoursWorked === 0);

const hasPartTimeWage = (wageData) => wageData.some(day => day.dailyWage === (PART_TIME_HOURS * WAGE_PER_HOUR));

const countDaysWorked = (wageData) => wageData.filter(day => day.hoursWorked > 0).length;

// Call functions and display output
const wageData = generateEmployeeWageData();

console.log("Total Wage:", calcTotalWage(wageData));
console.log("Daily Wage Map:", getDayWithWage(wageData));
console.log("Days with Full Time Wage:", getFullTimeDays(wageData));
console.log("First Occurrence of Full Time Wage:", findFirstFullTimeDay(wageData));
console.log("Every Element Full Time Wage:", isAllFullTimeWageCorrect(wageData));
console.log("Has Part Time Wage:", hasPartTimeWage(wageData));
console.log("Number of Days Worked:", countDaysWorked(wageData));
