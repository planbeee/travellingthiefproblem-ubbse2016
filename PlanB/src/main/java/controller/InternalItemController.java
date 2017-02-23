package controller;

import javax.servlet.http.HttpServletResponse;

import algorithm.AtlagProfit;
import algorithm.GreedyKnapsack;
import algorithm.SomethingLikeKP;
import algorithm.TravelingSalesman;
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

import java.util.ArrayList;


@RestController
@RequestMapping("/")
public class InternalItemController {

    private Logger LOG = Logger.getLogger(InternalItemController.class.getName());


    @RequestMapping(value = "", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity sendBack(@RequestParam("AlgType") int algtype, @RequestParam("Weight") double[] wght,@RequestParam("Value") double[] value,@RequestParam("ItemsbyCities") int[][] items,@RequestParam("ItemsLength") int n,@RequestParam("Distances") int[][] dist,@RequestParam("DistLength") int m) {
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
			if (i % n == 0 && i != 0) {
				k++;
			}
			b[k][i % n] = items[i][0];
		}

		for (i=0; i<n; i++){
			for (j=0; j<m; j++) {
				itemsbycitys[i][j]=b[j][i];
			}
		}

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

		String toSend="";

		if (algtype == 0){

			ArrayList<Integer> al=new TravelingSalesman(ttp).getResultArray();

			GreedyKnapsack gk=new GreedyKnapsack(ttp.getNumItems());
			double atlagprofit=new AtlagProfit(ttp).getProfit();

			double weight[], profit[];
			double KnapsackWeightLeft=ttp.getKnapsackWeight();
			weight=new double[ttp.getNumItems()];
			profit=new double[ttp.getNumItems()];

			for (i=0;i<al.size();i++) {
				for (j=0;j<ttp.getNumItems();j++) {
					weight[j]=1;
					profit[j]=0;
				}

				int itm[] =new int[ttp.getNumItems()];

				for(int row = 0; row < ttp.getNumItems(); row++)
				{
					itm[row] = ttp.getItems_matrix()[row][al.get(i)];
				}
				int db=0;
				for (j=0;j<ttp.getNumItems();j++) {
					if (itm[j]==1) {
						weight[db]=ttp.getWeights()[j];
						profit[db]=ttp.getValues()[j];
						db++;
					}
				}
				System.out.println("City index: "+(al.get(i))+". Remaining weight: "+KnapsackWeightLeft+". Average profit: "+atlagprofit+".");
				gk.setProfits(profit);
				gk.setWeights(weight);
				gk.Knapsack(KnapsackWeightLeft,ttp,atlagprofit);
				KnapsackWeightLeft=gk.getTotal();
				gk.kiir();

				if (toSend ==""){
					toSend=toSend + al.get(i);
				}
				else {
					toSend=toSend + ":" + al.get(i);
				}
				for (int q=0; q<gk.getTake().length; q++){
					if (gk.getTake()[q] == 1.0){
						toSend=toSend + "." + q;
					}
				}
			}
		}
		else{
			int result[][];
			int route[]=new int[ttp.getNumCities()];

			SomethingLikeKP slkp = new SomethingLikeKP();
			result=slkp.getResult(ttp);

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
		}

		/*for (i=0; i<n; i++){
			for (j=0; j<m; j++){
				System.out.print(itemsbycitys[i][j] + " ");
			}
			System.out.println();
		}

		System.out.println("Ok2");*/





		/*for (i=0; i<m; i++){
			for (j=0; j<m; j++){
				System.out.print(a[i][j] + " ");
			}
			System.out.println();
		}*/



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
