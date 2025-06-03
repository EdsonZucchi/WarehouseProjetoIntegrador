package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.model.dto.request.RequestItemRequest;
import io.github.edsonzuchi.gfig.core.model.dto.request.RequestRequest;
import io.github.edsonzuchi.gfig.core.model.entity.User;
import io.github.edsonzuchi.gfig.core.service.RequestService;
import io.github.edsonzuchi.gfig.infra.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/save")
    public ResponseEntity<Object> save(@RequestBody RequestRequest request) {
        try {
            User user = SecurityUtil.getUser();
            return ResponseEntity.ok(requestService.saveRequest(request, user));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/item/save")
    public ResponseEntity<Object> saveItem(@RequestBody RequestItemRequest request) {
        try {
            User user = SecurityUtil.getUser();
            return ResponseEntity.ok(requestService.saveRequestItem(request, user));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/finish/typing/{id}")
    public ResponseEntity<Object> finishTyping(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(requestService.finishTypingRequest(id));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
