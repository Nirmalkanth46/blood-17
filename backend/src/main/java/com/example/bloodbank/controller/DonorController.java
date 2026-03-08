package com.example.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import com.example.bloodbank.model.Donor;
import com.example.bloodbank.repository.DonorRepository;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52756", "http://localhost:53385", "http://localhost:56053"}, 
             allowedHeaders = "*", 
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class DonorController {

    @Autowired
    private DonorRepository donorRepository;

    @PostMapping
    public ResponseEntity<Donor> registerDonor(@RequestBody Donor donor){
        try {
            System.out.println("Received donor: " + donor.getName() + ", " + donor.getBloodGroup());
            Donor savedDonor = donorRepository.save(donor);
            System.out.println("Saved donor with ID: " + savedDonor.getId());
            return new ResponseEntity<>(savedDonor, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error saving donor: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Donor>> getAllDonors(){
        try {
            List<Donor> donors = donorRepository.findAll();
            System.out.println("Found " + donors.size() + " donors");
            return new ResponseEntity<>(donors, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching donors: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteDonor(@PathVariable String id){
        try {
            donorRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.err.println("Error deleting donor: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}