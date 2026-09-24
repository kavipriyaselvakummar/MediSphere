class Patient {
    int patientId;
    String name, disease;
    int age;

    Patient(int patientId, String name, String disease, int age) {
        this.patientId = patientId;
        this.name = name;
        this.disease = disease;
        this.age = age;
    }

    void display() {
        System.out.println("Patient ID: " + patientId);
        System.out.println("Name: " + name);
        System.out.println("Disease: " + disease);
        System.out.println("Age: " + age);
    }

    public static void main(String[] args) {
        Patient p = new Patient(101, "Kavi", "Fever", 20);
        p.display();
    }
}