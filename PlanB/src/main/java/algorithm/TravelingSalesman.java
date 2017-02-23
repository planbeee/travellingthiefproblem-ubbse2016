package algorithm;

import utilities.TTP;

import java.util.ArrayList;
import java.util.Stack;

/**
 * Created by Norbert on 2017. 02. 23..
 */
public class TravelingSalesman {

    private Stack<Integer> stack;
    private ArrayList<Integer> al;

    public void tsp(TTP ttp)
    {
        int numCities = ttp.getNumCities();
        int[][] adjacencyMatrix = ttp.getAdjacency_matrix();

        int[] visited = new int[numCities + 1];
        visited[1] = 1;
        stack.push(1);
        int element, dst = 0, i;
        int min = Integer.MAX_VALUE;
        boolean minFlag = false;
        System.out.print(1 + "\t");
        al.add(1);

        while (!stack.isEmpty())
        {
            element = stack.peek();
            i = 1;
            min = Integer.MAX_VALUE;
            while (i <= numCities)
            {
                if (adjacencyMatrix[element][i] > 1 && visited[i] == 0)
                {
                    if (min > adjacencyMatrix[element][i])
                    {
                        min = adjacencyMatrix[element][i];
                        dst = i;
                        minFlag = true;
                    }
                }
                i++;
            }
            if (minFlag)
            {
                visited[dst] = 1;
                stack.push(dst);
                System.out.print(dst + "\t");
                al.add(dst);
                minFlag = false;
                continue;
            }
            stack.pop();
        }
    }

    public ArrayList<Integer> getResultArray(){
        return al;
    }

    public TravelingSalesman(TTP ttp) {
        stack = new Stack<Integer>();
        al=new ArrayList<Integer>();
        System.out.println("The citys are visited as follows:");
        tsp(ttp);
        System.out.println();
    }

}
