package controller;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class InternalItemController {

    private Logger LOG = Logger.getLogger(InternalItemController.class.getName());

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity getItems() {

        return new ResponseEntity<String>("HELLO", HttpStatus.OK);

    }
}
