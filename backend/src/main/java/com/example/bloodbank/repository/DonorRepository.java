
package com.example.bloodbank.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.bloodbank.model.Donor;
import java.util.List;

public interface DonorRepository extends MongoRepository<Donor,String> {
    List<Donor> findByBloodGroup(String bloodGroup);
}
