package service;

import model.distance.DistanceDTO;
import org.apache.log4j.Logger;

public interface IDistanceService {

     void setDistanceDTO(DistanceDTO distanceDTO);

     DistanceDTO getDistanceDTO();
}
