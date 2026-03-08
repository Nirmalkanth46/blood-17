
package com.example.bloodbank.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="bloodRequests")
public class BloodRequest {

    @Id
    private String id;
    private String patientName;
    private String bloodGroup;
    private String hospitalName;
    private String location;
    private String contactNumber;

    public String getId(){return id;}
    public void setId(String id){this.id=id;}
    public String getPatientName(){return patientName;}
    public void setPatientName(String patientName){this.patientName=patientName;}
    public String getBloodGroup(){return bloodGroup;}
    public void setBloodGroup(String bloodGroup){this.bloodGroup=bloodGroup;}
    public String getHospitalName(){return hospitalName;}
    public void setHospitalName(String hospitalName){this.hospitalName=hospitalName;}
    public String getLocation(){return location;}
    public void setLocation(String location){this.location=location;}
    public String getContactNumber(){return contactNumber;}
    public void setContactNumber(String contactNumber){this.contactNumber=contactNumber;}
}
