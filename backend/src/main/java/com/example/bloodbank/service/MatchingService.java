
package com.example.bloodbank.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.example.bloodbank.model.Donor;
import com.example.bloodbank.repository.DonorRepository;

@Service
public class MatchingService {

    private final DonorRepository donorRepository;

    public MatchingService(DonorRepository donorRepository){
        this.donorRepository = donorRepository;
    }

    public List<Donor> findMatchingDonors(String bloodGroup){
        return donorRepository.findByBloodGroup(bloodGroup);
    }
}
