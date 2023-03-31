import java.util.Scanner;
public class ReverseNumber{
public static void main(String[] args){
int num=1234, reverse=0 ,remainder;
while(num!=0)
{
remainder=num%10;
reverse=reverse*10+remainder;
num=num/10;
}
System.out.println("The reverse of the given number is:"+reverse);
}
}