class Rectangle {
    int length, breadth;

    Rectangle(int l, int b) {
        length = l;
        breadth = b;
    }

    void area() {
        System.out.println("Area = " + (length * breadth));
    }

    void perimeter() {
        System.out.println("Perimeter = " + (2 * (length + breadth)));
    }

    public static void main(String[] args) {
        Rectangle r = new Rectangle(10, 5);
        r.area();
        r.perimeter();
    }
}