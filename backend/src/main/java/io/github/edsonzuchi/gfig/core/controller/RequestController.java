package io.github.edsonzuchi.gfig.core.controller;

import io.github.edsonzuchi.gfig.core.exception.ProductException;
import io.github.edsonzuchi.gfig.core.exception.RequestException;
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

    @PostMapping("/item/return/save")
    public ResponseEntity<Object> returnItem(@RequestBody RequestItemRequest request) {
        try {
            User user = SecurityUtil.getUser();
            return ResponseEntity.ok(requestService.saveRequestItemDevolution(request, user));
        }catch (RequestException | ProductException re) {
            return ResponseEntity.unprocessableEntity().body(re.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/finish/typing/{id}")
    public ResponseEntity<Object> finishTyping(@PathVariable("id") Long id) {
        try {
            User user = SecurityUtil.getUser();
            return ResponseEntity.ok(requestService.finishTypingRequest(id, user));
        }catch (RequestException re) {
            return ResponseEntity.unprocessableEntity().body(re.getMessage());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/return/{id}")
    public ResponseEntity<Object> returnRequest(@PathVariable("id") Long id) {
        try {
            User user = SecurityUtil.getUser();
            return ResponseEntity.ok(requestService.returnRequest(id, user));
        }catch (RequestException re) {
            return ResponseEntity.unprocessableEntity().body(re.getMessage());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/return/partial/{id}")
    public ResponseEntity<Object> returnPartialRequest(@PathVariable("id") Long id) {
        try {
            User user = SecurityUtil.getUser();
            return ResponseEntity.ok(requestService.returnPartialRequest(id, user));
        }catch (RequestException re) {
            return ResponseEntity.unprocessableEntity().body(re.getMessage());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<Object> getRequests() {
        try {
            User user = SecurityUtil.getUser();
            return ResponseEntity.ok(requestService.getRequests(user));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getRequest(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(requestService.getRequestList(id));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/list/item")
    public ResponseEntity<Object> getListItems(@RequestParam("id") Long id, @RequestParam("filter") String filter) {
        try {
            return ResponseEntity.ok(requestService.getItems(id, filter));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
        try {
            requestService.cancelRequest(id);
            return ResponseEntity.ok(true);
        }catch (RequestException re) {
            return ResponseEntity.unprocessableEntity().body(re.getMessage());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/{id}/accepted")
    public ResponseEntity<Object> accepted(@PathVariable("id") Long id) {
        try {
            User user = SecurityUtil.getUser();
            requestService.acceptRequest(id, user);
            return ResponseEntity.ok(true);
        }catch (RequestException re) {
            return ResponseEntity.unprocessableEntity().body(re.getMessage());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/{id}/rejected")
    public ResponseEntity<Object> rejected(@PathVariable("id") Long id) {
        try {
            User user = SecurityUtil.getUser();
            requestService.rejectRequest(id, user);
            return ResponseEntity.ok(true);
        }catch (RequestException re) {
            return ResponseEntity.unprocessableEntity().body(re.getMessage());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
