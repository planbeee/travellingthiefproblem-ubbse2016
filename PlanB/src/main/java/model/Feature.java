package model;

public class Feature {

    private long id;

    private String name;

    private String address;

    private String details;

    public Feature() {

    }
    public Feature(long id, String name, String address, String details) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.details = details;
    }

    public Feature(String name, String address, String details) {
        this.name = name;
        this.address = address;
        this.details = details;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getDetails() {
        return details;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
