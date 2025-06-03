package io.github.edsonzuchi.gfig.core.service;

import io.github.edsonzuchi.gfig.core.model.dto.request.RequestItemRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.RequestRequest;
import io.github.edsonzuchi.gfig.core.model.dto.response.RequestItemResponse;
import io.github.edsonzuchi.gfig.core.model.dto.response.RequestResponse;
import io.github.edsonzuchi.gfig.core.model.entity.User;

public interface RequestService {

    RequestResponse saveRequest(RequestRequest request, User user);
    RequestItemResponse saveRequestItem(RequestItemRequest request, User user);
    RequestResponse finishTypingRequest(Long idRequest);

}
