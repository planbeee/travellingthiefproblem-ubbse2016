package model.item;

public class OneItem {

    private double value;

    private int weight;

    public OneItem() {
    }

    public OneItem(double value, int weight) {
        this.value = value;
        this.weight = weight;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
