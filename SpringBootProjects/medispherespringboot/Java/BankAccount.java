class BankAccount {
    String name;
    int accountNo;
    double balance;

    BankAccount(String name, int accountNo, double balance) {
        this.name = name;
        this.accountNo = accountNo;
        this.balance = balance;
    }

    void deposit(double amount) {
        balance += amount;
    }

    void withdraw(double amount) {
        if (amount <= balance)
            balance -= amount;
        else
            System.out.println("Insufficient Balance");
    }

    void display() {
        System.out.println("Balance: " + balance);
    }

    public static void main(String[] args) {
        BankAccount b = new BankAccount("Kavi", 12345, 5000);

        b.deposit(1000);
        b.withdraw(2000);
        b.display();
    }
}