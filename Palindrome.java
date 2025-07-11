
import java.util.*;
public class Palindrome
{
	public static void main(String[] args) 
	{
	    Scanner sc = new Scanner(System.in);
		System.out.print("Enter the strings or numbers:");
		String input = sc.nextLine();
		String cleanInput = input.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
		boolean isPalindrome = true;
		int length = cleanInput.length();
		for(int i=0; i< length/2; i++)
		{
		    if(cleanInput.charAt(i) != cleanInput.charAt(length-i-1))
		    {
		        isPalindrome = false;
		        break;
		    }
		}
		if (isPalindrome)
		{
		    System.out.println("The string is a palindrome.");
		}
		else
		{
		    System.out.println("The string is not a palindrome.");
		}
		
		
	}
}