class Employee {
    int id;
    String name;
    double basicSalary;

    Employee(int id, String name, double basicSalary) {
        this.id = id;
        this.name = name;
        this.basicSalary = basicSalary;
    }

    void calculateSalary() {
        double hra = basicSalary * 0.20;
        double da = basicSalary * 0.10;
        double gross = basicSalary + hra + da;

        System.out.println("Employee: " + name);
        System.out.println("Gross Salary: " + gross);
    }

    public static void main(String[] args) {
        Employee e = new Employee(101, "Arun", 30000);
        e.calculateSalary();
    }
}