class Students {

    private int rollNo;
    private String name;

    public void setRollNo(int rollNo) {
        this.rollNo = rollNo;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRollNo() {
        return rollNo;
    }

    public String getName() {
        return name;
    }

    public static void main(String[] args) {

        Student s = new Student();

        s.setRollNo(101);
        s.setName("Keerthi");

        System.out.println("Roll No: " + s.getRollNo());
        System.out.println("Name: " + s.getName());
    }
}