
import java.util.Scanner;
public class Fruit {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String fruit = sc.next();

        switch(fruit) {
            case "Mango":
            System.out.println("King of Fruits");
            break;
            case "Apple":
            System.out.println("A sweet red fruit");
            break;
            case "Kiwi":
            System.out.println("A sweet green fruit");
            break;
            case "Orange":
            System.out.println("A round and sour fruit");
            break;
            default:
            System.out.println("Enter a valid fruits");
        }
    }
}
