package algorithm;

import utilities.TTP;

/**
 * Created by Norbert on 2017. 02. 23..
 */
public class GreedyKnapsack {

    double[] profit;
    double[] weight;
    double[] take;
    double total;

    public double getTotal() {
        return total;
    }

    public double[] getTake() {
        return take;
    }

    public GreedyKnapsack(int n) {
        profit = new double[n];
        weight = new double[n];
        take = new double[n];
    }

    public GreedyKnapsack(int n, double[] profit, double[] weight) {
        this.profit=profit;
        this.weight=weight;
        take = new double[n];
    }

    public void unitPriceOrder() {
        for (int i = 0; i < profit.length; i++) {
            for (int j = 1; j < (profit.length - i); j++) {
                double x = profit[j - 1] / weight[j - 1];
                double y = profit[j] / weight[j];
                if (x <= y) {
                    double temp = profit[j - 1];
                    profit[j - 1] = profit[j];
                    profit[j] = temp;

                    double temp1 = weight[j - 1];
                    weight[j - 1] = weight[j];
                    weight[j] = temp1;
                }
            }
        }
    }

    public void Knapsack(double m,TTP ttp,double atlagprofit) {
        unitPriceOrder();
        int j;
        for (j = 0; j < profit.length; j++) {
            take[j] = 0;
        }
        total = m;
        for (j = 0; j < profit.length; j++) {
            if (weight[j] <= total && (profit[j] / weight[j])>0) {
                take[j] = 1.00;
                if (profit[j]/weight[j]>atlagprofit) {
                    total = total - weight[j];
                }
            } else {
                break;
            }
        }
        if (j < profit.length) {
            take[j] = (double)(total / weight[j]);
        }
    }

    /*public void teszt(TTP ttp) {
    	GreedyKnapsack G = new GreedyKnapsack(10);
	    System.out.println("Optimal soluation to knapsack instance "
	            + "with values given as follows : m=35");
	    G.Knapsack(35,ttp);
	    G.kiir();
	    System.out.println("=======+============+=======+============+="
	            + "===========");
	    System.out.println("Optimal soluation to knapsack instance with "
	            + "values given as follows : m=120");
	    G.Knapsack(120,ttp);
	    G.kiir();
    }*/

    public void kiir() {

        System.out.println("item" + " |  " + "profit" + "  |   " + "weight" +
                "   |     " + "Unit Price" + "      |" + "  Take weight");
        for (int n = 0; n < profit.length; n++) {
            System.out.println(n + "\t" + profit[n] + "\t\t" + weight[n] + "\t"
                    + (profit[n] / weight[n]) + "\t" + take[n]);
        }
    }

    public void setProfits(double[] profit) {
        this.profit=profit;
    }

    public void setWeights(double[] weight) {
        this.weight=weight;
    }
}
