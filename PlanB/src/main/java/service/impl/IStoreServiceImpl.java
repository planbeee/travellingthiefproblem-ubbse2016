package service.impl;

import model.distance.DistanceDTO;
import model.item.ItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import repository.IStore;

public class IStoreServiceImpl implements IStore {

    @Autowired
    IStore distanceRepository;

    public void setDistanceDTO(DistanceDTO distanceDTO) {

        distanceRepository.setDistanceDTO(distanceDTO);
    }

    public DistanceDTO getDistanceDTO() {

        return distanceRepository.getDistanceDTO();
    }

    @Override
    public ItemDTO getItemDTO() {
        return null;
    }

    @Override
    public void setItemDTO(ItemDTO itemDTO) {

    }
}
