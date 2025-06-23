package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.model.dto.response.*;
import io.github.edsonzuchi.gfig.core.model.enums.StatusCode;
import io.github.edsonzuchi.gfig.core.service.UtilsService;
import io.github.edsonzuchi.gfig.infra.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UtilsServiceImpl implements UtilsService {

    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final UserRepository userRepository;
    private final RequestRepository requestRepository;

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
        var optional = productRepository.findById(idProduct);
        if (optional.isEmpty()) {
            return null;
        }
        var product = optional.get();

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                new UMResponse(
                        product.getUm().getAcronym(),
                        product.getUm().getName()
                ),
                product.getLowStockWarning(),
                product.getLowStockWarningQuantity(),
                List.of(),
                null,
                product.getStatusCode().getTranslate(),
                product.getStatusCode().getCode()
        );
    }

    @Override
    public VariantResponse variantResponse(Long idVariant) {
        var optional = variantRepository.findById(idVariant);
        if (optional.isEmpty()) {
            return null;
        }
        var variant = optional.get();

        return new VariantResponse(
                variant.getId(),
                variant.getName(),
                variant.getCode(),
                variant.getStatusCode().getTranslate()
        );
    }

    @Override
    public RequestResponse requestResponse(Long idRequest) {
        var optional = requestRepository.findById(idRequest);
        if (optional.isEmpty()) {
            return null;
        }
        var request = optional.get();

        return new RequestResponse(
                request.getId(),
                userResponse(request.getUser().getId()),
                (request.getWarehouseRequested() != null ? warehouseResponse(request.getWarehouseRequested().getId()) : null),
                (request.getWarehouseReturned() != null ? warehouseResponse(request.getWarehouseReturned().getId()) : null),
                request.getStatusRequest().getTranslate(),
                request.getBodyRequested(),
                request.getBodyReturned()
        );
    }
}
