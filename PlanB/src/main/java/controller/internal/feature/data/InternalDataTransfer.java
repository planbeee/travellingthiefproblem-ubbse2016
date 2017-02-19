package controller.internal.feature.data;

import model.Feature;
import model.Item;
import model.PreConditions;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import service.IFeatureService;

@RestController
@RequestMapping("/internal")
public class InternalDataTransfer {

    private Logger LOG = Logger.getLogger(InternalDataTransfer.class.getName());

    @Autowired
    IFeatureService featureService;

    @RequestMapping(value = "/preConditions", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(@RequestBody PreConditions preConditions) {

        /*
         JSON example:
        {
	          "cities": "1",
              "items": "1",
              "knapsackWeight": "1",
              "knapsackRent": "1",
              "maxVelocity": "1",
              "minVelocity": "1"
        }
         */
        LOG.info(preConditions);
        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @RequestMapping(value = "/distance", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity distance(@RequestBody Item item) {

        LOG.info(item);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
