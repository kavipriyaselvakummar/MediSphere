class Electricity {
    int units;

    ElectricityBill(int units) {
        this.units = units;
    }

    void calculateBill() {
        double bill = units * 7.5;
        System.out.println("Electricity Bill = " + bill);
    }

    public static void main(String[] args) {
        ElectricityBill e = new ElectricityBill(250);
        e.calculateBill();
    }
}