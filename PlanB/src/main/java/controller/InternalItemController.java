package controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/")
public class InternalItemController {

    private Logger LOG = Logger.getLogger(InternalItemController.class.getName());

	@RequestMapping("/check")
	@ResponseBody
	public String check(@RequestParam Integer id, HttpServletRequest request, HttpServletResponse response, Model model) {
		//boolean a = getSomeResult();
		/*if (a == true) {
			model.addAttribute("alreadySaved", true);
			return view;
		} else {
			model.addAttribute("alreadySaved", false);
			return view;
		}*/
		return null;
	}
	
    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity getItems() {
    	HttpHeaders responseHeaders = new HttpHeaders();
    	responseHeaders.set("Access-Control-Allow-Origin", "*");
		
		int[] myIntArray = new int[]{1,2,3};
		String myStrArray = "3123";

        return new ResponseEntity<String>(myStrArray, responseHeaders, HttpStatus.OK);

    }
}
