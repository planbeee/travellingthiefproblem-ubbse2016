package controller.item;

import model.distance.DistanceDTO;
import model.item.ItemDTO;
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
@RequestMapping("/internal/item")
public class InternalItemController {

    private Logger LOG = Logger.getLogger(InternalItemController.class.getName());

    @Autowired
    IStore store;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity getItems(@RequestBody ItemDTO itemsDTO) {

        store.setItemDTO(itemsDTO);

        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
