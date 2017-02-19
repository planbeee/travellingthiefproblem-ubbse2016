package repository;

import model.distance.DistanceDTO;
import model.item.ItemDTO;
import org.springframework.stereotype.Repository;

public class StoreImpl {

    DistanceDTO distanceDTO;

    ItemDTO itemDTO;

    public StoreImpl() {
    }

    public void setDistanceDTO(DistanceDTO distanceDTO) {

        this.distanceDTO = distanceDTO;
    }

    public DistanceDTO getDistanceDTO() {

        return distanceDTO;
    }

    public ItemDTO getItemDTO() {

        return itemDTO;
    }

    public void setItemDTO(ItemDTO itemDTO) {

        this.itemDTO = itemDTO;
    }
}
