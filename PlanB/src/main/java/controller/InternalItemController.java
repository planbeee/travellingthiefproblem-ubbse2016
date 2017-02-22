package controller;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class InternalItemController {

    private Logger LOG = Logger.getLogger(InternalItemController.class.getName());
	
    @RequestMapping(value = "", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity sendBack(@RequestParam("Weight") int[] wght,@RequestParam("Value") int[] value,@RequestParam("ItemsbyCities") int[][] items,@RequestParam("ItemsLength") int n,@RequestParam("Distances") int[][] dist,@RequestParam("DistLength") int m) {
    	HttpHeaders responseHeaders = new HttpHeaders();
    	responseHeaders.set("Access-Control-Allow-Origin", "*");
    	
    	int i,j;
    	
    	System.out.println("Weights:");
    	for(i=0;i<wght.length;i++) {
    		System.out.print(" "+wght[i]);
    	}
    	
    	System.out.println();
    	
    	System.out.println("Values:");
    	for(i=0;i<value.length;i++) {
    		System.out.print(" "+value[i]);
    	}
    	
    	System.out.println();
    	
    	System.out.println("N:"+n);
    	
    	System.out.println("ItemsbyCities:");
    	for(i=0;i<items.length;i++) {
    		if(i%n==0 && i!=0) {
    			System.out.println();
    		}
    		System.out.print(items[i][0]+" ");
    	}
    	
    	System.out.println();
		
    	System.out.println("M:"+m);
    	
    	System.out.println("Distances:");
    	for(i=0;i<dist.length;i++) {
    		if(i%m==0 && i!=0) {
    			System.out.println();
    		}
    		System.out.print(dist[i][0]+" ");
    	}
    	
    	System.out.println("\n");
    	
		int[] myIntArray = new int[]{1,2,3};
		String myStrArray = "2012";
		return new ResponseEntity<String>(myStrArray, responseHeaders, HttpStatus.OK);

    }
}
