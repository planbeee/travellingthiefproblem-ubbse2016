package controller.internal.feature;

import model.Feature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import service.IFeatureService;

import java.util.List;

@RestController
@RequestMapping("/internal/feature")
public class InternalFeatureController {

    //TODO for robert.gyori: provide more examples
    //TODO for robert.gyori: Runtime exceptions are thrown. Implement an exception handler.
    //TODO for robert.gyori: you should return a status code

    @Autowired
    IFeatureService featureService;

    @RequestMapping(value ="/", method = RequestMethod.GET)
    public String index() {
        return "Hello from PlanB!";
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<Feature> list() {

        //@TODO for robert.gyori: create a profile which uses a not empty database
        // ( if you add values to your testing database, the tests will fail )
        //database is empty, so you will se no results
        return featureService.list();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void add(@RequestBody Feature feature) {

        //we don't have a user interface where to type input data.
        //to see if it works, you can send JSON data through POSTMAN
        //POSTMAN: chrome app ->install->run->type the path (localhost:8080/internal/feature/add)
        //set the request method to POST
        //select Body -> raw -> JSON(application/json)
        /* Paste this into the text section and press SEND
            {
	            "id": "123",
	            "name": "nameeee",
	            "address": "addressssss",
	            "details": "detailssss"
	}

	    Now go to (with a web browser) to localhost:8080/internal/feature/list
         */
        featureService.insert(feature);
    }
}
