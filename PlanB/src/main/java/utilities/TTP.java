package utilities;

/**
 * Created by Norbert on 2017. 02. 22..
 */
public class TTP {

    private int numCities;
    private int numItems;
    private int adjacency_matrix[][];
    private int items_matrix[][];
    private double values[];
    private double weights[];
    private double knapsackWeight;
    private double vmax;
    private double vmin;
    private double knapsackRent;

    public int getNumCities() {
        return numCities;
    }
    public void setNumCities(int numCities) {
        this.numCities = numCities;
    }
    public int[][] getAdjacency_matrix() {
        return adjacency_matrix;
    }
    public void setAdjacency_matrix(int adjacency_matrix[][]) {
        this.adjacency_matrix = adjacency_matrix;
    }
    public int[][] getItems_matrix() {
        return items_matrix;
    }
    public void setItems_matrix(int items_matrix[][]) {
        this.items_matrix = items_matrix;
    }
    public double getKnapsackWeight() {
        return knapsackWeight;
    }
    public void setKnapsackWeight(double knapsackWeight) {
        this.knapsackWeight = knapsackWeight;
    }
    public double getVmax() {
        return vmax;
    }
    public void setVmax(double vmax) {
        this.vmax = vmax;
    }
    public double getVmin() {
        return vmin;
    }
    public void setVmin(double vmin) {
        this.vmin = vmin;
    }
    public double getKnapsackRent() {
        return knapsackRent;
    }
    public void setKnapsackRent(double knapsackRent) {
        this.knapsackRent = knapsackRent;
    }
    public int getNumItems() {
        return numItems;
    }
    public void setNumItems(int numItems) {
        this.numItems = numItems;
    }
    public double[] getValues() {
        return values;
    }
    public void setValues(double values[]) {
        this.values = values;
    }
    public double[] getWeights() {
        return weights;
    }
    public void setWeights(double weights[]) {
        this.weights = weights;
    }

}
