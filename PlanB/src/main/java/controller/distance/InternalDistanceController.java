package controller.distance;

import model.distance.DistanceDTO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import repository.IStore;

@RestController
@RequestMapping("/internal/distance")
public class InternalDistanceController {

    private Logger LOG = Logger.getLogger(InternalDistanceController.class.getName());

    @Autowired
    IStore store;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity getDistance(@RequestBody DistanceDTO distance) {

        store.setDistanceDTO(distance);

        return new ResponseEntity<String>(HttpStatus.OK);

    } @RequestMapping(value = "", method = RequestMethod.GET)
    public String testGet(@RequestBody DistanceDTO distance) {

        return "HELLO WORLD";
    }
}
