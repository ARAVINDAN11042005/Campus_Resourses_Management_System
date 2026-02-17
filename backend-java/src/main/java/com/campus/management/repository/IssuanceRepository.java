package com.campus.management.repository;

import com.campus.management.model.Issuance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssuanceRepository extends JpaRepository<Issuance, Integer> {
}
