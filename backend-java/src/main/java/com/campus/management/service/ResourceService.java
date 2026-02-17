package com.campus.management.service;

import com.campus.management.model.Resource;
import com.campus.management.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Resource getResourceById(Integer id) {
        return resourceRepository.findById(id).orElse(null);
    }

    public Resource createResource(Resource resource) {
        if (resource.getAvailableQuantity() == null) {
            resource.setAvailableQuantity(resource.getTotalQuantity());
        }
        return resourceRepository.save(resource);
    }

    public Resource updateResource(Integer id, Resource resourceDetails) {
        Resource resource = resourceRepository.findById(id).orElse(null);
        if (resource != null) {
            resource.setName(resourceDetails.getName());
            resource.setType(resourceDetails.getType());
            resource.setTotalQuantity(resourceDetails.getTotalQuantity());
            resource.setAvailableQuantity(resourceDetails.getAvailableQuantity());
            return resourceRepository.save(resource);
        }
        return null;
    }

    public void deleteResource(Integer id) {
        resourceRepository.deleteById(id);
    }
}
