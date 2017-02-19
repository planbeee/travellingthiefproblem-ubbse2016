package model.item;

import org.apache.log4j.Logger;

import java.util.List;

public class ItemDTO {
    /*
    function marker(numberOfItems, valueOfItems, weightOfItems) {
    this.numberOfItems = numberOfItems
    this.valueOfItems = valueOfItems
    this.weightOfItems = weightOfItems
}
     */
    private int numberOfItems;

    private List<OneItem> items;

    public int getNumberOfItems() {

        return numberOfItems;
    }

    public List<OneItem> getItems() {

        return items;
    }
}
