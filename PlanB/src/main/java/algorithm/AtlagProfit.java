package algorithm;

import utilities.TTP;

/**
 * Created by Norbert on 2017. 02. 23..
 */
public class AtlagProfit {

    private double profit;
    TTP ttp;

    public AtlagProfit(TTP ttp) {
        this.ttp=ttp;
        int i;
        profit=0;
        for (i=0;i<ttp.getNumItems();i++) {
            profit+=ttp.getValues()[i]/ttp.getWeights()[i];
        }
    }

    public double getProfit() {
        return profit/ttp.getNumItems();
    }

}
