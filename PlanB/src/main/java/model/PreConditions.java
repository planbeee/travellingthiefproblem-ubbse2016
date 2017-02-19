package model;

public class PreConditions {

    private int cities;

    private int items;

    private double knapsackWeight;

    private double knapsackRent;

    private double maxVelocity;

    private double minVelocity;

    public PreConditions() {
    }

    public PreConditions(int cities, int items, double knapsackWeight, double knapsackRent, double maxVelocity, double minVelocity) {
        this.cities = cities;
        this.items = items;
        this.knapsackWeight = knapsackWeight;
        this.knapsackRent = knapsackRent;
        this.maxVelocity = maxVelocity;
        this.minVelocity = minVelocity;
    }

    public int getCities() {
        return cities;
    }

    public int getItems() {
        return items;
    }

    public double getKnapsackWeight() {
        return knapsackWeight;
    }

    public double getKnapsackRent() {
        return knapsackRent;
    }

    public double getMaxVelocity() {
        return maxVelocity;
    }

    public double getMinVelocity() {
        return minVelocity;
    }

    @Override
    public String toString() {
        return "PreConditions{" +
                "cities=" + cities +
                ", items=" + items +
                ", knapsackWeight=" + knapsackWeight +
                ", knapsackRent=" + knapsackRent +
                ", maxVelocity=" + maxVelocity +
                ", minVelocity=" + minVelocity +
                '}';
    }
}
