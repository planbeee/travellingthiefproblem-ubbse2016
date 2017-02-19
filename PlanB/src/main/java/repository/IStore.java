package repository;

import model.distance.DistanceDTO;
import model.item.ItemDTO;

public interface IStore {

    void setDistanceDTO(DistanceDTO distanceDTO);

    DistanceDTO getDistanceDTO();

    ItemDTO getItemDTO();

    void setItemDTO(ItemDTO itemDTO);
}
