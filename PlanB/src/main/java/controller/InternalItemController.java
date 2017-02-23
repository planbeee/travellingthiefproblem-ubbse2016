package controller;

import javax.servlet.http.HttpServletResponse;

import algorithm.SomethingLikeKP;
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
import utilities.TTP;



@RestController
@RequestMapping("/")
public class InternalItemController {

    private Logger LOG = Logger.getLogger(InternalItemController.class.getName());
	@RequestMapping("/check")
	@ResponseBody
	public String check(@RequestParam Integer id, HttpServletRequest request, HttpServletResponse response, Model model) {
		/*boolean a = getSomeResult();
		if (a == true) {
			model.addAttribute("alreadySaved", true);
			return view;
		} else {
			model.addAttribute("alreadySaved", false);
			return view;
		}*/
		return null;
	}

    @RequestMapping(value = "", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity sendBack(@RequestParam("Weight") double[] wght,@RequestParam("Value") double[] value,@RequestParam("ItemsbyCities") int[][] items,@RequestParam("ItemsLength") int n,@RequestParam("Distances") int[][] dist,@RequestParam("DistLength") int m) {
    	HttpHeaders responseHeaders = new HttpHeaders();
    	responseHeaders.set("Access-Control-Allow-Origin", "*");

    	int i,j;

		int k=0;
		int a [][] = new int [m][m];
		for(i=0; i<dist.length; i++) {
			if(i%m==0 && i!=0) {
				k++;
			}
			a[k][i%m]=dist[i][0];
		}

    	int[][] b = new int[m][n];
		int[][] itemsbycitys = new int[n][m];

		k=0;

		for(i=0;i<items.length;i++) {
			if(i%n==0 && i!=0) {
				k++;
			}
			b[k][i%n] = items[i][0];
		}
		/*for (i=0; i<m; i++){
			for (j=0; j<n; j++){
				System.out.print(b[i][j] + " ");
			}
			System.out.println();
		}*/

		for (i=0; i<n; i++){
			for (j=0; j<m; j++) {
				itemsbycitys[i][j]=b[j][i];
			}
		}

		/*for (i=0; i<n; i++){
			for (j=0; j<m; j++){
				System.out.print(itemsbycitys[i][j] + " ");
			}
			System.out.println();
		}

		System.out.println("Ok2");*/
		TTP ttp = new TTP();

		ttp.setNumItems(n);
		ttp.setNumCities(m);
		ttp.setValues(value);
		ttp.setWeights(wght);
		ttp.setItems_matrix(itemsbycitys);
		ttp.setAdjacency_matrix(a);
		ttp.setVmin(0.1);
		ttp.setVmax(1);
		ttp.setKnapsackRent(0);
		ttp.setKnapsackWeight(100);

		int result[][];
		int route[]=new int[ttp.getNumCities()];


		/*for (i=0; i<m; i++){
			for (j=0; j<m; j++){
				System.out.print(a[i][j] + " ");
			}
			System.out.println();
		}*/
		SomethingLikeKP slkp = new SomethingLikeKP();
		result=slkp.getResult(ttp);

		String toSend="";
		int c=0;
		for (j = 0; j < ttp.getNumCities(); j++){
			for (i = 0; i < ttp.getNumItems(); i++){
				if (result[i][j] == 1){
					c++;
				}
			}
			if (c>0){
				if (toSend == ""){
					toSend = toSend + j;
				}
				else toSend = toSend + ":" + j;
			}
			for (i = 0; i < ttp.getNumItems(); i++){
				if (result[i][j] == 1) {
					toSend = toSend + "." + i;
				}
			}
			c=0;
		}


    	/*System.out.println("Weights:");
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

    	System.out.println("\n");*/

		/*System.out.println("Route:");
		for (i=0; i<result.length; i++){
			//result[i]-=1;
			System.out.print(route[i] + "  ");
		}*/
		System.out.println("toSend: ");
		System.out.println(toSend);
		return new ResponseEntity<String>(toSend, responseHeaders, HttpStatus.OK);

    }


}
