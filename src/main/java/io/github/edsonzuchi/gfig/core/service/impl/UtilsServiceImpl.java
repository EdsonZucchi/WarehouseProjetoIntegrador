package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.model.dto.response.*;
import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.infra.repository.ProductRepository;
import io.github.edsonzuchi.gfig.infra.repository.UserRepository;
import io.github.edsonzuchi.gfig.infra.repository.VariantRepository;
import io.github.edsonzuchi.gfig.infra.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UtilsServiceImpl implements UtilsService {

    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final UserRepository userRepository;

    @Override
    public boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    @Override
    public boolean isEmpty(Long str) {
        return str == null || str == 0L;
    }

    @Override
    public boolean isEmpty(Float str) {
        return str == null;
    }

    @Override
    public boolean isEmpty(Double str) {
        return str == null;
    }

    @Override
    public boolean isEmpty(Boolean str) {
        return str == null;
    }

    @Override
    public boolean isEmpty(Integer str) {
        return str == null;
    }

    @Override
    public WarehouseResponse warehouseResponse(Long idWarehouse) {
        var optional = warehouseRepository.findById(idWarehouse);
        if (optional.isEmpty()) {
            return null;
        }
        var warehouse = optional.get();

        return new WarehouseResponse(
                warehouse.getId(),
                warehouse.getName(),
                warehouse.getStatusCode() == StatusCode.ACTIVE
        );
    }

    @Override
    public UserResponse userResponse(Long idUser) {
        var optional = userRepository.findById(idUser);
        if (optional.isEmpty()) {
            return null;
        }
        var user = optional.get();

        return new UserResponse(
                user.getEmail(),
                user.getName(),
                user.getBirthday(),
                user.getRole().getLabel()
        );
    }

    @Override
    public ProductResponse productResponse(Long idProduct) {
        return null;
    }

    @Override
    public VariantResponse variantResponse(Long idVariant) {
        return null;
    }

    @Override
    public RequestResponse requestResponse(Long idRequest) {
        return null;
    }
}
