#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.yellow
    ("\n\t\tWelcome to XYZ University!!\n"))

class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
};

class Student extends Person {
    rollnumber: number;
    courses: courses[] = [];
    department: string;  // Fixed the initialization of department
    static studentsArray: Student[] = [];  // Static array to hold all student instances

    constructor(name: string, age: number, department: string) {  
        super(name, age);
        this.department = department; 
        this.rollnumber = Math.floor(Math.random() * 100) + 1;
        Student.studentsArray.push(this);  // Add this instance to the static array
    }

    registerforcourses(course: courses) {
        this.courses.push(course);
    }

    static getAllStudents() {
        return Student.studentsArray;
    }
};

class Instructor extends Person {
    salary: number;
    courses: courses[] = [];

    constructor(name: string, age: number, salary: number) {
        super(name, age);
        this.salary = Math.round((Math.random() * (200000 - 150000) + 150000) / 1000) * 1000;
    }

    assigncourses(course: courses) {
        this.courses.push(course); 
    }
};

class courses {
    id: number;
    name: any;
    students: Student[] = []
    instructor: Instructor[] = []

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    addStudent(std: Student) {
        this.students.push(std);
    }

    addInstructor(ins: Instructor) {
        this.instructor.push(ins);
        ins.assigncourses(this);
    }
}

class Department {
    name: any;
    course: courses[] = []
    constructor(name: any) {
        this.name = name;
    }

    addcourse(coursess: courses) {
        this.course.push(coursess);
    }
};

const departmentlist = [
    new Department("Computer Science"),
    new Department("Biochemistry"),
    new Department("Computational Finance"),
];

const courselist: { [key: string]: courses[] } = {
    "Computer Science": [
        new courses(1, "Metaverse"),
        new courses(2, "Artificial Intelligence"),
        new courses(3, "Blockchain")
    ],
    "Biochemistry": [
        new courses(1, "Neuropharmacology"),
        new courses(2, "Endocrinology"),
        new courses(3, "Bioinformatics")
    ],
    "Computational Finance": [
        new courses(1, "Macro & Micro Economics"),
        new courses(2, "Mathematical Finance"),
        new courses(3, "Statistical Inference")
    ],
};

const instructorlist = [
    new Instructor("Sir Faris", 28, 120000),
    new Instructor("Sir Ali", 32, 160000),
    new Instructor("Miss Hunain", 38, 200000),
    new Instructor("Miss Farhat", 32, 130000),
    new Instructor("Miss Yasmeen", 30, 140000),
    new Instructor("Miss Zara", 28, 130000),
    new Instructor("Sir Ameen", 35, 180000),
    new Instructor("Sir Sami", 29, 170000),
    new Instructor("Sir Zeeshan", 37, 180000),
];

courselist["Computer Science"][0].addInstructor(instructorlist[0]);
courselist["Computer Science"][1].addInstructor(instructorlist[1]);
courselist["Computer Science"][2].addInstructor(instructorlist[2]);

courselist["Biochemistry"][0].addInstructor(instructorlist[3]);
courselist["Biochemistry"][1].addInstructor(instructorlist[4]);
courselist["Biochemistry"][2].addInstructor(instructorlist[5]);

courselist["Computational Finance"][0].addInstructor(instructorlist[6]);
courselist["Computational Finance"][1].addInstructor(instructorlist[7]);
courselist["Computational Finance"][2].addInstructor(instructorlist[8]);

departmentlist.forEach(department => {
    courselist[department.name].forEach(course => department.addcourse(course));
});

(async () => {  
    let exit;
    while (exit != "Exit") {
        let answer = await inquirer.prompt([{
            name: "View",
            type: "list",
            message: "What would you like to do:",
            choices: ["Enroll Student", "Enroll Instructor", "View Department List", "View Instructor List","View Students List", "Exit"]
        }]);

        if (answer.View === "Enroll Student") {  
            let enrollStudent = await inquirer.prompt(
            [
                {
                    message: "Enter your name:",
                    name: "name",
                    type: "input"
                },
                {
                    message: "Enter your age:",
                    name: "age",
                    type: "number"
                }
            ]);

            let departmentSelection = await inquirer.prompt(
            [
                {
                    type: "list",
                    name: "department",
                    message: "Select your department:",
                    choices: departmentlist.map(department => department.name)
                }
            ]);

            let selectedDepartment = departmentlist.find(department => department.name === departmentSelection.department);

            if (selectedDepartment) {
                let courseSelection = await inquirer.prompt(
                [
                    {
                        type: "list",
                        name: "course",
                        message: "Select the course you want to enroll in:",
                        choices: selectedDepartment.course.map(courses => courses.name)
                    }
                ]);

                let selectedCourse = selectedDepartment.course.find(courses => courses.name === courseSelection.course);
                const std = new Student(enrollStudent.name, enrollStudent.age, selectedDepartment.name);  

                if (selectedCourse) {
                    selectedCourse.addStudent(std);
                    std.registerforcourses(selectedCourse);
                    console.log("Student Info:", {
                        name: std.name,
                        age: std.age,
                        courses: std.courses.map(course => course.name), 
                        rollnumber: std.rollnumber,
                        department: std.department
                    });
                    console.log(`Congrats ${chalk.bold.green(enrollStudent.name)}!! You are enrolled in ${chalk.bold.green(selectedCourse.name)} of ${chalk.bold.green(selectedDepartment.name)} department.`);
                    console.log("Instructors for the selected course:", selectedCourse.instructor.map(ins => ins.name));
                }
            }
        } else if (answer.View === "Enroll Instructor") {  
            let enrollInstructor = await inquirer.prompt(
            [
                {
                    message: "Enter your name:",
                    name: "name",
                    type: "input"
                },
                {
                    message: "Enter your age:",
                    name: "age",
                    type: "number"
                }
            ]);

            const ins = new Instructor(enrollInstructor.name, enrollInstructor.age , enrollInstructor.salary);

            let departmentSelection = await inquirer.prompt(
            [
                {
                    type: "list",
                    name: "department",
                    message: "Select your department:",
                    choices: departmentlist.map(department => department.name)
                }
            ]);

            let selectedDepartment = departmentlist.find(department => department.name === departmentSelection.department);

            if (selectedDepartment) {
                let courseSelection = await inquirer.prompt(
                [
                    {
                        type: "list",
                        name: "course",
                        message: "Select the course you want to enroll in:",
                        choices: selectedDepartment.course.map(courses => courses.name)
                    }
                ]);

                let selectedCourse = selectedDepartment.course.find(courses => courses.name === courseSelection.course);

                if (selectedCourse) {
                    selectedCourse.addInstructor(ins);
                    ins.assigncourses(selectedCourse);
                    instructorlist.push(ins);
                    console.log("Instructor Info:", {
                        name: ins.name,
                        age: ins.age,
                        courses: ins.courses.map(course => course.name),  
                        salary: ins.salary
                    });
                    console.log(`Congrats ${chalk.bold.green(enrollInstructor.name)}!! You are assigned to ${chalk.bold.green(selectedCourse.name)} of ${chalk.bold.green(selectedDepartment.name)} department.`);
                }
            }
        } else if (answer.View === "View Department List") { 
            departmentlist.forEach(department => {
                console.log(chalk.bold.magenta(department.name));
                console.log("Courses:", department.course.map(course => course.name).join(", "));
            });
        } else if (answer.View === "View Instructor List") { 
            instructorlist.forEach(instructor => {
                console.log(`${chalk.bold.magenta(instructor.name)}`)
                console.log(` Courses Assigned: ${instructor.courses.map(course => course.name).join(", ")}`);
            });
        } else if (answer.View === "Exit") {
            exit = "Exit";
            console.log(chalk.green("You have successfully exited the system"));
        } else if(answer.View === "View Students List") {
            console.log(Student.getAllStudents().map(student => ({
                name: student.name,
                age: student.age,
                department: student.department,
            })));
        }
    }
})();
