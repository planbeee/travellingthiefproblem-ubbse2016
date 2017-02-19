package model;

import java.util.List;

public class Item {

    private double value;

    private double weight;

    private List<Integer> cities;

    public Item() {
    }

    public Item(double value, double weight) {
        this.value = value;
        this.weight = weight;
    }

    public double getValue() {
        return value;
    }

    public double getWeight() {
        return weight;
    }

    @Override
    public String toString() {
        return "Item{" +
                "value=" + value +
                ", weight=" + weight +
                ", cities=" + cities +
                '}';
    }
}
