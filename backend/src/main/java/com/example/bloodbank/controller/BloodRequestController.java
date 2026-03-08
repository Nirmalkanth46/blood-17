package com.example.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import com.example.bloodbank.model.BloodRequest;
import com.example.bloodbank.model.Donor;
import com.example.bloodbank.repository.BloodRequestRepository;
import com.example.bloodbank.service.MatchingService;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52756", "http://localhost:53385", "http://localhost:56053"})
public class BloodRequestController {

    @Autowired
    private BloodRequestRepository requestRepository;
    
    @Autowired
    private MatchingService matchingService;

    @PostMapping
    public ResponseEntity<List<Donor>> requestBlood(@RequestBody BloodRequest request){
        try {
            System.out.println("Received blood request for: " + request.getPatientName() + ", Blood Group: " + request.getBloodGroup());
            requestRepository.save(request);
            List<Donor> matchingDonors = matchingService.findMatchingDonors(request.getBloodGroup());
            System.out.println("Found " + matchingDonors.size() + " matching donors");
            return new ResponseEntity<>(matchingDonors, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error processing blood request: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}