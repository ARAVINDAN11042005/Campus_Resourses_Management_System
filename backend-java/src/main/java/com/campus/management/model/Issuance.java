package com.campus.management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "issuances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Issuance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource resource;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "issue_date", updatable = false)
    private LocalDateTime issueDate;

    @Column(name = "return_date")
    private LocalDateTime returnDate;

    @Enumerated(EnumType.STRING)
    private IssuanceStatus status;

    @PrePersist
    protected void onCreate() {
        issueDate = LocalDateTime.now();
        if (status == null) {
            status = IssuanceStatus.ISSUED;
        }
    }

    public enum IssuanceStatus {
        ISSUED, RETURNED
    }
}
