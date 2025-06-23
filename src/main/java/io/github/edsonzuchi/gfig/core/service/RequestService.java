package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.model.dto.request.RequestItemRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.RequestRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.ProductVariantStockResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.RequestItemResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.RequestListResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.RequestResponse;
import io.github.edsonzuchi.gfig.core.model.entity.User;

import java.util.List;

public interface RequestService {

    RequestResponse saveRequest(RequestRequest request, User user);
    RequestItemResponse saveRequestItem(RequestItemRequest request, User user);
    RequestItemResponse saveRequestItemDevolution(RequestItemRequest request, User user);
    RequestResponse returnRequest(Long idRequest);
    RequestResponse finishTypingRequest(Long idRequest);
    List<RequestResponse> getRequests(User user);
    RequestListResponse getRequestList(Long idRequest);
    List<ProductVariantStockResponse> getItems(Long idRequest, String filter);
    void cancelRequest(Long idRequest);

}
