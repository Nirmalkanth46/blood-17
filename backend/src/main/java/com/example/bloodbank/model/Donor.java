package com.example.bloodbank.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="donors")
public class Donor {

    @Id
    private String id;
    private String name;
    private int age;
    private String bloodGroup;
    private String phone;
    private String email;
    private String address;
    private String location;
    private String lastDonationDate;

    // getters and setters
    public String getId(){return id;}
    public void setId(String id){this.id=id;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public int getAge(){return age;}
    public void setAge(int age){this.age=age;}
    public String getBloodGroup(){return bloodGroup;}
    public void setBloodGroup(String bloodGroup){this.bloodGroup=bloodGroup;}
    public String getPhone(){return phone;}
    public void setPhone(String phone){this.phone=phone;}
    public String getEmail(){return email;}
    public void setEmail(String email){this.email=email;}
    public String getAddress(){return address;}
    public void setAddress(String address){this.address=address;}
    public String getLocation(){return location;}
    public void setLocation(String location){this.location=location;}
    public String getLastDonationDate(){return lastDonationDate;}
    public void setLastDonationDate(String lastDonationDate){this.lastDonationDate=lastDonationDate;}

    @Override
    public String toString() {
        return "Donor{id=" + id + ", name=" + name + ", bloodGroup=" + bloodGroup + "}";
    }
}