package com.campus.management.service;

import com.campus.management.model.Issuance;
import com.campus.management.model.Resource;
import com.campus.management.model.Student;
import com.campus.management.repository.IssuanceRepository;
import com.campus.management.repository.ResourceRepository;
import com.campus.management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssuanceService {
    @Autowired
    private IssuanceRepository issuanceRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Issuance> getAllIssuances() {
        return issuanceRepository.findAll();
    }

    @Transactional
    public Issuance issueResource(Integer studentId, Integer resourceId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        if (resource.getAvailableQuantity() <= 0) {
            throw new RuntimeException("Resource not available");
        }

        // Decrement availability
        resource.setAvailableQuantity(resource.getAvailableQuantity() - 1);
        resourceRepository.save(resource);

        Issuance issuance = new Issuance();
        issuance.setStudent(student);
        issuance.setResource(resource);
        issuance.setStatus(Issuance.IssuanceStatus.ISSUED);

        return issuanceRepository.save(issuance);
    }

    @Transactional
    public Issuance returnResource(Integer issuanceId) {
        Issuance issuance = issuanceRepository.findById(issuanceId)
                .orElseThrow(() -> new RuntimeException("Issuance not found"));

        if (issuance.getStatus() == Issuance.IssuanceStatus.RETURNED) {
            throw new RuntimeException("Resource already returned");
        }

        Resource resource = issuance.getResource();

        // Increment availability
        resource.setAvailableQuantity(resource.getAvailableQuantity() + 1);
        resourceRepository.save(resource);

        issuance.setStatus(Issuance.IssuanceStatus.RETURNED);
        issuance.setReturnDate(LocalDateTime.now());

        return issuanceRepository.save(issuance);
    }
}
