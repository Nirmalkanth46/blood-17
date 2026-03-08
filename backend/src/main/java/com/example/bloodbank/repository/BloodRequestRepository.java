
package com.example.bloodbank.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.bloodbank.model.BloodRequest;

public interface BloodRequestRepository extends MongoRepository<BloodRequest,String> {
}
