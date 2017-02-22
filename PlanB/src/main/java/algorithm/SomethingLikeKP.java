package algorithm;

/**
 * Created by Norbert on 2017. 02. 22..
 */

import utilities.*;

public class SomethingLikeKP {

    public Item_city[] CreateList(TTP ttp) {

        int numItems = ttp.getNumItems();
        int num_cities = ttp.getNumCities();
        int[][] items_matrix = ttp.getItems_matrix();
        double[] weight = ttp.getWeights();
        double[] values = ttp.getValues();
        int n=numItems*num_cities;

        Item_city[] item_city = new Item_city[n];

        int k=0;
        for (int i = 0; i < numItems; i++){
            for (int j = 0; j < num_cities; j++){
                if (items_matrix[i][j] == 1)
                {
                    Item_city x = new Item_city();

                    x.setCity(j);
                    x.setItem(i);
                    x.setValue(values[i]);
                    x.setWeight(weight[i]);
                    double unit_price = values[i]/weight[i];
                    x.setUnit_price(unit_price);
                    item_city[k]=x;
                    k++;
                }
                else {

                    Item_city x = new Item_city();

                    x.setCity(j);
                    x.setItem(i);
                    x.setValue(0);
                    x.setWeight(0);
                    x.setUnit_price(0);
                    item_city[k]=x;
                    k++;
                }
            }
        }
        return item_city;
    }

    public Item_city[] unitPriceOrder(Item_city[] item_city) {

        Item_city temp = new Item_city();

        for (int i=0; i<item_city.length; i++){
            for (int j=1; j<item_city.length-i; j++){
                if (item_city[j].getUnit_price() > item_city[j-1].getUnit_price()){

                    temp = item_city[j-1];
                    item_city[j-1] = item_city[j];
                    item_city[j]=temp;

                }
            }
        }
        return item_city;
    }

    public void kiir(Item_city[] item_city){

        System.out.println();
        for (int i=0; i<item_city.length; i++){
            System.out.println("City:" + item_city[i].getCity() + " Item:" + item_city[i].getItem() + " Value:"+
                    item_city[i].getValue() + " Weight:" + item_city[i].getWeight() + " Unit price:" +
                    item_city[i].getUnit_price());

        }
        System.out.println();
    }

    public int[] getResult(TTP ttp) {

        Item_city[] item_city = CreateList(ttp);
        //kiir(item_city);
        item_city=unitPriceOrder(item_city);
        //kiir(item_city);

        double total=0;
        double w=ttp.getKnapsackWeight();

        //ArrayList<Integer> res;
        int[][] temp = new int[ttp.getNumItems()][ttp.getNumCities()];
        double suly[] = new double[ttp.getNumCities()];
        int city[] = new int [ttp.getNumCities()];
        for (int i = 0; i < ttp.getNumItems(); i++){
            for (int j = 0; j < ttp.getNumCities(); j++){
                temp[i][j]=0;
            }
        }
        for (int i=0; i<item_city.length; i++){
            if (item_city[i].getWeight() <= w && item_city[i].getWeight()>0){
                temp[item_city[i].getItem()][item_city[i].getCity()]=1;
                suly[item_city[i].getCity()]=suly[item_city[i].getCity()]+item_city[i].getWeight();
                city[item_city[i].getCity()]=item_city[i].getCity()+1;
                total=total + item_city[i].getValue();
                w=w-item_city[i].getWeight();
            }
        }
		/*for (int i = 0; i < ttp.getNumItems(); i++){
            for (int j = 0; j < ttp.getNumCities(); j++){
            	System.out.print(temp[i][j]+ " ");
            }
            System.out.println();
		}*/
        double temp1;
        int temp2;
        for (int i=0; i<ttp.getNumCities(); i++){
            for (int j=1; j<ttp.getNumCities()-i; j++){
                if (suly[j] < suly[j-1]){
                    temp1=suly[j-1];
                    suly[j-1]=suly[j];
                    suly[j]=temp1;
                    temp2=city[j-1];
                    city[j-1]=city[j];
                    city[j]=temp2;
                }
            }
        }

		/*System.out.println("Sulyok");
		for (int i=0; i<ttp.getNumCities(); i++){
			System.out.print(city[i] + ": " + suly[i] + " ");
		}*/

        //System.out.println();
        //System.out.println("Result");
        //for (int i=0; i<ttp.getNumCities(); i++){
        //System.out.print(city[i] + " ");
			/*for (int j = 0; j < ttp.getNumItems(); j++){
				 if (temp[j][i] == 1)
					 System.out.print(j+1 + " ");
			 }
			System.out.println(";");
			*/
        //}
        //System.out.println();
        //System.out.println("Total profit: " + total);
        return city;
    }

}
