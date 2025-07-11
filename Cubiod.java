public class Cubiod
{
	public static void main(String[] args)
	{
		//declaration 
		int length,breath,height,area;
		
		//assignment/input
		length=12;
		breath=24;
		height=36;
		
		//procrssing/computation
		area = 2*length*breath + 2*breath*height + 2*height*length;

		//output	
		System.out.println("Area of the cubiod is:");
		System.out.println("length="+length);
		System.out.println("breath="+breath);
		System.out.println("height="+height);
		System.out.println("area="+area);
	}
}